// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import api from "../../Api/api";
// import { toast } from "react-toastify";
// import Header from "../../dashboard/header";
// import ReactMarkdown from "react-markdown";
// import io from "socket.io-client";

// // const socket = io("http://localhost:2023");

// const MilestoneDetail = () => {
//   const { id } = useParams();
//   const [milestone, setMilestone] = useState(null);
//   const [tips, setTips] = useState([]);
//   const [tipContent, setTipContent] = useState("");
//   //   const [authorName, setAuthorName] = useState("");
//   const socket = io("http://localhost:2023");

//   const isLoggedIn = !!sessionStorage.getItem("token");
//   //   const author = sessionStorage.getItem("username");

//   const fetchMilestone = async () => {
//     const { data } = await api.get(`/milestones/${id}`);
//     setMilestone(data);
//   };

//   const fetchTips = async () => {
//     const { data } = await api.get(`/community-tips/${id}`);
//     setTips(data);
//   };
//   //   const fetchAuthor = async (authorId) => {
//   //     try {
//   //       const { data } = await api.get(`/auth/${authorId}`);
//   //       setAuthorName(data.username);
//   //     } catch (err) {
//   //       console.error("Failed to fetch author", err);
//   //     }
//   //   };

// //   useEffect(() => {
// //     fetchMilestone();
// //     fetchTips();
// //   }, [id]);

//   //   useEffect(() => {
//   //     if (milestone?.author) {
//   //       fetchAuthor(milestone.author);
//   //     }
//   //   }, [milestone]);

//   //  let socket;

// //   useEffect(() => {
// //     let socket = io("http://localhost:2023");

// //     if (id) {
// //       socket.on(`tip:new:${id}`, (newTip) => {
// //         setTips((prev) => [newTip, ...prev]);
// //       });
// //     }

// //     return () => {
// //       if (socket) {
// //         socket.off(`tip:new:${id}`);
// //         socket.disconnect(); // clean up
// //       }
// //     };
// //   }, [id]);

// useEffect(() => {
//     fetchMilestone();
//     fetchTips();

//     socket.emit("join", id);
//     socket.on(`tip:new:${id}`, (newTip) => {
//       setTips((prevTips) => [newTip, ...prevTips]);
//       toast.info("New tip added!");
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [id]);

//   const handleAddTip = async () => {
//     if (!tipContent.trim()) return toast.error("Tip cannot be empty");
//     try {
//       await api.post(
//         "/community-tips/addTip",
//         { milestoneId: id, content: tipContent },
//         {
//           headers: {
//             Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//           },
//         }
//       );
//       setTipContent("");
//       fetchTips();
//       toast.success("Tip added");
//     } catch {
//       toast.error("Failed to add tip");
//     }
//   };

//   const handleLike = async (tipId) => {
//     try {
//       await api.post(
//         `/community-tips/like/${tipId}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//           },
//         }
//       );
//       fetchTips();
//     } catch {
//       toast.error("Failed to like");
//     }
//   };

//   if (!milestone) return <p className="p-6">Loading milestone...</p>;

//   console.log(tips);
//   //   console.log(authorName);

//   return (
//     <div>
//       <Header />
//       <div className="max-w-4xl mx-auto p-6">
//         <h2 className="text-3xl font-bold">{milestone.title}</h2>
//         <p className="text-gray-600">{milestone.category}</p>
//         <p className="text-sm text-gray-400 mb-4">
//           {milestone.date?.slice(0, 10)}
//         </p>
//         <div className="bg-gray-100 p-4 rounded mb-6">
//           <ReactMarkdown>{milestone.description}</ReactMarkdown>
//         </div>

//         <h3 className="text-xl font-semibold mb-2">Community Tips</h3>
//         {tips.length === 0 ? (
//           <p>No tips yet.</p>
//         ) : (
//           <div className="space-y-4">
//             {tips.map((tip) => (
//               <div
//                 key={tip._id}
//                 className="bg-white p-4 border rounded shadow-sm"
//               >
//                 <p>{tip.content}</p>
//                 <div className="flex justify-between text-sm mt-2">
//                   <span className="text-gray-500">{tip.author.username}</span>
//                   <button
//                     onClick={() => handleLike(tip._id)}
//                     className="text-purple-600 hover:underline"
//                   >
//                     ❤️ {tip.likes || 0}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//         {isLoggedIn ? (
//           <div className="mt-4">
//             <textarea
//               value={tipContent}
//               onChange={(e) => setTipContent(e.target.value)}
//               placeholder="Share your tip..."
//               className="w-full border p-2 rounded"
//               rows={3}
//             ></textarea>
//             <button
//               onClick={handleAddTip}
//               className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
//             >
//               Add Comment
//             </button>
//           </div>
//         ) : (
//           <p className="text-gray-600 mb-4">Login to share community tips.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MilestoneDetail;

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
  const socketRef = useRef(null); // ✅ keep socket persistent

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

    // ✅ Connect socket once
    socketRef.current = io("https://milestone-tracker-community-tips.onrender.com");

    // ✅ Join milestone room
    socketRef.current.emit("join", id);

    // ✅ Listen for real-time tips
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
      setTipContent(""); // ✅ don't refetch, socket will handle update
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
      fetchTips(); // optional — not real-time for likes
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
        {/* {tips.length === 0 ? (
          <p>No tips yet.</p>
        ) : (
          <div className="space-y-4">
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
        )} */}
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
