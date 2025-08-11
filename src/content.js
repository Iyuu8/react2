import { FaTrashAlt } from "react-icons/fa";
import Form from './form'
const Content = ({itemStuff,handleDel,handleCheck,inputStuff})=>{
    const [items,setItems] = itemStuff;
    return (
        <main>
            <Form inputStuff={inputStuff} itemStuff={itemStuff}/>
            {items.length!==0? (
                <ul className="center">
                    {items.map((val)=>(
                        <li className="grocery-item">
                            <input 
                                type="checkbox" 
                                className="pointer"
                                onChange={()=>handleCheck(val.id)}
                                checked={val.checked}
                            />
                            <p 
                                className="align-center"
                                style={{
                                    textDecoration: val.checked? "line-through" : "none"
                                }}
                            >{val.title}</p>
                            <FaTrashAlt 
                                role="button" 
                                className="trash align-center pointer"
                                onClick={()=>handleDel(val.id)}
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="empty center">
                    <h1>The grocery list is empty</h1>
                </div>
                
            )}
        </main>
    )
}


export default Content;
