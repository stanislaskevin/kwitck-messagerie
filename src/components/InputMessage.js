import React, {useState} from 'react'
import './InputMessage.css'
import {useStateValue} from '../StateProvider'
import axios from '../axios';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import PhotoCameraOutlinedIcon from '@material-ui/icons/PhotoCameraOutlined';
import MicNoneOutlinedIcon from '@material-ui/icons/MicNoneOutlined';

export default function InputMessage() {
    const [{user}, dispatch] = useStateValue()
    const [input, setInput] = useState('')

    const sendmessage = async (e) => {
        e.preventDefault()

        await axios.get(`/say/${user.token}/${user.id}/${input}`)
            setInput('')
    }
    return (
        <div className="inputMessage">
            <div className="inputMessage_left">
                <AddOutlinedIcon/>
            </div>
            <form>
                <input value={input} onChange={e => setInput(e.target.value)} placeholder="tape message" type="text" />
                <button onClick={sendmessage} type="submit">Envoyer</button>
            </form>
            <div className="inputMessage_right">
                <PhotoCameraOutlinedIcon style={{marginLeft: 1+"em"}}/>
                <MicNoneOutlinedIcon style={{marginLeft: 1+"em"}}/>
            </div>
        </div>
    )
}
