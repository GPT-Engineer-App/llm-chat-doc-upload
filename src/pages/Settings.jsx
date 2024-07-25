import React, { useState, useEffect } from 'react';
import { Container, VStack, Heading, useToast } from '@chakra-ui/react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Settings = () => {
  const [openRouterKey, setOpenRouterKey] = useState('');
  const toast = useToast();

  useEffect(() => {
    const storedKey = localStorage.getItem('openRouterKey');
    if (storedKey) {
      setOpenRouterKey(storedKey);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('openRouterKey', openRouterKey);
    toast({
      title: "Settings saved",
      description: "Your OpenRouter key has been saved successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={8} width="100%">
        <Heading as="h1" size="xl">Settings</Heading>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <VStack spacing={4} align="stretch">
            <Input
              type="password"
              placeholder="Enter your OpenRouter key"
              value={openRouterKey}
              onChange={(e) => setOpenRouterKey(e.target.value)}
            />
            <Button type="submit">Save Key</Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default Settings;