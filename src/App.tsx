import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { motion } from 'framer-motion';

// Theme
const theme = {
  colors: {
    primary: '#8B9EB7',
    secondary: '#E6B89C',
    background: '#F5F5F5',
    text: '#333333',
    accent: '#D4A5A5',
  },
  fonts: {
    primary: "'M PLUS Rounded 1c', sans-serif",
    secondary: "'Quicksand', sans-serif",
  },
};

// Global styles
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&family=Quicksand:wght@400;600&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${theme.fonts.primary};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
  }
`;

const AppContainer = styled(motion.div)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <AppContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </AppContainer>
      </Router>
    </ThemeProvider>
  );
};

export default App; 