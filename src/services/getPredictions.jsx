export const GetPredictions=async ({setData, building, setIsLoading})=>{
  try{
    setIsLoading(true);
    const response=await fetch(`${import.meta.env.API_URL}/${building}`);
    if (!response.ok){
      throw new Error("error in getting the resopnse");
    }
    else{
      let data=await response.json();
      setData(data);
      setIsLoading(false);
    }
  } 
  catch (err){
    throw new Error(err);
  }
};

