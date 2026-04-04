import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// a pop up login function for the utility login 
function adminLogin(props){

  const [userName, setUserName]= useState(null);
  const [password, usePassowrd]= useState(null);
  return(
    <>
      {
        props.isOpen &&(
          <div className="login-panel">
              <label className="username-label"> 
                <textarea value value={userName} onChange={(e)=> setUserName(e.target.value)} placeholder="username"/>
              </label>
              <label className="password-label"> 
                <textarea value value={passowrd} onChange={(e)=> setPassowrd(e.target.value)} placeholder="username"/>
              </label>
          </div>
        )
      }
    </>
  )
}

export const HomePanel=() =>{
  const navigate=useNavigate();
  const [bldg_id, setBldg_id]=useState(null);
  return (
    <>
      <button className="btn-utility"> Login as utility
      </button>
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
