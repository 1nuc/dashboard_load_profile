
export const GetBuildings=async ()=>{
  try{

    const response=await fetch("http://localhost:8080/bldg");
    if (!response.ok){
      throw new Error("error in getting the resopnse");
    }
    else{
      const data= await response.json();
      console.log(data);
    }
  } 
  catch (err){
    throw new Error(err);
  }
};
