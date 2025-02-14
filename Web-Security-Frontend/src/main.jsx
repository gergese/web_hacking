import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@material-tailwind/react";
import "./index.css";
import Router from "./Router.jsx";
import AuthProvider from "./contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
