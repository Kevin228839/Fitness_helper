import { Button, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody } from '@chakra-ui/react';
import { useContext } from 'react';
import { HomeContext } from './Context';

const CalculateButton = () => {
  const homeContext = useContext(HomeContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" size="lg" w="100px" m="10px">Calculate</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader color="#2C5282">Result</ModalHeader>
        <ModalBody>
          <Text fontSize="xl">
            carbonhydrate: {Math.abs(homeContext.homeState.calculateResult.carbonhydrate).toFixed(2)}
          </Text>
          <Text fontSize="xl">
            protein: {Math.abs(homeContext.homeState.calculateResult.protein).toFixed(2)}
          </Text>
          <Text fontSize="xl">
            fat: {Math.abs(homeContext.homeState.calculateResult.fat).toFixed(2)}
          </Text>
          <Text fontSize="xl">
            calory: {Math.abs(homeContext.homeState.calculateResult.calory).toFixed(2)}
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
      </Modal>
    </>
  );
};

export default CalculateButton;
