import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, IconButton, Typography, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";
import { useSelector } from 'react-redux';

import { API_BASE_URL } from '../../../config/api';

const ChatBot = () => {
  const [messages, setMessages] = useState([]); // {sender: 'user'|'bot', text: ''}
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [botBuffer, setBotBuffer] = useState(""); // incremental typing
  const messagesEndRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

// Add default welcome message
  useEffect(() => {
    setMessages([
      {
        sender: "bot",
        text: `Namaskar, ${user?.username}! How can I assist you today?`,
      },
    ]);
  }, [user.username]);


  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, botBuffer, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/insurance/chat/chat`, {
        question : input,
      });

      const botText = response.data; // plain string
      setBotBuffer(""); // reset buffer

      // Smooth typing with requestAnimationFrame
      let i = 0;
      const typeNext = () => {
        if (i <= botText.length) {
          setBotBuffer(botText.slice(0, i));
          i++;
          setTimeout(typeNext, 25); // 25ms per character for smoother typing
        } else {
          // Done typing: add final bot message to messages array
          setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
          setBotBuffer("");
          setIsTyping(false);
        }
      };
      typeNext();
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { sender: "bot", text: "⚠️ Error connecting to server." }]);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Messages */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {messages.map((msg, idx) => (
          <Box
            key={idx}
            sx={{
              alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "user" ? "#1976d2" : "#e0e0e0",
              color: msg.sender === "user" ? "white" : "black",
              borderRadius: 2,
              px: 2,
              py: 1,
              maxWidth: "80%",
              wordWrap: "break-word",
            }}
          >
            <Typography variant="body2">{msg.text}</Typography>
          </Box>
        ))}

        {/* Bot typing buffer */}
        {isTyping && botBuffer && (
          <Box
            sx={{
              alignSelf: "flex-start",
              backgroundColor: "#e0e0e0",
              borderRadius: 2,
              px: 2,
              py: 1,
              maxWidth: "80%",
            }}
          >
            <Typography variant="body2">{botBuffer}</Typography>
          </Box>
        )}

        {/* Typing indicator */}
        {isTyping && !botBuffer && (
          <Box sx={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 1 }}>
            <CircularProgress size={16} />
            <Typography variant="body2">Typing...</Typography>
          </Box>
        )}

        <div ref={messagesEndRef} />
      </Box>

      {/* Input */}
      <Box sx={{ display: "flex", p: 1, borderTop: "1px solid #ccc" }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <IconButton color="primary" onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatBot;
