import axios from "axios";
import { useContext, useState } from "react";
import config from "../utils/Config";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../utils/AppContext";

const Login=()=>{

    //const contextData=useAuth();//to use useAuth hook
    const navigate=useNavigate();

    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    const appContext=useContext(AppContext);
    const {state,setState}=appContext;

    function handleLogin(e) {
        e.preventDefault();

        const data={
            username:username,
            password:password
        }

        axios.post(config.baseUrl+"auth/login",data)
        .then(function (response) {
            console.log(response);

            if (response.data!=="") {
                setState((prevState)=>({
                    ...prevState,
                    jwtToken:response.data.jwtToken,
                    isAuthenticated:true,
                    user:response.data.user
                }))
                localStorage.setItem("jwtToken",response.data.jwtToken);
                localStorage.setItem("userId",response.data.user.id);
            }
            else{
                setState((prevState)=>({
                    ...prevState,
                    isAuthenticated:false
                }))
            }
                
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    return(
        <div className="login">
              <center> <h1> POS System - Welcome! </h1> </center>
              <form className="loginForm" onSubmit={handleLogin}>
                <div className="loginContainer">
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required
                    onChange={(e)=>setUsername(e.target.value)}/>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required
                    onChange={(e)=>setPassword(e.target.value)}/><br/>
                    <button className="loginbtn" type="submit">Login</button>
                </div>  
              </form>   
        </div>
    )
}

export default Login;