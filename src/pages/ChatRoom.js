import React, {useState, useEffect} from 'react'
import './Chatroom.css'
import { useAuth } from "../context/auth";
import Chat from '../components/Chat'
import Logged from '../components/Logged'
import InputMessage from '../components/InputMessage'
import {useStateValue} from '../StateProvider'
import axios from '../axios';
import { Redirect } from 'react-router-dom';

function ChatRoom(props) {
    const { setAuthTokens } = useAuth();
    const [{user}, dispatch] = useStateValue()
    const [messages, setMessages] = useState([])
    const [ userLogged, setUserLogged] = useState([])

    useEffect(() => {
        axios.get(`/talk/list/${user.token}/0`)
            .then(response => {
            console.log(response.data.result.talk)
            setMessages(response.data.result.talk)
        })
        .catch(error => {
            alert(error.message)
        })
    }, [])

    useEffect(() => {       
        axios.get(`/user/logged/${user.token}`)
        .then(response => {
            console.log(response.data)
            setUserLogged(response.data.result.user)
        })
    }, [])

    function logOut() {
        setAuthTokens();
    }

    return (
        <div className="chatroom">
            <div className="chatroom_button">
                <h1>Chatroom</h1>
                <button onClick={logOut}>Log out</button>
            </div>
            <div className="chatroom_userLogged">
                {userLogged.map((user_name, key) => <Logged username={user_name} key={key}/>)}
            </div>
            {messages.map((messages, key) => <Chat message={messages} key={key}/>)}
            <InputMessage/>
        </div>
    )
}

export default ChatRoom
