function Greetings(props){
    const name=props.name
    if(name)

        return <h1>{name}</h1>
        
    return<h1>Hello world</h1>
}

export default Greetings