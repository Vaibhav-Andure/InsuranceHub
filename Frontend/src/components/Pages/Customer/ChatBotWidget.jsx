import React, { useState } from "react";
import { Paper, Box, IconButton, Typography } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import ChatBot from "./ChatBot"; // Your existing chat component

const ChatBotWidget = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Icon */}
      {!open && (
        <Box
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              "&:hover": { backgroundColor: "#115293" },
              width: 60,
              height: 60,
            }}
          >
            <ChatIcon sx={{ fontSize: 30 }} />
          </IconButton>
          <Typography variant="subtitle2" sx={{ mt: 1 }}>
            How can I help you?
          </Typography>
        </Box>
      )}

      {/* Chat Window */}
      {open && (
        <Paper
          elevation={10}
          sx={{
            position: "fixed",
            bottom: "10%",
            right: "5%",
            width: 450,  // Bigger width
            height: 600, // Bigger height
            display: "flex",
            flexDirection: "column",
            borderRadius: 3,
            overflow: "hidden",
            zIndex: 2000,
          }}
        >
          {/* Header */}
          <Box
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ flex: 1, textAlign: "center" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Insurance Assistant
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={() => setOpen(false)}
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Chat Content */}
          <Box sx={{ flex: 1, p: 2, overflowY: "auto", backgroundColor: "#f4f4f4" }}>
            <ChatBot />
          </Box>
        </Paper>
      )}
    </>
  );
};

export default ChatBotWidget;
