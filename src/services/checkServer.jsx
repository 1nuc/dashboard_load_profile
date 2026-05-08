export const checkServer=async ({setStatus})=>{
  try{
    setStatus(false);
    const response=await fetch("http://localhost:8080/");
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

