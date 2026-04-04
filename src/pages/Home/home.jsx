import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetBuildings } from '../../services/getBuilding'
import { UtilityView } from '../../pages/utility/utility'
// a function to get the buildings
let FetchBuidings=(props, setBuildings)=>{
  if (props.userName != "crosscompute" || props.password != "222003"){
    //return error 
    alert("wrong username or password");
  }
  else{
    GetBuildings({setBuildings});
    return (
      <>
        <UtilityView buildings={props.buildings}/>
      </>
    )
  }

}
// a pop up login function for the utility login 
function AdminLogin(props){

  const [userName, setUserName]= useState('');
  const [password, setPassword]= useState('');
  const [buildings, setBuildings]=useState("");
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
              <button className="login-btn"
                onClick={
                  ()=> FetchBuidings({userName,password, buildings, setBuildings})
                }>Login</button>
              </label>
          </div>
        )
      }
    </>
  )
}

export const HomePanel=() =>{
  const navigate=useNavigate();
  const [bldg_id, setBldg_id]=useState('');
  const [isOpen, setIsOpen]=useState(false);
  return (
    <>
      <button className="btn-utility" onClick={()=> setIsOpen(x => !x)}> Login as utility
      </button>
      <AdminLogin isOpen={isOpen} setIsOpen={setIsOpen}/>
      <div className="input-card">
            <label className="input-label">
                 <textarea className="bldg-id" value={bldg_id} onChange={(e)=> setBldg_id(e.target.value)} 
        placeholder='Enter your building ID, ex. 171237'/>
            </label>
            <button onClick={()=>navigate('/dashboard')}> Search </button>
      </div>
    </>
  )
};
