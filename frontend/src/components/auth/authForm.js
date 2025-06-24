import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { TailSpin } from "react-loader-spinner";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../../Api/api";

const AuthForm = () => {
  const navigate = useNavigate()
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  //   const [message, setMessage] = useState("");

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
    // setMessage("");
  };

  //   const handleChange = (e) => {
  //     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  //   };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? "/auth/register" : "/auth/login";
    try {
      const { data } = await api.post(endpoint, formData);
      if (!isRegistering) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("userId", data.userId);
        sessionStorage.setItem("username", data.name);
      }

      toast.success(`Success: ${data.message || "Welcome!"}`);
      navigate("/");
    } catch (err) {
      toast.error(
        `Error: ${err.response?.data?.message || "Something went wrong"}`
      );
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Name"
          value={formData?.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        {isRegistering && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData?.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData?.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
        >
          {isRegistering ? "Register" : "Login"}
        </button>
      </form>

      {/* {message && <p className="mt-4 text-sm text-center">{message}</p>} */}

      <div className="mt-6 text-center">
        <button
          onClick={toggleForm}
          className="text-purple-600 hover:underline"
        >
          {isRegistering
            ? "Already have an account? Login"
            : "Don't have an account? Register"}
        </button>
        <ToastContainer />
      </div>
    </>
  );
};

export default AuthForm;
