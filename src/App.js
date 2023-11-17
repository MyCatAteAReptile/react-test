import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import About from './pages/About';
import Posts from './pages/Posts';
import Error from './pages/Error';
import Navbar from './components/UI/navbar/Navbar';

function App() {
  return ( // в курсе v5 а у меня v6, пробую сделать сам, нет гарантии что все ок
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/posts" element={<Posts/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/error" element={<Error/>}/>
        <Route path="*" element={<Navigate replace to="/error"/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
