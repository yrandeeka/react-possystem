import axios from "axios";
import config from "./Config";

export function getAllData(url,jwtToken,setData) {
  
  console.log("jwtToken=",jwtToken);
  
  const authConfig={
    headers:{
      Authorization:`Bearer ${jwtToken}`
    }
  }
    axios
    .get(config.baseUrl+url,authConfig)
    .then(function (response) {
      setData(response.data);   
    })
    .catch(function (error) {
      console.log("error-", error);
    });
}

export function create(event,url,jwtToken,setData,data,inputObject,clearFields,setEdit) {
  event.preventDefault();

  const authConfig={
    headers:{
      Authorization:`Bearer ${jwtToken}`
    }
  }

  axios
    .post(config.baseUrl+url, inputObject,authConfig)
    .then(function (response) {
      clearFields();
      setData([...data,response.data])
      if (setEdit!==null) {
        setEdit(null);
      }
        
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function update(event,url,id,jwtToken,dataObject,clearFields,updateData,setEdit) {
  event.preventDefault();

  const authConfig={
    headers:{
      Authorization:`Bearer ${jwtToken}`
    }
  }
  axios
    .put(config.baseUrl+url+"/"+id, dataObject,authConfig)
    .then(function (response) {
      console.log(url,response.data);
      clearFields();
      updateData(response.data);
      setEdit(null);
    })
    .catch(function (error) {
      console.log(error);
    });
}

export function deleteData(event, url,id,jwtToken,removeData) {
  event.preventDefault();

  const authConfig={
    headers:{
      Authorization:`Bearer ${jwtToken}`
    }
  }
  axios
    .delete(config.baseUrl+url+"/"+ id,authConfig)
    .then(function () {
      removeData(id);
    })
    .catch(function (error) {
      console.log(error);
    });
}