import React, {useState}  from 'react'
import './Signup.css'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'

function Signup() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [newUser, setNewUser] = useState(false)
    const [isError, setIsError] = useState(false)

    
    const postSignup = (e) => {
        e.preventDefault()

        axios.get(`http://greenvelvet.alwaysdata.net/kwick/api/signup/${username}/${password}`)
        .then(response => {
            if(response.status === 200) {
                setNewUser(true)
                console.log(response.data)
            } else {
                setIsError(true)
            }})
            .catch((error) => {
                alert(error.message)
                setIsError(true)
            })
    }

    if (newUser) {
        return <Redirect to='/' />;
    }
    return (
        <div className="signup">
            <h1>Enregistrez-vous</h1>
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
                <button onClick={postSignup}>Envoyer</button>
            </form>
            <Link className="signup_login" to="/login">Vous avez  un compte ?</Link>
            {isError &&<p className="signup_error">Mauvaises informations!!</p>}
        </div>
    )
}

export default Signup
