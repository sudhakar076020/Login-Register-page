import "./dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { FiUser } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";

// Sample recent activities
const recentActivities = [
  {
    id: uuidv4(),
    activity: "Michael Smith started a new project on the backend.",
    date: "2 hours ago",
  },
  {
    id: uuidv4(),
    activity: "Emily Davis updated the design for the landing page.",
    date: "5 hours ago",
  },
  {
    id: uuidv4(),
    activity: "Sarah Johnson reviewed the latest API changes.",
    date: "1 day ago",
  },
  {
    id: uuidv4(),
    activity: "Daniel Roberts fixed a critical bug in the login module.",
    date: "2 days ago",
  },
  {
    id: uuidv4(),
    activity: "Sophia Lee created a new project roadmap.",
    date: "3 days ago",
  },
];

// Sample project statistics
const projectStats = [
  {
    id: 1,
    title: "Projects",
    number: Math.floor(Math.random() * 100),
    icon: <IoMdNotificationsOutline />,
  },
  {
    id: 2,
    title: "Tasks",
    number: Math.floor(Math.random() * 100),
    icon: <AiOutlineSetting />,
  },
  {
    id: 3,
    title: "Completed",
    number: Math.floor(Math.random() * 100),
    icon: <FiUser />,
  },
  {
    id: 4,
    title: "Pending",
    number: Math.floor(Math.random() * 100) - 15,
    icon: <IoLogOutOutline />,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({}); // empty object to avoid charAt error

  // Logout handler
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (response.ok) navigate("/login");
      else console.error("Logout failed");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch("http://localhost:3000/dashboard", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json(); // parse JSON
          setUser(data.message || {}); // safely set user
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        navigate("/login");
      }
    };
    fetchDashboard();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar-container">
        <h2 className="nav-logo">Dashboard</h2>
        <div className="navbar-right">
          <div className="nav-profile-card">
            <button
              type="button"
              className="logout-btn-lg"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              type="button"
              className="logout-btn-sm"
              onClick={handleLogout}
            >
              <IoLogOutOutline className="logout-icon" />
            </button>
          </div>
        </div>
      </nav>

      <div className="status-profile-grid">
        {/* Profile Card */}
        <div className="profile-card">
          <h3>My Profile</h3>
          <div className="profile-info">
            <div className="profile-avatar">
              {user?.username ? user.username.slice(0, 1).toUpperCase() : "U"}
            </div>
            <div>
              <p className="username">{user?.username || "Username"}</p>
              <p className="email">{user?.email || "email@example.com"}</p>
            </div>
          </div>
          <div className="profile-details">
            <div>
              <p>Role</p>
              <p>{user?.role || "User"}</p>
            </div>
            <div>
              <p>Last Login</p>
              <p>{user?.lastLogin || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Project Stats */}
        <div className="project-status">
          {projectStats.map((item) => (
            <div key={item.id} className="stat-card">
              <div>
                <h4>{item.title}</h4>
                <p>{item.number}</p>
              </div>
              <div className="stat-icon">{item.icon}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <ul>
          {recentActivities.map((act) => (
            <li key={act.id}>
              <p>{act.activity}</p>
              <span>{act.date}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer */}
      <footer className="footer-section">
        <h4>
          Made with by <span>Sudhakar</span>
        </h4>
        <p>&copy; Dashboard. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
