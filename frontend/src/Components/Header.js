import { Flex, Box, Divider, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import ProfileButton from './ProfileButton';
import { UserContext } from './Context';
import { useContext } from 'react';

const Header = () => {
  const userContext = useContext(UserContext);
  return (
    <>
      <Flex bg="WhiteAlpha 200" w={{ base: '1380px', xl: '100%' }} h="80px" justify="space-between">
          <Box w="200px" display="flex" alignItems="center" pl="80px">
            <Link to={'/'}>
            <Image src="https://myawsfoodbucket01.s3.ap-southeast-2.amazonaws.com/weightlifter.png" w="40px" h="40px"/>
            </Link>
          </Box>
            <Box display="flex" alignItems="center" justifyContent="end" pr="80px">
              {userContext.userState.login === false
                ? <LoginButton />
                : <ProfileButton />
                }
            </Box>
      </Flex>
      <Divider/>
    </>
  );
};

export default Header;
