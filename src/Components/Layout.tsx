import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-100 text-black">
      <Header title="My webpage Bro" />
      <Navbar />
      <div className="flex-grow">
        <Outlet /> {/* Denna del renderar den aktuella sidans innehåll */}
      </div>
      <Footer title="Alfred Olsson" />
    </div>
  );
};

export default Layout;
