import api from '../api';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react';

const ProfileButton = () => {
  const navigate = useNavigate();
  return (
    <Menu>
      <MenuButton as={Button} colorScheme='blue'>
        Profile
      </MenuButton>
      <MenuList>
        <MenuItem onClick={async () => {
          navigate('/profile');
        }}>My Account</MenuItem>
        <MenuItem onClick={async () => {
          await api.logout();
          window.location.reload();
        }}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProfileButton;
