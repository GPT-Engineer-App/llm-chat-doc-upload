import React, { useState } from 'react';
import { Container, VStack, Heading } from '@chakra-ui/react';
import FileUpload from '../components/FileUpload';
import ChatInterface from '../components/ChatInterface';

const Index = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (files) => {
    setUploadedFiles(files);
    // Handle file upload logic here
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={8} width="100%">
        <Heading as="h1" size="xl">LLM Chat App</Heading>
        <FileUpload onFileUpload={handleFileUpload} />
        <ChatInterface />
      </VStack>
    </Container>
  );
};

export default Index;