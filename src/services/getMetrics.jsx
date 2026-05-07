export const getMetrics=async ({setMetricsReq, setIsLoading})=>{
  try{

    setIsLoading(true);
    const response=await fetch("http://localhost:8080/metrics");
    if (!response.ok){
      throw new Error("error in getting the resopnse");
    }
    else{
      let metrics=await response.json();
      setMetricsReq(metrics);
      setIsLoading(false);
    }
  } 
  catch (err){
    throw new Error(err);
  }
};
