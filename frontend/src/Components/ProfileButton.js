import api from '../api';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './Context';
import {
  Center,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react';

const ProfileButton = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <Menu>
      <Center width="100px">
      <MenuButton as={Button} colorScheme='blue'>
        Profile
      </MenuButton>
      </Center>
      <MenuList>
        <MenuItem display="flex" justifyContent="center" onClick={() => {
          navigate('/profile');
        }}>My Account</MenuItem>
        <MenuItem display="flex" justifyContent="center" onClick={async () => {
          const data = await api.logout();
          const status = data.status;
          if (status === 200) {
            userContext.userDispatch({ type: 'UPDATE_LOGIN', payload: false });
            location.reload();
          } else {
            userContext.userDispatch({ type: 'UPDATE_ERROR', payload: true });
            navigate('/error');
          }
        }}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileButton;
