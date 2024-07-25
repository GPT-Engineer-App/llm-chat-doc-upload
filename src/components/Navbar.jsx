import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Spacer } from '@chakra-ui/react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <Box bg="gray.100" px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          <Link to="/">
            <Button variant="ghost">Home</Button>
          </Link>
        </Box>
        <Spacer />
        <Box>
          <Link to="/settings">
            <Button variant="ghost">Settings</Button>
          </Link>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;