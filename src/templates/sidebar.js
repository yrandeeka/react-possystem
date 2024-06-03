import { Link, NavLink } from "react-router-dom";
import "../App.css";
import { SidebarData } from "./sidebarData";
import config from "../utils/Config";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import { useState } from "react";

function Sidebar({ children }) {

  const [isOpen,setIsOpen]=useState(false);
  const toggle=()=>setIsOpen(!isOpen);
  return (
    <div className="container">
      <div style={{width:isOpen?"300px":"50px"}} className="sidebar">
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
      </div>

        

      <main>{children}</main>
    </div>
  );
}

export default Sidebar;
