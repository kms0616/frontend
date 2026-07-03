import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/Main";
import LoginPage from "./pages/Login";
import SendPage from "./pages/Send";
import MysteryPage from "./pages/mystery";
import ReceivedCardPage from "./pages/ReceivedCard";
import WritePage from "./pages/Write";
import StoragePage from "./pages/CardStorage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/send" element={<SendPage />} />
      <Route path="/mystery/:mysteryDrawId" element={<MysteryPage />} />
      <Route path="/received/:id" element={<ReceivedCardPage />} />
      <Route path="/write" element={<WritePage />} />
      <Route path="/storage" element={<StoragePage />} />
    </Routes>
  );
}

export default App;
