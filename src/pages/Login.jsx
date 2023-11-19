import React from 'react'
import MyInput from '../components/UI/input/MyInput'
import MyButton from '../components/UI/button/MyButton'
import { useContext } from 'react'
import { AuthContext } from '../context'

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const login = event => {
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }
  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={login}>
            <MyInput type="text" placeholder="Login"/>
            <MyInput type="password" placeholder='Pass'/>
            <MyButton>Enter</MyButton>
        </form>
    </div>
  )
}

export default Login