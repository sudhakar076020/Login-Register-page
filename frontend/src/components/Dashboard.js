import "./dashboard.css";

import { FaHome, FaChartBar, FaCrown, FaUser, FaCog } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
const username = "Sudhakar";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <nav className="navbar-container">
        <div className="nav-logo">{username.slice(0, 1)}</div>
      </nav>
    </div>
  );
};

export default Dashboard;
