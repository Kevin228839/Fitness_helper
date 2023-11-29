import { Spinner, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Input, useToast } from '@chakra-ui/react';
import { useRef, useState, useContext } from 'react';
import { UserContext } from './Context';

import api from '../api';

const CreateFoodButton = () => {
  const userContext = useContext(UserContext);
  const toast = useToast();
  const foodNameRef = useRef(null);
  const carbonhydrateRef = useRef(null);
  const proteinRef = useRef(null);
  const fatRef = useRef(null);
  const caloryRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Button onClick={onOpen} colorScheme="blue" size="lg" w="100px" m="10px">Create</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader color="#2C5282">Create Food</ModalHeader>
        <ModalBody>
          <Input ref={foodNameRef} type="text" placeholder='Food Name' mb="3"/>
          <Input ref={carbonhydrateRef} type="number" placeholder='Carbonhydrate(g)' mb="3"/>
          <Input ref={proteinRef} type="number" placeholder='Protein(g)' mb="3"/>
          <Input ref={fatRef} type="number" placeholder='Fat(g)' mb="3"/>
          <Input ref={caloryRef} type="number" placeholder='Calory(kcal)' mb="3"/>
        </ModalBody>
        <ModalFooter>
          {loading === false
            ? <>
          <Button colorScheme='blue' mr="3" onClick={async () => {
            const payload = {
              name: (foodNameRef.current.value).trim(),
              carbonhydrate: (carbonhydrateRef.current.value).trim(),
              protein: (proteinRef.current.value).trim(),
              fat: (fatRef.current.value).trim(),
              calory: (caloryRef.current.value).trim()
            };
            for (let i = 0; i < Object.values(payload).length; i++) {
              if (Object.values(payload)[i] === '' || (i > 0 && parseFloat(Object.values(payload)[i]) < 0)) {
                toast({
                  title: 'Failed',
                  description: 'Invalid input value',
                  status: 'error',
                  duration: 1000,
                  isClosable: true
                });
                return;
              }
            }
            setLoading(true);
            const data = await api.createFood(payload);
            setLoading(false);
            if (data.status === 200) {
              userContext.userDispatch({ type: 'UPDATE_CUSTOMIZEDFOODCOUNT', payload: userContext.userState.customizedFoodCount + 1 });
              toast({
                title: 'Succeed',
                description: 'Food Created',
                status: 'success',
                duration: 1000,
                isClosable: true
              });
            } else if (data.status === 400) {
              toast({
                title: 'Failed',
                description: 'Invalid input value',
                status: 'error',
                duration: 1000,
                isClosable: true
              });
            } else {
              toast({
                title: 'Failed',
                description: 'Server error',
                status: 'error',
                duration: 1000,
                isClosable: true
              });
            }
          }}>
            Create
          </Button>
          <Button onClick={onClose}>
            Close
          </Button>
          </>
            : <Spinner />}
        </ModalFooter>
      </ModalContent>
      </Modal>
    </>
  );
};

export default CreateFoodButton;
