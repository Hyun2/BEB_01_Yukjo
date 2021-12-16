import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Layout from "./components/layout/Layout";
import Minting from "./components/minting/Minting";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mint-nft" element={<Minting />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
