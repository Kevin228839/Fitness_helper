import { Center, Spinner } from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './Context';

const ErrorPage = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (userContext.userState.error === false) {
      navigate('/');
    }
    setLoading(false);
  }, []);
  if (loading === true) {
    return (
      <Center mt="100px">
        <Spinner />
      </Center>
    );
  }
  return (
  <Center mt="100px">
    Oops! Something goes wrong...
  </Center>
  );
};

export default ErrorPage;
