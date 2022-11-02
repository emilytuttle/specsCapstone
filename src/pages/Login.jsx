import {useState, useContext} from 'react'
import axios from 'axios'
import classes from '../styling/Login.module.css'

import AuthContext from '../store/authContext'

const Auth = () => {
    const [register, setRegister] = useState(true)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const authCtx = useContext(AuthContext)

    const submitHandler = e => {
        e.preventDefault()


        const body = {
            email,
            username,
            password
        }

        const url = 'http://localhost:3000'

        axios.post(register ? `${url}/register` : `${url}/login`, body)
            .then((res) => {
                console.log('AFTER AUTH', res.data)
                authCtx.login(res.data.token, res.data.exp, res.data.userId)
                setPassword('')
                setUsername('')
                setEmail('')
            })
            .catch(err => {
                console.log(err)
                setPassword('')
                setUsername('')
            })
    }

    return (
        <div className={classes.login}>
            <div className={classes.left}></div>
            <div className={classes.right}>
                <div className={classes.formContainer}>
                    <h1 className={classes.welcome}>Welcome!</h1>
                    <form className='form auth-form' onSubmit={submitHandler}>
                        {register && (<input 
                            type='text' 
                            placeholder='Email' 
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className='form-input'/>)}
                        <input 
                            type='text' 
                            placeholder='Username' 
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className='form-input'/>
                        <input 
                            type='password' 
                            placeholder='Password' 
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className='form-input'/>
                        <button className='form-btn'>
                            {register ? 'Sign Up' : 'Login'}
                        </button>
                    </form>
                    <p>{!register ? 'Need a new account?' : 'Already have an account?'}</p>
                    <button className='form-btn' onClick={() => setRegister(!register)}>
                        {register ? 'Sign in' : 'Sign Up'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Auth