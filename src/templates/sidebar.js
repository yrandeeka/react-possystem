import { Link, NavLink } from "react-router-dom";
import "../App.css";
import { SidebarData } from "./sidebarData";
import config from "../utils/Config";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { useContext, useState } from "react";
import { AppContext } from "../utils/AppContext";
import LogoutIcon from '@mui/icons-material/Logout';

function Sidebar({ children }) {

  const [isOpen,setIsOpen]=useState(false);
  const toggle=()=>setIsOpen(!isOpen);

  const appContext=useContext(AppContext);
  const {state,setState}=appContext;

  function logout() {
    setState((prevState)=>({
      ...prevState,
      jwtToken:null,
      isAuthenticated:false,
      user:null
  }))
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("userId");
  }
  return (
    <div className="sidebarcontainer">
      <div style={{width:isOpen?"200px":"50px"}} className="sidebar">
        <div className="top_section">
          <div style={{marginLeft:isOpen?"150px":"0px"}} className="bars">
              <DensityMediumIcon onClick={toggle}/>
          </div>
        </div>
      {SidebarData.map((val, key) => {
          return (
            <NavLink
              id={key}
              className="link"
              to={val.link}
              activeclassName="active"
            >
              <div className="icon">{val.icon}</div>
              <div style={{display:isOpen?"block":"none"}} className="link_text">{val.title}</div>
            </NavLink>
          );
        })}

       <button style={{display:isOpen?"block":"none"}} className="logoutBtn" onClick={logout}>Log Out</button>
        {!isOpen && <LogoutIcon style={{color:"white",alignSelf: 'flex-end'}} onClick={logout}/>}
      </div>

      <main style={{marginLeft:isOpen?'250px':'50px'}}>{children}</main>
    </div>
  );
}

export default Sidebar;
