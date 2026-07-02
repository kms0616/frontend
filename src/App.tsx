import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/Main";
import LoginPage from "./pages/Login";
import SendPage from "./pages/Send";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/send" element={<SendPage />} />
    </Routes>
  );
}

export default App;
