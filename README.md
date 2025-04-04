# Ghibli AI Art Studio

Transform your photos into magical Ghibli-style artworks with this AI-powered tool. This application uses deep learning and image processing techniques to create dreamy, Studio Ghibli-inspired transformations of your images.

## Features

- Drag and drop image upload
- Real-time image transformation preview
- Ghibli-style color palette and effects
- Download transformed images
- Share your creations
- Responsive design
- Smooth animations and transitions

## Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- CUDA-capable GPU (optional, for faster processing)

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ghibli-ai-art.git
cd ghibli-ai-art
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

## Running the Application

1. Start the backend server:
```bash
cd backend
python app.py
```

2. In a new terminal, start the frontend development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Upload an image by dragging and dropping it onto the upload area or clicking to select a file
2. Click the "Transform Image" button to apply the Ghibli-style transformation
3. Once processing is complete, you can:
   - Download the transformed image
   - Share your creation
   - Try another image

## Technical Details

The application uses:
- React for the frontend
- Flask for the backend
- PyTorch and OpenCV for image processing
- VGG19 for style transfer
- Custom color grading and effects to achieve the Ghibli aesthetic

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the beautiful artwork of Studio Ghibli
- Built with ❤️ for Ghibli fans everywhere 