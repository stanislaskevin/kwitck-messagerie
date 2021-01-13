import axios from 'axios'
import React, {useState} from 'react'
import './Login.css'
import {Link, Redirect} from 'react-router-dom'
import { useAuth } from "../context/auth";
import {useStateValue} from '../StateProvider'
import { actionTypes } from '../Reducer'


function Login(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoggedIn, setLoggedIn] = useState(false)
    const [isError, setIsError] = useState(false)
    const { setAuthTokens } = useAuth();
    const[state, dispatch] = useStateValue()

    let referer;
    if(props.location.state !== undefined) {
        referer = props.location.state.referer;
    } else {
        referer = "/chatroom";
    }

    const postLogin = (e) => {
        e.preventDefault()
        axios.get(`http://greenvelvet.alwaysdata.net/kwick/api/login/${username}/${password}`)
        .then(result => {
            if (result.status === 200) {
                setAuthTokens(result.data.result.token);
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.data.result,
                })
                setLoggedIn(true)             
            } else {
                setIsError(true);
            }           
        })
        .catch((error) => {
            alert(error.message)
            setIsError(true)
        })
    }
    
    if (isLoggedIn) {
        return <Redirect to={referer} />;
    }
    
    
    return (
        <div className="login">
            <h1>Connectez-vous</h1>
            <form>
                <input 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}                  
                    placeholder="username" 
                    type="text"
                />
                <input 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}                
                    placeholder="password" 
                    type="password"
                />
                <button onClick={postLogin}>Envoyer</button>
            </form>
            <Link className="login_signup" to="/signup">Vous n'avez pas de compte ?</Link>
            {isError &&<p className="login_error">Identifiant ou mot de passe éronnés </p>}
        </div>
    )
}

export default Login
