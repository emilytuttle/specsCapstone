import {useState, useContext} from 'react'
import axios from 'axios'

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
        <main>
            <h1>Welcome!</h1>
            <form className='form auth-form' onSubmit={submitHandler}>
                  {register && (<input 
                      type='text' 
                      placeholder='email' 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className='form-input'/>)}
                  <input 
                    type='text' 
                    placeholder='username' 
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className='form-input'/>
                <input 
                    type='password' 
                    placeholder='password' 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className='form-input'/>
                <button className='form-btn'>
                    {register ? 'Sign Up' : 'Login'}
                </button>
            </form>
            <button className='form-btn' onClick={() => setRegister(!register)}>
                Need to {register ? 'Login' : 'Sign Up'}?
            </button>
        </main>
    )
}

export default Auth