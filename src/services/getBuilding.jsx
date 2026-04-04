
export const GetBuildings=async (props)=>{
  try{

    const response=await fetch("http://localhost:8080/bldg");
    if (!response.ok){
      throw new Error("error in getting the resopnse");
    }
    else{
      props.setBuildings(response.json());
    }
  } 
  catch (err){
    throw new Error(err);
  }
};
