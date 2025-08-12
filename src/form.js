import apiRequest from "./apiRequest";


import { FaPlus } from "react-icons/fa";
const Form = ({inputStuff,itemStuff,apiUrl,errStuff})=>{
    const [items,setItems] = itemStuff;
    const [input,setInput] = inputStuff;
    const [fetchErr,setFetchErr] = errStuff;
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const newItem = {
            title:input,
            checked:false
        };
        const postOptions = {
            method:"POST",
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(newItem)
        }
        setInput('');
        const result=null;
        try{
            const respone = await fetch(apiUrl,postOptions);
            if(!respone.ok) throw Error('shut the fuck up!');
            const savedItem = await respone.json();
            setItems([...items,savedItem]);
        }catch(err){
            result = err.message;
        }


        if(result) setFetchErr(result);
    } 
    return(
        <form 
            action="submit" 
            onSubmit={handleSubmit}
            className="input-form"
        >
            <input 
                type="text"
                id="add-item"
                placeholder="Enter a New Item"
                required
                value={input}
                onChange={e=> setInput(e.target.value)}
            />
            <label htmlFor="add-item">Add Item</label>
            <button
                aria-label="add Item"
                className="center pointer"
            ><FaPlus/></button>
        </form>
    )
}

export default Form;