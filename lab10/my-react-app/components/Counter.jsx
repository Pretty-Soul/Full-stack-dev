import { useState } from "react";
import React from 'react'

const Counter = () => {
    const[count,setCount]=useState(0);
  return (
    <button onClick={()=>setCount(count+1)}>clicked {count} times</button>
  )
}

export default Counter