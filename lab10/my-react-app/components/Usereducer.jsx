import React from 'react'
import { useReducer } from 'react'
function reducer(state,action){
    switch(action.type){
        case "Increment":return{count:state.count+1,operation:"increment"}
        case "Decrement":return{count:state.count-1,operation:"decrement"}
        default:return state
    }
}

const Usereducer = () => {

const [state, dispatch] = useReducer(reducer, { count: 0 }); 
    
return<>
<button onClick={()=>dispatch({type:"Increment"})}>+</button>
{state.count}
<button onClick={()=>dispatch({type:"Decrement"})}>-</button>
</>

}

export default Usereducer