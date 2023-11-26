import { Box, Center, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { getGoogleOAuthURL } from '../utils';

const LoginButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box width="100px">
      <Button colorScheme='blue' onClick={onOpen}>
        Login
      </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login or Signup in seconds</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            <Center>
              <Link to={getGoogleOAuthURL()}>
                <Button color='BlackAlpha 100' leftIcon={<FcGoogle />}>
                  Continue with Google
                </Button>
              </Link>
            </Center>
        </ModalBody>
        <ModalFooter>
          By continuing, you agree to our Terms of Use. Read our Privacy Policy.
        </ModalFooter>
      </ModalContent>
      </Modal>
    </>
  );
};

export default LoginButton;
