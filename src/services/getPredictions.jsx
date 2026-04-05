export const GetPredictions=async ({setData, building})=>{
  try{
    console.log(building);
    const response=await fetch(`http://localhost:8080/predictions/${building}`);
    console.log(response.json);
    if (!response.ok){
      throw new Error("error in getting the resopnse");
    }
    else{
      let data=await response.json();
      setData(data);
    }
  } 
  catch (err){
    throw new Error(err);
  }
};

