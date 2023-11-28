import { Flex, Divider, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';
import ProfileButton from './ProfileButton';
import { UserContext } from './Context';
import { useContext } from 'react';

const Header = () => {
  const userContext = useContext(UserContext);
  return (
    <>
      <Flex justify="center">
        <Flex bg="WhiteAlpha 200" w={{ base: '100%', xl: '1400px' }} h="80px" justifyContent="space-between">
          <Flex w="150px" justifyContent="center" alignItems="center">
            <Link to={'/'}>
            <Image src="https://myawsfoodbucket01.s3.ap-southeast-2.amazonaws.com/weightlifter.png" w="40px" h="40px"/>
            </Link>
          </Flex>
          <Flex w="150px" justifyContent="center" alignItems="center">
            {userContext.userState.login === false
              ? <LoginButton />
              : <ProfileButton />
              }
          </Flex>
        </Flex>
      </Flex>
      <Divider/>
    </>
  );
};

export default Header;
