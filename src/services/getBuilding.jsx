
export const GetBuildings=async ({setBuildings})=>{
  try{

    const response=await fetch(`${import.meta.env.VITE_API_URL}/bldg`);
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
