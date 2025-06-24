import MilestoneList from "../components/milestones/milestones";
import Header from "./header";

const Dashboard = () => {
//   const navigate = useNavigate();
//   const isLoggedIn = !!sessionStorage.getItem("token");

//   const handleCardClick = (id) => {
//     if (!isLoggedIn) {
//       navigate("/auth");
//     } else {
//       navigate(`/milestone/${id}`);
//     }
//   };

  return (
    <>
      <Header />
      <div className="p-6">
        {/* <h2 className="text-2xl font-semibold mb-4">Your Milestones</h2> */}
        <MilestoneList/>
      </div>
    </>
  );
};

export default Dashboard;
