import { Center, Spinner } from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from './Context';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const Profile = () => {
  const userContext = useContext(UserContext);
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (userContext.userState.login === false) {
      navigate('/');
      return;
    }
    if (userContext.userState.error === true) {
      navigate('/error');
      return;
    }
    const fetchData = async () => {
      let data = await api.getProfile();
      const status = data.status;
      if (status === 401) {
        userContext.userDispatch({ type: 'UPDATE_LOGIN', payload: false });
        navigate('/');
        return;
      }
      if (status !== 200) {
        userContext.userDispatch({ type: 'UPDATE_ERROR', payload: true });
        navigate('/error');
        return;
      }
      data = await data.json();
      setData(data);
    };
    fetchData();
  }, []);
  if (data === null) {
    return (
      <Center mt='100px'>
        <Spinner />
      </Center>
    );
  }
  return (
    <Center flexDirection='column' mt='100px'>
      <Center m='10px'>{data.data.email}</Center>
      <Center m='10px'>{data.data.name}</Center>
    </Center>
  );
};

export default Profile;
