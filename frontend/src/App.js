import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';
import Profile from './Components/Profile';
import ErrorPath from './Components/ErrorPath';
import { useReducer } from 'react';
import { COOKIE_INIITIAL_STATE, CookieReducer } from './Components/Reducer/CookieReducer';
import { CookieContext } from './Components/Context';

const App = () => {
  const [state, dispatch] = useReducer(CookieReducer, COOKIE_INIITIAL_STATE);

  return (
      <CookieContext.Provider value={{ cookieState: state, cookieDispatch: dispatch }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<ErrorPath />} />
        </Routes>
      </CookieContext.Provider>
  );
};

export default App;
