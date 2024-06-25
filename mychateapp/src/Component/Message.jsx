import React from 'react';
import '../Style/message.css'
const Message = ({user,message,classs}) => {
    console.log(user);
    if(user){
        return ( 
            <div className={`messageBox ${classs}`}>
                {`${user}: ${message}`}
            </div>
             );
    }else{
    return ( 
    <div className={`messageBox ${classs}`}>
        {`You: ${message}`}
    </div>
     );
    }
}
 
export default Message;