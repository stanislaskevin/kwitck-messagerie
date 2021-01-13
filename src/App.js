import React, {useState} from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute';
import Login from './pages/Login'
import Signup from './pages/Signup'
import ChatRoom from './pages/ChatRoom'
import { AuthContext } from "./context/auth";



function App() {
  
  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens}}>
      <Router>
        <div className="app">
          <Switch>
              <PrivateRoute path="/chatroom" component={ChatRoom}/>
              <Route path="/signup" component={Signup} /> 
              <Route path="/" component={Login} />   
          </Switch>  
        </div>     
      </Router>
    </AuthContext.Provider>
  )
}

export default App
