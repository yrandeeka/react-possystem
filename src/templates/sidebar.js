import { Link } from "react-router-dom";
import "../App.css";
import { SidebarData } from "./sidebarData";
import config from "../utils/Config";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        {SidebarData.map((val, key) => {
          return (
            <li className="row">
              <div>{val.icon}</div>
              <Link to={val.link}>{val.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
