import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetBuildings } from '../../services/getBuilding'
import { UtilityView } from '../../pages/utility/utility'
// a function to get the buildings
let fetchBuidings=({userName, password, buildings, navigate})=>{
  if (userName != "crosscompute" || password != "222003"){
    //return error 
    alert("wrong username or password");
  }
  else{
    navigate('/utilityView', {state: {buildings} });
  }

}
// a pop up login function for the utility login 
function AdminLogin(props){

  const [userName, setUserName]= useState('');
  const [password, setPassword]= useState('');
  const navigate=useNavigate();
  return(
    <>
      {
        props.isOpen &&(
          <div className={`login-panel${props.isOpen?"-active": ""}`}>
              <button className="cancel-btn" onClick={()=> props.setIsOpen(x =>!x)}>cancel</button>
              <label> 
                <textarea className="username-label" 
                value={userName} 
                onChange={
                  (e)=> setUserName(e.target.value)
                } placeholder="username"/>
              </label>
              <label>
                <textarea className="password-label"
                value={password}
                onChange={
                  (e)=> setPassword(e.target.value)
                } placeholder="password"/>
              </label>
              <button className="login-btn"
                onClick={
                  ()=> fetchBuidings({userName, password, buildings: props.buildings, navigate})
                }>Login</button>
          </div>
        )
      }
    </>
  )
}

function checkBuilding(props){
  if (!props.buildings.includes(props.bldg_id)){
    alert(`${props.bldg_id} building does not exist`);
  }
  else{
    props.navigate('/dashboard', { state: {building: props.bldg_id} });
  }
}

export const HomePanel=() =>{
  const [buildings, setBuildings]=useState([]);
  const navigate=useNavigate();
  const [bldg_id, setBldg_id]=useState('');
  const [isOpen, setIsOpen]=useState(false);

  useEffect(()=>{
    async function fetchData(){
       await GetBuildings({setBuildings});
    }
    fetchData();
  }, []);
  return (
    <>
      <button className="btn-utility" onClick={()=> setIsOpen(x => !x)}> Login as utility
      </button>
      <AdminLogin isOpen={isOpen} setIsOpen={setIsOpen} buildings={buildings}/>
      <div className="input-card">
            <label className="input-label">
                 <textarea className="bldg-id" value={bldg_id} onChange={(e)=> setBldg_id(e.target.value)} 
        placeholder='Enter your building ID, ex. 171237'/>
            </label>
            <button onClick={()=>checkBuilding({buildings, bldg_id, navigate})}> Search </button>
      </div>
    </>
  )
};
