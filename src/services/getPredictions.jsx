export const GetPredictions=async ({setData, building, setIsLoading})=>{
  try{
    setIsLoading(true);
    const response=await fetch(`http://localhost:8080/predictions/${building}`);
    if (!response.ok){
      throw new Error("error in getting the resopnse");
    }
    else{
      let data=await response.json();
      setData(data[0]);
      setIsLoading(false);
    }
  } 
  catch (err){
    throw new Error(err);
  }
};

