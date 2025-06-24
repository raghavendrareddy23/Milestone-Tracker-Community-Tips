import Header from "../../dashboard/header";
import AuthForm from "./authForm";

const AuthPage = () => {
  return (
    <div>
        <Header />
      <div
        className="min-h-screen bg-cover bg-center relative"
        // style={{ backgroundImage: "url('../../../assets/images.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="flex justify-center items-center h-screen z-10 relative">
          <div className="bg-white p-8 rounded-2xl shadow-xl w-[90%] max-w-md">
            <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
              Milestone Tracker & Community Tips
            </h2>
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
