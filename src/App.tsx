import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import CreateTest from "./pages/CreateTest";
import Questions from "./pages/Questions";
import Publish from "./pages/Publish";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />

      <Route path="/create-test" element={<CreateTest />} />

      <Route
  path="/create-test/:id"
  element={<CreateTest />}
/>

      <Route path="/questions" element={<Questions />} />

      <Route path="/publish" element={<Publish />} />

      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;