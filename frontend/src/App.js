import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import Profile from './Components/Profile';
import ErrorPage from './Components/ErrorPage';
import ErrorPath from './Components/ErrorPath';
import { Spinner, Center } from '@chakra-ui/react';
import { useState, useEffect, useReducer } from 'react';
import { USER_INITIAL_STATE, UserReducer } from './Components/Reducer/UserReducer';
import { UserContext } from './Components/Context';
import api from './api';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(UserReducer, USER_INITIAL_STATE);

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.autoLogin();

      if (data.status === 200) {
        dispatch({ type: 'UPDATE_LOGIN', payload: true });
      }
      if (data.status === 429) {
        dispatch({ type: 'UPDATE_ERROR', payload: true });
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading === true) {
    return (
      <Center mt="100px">
        <Spinner />
      </Center>
    );
  }
  return (
    <UserContext.Provider value={{ userState: state, userDispatch: dispatch }}>
      {
      state.error === false
        ? <Header />
        : <></>
      }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPath />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
