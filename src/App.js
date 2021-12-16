import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Minting from "./components/minting/Minting";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mint-nft" element={<Minting />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
