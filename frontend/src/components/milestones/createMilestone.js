import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/api";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { toast } from "react-toastify";
import Header from "../../dashboard/header";

const CreateMilestone = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "pregnancy",
    date: "",
    description: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        toast.error("Login required to create a milestone");
        navigate("/auth");
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await api.post("/milestones/add", { ...formData }, config);
      toast.success("Milestone created!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to create milestone");
    }
  };

  return (
    <div>
        <Header/>
      <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">
          Create Milestone
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="pregnancy">Pregnancy</option>
            <option value="preconception">Preconception</option>
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            required
          />

          <label className="font-semibold text-gray-700">Description</label>
          <MDEditor
            height={300}
            value={formData.description}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, description: val || "" }))
            }
            preview="edit"
            data-color-mode="light"
          />

          <button
            type="submit"
            className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
          >
            Create Milestone
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMilestone;
