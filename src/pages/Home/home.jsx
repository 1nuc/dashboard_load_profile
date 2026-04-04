import { useState } from 'react'

export const HomePanel=() =>{
  const [bldg_id, setBldg_id]=useState(null);
  return (
    <div className="input-card">
          <label className="input-label">
               <textarea className="bldg-id" value={bldg_id} onChange={(e)=> setBldg_id(e.target.value)} 
      placeholder='Enter your building ID, ex. 171237'/>
          </label>
          <button> Search </button>
    </div>
  )
};
