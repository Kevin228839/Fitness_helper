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
      if (status === 200) {
        data = await data.json();
        dispatch({ type: 'UPDATE_DATA', payload: data });
        if (!data.login) {
          userContext.userDispatch({ type: 'UPDATE_LOGIN', payload: false });
        }
      } else {
        userContext.userDispatch({ type: 'UPDATE_ERROR', payload: true });
        navigate('/error');
      }
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
    const additionalArray = Array.from({ length: 4 - Object.keys(state.data.message).length % 4 });
    return (
      <>
        <Box display="flex" flexDirection="column" alignItems="center" p="2%">
          {
            _.chunk(state.data.message, 4).map((row, index) => {
              return (
                <Flex w={{ base: '100%', xl: '1400px' }} justifyContent='center' key={index}>
                  {
                    row.map((item) => {
                      return (
                        <Card w="24%" m="0.5%" key={item.food_id}>
                          <CardBody>
                            <Flex>
                              <Flex alignItems="center" w="70%">
                                <Image w="50%" src={item.image_url}/>
                                <Center w="50%" as="b" fontSize={{ base: 'xs', lg: 'xl' }}>
                                    {state.foodNumber[item.food_id] === undefined ? 0 : state.foodNumber[item.food_id]}
                                </Center>
                              </Flex>
                              <Flex w="30%" flexDirection="column" alignItems="center" justifyContent="center">
                                <AddIcon cursor="pointer" boxSize="40%" onClick={() => {
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
                                <MinusIcon cursor="pointer" boxSize="40%" onClick={() => {
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
                              </Flex>
                            </Flex>
                            <Heading mt="5%" mb="5%" fontSize={{ base: 'xs', lg: 'xl' }}>{item.food_name}</Heading>
                            <Text fontSize={{ base: 'xs', lg: 'xl' }}>carbonhydrate : {item.carbonhydrate} g</Text>
                            <Text fontSize={{ base: 'xs', lg: 'xl' }}>protein : {item.protein} g</Text>
                            <Text fontSize={{ base: 'xs', lg: 'xl' }}>fat : {item.fat} g</Text>
                            <Text fontSize={{ base: 'xs', lg: 'xl' }}>calory : {item.calory} kcal</Text>
                          </CardBody>
                        </Card>
                      );
                    })
                  }
                  { row.length % 4 === 0
                    ? <></>
                    : additionalArray.map((element, key) => {
                      return (
                        <Box w="24%" m="0.5%" key={Object.keys(state.data.message).length + key}></Box>
                      );
                    })
                  }
                </Flex>
              );
            })
          }
        <HomeContext.Provider value={{ homeState: state, homeDispatch: dispatch }}>
          <CalculateButton />
        </HomeContext.Provider>
        </Box>
      </>
    );
  }
};

export default Home;
