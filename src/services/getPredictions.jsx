export const GetBuildings=async ({setBuildings})=>{
  try{

    const response=await fetch("http://localhost:8080/bldg");
    if (!response.ok){
      throw new Error("error in getting the resopnse");
    }
    else{
      let data=await response.json();
      setBuildings(data);
    }
  } 
  catch (err){
    throw new Error(err);
  }
};

