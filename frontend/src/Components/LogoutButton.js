import { Button } from '@chakra-ui/react';
import { useContext } from 'react';
import { CookieContext } from './Context';
import { cookieObject } from '../utils';

const LogoutButton = () => {
  const cookieContext = useContext(CookieContext);

  return (
    <Button colorScheme='blue' onClick={() => {
      // delete cookie by setting expiring date to the past
      document.cookie = 'jwt_info_fitness_helper=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      cookieContext.cookieDispatch({ type: 'UPDATE_COOKIES', payload: cookieObject() });
    }}>
        Logout
    </Button>
  );
};

export default LogoutButton;
