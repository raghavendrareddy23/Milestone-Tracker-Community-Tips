import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from './components/auth/auth';
import Dashboard from "./dashboard/dashboard";
import CreateMilestone from "./components/milestones/createMilestone";
import MilestoneDetail from "./components/milestones/milestoneDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/milestone/new" element={<CreateMilestone />} />
        <Route path="/milestone/details/:id" element={<MilestoneDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
