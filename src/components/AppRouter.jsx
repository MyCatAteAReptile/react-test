import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import About from '.././pages/About';
import Posts from '.././pages/Posts';
import Error from '.././pages/Error';
import PostIdPage from '../pages/PostIdPage';
import { privateRoutes, publicRoutes } from '../router/routes';
import { useContext } from 'react';
import { AuthContext } from '../context';
import Loader from './UI/Loader/Loader';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)

    if (isLoading) {
        return <Loader/>
    }
    return (
        isAuth 
            ?
            <Routes>
                {privateRoutes.map(route => 
                    <Route
                        key={route.path}
                        path={route.path} 
                        element={route.component}
                    />
                )}
                <Route path="*" element={<Navigate replace to="/posts"/>}/>
            </Routes>
            :
            <Routes>
            {publicRoutes.map(route => 
                <Route
                    key={route.path} 
                    path={route.path} 
                    element={route.component}
                />
            )}          
            <Route path="*" element={<Navigate replace to="/login"/>}/>
        </Routes>
    )
  }

export default AppRouter