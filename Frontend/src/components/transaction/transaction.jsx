import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Transaction() {
    const [transactionHash, setTransactionHash] = useState('');
const nav = useNavigate();
  useEffect(() => {
    // Generate a random hash when the page loads
    const hash = '0x' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setTransactionHash(hash); // Set the generated hash to state
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div >
        
        <h1> your transaction is successful
          <br/> transaction no  :     {transactionHash} </h1>
        <br/>
        <h6> invoice will be sent on your registered email ! </h6>
<br/>




        <button onClick={()=>nav("/customer")} className="btn btn-success" style={{justifyItems:"center"}}> go back to main menu</button>
        </div>
        

    
  )
}

export default Transaction