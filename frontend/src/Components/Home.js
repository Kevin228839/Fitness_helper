import { useEffect, useReducer } from 'react';
import { INIITIAL_STATE, homeReducer } from './Reducer/homeReducer';
import { Box, Flex, Center, Spinner, Card, CardBody, Heading, Text, Image } from '@chakra-ui/react';
import _ from 'lodash';
import api from '../api';

const Home = () => {
  const [state, dispatch] = useReducer(homeReducer, INIITIAL_STATE);
  useEffect(() => {
    const fetchData = async () => {
      let message = await api.getFoodList(state.page);
      message = await message.json();
      dispatch({ type: 'UPDATE_DATA', payload: message });
    };
    fetchData();
  }, []);
  console.log(state.data);

  if (state.data === []) {
    return (
      <Center m="100px">
          <Spinner size='xl' />
      </Center>
    );
  } else {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" p="50px">
        {
          _.chunk(state.data.message, 4).map((row, index) => {
            return (
              <Flex w="100%" h="250px" mb="40px" justify='space-between' key={index}>
                {
                  row.map((item) => {
                    return (
                      <Card w="275px" h="250px" key={item.food_id}>
                        <CardBody>
                            <Image width="70px" height="70px" src={item.image_url}/>
                          <Heading mt="10px" mb="5px" size="md">{item.food_name}</Heading>
                          <Text>carbonhydrate : {item.carbonhydrate}</Text>
                          <Text>protein : {item.protein}</Text>
                          <Text>fat : {item.fat}</Text>
                          <Text>calory : {item.calory}</Text>
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
    );
  }
};

export default Home;
