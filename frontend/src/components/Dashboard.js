import "./dashboard.css";

import { v4 as uuidv4 } from "uuid";

import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineSetting } from "react-icons/ai";
import { FiUser, FiUserCheck, FiUserMinus, FiTrendingUp } from "react-icons/fi";
import { TbUsers } from "react-icons/tb";
import { IoLogOutOutline } from "react-icons/io5";

import { MdEmail, MdLocationOn, MdCalendarToday } from "react-icons/md";

const usersDataCardList = [
  {
    id: "TotalUsers",
    title: "Total Users",
    number: "5",
    icon: <TbUsers className="card-icon total-users-icon" />,
  },
  {
    id: "ActiveUsers",
    title: "Active Users",
    number: "3",
    icon: <FiUserCheck className="card-icon active-users-icon" />,
  },
  {
    id: "InactiveUsers",
    title: "Inactive Users",
    number: "2",
    icon: <FiUserMinus className="card-icon inactive-users-icon" />,
  },
  {
    id: "GrowthRate",
    title: "Growth Rate",
    number: "+12%",
    icon: <FiTrendingUp className="card-icon growth-rate-icon" />,
  },
];

const users = [
  {
    id: uuidv4(),
    name: "Sarah Johnson",
    role: "Product Manager",
    email: "sarah.johnson@example.com",
    location: "San Francisco, CA",
    joined: "Jan 2023",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: uuidv4(),
    name: "Michael Smith",
    role: "Software Engineer",
    email: "michael.smith@example.com",
    location: "New York, USA",
    joined: "Mar 2022",
    status: "Inactive",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: uuidv4(),
    name: "Emily Davis",
    role: "UX Designer",
    email: "emily.davis@example.com",
    location: "Austin, TX",
    joined: "Nov 2021",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },

  {
    id: uuidv4(),
    name: "Daniel Roberts",
    role: "Frontend Developer",
    email: "daniel.roberts@example.com",
    location: "Seattle, WA",
    joined: "Jul 2022",
    status: "Inactive",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: uuidv4(),
    name: "Sophia Lee",
    role: "Project Coordinator",
    email: "sophia.lee@example.com",
    location: "Chicago, IL",
    joined: "Feb 2023",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <nav className="navbar-container">
        <h2 className="nav-logo">Dashboard</h2>

        <div className="navbar-right">
          <IoMdNotificationsOutline className="nav-right-icon" />
          <AiOutlineSetting className="nav-right-icon" />
          <div className="nav-profile-card">
            <FiUser className="nav-right-profile-icon" />
            <button type="button" className="logout-btn-lg">
              Logout
            </button>
            <button type="button" className="logout-btn-sm">
              <IoLogOutOutline className="logout-icon" />
            </button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="dashboard-content">
        <header className="content-header">
          <h2>User Dashboard</h2>
          <p>Manage and view user information</p>
        </header>
        {/* Users Datas */}
        <div className="cards-container ">
          <ul className="users-data-card">
            {usersDataCardList.map((item) => (
              <li key={item.id}>
                {item.icon}
                <div className="card-datas">
                  <h3>{item.title}</h3>
                  <p>{item.number}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Team Members */}
        <div className="team-members-section">
          <div className="team-member-header">
            <h2>Team Members</h2>
            <button type="button" className="add-user-btn">
              Add User
            </button>
          </div>
          {/* Users List  */}
          <div className="profile-list">
            {users.map((user) => (
              <div key={user.id} className="profile-card">
                <div className="profile-header">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="profile-avatar"
                  />
                  <div className="profile-info">
                    <h2>{user.name}</h2>
                    <p className="role">{user.role}</p>
                  </div>
                  <span className={`status-badge ${user.status.toLowerCase()}`}>
                    {user.status}
                  </span>
                </div>

                <div className="profile-details">
                  <p>
                    <MdEmail className="icon" /> {user.email}
                  </p>
                  <p>
                    <MdLocationOn className="icon" /> {user.location}
                  </p>
                  <p>
                    <MdCalendarToday className="icon" /> Joined {user.joined}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Section */}
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
