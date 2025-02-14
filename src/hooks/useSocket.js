import { useState, useEffect } from "react";
import { useSocketConnection } from "../context/SocketContext";
import { api } from "../api/index";
import { EVENTS } from "../api/events";
import { endpoints } from "../api/endpoints";

const useSocket = (chatId) => {
  const isLoggedIn = localStorage.getItem("access_token");
  const { socket, isConnected } = useSocketConnection();
  const [invites, setInvites] = useState([]);
  const [messages, setMessages] = useState([]);

  const handleNotification = () => {
    api.getApi(endpoints.invite.getAllInvites).then((res) => {
      setInvites(res?.data ?? []);
    });
  };

  const fetchInitialMessage = () => {
    api.getApi(endpoints.chat.getMessages+"/"+chatId).then((res) => {
      setMessages(res?.messages ?? []);
    });
  };

  const handleReceiveMessage = (data) => {
    setMessages(data?.messages ?? []);
  }

  useEffect(() => {
    if (!socket) return;

    if(chatId){
      socket.emit(EVENTS.JOIN_CHAT, chatId);
      console.log(`Joined chat room: ${chatId}`);
    }

    socket.on(EVENTS.RECEIVE_NOTIFICATION, handleNotification);
    socket.on(EVENTS.RECEIVE_MESSAGE, handleReceiveMessage);

    return () => {
      socket.off(EVENTS.RECEIVE_NOTIFICATION, handleNotification); 
      socket.off(EVENTS.RECEIVE_MESSAGE, handleReceiveMessage); 
    };
  }, [socket, chatId]);

  const sendMessage = (chatId, message) => {
    const senderId = localStorage.getItem("userId");
    if (message.trim()) {
      socket.emit(EVENTS.SEND_MESSAGE, { chatId, message, senderId });
    }
  };

  useEffect(() => {
    if(isLoggedIn) handleNotification();
  },[isLoggedIn]);

  useEffect(() => {
    if(chatId) fetchInitialMessage();
  },[chatId]);

  return { sendMessage, messages, invites };
};

export default useSocket;
