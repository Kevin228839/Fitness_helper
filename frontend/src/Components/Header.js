import { Flex, Box, Divider, Button, Image, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import LoginButton from './LoginButton';
import { useContext } from 'react';
import { CookieContext } from './Context';
import { cookieObject } from '../utils';

const Header = () => {
  const navigate = useNavigate();
  const cookieContext = useContext(CookieContext);
  const cookies = cookieContext.cookieState.cookies;

  return (
    <>
      <Flex bg="WhiteAlpha 200" w="100%" h="80px" justify="space-between">
          <Box w="20%" display="flex" alignItems="center" pl="80px">
            <Link to={'/'}>
            <Image src="https://myawsfoodbucket01.s3.ap-southeast-2.amazonaws.com/weightlifter.png" w="40px" h="40px"/>
            </Link>
          </Box>

          <Box w="20%" display="flex" alignItems="center" justifyContent="end" pr="80px">
            {cookies.user_info_fitness_helper
              ? <Menu>
                  <MenuButton colorScheme='blue' as={Button} rightIcon={<ChevronDownIcon />}>
                    Profile
                  </MenuButton>
                  <MenuList>
                    <Link to={'/profile'}>
                      <MenuItem display="flex" justifyContent="center">Account</MenuItem>
                    </Link>
                    <MenuItem display="flex" justifyContent="center" onClick={() => {
                      // delete cookie by setting expiring date to the past
                      document.cookie = 'user_info_fitness_helper=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
                      cookieContext.cookieDispatch({ type: 'UPDATE_COOKIES', payload: cookieObject() });
                      navigate('/');
                    }}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              : <LoginButton />
            }
          </Box>
      </Flex>
      <Divider />
    </>
  );
};

export default Header;
