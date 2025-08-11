import Content from "./content"
import { useEffect, useState} from "react";
function App() {
  const [items,setItems]= useState(
    localStorage.getItem("items")? JSON.parse(localStorage.getItem("items")):[]
  );
  useEffect(()=>{
    localStorage.setItem("items",JSON.stringify(items));
  },[items])
  const [input,setInput] = useState('');
  const handleDel = (id)=>{
    setItems(items.filter(val=> val.id!==id));
  }
  const handleCheck = (id)=>{
    setItems(items.map(val=> val.id===id? {...val,checked:!val.checked} : val))
  }
  const x =new Date();
  return (
    <div className="App">
      <header className="center">
        Grocery list
      </header>

      <Content 
        itemStuff={[items,setItems]} 
        handleDel={handleDel} 
        handleCheck={handleCheck}
        inputStuff = {[input,setInput]}
      />

      <footer className="center"> 
        copyright &copy; {x.getFullYear()}
      </footer>
    </div>
  );
}

export default App;
