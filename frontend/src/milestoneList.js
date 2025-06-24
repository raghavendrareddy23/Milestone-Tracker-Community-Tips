// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import ReactMarkdown from 'react-markdown';

// const MilestoneList = ({ token, refreshFlag }) => {
//   const [milestones, setMilestones] = useState([]);

//   useEffect(() => {
//     const fetchMilestones = async () => {
//       try {
//         const res = await axios.get('http://localhost:2023/milestones', {
//         //   headers: {
//         //     Authorization: `Bearer ${token}`,
//         //   },
//         });
//         setMilestones(res.data);
//       } catch (err) {
//         console.error('Error fetching milestones', err);
//       }
//     };

//     fetchMilestones();
//   }, [token, refreshFlag]);

//   return (
//     <div className="p-4 mt-6 border rounded">
//       <h2 className="text-xl font-bold mb-4">Your Milestones</h2>
//       {milestones.length === 0 ? (
//         <p>No milestones yet.</p>
//       ) : (
//         milestones.map((m) => (
//           <div key={m._id} className="mb-4 p-4 border rounded">
//             <h3 className="text-lg font-semibold">{m.title}</h3>
//             <ReactMarkdown>{m.description}</ReactMarkdown>
//             <p className="text-sm text-gray-500">
//               📅 {new Date(m.date).toLocaleDateString()} | 📂 {m.category}
//             </p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default MilestoneList;
