import api from '../api';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './Context';
import {
  Box,
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
      <Box width="100px">
      <MenuButton as={Button} colorScheme='blue'>
        Profile
      </MenuButton>
      </Box>
      <MenuList>
        <MenuItem onClick={async () => {
          navigate('/profile');
        }}>My Account</MenuItem>
        <MenuItem onClick={async () => {
          const data = await api.logout();
          const status = data.status;
          if (status === 200) {
            userContext.userDispatch({ type: 'UPDATE_LOGIN', payload: false });
            navigate('/');
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
