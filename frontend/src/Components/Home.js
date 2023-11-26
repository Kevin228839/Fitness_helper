import { useEffect, useReducer, useContext } from 'react';
import { UserContext, HomeContext } from './Context';
import { HOME_INIITIAL_STATE, HomeReducer } from './Reducer/HomeReducer';
import { Box, Flex, Center, Spinner, Card, CardBody, Heading, Text, Image } from '@chakra-ui/react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';
import CalculateButton from './CalculateButton';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import api from '../api';

const Home = () => {
  const userContext = useContext(UserContext);
  const [state, dispatch] = useReducer(HomeReducer, HOME_INIITIAL_STATE);
  const navigate = useNavigate();

  useEffect(() => {
    if (userContext.userState.error === true) {
      navigate('/error');
      return;
    }
    const fetchData = async () => {
      let data = await api.getFoodList();
      const status = data.status;
      if (status !== 200) {
        userContext.userDispatch({ type: 'UPDATE_ERROR', payload: true });
        navigate('/error');
        return;
      }
      data = await data.json();
      dispatch({ type: 'UPDATE_DATA', payload: data });
    };
    fetchData();
  }, []);

  if (Object.keys(state.data).length === 0) {
    return (
      <Center m="100px">
          <Spinner size='xl' />
      </Center>
    );
  } else {
    return (
      <>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems={{ base: 'left', xl: 'center' }} pt="50px" pl="50px" pr="50px">
          {
            _.chunk(state.data.message, 4).map((row, index) => {
              return (
                <Flex w="1280px" h="250px" mb="40px" justify='left' key={index}>
                  {
                    row.map((item) => {
                      return (
                        <Card w="280px" h="250px" ml="20px" mr="20px" key={item.food_id}>
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
                    })
                  }
                </Flex>
              );
            })
          }
        {/* </Box> */}
        <HomeContext.Provider value={{ homeState: state, homeDispatch: dispatch }}>
          <CalculateButton />
        </HomeContext.Provider>
        </Box>
      </>
    );
  }
};

export default Home;
