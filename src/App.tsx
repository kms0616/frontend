import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/Main";
import LoginPage from "./pages/Login";
import SendPage from "./pages/Send";
import MysteryPage from "./pages/mystery";
import ReceivedCardPage from "./pages/ReceivedCard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/send" element={<SendPage />} />
      <Route path="/mystery" element={<MysteryPage />} />
      <Route path="/received/:id" element={<ReceivedCardPage />} />
    </Routes>
  );
}

export default App;
