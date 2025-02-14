import { useState, useEffect, useRef } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
  Paper,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useSocketConnection } from "../context/SocketContext"; // Import WebSocket hook
import useSocket from "../hooks/useSocket";

export default function ChatConversation() {
  const params = useParams();
  const chatId = params.id;
  const [newMessage, setNewMessage] = useState(""); 
  const { messages, sendMessage } = useSocket(chatId);
  const messagesEndRef = useRef(null); 

  const fetchMessages = async () => {
     
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        Chat Conversation
      </Typography>
      <Paper elevation={3} sx={{ maxHeight: "65vh", overflowY: "auto", p: 2 }}>
        <List>
          {messages.map((msg, index) => (
            <div key={index}>
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: msg.sender === "currentUserId" ? "flex-end" : "flex-start",
                  backgroundColor: msg.sender === "currentUserId" ? "#4CAF50" : "#333",
                  color: "#fff",
                  borderRadius: 2,
                  mb: 1,
                  p: 1,
                }}
              >
                <ListItemText
                  primary={msg.text}
                  secondary={new Date(msg.timestamp).toLocaleTimeString()}
                />
              </ListItem>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Paper>

      {/* Message Input */}
      <Box display="flex" mt={2}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage(chatId, newMessage)}
        />
        <Button variant="contained" color="primary" onClick={() => sendMessage(chatId, newMessage)} sx={{ ml: 1 }}>
          Send
        </Button>
      </Box>
    </Container>
  );
}
