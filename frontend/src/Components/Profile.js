import { useContext, useEffect, useState } from 'react';
import { CookieContext } from './Context';
import { useNavigate } from 'react-router-dom';
import { Center, Spinner, Avatar, Card, CardHeader, CardBody, Heading, Text, Box, Stack, StackDivider } from '@chakra-ui/react';
import jwtDecode from 'jwt-decode';

const Profile = () => {
  const navigate = useNavigate();
  const cookieContext = useContext(CookieContext);
  const cookies = cookieContext.cookieState.cookies;
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    if (cookies.user_info_fitness_helper === undefined) {
      navigate('/');
    } else {
      setLoginStatus(true);
    }
  }, []);

  if (loginStatus === false) {
    return (
      <Center m="100px">
        <Spinner size='xl' />
      </Center>
    );
  } else {
    return (
      <Card mt="50px">
        <Center>
          <Avatar size="xl" src={jwtDecode(cookies.user_info_fitness_helper).picture}/>
        </Center>
        <CardHeader>
          <Heading size='md'>Personal Information</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing='4'>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Name
              </Heading>
              <Text pt='2' fontSize='sm'>
                {jwtDecode(cookies.user_info_fitness_helper).name}
              </Text>
            </Box>
            <Box>
              <Heading size='xs' textTransform='uppercase'>
                Email
              </Heading>
              <Text pt='2' fontSize='sm'>
              {jwtDecode(cookies.user_info_fitness_helper).email}
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    );
  }
};

export default Profile;
