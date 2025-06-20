import Login from './components/Login';
import SignUp from './components/SignUp';
import './App.css';
import { StreamChat } from "stream-chat";
import {Chat} from "stream-chat-react";
import Cookies from "universal-cookie";
import { useState } from 'react';
import JoinGame from './components/JoinGame';
function App() {
  const api_key="u42e4f5svqkk";
  const cookies = new Cookies();
  const client=StreamChat.getInstance(api_key);
  const token = cookies.get("token");
  const [isAuth,setIsAuth]=useState(false);
  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };
  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
       setIsAuth(true);
      });
    }
  return (
    <div className="App">
       {isAuth ? (
        <Chat client={client}>
        <JoinGame />
        <button onClick={logOut}>Log Out</button>
        </Chat>
        
      ) : (
        <>
          <SignUp setIsAuth={setIAuth} />
          <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  );
}

export default App;
