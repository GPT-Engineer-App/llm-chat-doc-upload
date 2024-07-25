import React, { useState } from 'react';
import { Box, VStack, Text, useToast } from '@chakra-ui/react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    const openRouterKey = localStorage.getItem('openRouterKey');
    if (!openRouterKey) {
      toast({
        title: "OpenRouter Key Missing",
        description: "Please set your OpenRouter key in the Settings page.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setInput('');
      return;
    }

    try {
      const response = await axios.post('https://api.openrouter.ai/v1/chat', {
        message: input,
      }, {
        headers: {
          'Authorization': `Bearer ${openRouterKey}`,
          'Content-Type': 'application/json',
        }
      });

      const botMessage = { sender: 'bot', text: response.data.reply };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please check your OpenRouter key and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    setInput('');
  };

  return (
    <VStack spacing={4} align="stretch">
      <Box p={4} borderWidth="1px" borderRadius="md" overflowY="auto" height="400px">
        {messages.map((msg, index) => (
          <Text key={index} alignSelf={msg.sender === 'user' ? 'flex-end' : 'flex-start'}>
            {msg.text}
          </Text>
        ))}
      </Box>
      <Input
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <Button onClick={sendMessage}>Send</Button>
    </VStack>
  );
};

export default ChatInterface;