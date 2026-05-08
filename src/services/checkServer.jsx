export const checkServer=async ({setStatus})=>{
  try{
    setStatus(false);
    const response=await fetch(`${import.meta.env.API_URL}`);
    if (!response.ok){
      throw new Error("error in getting the resopnse");
    }
    else{
      let msg=await response.json();
      setStatus(true);
    }
  } 
  catch (err){
    setStatus(false);
    console.log(err);
  }
};

