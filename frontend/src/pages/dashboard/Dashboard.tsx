import DashboardHeader from "../../components/dashboard/dashboard-header/DashboardHeader";
import TaskList from "../../components/dashboard/tasklist/TaskList";
import './Dashboard.scss';
const Dashboard = () => {
  return (
    <div className="dashboard-container">
       <div className="dashboard-header-div">
        <DashboardHeader/>
       </div>
       <div className="taskList-div">
        <TaskList/>
       </div>
    </div>
  );
};

export default Dashboard;