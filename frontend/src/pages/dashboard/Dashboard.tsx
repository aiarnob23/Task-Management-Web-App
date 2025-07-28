import DashboardHeader from "../../components/dashboard/header/DashboardHeader";
import TaskList from "../../components/dashboard/tasklist/TaskList";
import './Dashboard.scss';
const Dashboard = () => {
  return (
    <div className="dashboard-container">
       <DashboardHeader/>
       <div className="taskList-div">
        <TaskList/>
       </div>
    </div>
  );
};

export default Dashboard;