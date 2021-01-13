import React from 'react'
import './Chat.css'
import Avatar from '@material-ui/core/Avatar'


function Chat({message, key}) {
    const content = String(message.content).substring(0, 25)
    const user_name = String(message.user_name).substring(0, 10)
    
    return (
        <div>
            <div className="chat">
                <Avatar/>
                <div className="chat_body">
                    <div className="chat_bodyName">{user_name}</div> 
                    <div className="chat_bodyContent">{content}</div>   
                </div>
                <div className="chat_timestamp">
                    {message.timestamp}
                </div>
            </div>
        </div>
    )
}

export default Chat
