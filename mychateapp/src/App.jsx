import socketIO from "socket.io-client"
import './App.css';
import {BrowserRouter,Routes,Route } from "react-router-dom";
import Join from "./Component/Join";
import Chat from "./Component/Chat";
function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Join/>}/>
        <Route path="/chat" element={<Chat/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
