import React,{useState,useEffect} from 'react'
import Board from './Board';
import { Window, MessageList, MessageInput } from "stream-chat-react";
import "./Chat.css";
function Game({channel,setChannel}) {
    const [playersJoined, setPlayersJoined] = useState(
        channel.state.watcher_count === 2
      );
      const [result, setResult] = useState({ winner: "none", state: "none" });
      useEffect(()=>{
        if(result.winner != "none"){
         alert("Winner is "+result.winner);
        }
     },[result])
      channel.on("user.watching.start", (event) => {
        setPlayersJoined(event.watcher_count === 2);
      });
      if (!playersJoined) {
        return <div> Waiting for other player to join...</div>;
      }
      
      return (<div className='gameContainer'><Board result={result} setResult={setResult} />
      <Window>
        <MessageList
          disableDateSeparator
          closeReactionSelectorOnClick
          hideDeletedMessages
          messageActions={["react"]}
        />
        <MessageInput noFiles />
      </Window>
      <button
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}
      >
        {" "}
        Leave Game
      </button>
  
      </div>)
}

export default Game
