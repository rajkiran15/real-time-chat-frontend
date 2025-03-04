import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Menu,
  MenuItem,
  Badge,
  Button,
  Paper,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleIcon from "@mui/icons-material/Chat";
import useSocket from "../hooks/useSocket";
import useInvitation from "../hooks/useInvitation";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { handleAccept, handleReject } = useInvitation();
  const { invites } = useSocket();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "#1e1e1e", px: 2, boxShadow: "none" }}
    >
      <Toolbar>
        {/* Logo & Title */}
        <Box display="flex" alignItems="center" onClick={() => window.location.href = "/testing"} sx={{ cursor: "pointer"}}>
          <ChatBubbleIcon sx={{ fontSize: 32, mr: 1, color: "#f5f5f5" }} />
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#f5f5f5" }}
          >
            ChatApp
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />

        {/* Notification Icon with Badge */}
        <IconButton sx={{ color: "#f5f5f5" }} onClick={handleOpen}>
          <Badge badgeContent={invites.filter((invite) => invite.status === "pending").length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* Notification Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            sx: {
              width: 300,
              maxHeight: 300,
              overflowY: "auto",
              bgcolor: "#2a2a2a",
              color: "#f5f5f5",
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
            },
          }}
        >
          {invites.length > 0 ? (
            invites.map((notif, index) => (
              <MenuItem
                key={index}
                onClick={(e) => e.stopPropagation()}
                sx={{ py: 1.5 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    width: "100%",
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "#333",
                    color: "#f5f5f5",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.15)",
                  }}
                >
                  <Typography variant="body2">
                    You have received an invitation to join a chat
                  </Typography>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    mt={1}
                    sx={{ padding: "0px 10px" }}
                  >
                    {notif.status === "pending" && (
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          bgcolor: "#4CAF50",
                          color: "#fff",
                          "&:hover": { bgcolor: "#388E3C" },
                        }}
                        onClick={() => handleAccept(notif._id)}
                      >
                        Accept
                      </Button>
                    )}
                    {notif.status === "accepted" && (
                      <Button
                        onClick={() => navigate(`/testing/chat/${notif.chatId}`)}
                        sx={{
                          bgcolor: "#4CAF50",
                          color: "#fff",
                          "&:hover": { bgcolor: "#388E3C" },
                        }}
                        size="small"
                        variant="contained"
                      >
                        Open Chat
                      </Button>
                    )}
                    {notif.status === "pending" && (
                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          bgcolor: "#E53935",
                          color: "#fff",
                          "&:hover": { bgcolor: "#D32F2F" },
                        }}
                        onClick={() => handleReject(notif._id)}
                      >
                        Reject
                      </Button>
                    )}
                  </Box>
                </Paper>
              </MenuItem>
            ))
          ) : (
            <MenuItem
              sx={{ justifyContent: "center", fontSize: "14px", color: "#aaa" }}
            >
              No new notifications
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
