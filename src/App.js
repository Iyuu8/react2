import apiRequest from "./apiRequest";
import Content from "./content"
import { useEffect, useState} from "react";
function App() {
  const apiUrl = "http://localhost:3500/items";
  const [items,setItems]= useState([]);
  const [input,setInput] = useState('');
  const [fetchErr,setFetchErr] = useState(null);
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    const fetchItems = async ()=>{
      try{
        const response = await fetch(apiUrl);
        if(!response.ok) throw Error("didn't receive expected data");
        const listItems = await response.json();
        setFetchErr(null);
        setItems(listItems);
      }catch(err){
        setFetchErr(err.message);
      }finally{
        setLoading(false);
      }
    }
    setTimeout(()=>{
      (async() => await fetchItems())();
    }, 100);
    
  }, [])
  
  const handleDel = async (id)=>{
    const updatedItems = items.filter(val=> val.id!==id)
    setItems(updatedItems);
    
    const delOptions = {
      method:'DELETE',
      headers:{
        'Content-Type':'application/json'
      }
    }
    const reqUrl = `${apiUrl}/${id}`;
    const result = await apiRequest(reqUrl,delOptions);
    if(result) setFetchErr(result);
  }
  const handleCheck = async (id)=>{
    const updatedItems = items.map(val=> val.id===id? {...val,checked:!val.checked} : val);
    setItems(updatedItems);
    const item = updatedItems.filter(val=>val.id===id);
    const updateOptions = {
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({checked:item[0].checked})
    }
    const reqUrl = `${apiUrl}/${id}`;
    const result = await apiRequest(reqUrl,updateOptions);
    if(result) setFetchErr(result);
  }
  const x =new Date();
  return (
    <div className="App">
      <header className="center">
        Grocery list
      </header>
      <main style={(fetchErr || loading)? {justifyContent:"center"} : undefined}>
        {loading && <h2 style={{color:"var(--text-color)"}}>Loading...</h2>}
        {fetchErr && <h3 style={{color:"red"}}>{`Error: ${fetchErr}`}</h3>}
        {!(fetchErr || loading ) && 
        <Content 
          itemStuff={[items,setItems]} 
          handleDel={handleDel} 
          handleCheck={handleCheck}
          inputStuff = {[input,setInput]}
          apiUrl = {apiUrl}
          errStuff = {[fetchErr,setFetchErr]}
        />}
      </main>

      <footer className="center"> 
        copyright &copy; {x.getFullYear()}
      </footer>
    </div>
  );
}

export default App;
