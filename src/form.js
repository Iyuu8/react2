import { FaPlus } from "react-icons/fa";
const Form = ({inputStuff,itemStuff})=>{
    const [items,setItems] = itemStuff;
    const [input,setInput] = inputStuff;
    const handleSubmit = (e)=>{
        e.preventDefault();
        setItems([...items,{
            id:Date.now(),
            title:input,
            checked:false
        }])
        setInput('');
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