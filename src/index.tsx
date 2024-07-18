import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar";
import "./index.css";
import "./normalize.css";
import Routes from "./routes/routes";

const element = document.getElementById("root")!;
const root = ReactDOM.createRoot(element);
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes />
    <Toaster />
  </BrowserRouter>
);
