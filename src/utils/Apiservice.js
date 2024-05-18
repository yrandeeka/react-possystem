import axios from "axios";
import config from "./Config";

export function getAllData(url,setData) {
  
    axios
    .get(config.baseUrl+url)
    .then(function (response) {
      setData(response.data);   
    })
    .catch(function (error) {
      console.log("error-", error);
    });
}

export function create(event,url,setData,data,dataObject,clearFields,setEdit) {
  event.preventDefault();

  axios
    .post(config.baseUrl+url, dataObject)
    .then(function (response) {
      clearFields();
      setData([...data,response.data])
      setEdit(null);
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