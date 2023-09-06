import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Components/Home';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
