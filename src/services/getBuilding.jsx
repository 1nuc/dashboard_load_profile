export function getBuildings(props){
  fetch("localhost:8000/bldg")
    .then((data)=> data.json())
    .then((data)=> {
      console.log(data);
    });
};
