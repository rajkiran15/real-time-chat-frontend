import { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Autocomplete,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import useUser from "../hooks/useUser";
import useInvitation from "../hooks/useInvitation";

const CreateChat = ({ onChatCreated }) => {
  const [open, setOpen] = useState(false);
  const [chatName, setChatName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { users } = useUser();
  const { sendInvitation } = useInvitation();

  const handleCreateChat = async () => {
    if (!chatName.trim()) return alert("Chat name is required");
    await sendInvitation({
      users: selectedUsers,
      chatName: chatName
    });
  };

  return (
    <>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
        sx={{
          bgcolor: "black",
          color: "white",
          textTransform: "none",
          fontSize: "16px",
          px: 3,
          py: 1.5,
          "&:hover": { bgcolor: "#023020" },
          width: "300px",
          borderRadius: "10px",
          boxShadow: "none",
        }}
      >
        New Chat
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        sx={{
          "& .MuiDialog-paper": { borderRadius: "12px", padding: "10px" },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
          Create New Chat
        </DialogTitle>
        <DialogContent sx={{ px: 4, py: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Chat Name
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter chat name"
              value={chatName}
              onChange={(e) => setChatName(e.target.value)}
              sx={{ bgcolor: "#f8f9fa", borderRadius: "8px" }}
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              Invite Users
            </Typography>
            <Autocomplete
              multiple
              options={users}
              getOptionLabel={(user) => user.username}
              value={selectedUsers}
              onChange={(event, newValue) => setSelectedUsers(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Select users..."
                  variant="outlined"
                  sx={{ bgcolor: "#f8f9fa", borderRadius: "8px" }}
                />
              )}
              sx={{
                "& .MuiAutocomplete-tag": {
                  bgcolor: "#007bff",
                  color: "white",
                  borderRadius: "6px",
                },
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 4, pb: 3, justifyContent: "space-between" }}>
          <Button
            onClick={() => setOpen(false)}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              color: "#dc3545",
              "&:hover": { bgcolor: "#f8d7da" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCreateChat}
            variant="contained"
            disabled={loading}
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              bgcolor: "#007bff",
              color: "white",
              px: 4,
              py: 1.2,
              "&:hover": { bgcolor: "#0056b3" },
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Create Chat"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateChat;
