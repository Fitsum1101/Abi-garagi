import React, { useState } from "react";
import Home from "./pages/Home";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/layout/Root";
import About from "./pages/About";
import Services from "./pages/Services";
import ContactAs from "./pages/ContactAs";
import Login from "./pages/Login";

import Stack from "@mui/material/Stack";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge, { badgeClasses } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";

import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import send from "@mui/icons-material/Send";
import InboxIcon from "@mui/icons-material/Inbox";
import ListItemText from "@mui/material/ListItemText";
// //  create me a route that will render the App component

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     errorElement: <div>Error: Page not found</div>,
//     children: [
//       { index: true, element: <Home /> },
//       { path: "about", element: <About /> },
//       { path: "services", element: <Services /> },
//       { path: "contact", element: <ContactAs /> },
//       { path: "login", element: <Login /> },
//     ],
//   },
// ]);

export const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -1px;
  }
`;

const App = () => {
  return (
    <div className="w-[600px] h-[40vh] bg-gray-400 m-auto flex justify-center items-center">
      <List>
        <ListItem>
          <Box sx={{ p: 2, width: 350, bgcolor: "background.paper" }}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </Box>
        </ListItem>
      </List>
    </div>
  );
};

export default App;
