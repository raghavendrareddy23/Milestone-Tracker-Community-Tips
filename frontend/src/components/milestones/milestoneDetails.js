import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../../Api/api";
import { toast } from "react-toastify";
import Header from "../../dashboard/header";
import ReactMarkdown from "react-markdown";
import { io } from "socket.io-client";
import { useCallback } from "react";

const MilestoneDetail = () => {
  const { id } = useParams();
  const [milestone, setMilestone] = useState(null);
  const [tips, setTips] = useState([]);
  const [tipContent, setTipContent] = useState("");
  const socketRef = useRef(null);

  const isLoggedIn = !!sessionStorage.getItem("token");

  const fetchMilestone = useCallback(async () => {
  try {
    const { data } = await api.get(`/milestones/${id}`);
    setMilestone(data);
  } catch (error) {
    console.error("Failed to fetch milestone:", error);
  }
}, [id]);

const fetchTips = useCallback(async () => {
  try {
    const { data } = await api.get(`/community-tips/${id}`);
    const sortedTips = data.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setTips(sortedTips);
  } catch (error) {
    console.error("Failed to fetch tips:", error);
  }
}, [id]);

  

  useEffect(() => {
    fetchMilestone();
    fetchTips();

    socketRef.current = io("https://milestone-tracker-community-tips.onrender.com");

    socketRef.current.emit("join", id);

    socketRef.current.on(`tip:new:${id}`, (newTip) => {
      setTips((prev) => [...prev, newTip]);

      toast.info("💡 New tip added!");
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [fetchMilestone, fetchTips, id]);

  const handleAddTip = async () => {
    if (!tipContent.trim()) return toast.error("Tip cannot be empty");
    try {
      await api.post(
        "/community-tips/addTip",
        { milestoneId: id, content: tipContent },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setTipContent(""); 
      toast.success("Tip added!");
    } catch {
      toast.error("Failed to add tip");
    }
  };

  const handleLike = async (tipId) => {
    try {
      await api.post(
        `/community-tips/like/${tipId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      fetchTips();
    } catch {
      toast.error("Failed to like");
    }
  };

  if (!milestone) return <p className="p-6">Loading milestone...</p>;

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold">{milestone.title}</h2>
        <p className="text-gray-600">{milestone.category}</p>
        <p className="text-sm text-gray-400 mb-4">
          {milestone.date?.slice(0, 10)}
        </p>
        <div className="bg-gray-100 p-4 rounded mb-6">
          <ReactMarkdown>{milestone.description}</ReactMarkdown>
        </div>

        <h3 className="text-xl font-semibold mb-2">Community Tips</h3>
        {tips.length === 0 ? (
          <p>No tips yet.</p>
        ) : (
          <div className="max-h-96 overflow-y-auto pr-2 space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-gray-100">
            {tips.map((tip) => (
              <div
                key={tip._id}
                className="bg-white p-4 border rounded shadow-sm"
              >
                <p>{tip.content}</p>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-gray-500">
                    {tip.author?.username || "Anonymous"}
                  </span>
                  <button
                    onClick={() => handleLike(tip._id)}
                    className="text-purple-600 hover:underline"
                  >
                    ❤️ {tip.likes || 0}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {isLoggedIn ? (
          <div className="mt-4">
            <textarea
              value={tipContent}
              onChange={(e) => setTipContent(e.target.value)}
              placeholder="Share your tip..."
              className="w-full border p-2 rounded"
              rows={3}
            ></textarea>
            <button
              onClick={handleAddTip}
              className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Add Comment
            </button>
          </div>
        ) : (
          <p className="text-gray-600 mt-4">Login to share community tips.</p>
        )}
      </div>
    </div>
  );
};

export default MilestoneDetail;
