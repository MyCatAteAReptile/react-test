import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './styles/App.css';
import Navbar from './components/UI/navbar/Navbar';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context';
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [isAuth, setIsAuth] = useState(false)

  //
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true)
    }
    setIsLoading(false)
  }, [])

  return ( // в курсе v5 а у меня v6, пробую сделать сам, нет гарантии что все ок
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth, //аналогично развернутой записи setIsAuth: setIsAuth() т.к. названия одинаковые можем сократить
      isLoading
    }}>
      <BrowserRouter>
        <Navbar/>
        <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
