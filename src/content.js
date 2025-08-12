import { FaTrashAlt } from "react-icons/fa";
import Form from './form'
const Content = ({itemStuff,handleDel,handleCheck,inputStuff,apiUrl,errStuff})=>{
    const [items,setItems] = itemStuff;
    return (
        <>
            <Form 
                inputStuff={inputStuff} 
                itemStuff={itemStuff}
                apiUrl={apiUrl}
                errStuff = {errStuff}
            />
            {items.length!==0? (
                <ul className="center">
                    {items.map((val)=>(
                        <li className="grocery-item" key={val.id}>
                            <div className="check-container">
                                <input 
                                    type="checkbox" 
                                    className="pointer"
                                    onChange={async ()=> await handleCheck(val.id)}
                                    checked={val.checked}
                                />
                            </div>
                            <p 
                                className="align-center"
                                style={{
                                    textDecoration: val.checked? "line-through" : "none"
                                }}
                            >{val.title}</p>
                            <div className="trash-container">
                                <FaTrashAlt 
                                    role="button" 
                                    className="trash align-center pointer"
                                    onClick={async ()=> await handleDel(val.id)}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="empty center">
                    <h1 className="empty-notice">The grocery list is empty</h1>
                </div>
                
            )}
        </>
    )
}


export default Content;
