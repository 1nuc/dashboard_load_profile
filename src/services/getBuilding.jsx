
export const GetBuildings=async ()=>{
  try{

    const response=await fetch("http://localhost:8080/bldg");
    if (!response.ok){
      throw new Error("error in getting the resopnse");
    }
    else{
      response.then((data)=> data.json())
      .then((data)=> {
        console.log(data);
      });
    }
  } 
  catch (err){
    throw new Error(err);
  }
};
