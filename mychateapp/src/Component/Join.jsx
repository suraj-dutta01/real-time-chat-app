
import { useState } from 'react';
import '../Style/join.css'
import logo from '../image/logo.png'
import { Link } from 'react-router-dom';
let user;
const setUser=()=>{
    user= document.getElementById("nameInp").value
    console.log(user);
     document.getElementById("nameInp").value=""
  }
const Join = () => {
    let[name,setName]=useState("")
    
    return ( 
        <div className="joinpage">
            <div className="joinchat">
                <img src={logo} alt="logo" />
             <h1>CHAT APP</h1>
             <input onChange={(e)=>{setName(e.target.value)}} id='nameInp' type="text"  placeholder='Enter the name'/>  
             <Link onClick={(e)=>!name ?e.preventDefault():null} to='/chat'><button onClick={setUser} id='but'>Log In</button></Link> 
            </div> 
        </div>
     );
}

export default Join;
export {user};