import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { FaUpload, FaDownload, FaShare } from 'react-icons/fa';
import axios from 'axios';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
  font-family: ${props => props.theme.fonts.primary};
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.text};
  margin-bottom: 3rem;
  font-family: ${props => props.theme.fonts.secondary};
`;

const Dropzone = styled(motion.div)`
  border: 2px dashed ${props => props.theme.colors.primary};
  border-radius: 10px;
  padding: 3rem;
  margin: 2rem 0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.colors.accent};
  }
`;

const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
`;

const ImagePreview = styled(motion.img)`
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Button = styled(motion.button)`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background-color: ${props => props.theme.colors.accent};
  }
`;

const Home: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [transformedImage, setTransformedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setOriginalImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1
  });

  const transformImage = async () => {
    if (!originalImage) return;

    setIsProcessing(true);
    try {
      const response = await axios.post('/api/transform', {
        image: originalImage.split(',')[1]
      });
      setTransformedImage(`data:image/jpeg;base64,${response.data.transformedImage}`);
    } catch (error) {
      console.error('Error transforming image:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = () => {
    if (!transformedImage) return;
    const link = document.createElement('a');
    link.href = transformedImage;
    link.download = 'ghibli-transformed.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container>
      <Title>Ghibli AI Art Studio</Title>
      <Description>
        Transform your photos into magical Ghibli-style artworks with our AI-powered tool.
        Upload an image and watch it transform into a scene straight out of your favorite Studio Ghibli film!
      </Description>

      <Dropzone
        {...getRootProps()}
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.02 }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the image here...</p>
        ) : (
          <p>Drag and drop an image here, or click to select one</p>
        )}
        <FaUpload size={24} style={{ marginTop: '1rem' }} />
      </Dropzone>

      <PreviewContainer>
        {originalImage && (
          <ImagePreview
            src={originalImage}
            alt="Original"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          />
        )}
        {transformedImage && (
          <ImagePreview
            src={transformedImage}
            alt="Transformed"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          />
        )}
      </PreviewContainer>

      <div>
        <Button
          onClick={transformImage}
          disabled={!originalImage || isProcessing}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isProcessing ? 'Processing...' : 'Transform Image'}
        </Button>

        {transformedImage && (
          <>
            <Button
              onClick={downloadImage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload /> Download
            </Button>
            <Button
              onClick={() => {/* Implement share functionality */}}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaShare /> Share
            </Button>
          </>
        )}
      </div>
    </Container>
  );
};

export default Home; 