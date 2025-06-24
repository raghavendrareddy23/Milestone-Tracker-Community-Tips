// import { useState } from 'react';
// import axios from 'axios';
// import MarkdownIt from 'markdown-it';
// import MdEditor from 'react-markdown-editor-lite';
// import 'react-markdown-editor-lite/lib/index.css';

// const mdParser = new MarkdownIt();

// const MilestoneForm = ({ token, onMilestoneCreated }) => {
//   const [title, setTitle] = useState('');
//   const [category, setCategory] = useState('pregnancy');
//   const [date, setDate] = useState('');
//   const [description, setDescription] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         'http://localhost:2023/milestones/',
//         {
//           title,
//           description,
//           date,
//           category,
//         },
//         // {
//         //   headers: {
//         //     Authorization: `Bearer ${token}`,
//         //   },
//         // }
//       );
//       alert('Milestone Created!');
//       onMilestoneCreated();
//       setTitle('');
//       setDescription('');
//       setDate('');
//     } catch (err) {
//       alert('Failed to create milestone');
//       console.error(err);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="p-4 border rounded space-y-4">
//       <h2 className="text-xl font-bold">Create Milestone</h2>

//       <input
//         type="text"
//         placeholder="Title"
//         className="w-full border p-2"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         required
//       />

//       <select
//         className="w-full border p-2"
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//       >
//         <option value="pregnancy">Pregnancy</option>
//         <option value="preconception">Preconception</option>
//       </select>

//       <input
//         type="date"
//         className="w-full border p-2"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         required
//       />

//       <MdEditor
//         value={description}
//         style={{ height: '300px' }}
//         renderHTML={(text) => mdParser.render(text)}
//         onChange={({ text }) => setDescription(text)}
//       />

//       <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
//         Create
//       </button>
//     </form>
//   );
// };

// export default MilestoneForm;
