import axios from "axios";
import { useState } from "react";
import config from "../utils/Config";
import { useAuth } from "../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const Login=()=>{

    const contextData=useAuth();//to use useAuth hook
    const navigate=useNavigate();

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    function handleLogin(e) {
        e.preventDefault();

        const data={
            username:username,
            password:password
        }

        axios.post(config.baseUrl+"auth/login",data)
        .then(function (response) {
            console.log(response);
            contextData.login(response.data)
            // login(response.data);
            if (response.data!=="") {
                navigate("/");
            }
            else{
                navigate("/login");
            }
                
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    return(
        <div>
              <center> <h1> POS System - Login Page </h1> </center>
              <form onSubmit={handleLogin}>
                <div className="container">
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required
                    onChange={(e)=>setUsername(e.target.value)}/>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required
                    onChange={(e)=>setPassword(e.target.value)}/>
                    <button type="submit">Login</button>
                </div>  
              </form>   
        </div>
    )
}

export default Login;