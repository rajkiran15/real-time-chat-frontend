import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./container/Auth";
import Home from "./container/Home";
import Chat from "./container/Chat";
import Navbar from "./components/Navbar";
import { SocketProvider } from "./context/SocketContext";

const RouterContainer = () => {
  return (
    <SocketProvider>
      <Router>
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "#36454F",
          }}
        >
          <Navbar />
          <Routes>
            <Route path="/testing" element={<Home />} />
            <Route path="/testing/chat/:id" element={<Chat />} />
            <Route path="/testing/auth" element={<Auth />} />
          </Routes>
        </div>
      </Router>
    </SocketProvider>
  );
};

export default RouterContainer;
