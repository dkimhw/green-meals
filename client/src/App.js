import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './components/Layout/Layout';
import Home from './pages/Home/Home';

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
