import { useEffect, useReducer } from 'react';
import { INIITIAL_STATE, homeReducer } from './Reducer/homeReducer';
import { Box, Flex, Center, Spinner, Card, CardBody, Heading, Text, Image, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import _ from 'lodash';
import api from '../api';

const Home = () => {
  const [state, dispatch] = useReducer(homeReducer, INIITIAL_STATE);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const fetchData = async () => {
      let message = await api.getFoodList();
      message = await message.json();
      dispatch({ type: 'UPDATE_DATA', payload: message });
    };
    fetchData();
  }, []);

  if (state.data === []) {
    return (
      <Center m="100px">
          <Spinner size='xl' />
      </Center>
    );
  } else {
    return (
      <>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" pt="50px" pl="50px" pr="50px">
          {
            _.chunk(state.data.message, 4).map((row, index) => {
              return (
                <Flex w="100%" h="250px" mb="40px" justify='space-between' key={index}>
                  {
                    row.map((item) => {
                      return (
                        <Card w="275px" h="250px" key={item.food_id}>
                          <CardBody>
                            <Flex>
                              <Flex alignItems="center" w="200px">
                                <Image width="70px" height="70px" src={item.image_url}/>
                                <Text ml="55px" as="b" fontSize="xl">
                                  {state.foodNumber[item.food_id] === undefined ? 0 : state.foodNumber[item.food_id]}
                                </Text>
                              </Flex>
                              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                                <AddIcon cursor="pointer" boxSize="20px" mb="5px" onClick={() => {
                                  const foodNumberPayload = state.foodNumber;
                                  const calculateResultPayload = state.calculateResult;
                                  if (foodNumberPayload[item.food_id] === undefined || (foodNumberPayload[item.food_id] !== undefined && foodNumberPayload[item.food_id] < 10)) {
                                    if (foodNumberPayload[item.food_id] === undefined) {
                                      foodNumberPayload[item.food_id] = 1;
                                    } else {
                                      foodNumberPayload[item.food_id] += 1;
                                    }
                                    calculateResultPayload.carbonhydrate += item.carbonhydrate;
                                    calculateResultPayload.protein += item.protein;
                                    calculateResultPayload.fat += item.fat;
                                    calculateResultPayload.calory += item.calory;
                                    dispatch({ type: 'UPDATE_FOODNUMBER', payload: foodNumberPayload });
                                    dispatch({ type: 'UPDATE_CALCULATERESULT', payload: calculateResultPayload });
                                  }
                                }}/>
                                <MinusIcon cursor="pointer" boxSize="20px" mt="5px" onClick={() => {
                                  const foodNumberPayload = state.foodNumber;
                                  const calculateResultPayload = state.calculateResult;
                                  if (foodNumberPayload[item.food_id] !== undefined && foodNumberPayload[item.food_id] > 0) {
                                    foodNumberPayload[item.food_id] -= 1;
                                    calculateResultPayload.carbonhydrate -= item.carbonhydrate;
                                    calculateResultPayload.protein -= item.protein;
                                    calculateResultPayload.fat -= item.fat;
                                    calculateResultPayload.calory -= item.calory;
                                    dispatch({ type: 'UPDATE_FOODNUMBER', payload: foodNumberPayload });
                                    dispatch({ type: 'UPDATE_CALCULATERESULT', payload: calculateResultPayload });
                                  }
                                }}/>
                              </Box>
                            </Flex>
                            <Heading mt="15px" mb="5px" size="md">{item.food_name}</Heading>
                                <Text>carbonhydrate : {item.carbonhydrate} g</Text>
                                <Text>protein : {item.protein} g</Text>
                                <Text>fat : {item.fat} g</Text>
                                <Text>calory : {item.calory} kcal</Text>
                          </CardBody>
                        </Card>
                      );
                    }
                    )}
                </Flex>
              );
            })
          }
        </Box>

        <Center mb="50px">
          <Button onClick={onOpen} colorScheme="blue" size="lg">Calculate</Button>
          <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#2C5282">Result</ModalHeader>
          <ModalBody>
            <Text fontSize="xl">
              carbonhydrate: {Math.abs(state.calculateResult.carbonhydrate).toFixed(2)}
            </Text>
            <Text fontSize="xl">
              protein: {Math.abs(state.calculateResult.protein).toFixed(2)}
            </Text>
            <Text fontSize="xl">
              fat: {Math.abs(state.calculateResult.fat).toFixed(2)}
            </Text>
            <Text fontSize="xl">
              calory: {Math.abs(state.calculateResult.calory).toFixed(2)}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </Center>
      </>
    );
  }
};

export default Home;
