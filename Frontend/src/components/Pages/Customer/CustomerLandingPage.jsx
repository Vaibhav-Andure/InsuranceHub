import React, { useReducer, useState } from "react";
import { useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import { Menu, Policy, Assignment, Logout, ReceiptLong } from "@mui/icons-material";
import "bootstrap/dist/css/bootstrap.min.css";
import ViewPolicy from "../../Policy/policy";
import ClaimForm from "./Claimform";
import ClaimStatus from "./claimstatus";
import TransactionStatus from "./TransactionStatus"; // Import the TransactionStatus component
import { logout } from '../../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const drawerWidth = 280;

const initialState = {
  showViewPolicy: true,
  showClaimForm: false,
  showClaimStatus: false,
  showTransactionStatus: false, // Add this line
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_VIEW_POLICY":
      return { showViewPolicy: true, showClaimForm: false, showClaimStatus: false, showTransactionStatus: false };
    case "TOGGLE_CLAIM_FORM":
      return { showClaimForm: true, showViewPolicy: false, showClaimStatus: false, showTransactionStatus: false };
    case "TOGGLE_CLAIM_STATUS":
      return { showClaimStatus: true, showViewPolicy: false, showClaimForm: false, showTransactionStatus: false };
    case "TOGGLE_TRANSACTION_STATUS":
      return { showTransactionStatus: true, showViewPolicy: false, showClaimForm: false, showClaimStatus: false };
    default:
      return state;
  }
};

const CustomerLandingPage = () => {
  const sendlogout = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [open, setOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <Typography variant="h6" color="error" sx={{ fontFamily: "Segoe UI" }}>
          You're not allowed to access this page without signing in!
        </Typography>
        {/* <Button variant="contained" color="primary" className="mt-3">Login</Button> */}
      </div>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "auto" }}>
      {/* Sidebar */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "99vh",
          },
        }}
      >
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <Box>
            <Toolbar>
              <Typography variant="h6" sx={{ fontFamily: "Segoe UI" }}>Dashboard</Typography>
            </Toolbar>
            <Divider />
            <List>
              <ListItem button onClick={() => dispatch({ type: "TOGGLE_VIEW_POLICY" }  , setOpen(!open))} sx= {{ '&:hover': { backgroundColor: "#cbeffd" }, backgroundColor: state.showViewPolicy ? "#ccc" : "inherit" }}>
                <ListItemIcon><Policy /></ListItemIcon>
                <ListItemText primary="View Policy" sx={{ fontFamily: "Segoe UI" }} />
              </ListItem>
              <ListItem button onClick={() => dispatch({ type: "TOGGLE_CLAIM_FORM" } ,
                setOpen(!open)
              )} sx={{ '&:hover': { backgroundColor: "#cbeffd" }, backgroundColor: state.showClaimForm ? "#ccc" : "inherit" }}>
                <ListItemIcon><Assignment /></ListItemIcon>
                <ListItemText primary="File a Claim" sx={{ fontFamily: "Segoe UI" }} />
              </ListItem>
              <ListItem button onClick={() => dispatch({ type: "TOGGLE_CLAIM_STATUS" } ,
                setOpen(!open)
              ) } sx={{ '&:hover': { backgroundColor: "#cbeffd" }, backgroundColor: state.showClaimStatus ? "#ccc" : "inherit" }}>
                <ListItemIcon><ReceiptLong /></ListItemIcon>
                <ListItemText primary=" Claim Status" sx={{ fontFamily: "Segoe UI" }} />
              </ListItem>
              <ListItem button onClick={() => dispatch({ type: "TOGGLE_TRANSACTION_STATUS" } ,  setOpen(!open))} sx={{ '&:hover': { backgroundColor: "#cbeffd " }, backgroundColor: state.showTransactionStatus ? "#ccc" : "inherit" }}>
                <ListItemIcon><ReceiptLong /></ListItemIcon>
                <ListItemText primary="View Transactions" sx={{ fontFamily: "Segoe UI" }} />
              </ListItem>
            </List>
          </Box>
          <List>
            <Divider />
            <ListItem button sx={{ backgroundColor: "red", color: "white", '&:hover': { backgroundColor: "darkred" } }  } onClick={()=> sendlogout(logout())}>
              <ListItemIcon><Logout style={{ color: "white" }} /></ListItemIcon>
              <ListItemText primary="Logout" sx={{ fontFamily: "Segoe UI", color: "white" }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, height: "100%", overflowY: "auto" }}>
        <Toolbar>
          <IconButton
            onClick={() => setOpen(!open)}
            sx={{
              color: "#ADD8E6",
              backgroundColor: "black",
              '&:hover': {
                backgroundColor: "#e0e0e0",
              }
            }}
          >
            <Menu />
          </IconButton>
        </Toolbar>

        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontFamily: "Segoe UI", textAlign: "center" }}
        >
          Welcome, {user?.username}
        </Typography>

        <Grid container spacing={2} className="mt-5" sx={{ height: "100%", overflowY: "auto" }}>
          {state.showViewPolicy && (
            <Grid item xs={12} sx={{ height: "100%", overflowY: "auto" }}>
              <Card sx={{ boxShadow: 3, height: "100%" }}>
                <CardContent sx={{ height: "100%", overflowY: "auto" }}>
                  <ViewPolicy />
                </CardContent>
              </Card>
            </Grid>
          )}
          {state.showClaimForm && (
            <Grid item xs={12} sx={{ height: "100%", overflowY: "auto" }}>
              <Card sx={{ boxShadow: 3, height: "100%" }}>
                <CardContent sx={{ height: "100%", overflowY: "auto" }}>
                  <ClaimForm />
                </CardContent>
              </Card>
            </Grid>
          )}
          {state.showClaimStatus && (
            <Grid item xs={12} sx={{ height: "100%", overflowY: "auto" }}>
              <Card sx={{ boxShadow: 3, height: "100%" }}>
                <CardContent sx={{ height: "100%", overflowY: "auto" }}>
                  <ClaimStatus />
                </CardContent>
              </Card>
            </Grid>
          )}
          {state.showTransactionStatus && (
            <Grid item xs={12} sx={{ height: "100%", overflowY: "auto" }}>
              <Card sx={{ boxShadow: 3, height: "100%" }}>
                <CardContent sx={{ height: "100%", overflowY: "auto" }}>
                  <TransactionStatus />
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  );
};

export default CustomerLandingPage;