import axios from 'axios'

const instance = 
    axios.create({
        baseURL : `http://greenvelvet.alwaysdata.net/kwick/api`,
})

export default instance