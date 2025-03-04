import { useState, useEffect, useRef } from "react";
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import useSocket from "../hooks/useSocket";

export default function ChatConversation() {
  const params = useParams();
  const chatId = params.id;
  const [newMessage, setNewMessage] = useState("");
  const { messages, sendMessage } = useSocket(chatId);
  const messagesEndRef = useRef(null);
  const currentUserId = localStorage.getItem("userId");

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container maxWidth="sm">
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign="center"
        mb={2}
        sx={{
          background: "linear-gradient(90deg, #1976D2, #4CAF50)", 
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: { xs: "1.5rem", sm: "2rem" }, 
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        Chat Conversation
      </Typography>

      {/* Chat Box */}
      <Paper
        elevation={3}
        sx={{
          maxHeight: "65vh",
          overflowY: "auto",
          p: 2,
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          minHeight: "400px"
        }}
      >
        <List>
          {messages.map((msg, index) => (
            <ListItem
              key={index}
              sx={{
                display: "flex",
                justifyContent: msg.sender === currentUserId ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: "16px",
                  maxWidth: "75%",
                  backgroundColor: msg.sender === currentUserId ? "#4CAF50" : "#1976D2",
                  color: "#fff",
                  wordBreak: "break-word",
                }}
              >
                <ListItemText
                  primary={msg.text}
                  secondary={
                    <Typography
                      variant="caption"
                      sx={{ display: "block", textAlign: "right", opacity: 0.7 }}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </Typography>
                  }
                />
              </Box>
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
      </Paper>

      {/* Message Input */}
      <Box
        display="flex"
        alignItems="center"
        mt={2}
        p={1}
        sx={{
          backgroundColor: "#fff",
          borderRadius: "30px",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && newMessage.trim()) {
              sendMessage(chatId, newMessage.trim());
              setNewMessage(""); // Clear input after sending
            }
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
              backgroundColor: "#f9f9f9",
            },
            "& .MuiOutlinedInput-root.Mui-focused": {
              backgroundColor: "#fff",
            },
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            if (newMessage.trim()) {
              sendMessage(chatId, newMessage.trim());
              setNewMessage("");
            }
          }}
          disabled={!newMessage.trim()}
          sx={{
            borderRadius: "50px",
            minWidth: "80px",
            height: "50px",
            ml: 1,
            boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.05)",
            },
            backgroundColor: "black"
          }}
        >
          Send
        </Button>
      </Box>
    </Container>
  );
}
