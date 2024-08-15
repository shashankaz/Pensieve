import React from "react";
import Cover from "./Cover";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-yellow-400 to-white">
      <Navbar />
      <Cover />
      <Footer />
    </div>
  );
};

export default Home;
