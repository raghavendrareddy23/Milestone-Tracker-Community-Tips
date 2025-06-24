import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/api";
// import { toast } from "react-toastify";
import ReactMarkdown from "react-markdown";

const MilestoneList = () => {
  const [milestones, setMilestones] = useState([]);
  const navigate = useNavigate();

  const fetchMilestones = async () => {
    const { data } = await api.get("/milestones/");
    setMilestones(data);
  };

  //   const handleDelete = async (id) => {
  //     try {
  //       await api.delete(`/milestones/${id}`);
  //       toast.success("Deleted successfully");
  //       fetchMilestones();
  //     } catch {
  //       toast.error("Delete failed");
  //     }
  //   };

  useEffect(() => {
    fetchMilestones();
  }, []);

  console.log(milestones);
  //   const username = sessionStorage.getItem("username")

  return (
    <>
      {/* <Header /> */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">All Milestones</h2>
          {/* <button
            onClick={() => navigate("/milestone/new")}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            + Create Milestone
          </button> */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
          {milestones.map((m) => (
            <div
              key={m._id}
              className="p-4 bg-white shadow rounded-lg border relative cursor-pointer hover:shadow-md transition"
              onClick={() => navigate(`/milestone/details/${m._id}`)}
            >
              <h3 className="text-lg font-semibold">{m.title}</h3>
              {/* <ReactMarkdown>{m.description}</ReactMarkdown> */}
              <div className="text-sm text-gray-700 line-clamp-3 overflow-hidden">
                <ReactMarkdown>
                  {m.description?.slice(0, 300) + "..."}
                </ReactMarkdown>
              </div>

              <div className="flex justify-between text-sm">
                <p className="text-gray-600">{m.category}</p>
                <p className="text-gray-600">{m.date?.slice(0, 10)}</p>
              </div>
              {/* <p>Contributed by : <b>{username}</b></p> */}

              {/* <div className="flex gap-2 mt-3">
                <button
                  onClick={() => navigate(`/milestone/${m._id}`)}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(m._id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MilestoneList;
