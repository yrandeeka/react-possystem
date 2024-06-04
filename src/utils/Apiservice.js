import axios from "axios";
import config from "./Config";
import { useAuth } from "./AuthContext";

export function getAllData(url,jwtToken,setData) {
  
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

export function create(event,url,setData,data,inputObject,clearFields,setEdit) {
  event.preventDefault();

  axios
    .post(config.baseUrl+url, inputObject)
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

export function update(event,url,id,dataObject,clearFields,updateData,setEdit) {
  event.preventDefault();
  axios
    .put(config.baseUrl+url+"/"+id, dataObject)
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

export function deleteData(event, url,id,removeData) {
  event.preventDefault();
  axios
    .delete(config.baseUrl+url+"/"+ id)
    .then(function () {
      removeData(id);
    })
    .catch(function (error) {
      console.log(error);
    });
}