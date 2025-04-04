from flask import Flask, request, jsonify
from flask_cors import CORS
import base64
import io
from PIL import Image
import numpy as np
import torch
import torchvision.transforms as transforms
from torchvision.models import vgg19
import cv2

app = Flask(__name__)
CORS(app)

# Initialize the VGG19 model for style transfer
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = vgg19(pretrained=True).features.to(device).eval()

# Define the Ghibli-style color palette
GHIBLI_PALETTE = {
    'sky': (135, 206, 235),    # Light blue
    'grass': (144, 238, 144),  # Light green
    'tree': (34, 139, 34),     # Forest green
    'cloud': (255, 255, 255),  # White
    'accent': (255, 182, 193)  # Light pink
}

def preprocess_image(image):
    transform = transforms.Compose([
        transforms.Resize((512, 512)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    return transform(image).unsqueeze(0).to(device)

def postprocess_image(tensor):
    tensor = tensor.squeeze(0).cpu()
    tensor = tensor * torch.tensor([0.229, 0.224, 0.225]).view(3, 1, 1)
    tensor = tensor + torch.tensor([0.485, 0.456, 0.406]).view(3, 1, 1)
    tensor = tensor.clamp(0, 1)
    return transforms.ToPILImage()(tensor)

def apply_ghibli_style(image):
    # Convert to numpy array for OpenCV processing
    img_np = np.array(image)
    
    # Apply soft color grading
    lab = cv2.cvtColor(img_np, cv2.COLOR_RGB2LAB)
    l, a, b = cv2.split(lab)
    l = cv2.add(l, 10)  # Increase brightness
    lab = cv2.merge((l, a, b))
    img_np = cv2.cvtColor(lab, cv2.COLOR_LAB2RGB)
    
    # Apply soft blur for dreamy effect
    img_np = cv2.GaussianBlur(img_np, (5, 5), 0)
    
    # Convert back to PIL Image
    return Image.fromarray(img_np)

@app.route('/api/transform', methods=['POST'])
def transform_image():
    try:
        # Get the base64 image from the request
        data = request.json
        image_data = base64.b64decode(data['image'])
        
        # Convert to PIL Image
        image = Image.open(io.BytesIO(image_data))
        
        # Apply Ghibli-style transformation
        processed_image = apply_ghibli_style(image)
        
        # Convert back to base64
        buffered = io.BytesIO()
        processed_image.save(buffered, format="JPEG")
        img_str = base64.b64encode(buffered.getvalue()).decode()
        
        return jsonify({'transformedImage': img_str})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 