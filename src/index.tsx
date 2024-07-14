import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import "./index.css";
import Routes from "./routes/routes";

const element = document.getElementById("root")!;
const root = ReactDOM.createRoot(element);
root.render(
  <BrowserRouter>
    <Navbar />
    {/* <Footer /> */}
    <Routes />
    <Toaster position="top-center" reverseOrder={false} />
  </BrowserRouter>
);
