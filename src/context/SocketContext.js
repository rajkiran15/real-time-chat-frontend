import { createContext, useContext, useEffect, useState } from "react";
import socketInstance from "../utils/socket";
import { EVENTS } from "../api/events";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");  

    socketInstance.on("connect", () => {
      setIsConnected(true);
      if (userId) {
        socketInstance.emit(EVENTS.REGISTER_USER, userId);
      }
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socketInstance.off("connect");
      socketInstance.off("disconnect");
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket: socketInstance, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketConnection = () => useContext(SocketContext);
