import React from "react";

import Header from "./components/Header";
import Home from "./pages/Home";

import { Routes, Route } from "react-router-dom";
import Proposal from "./pages/Proposal";
import { getInfo, getProposals, isWalletConnected } from "./Services";
import CreateProposal from "./components/CreateProposal";

const App = () => {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(async () => {
    // const fetchData = async () => {
    await isWalletConnected();
    await getInfo();
    await getProposals();
    setLoaded(true);
    // };
    // fetchData();
  }, []);
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#212936] dark:text-gray-300">
      <Header />
      {loaded && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proposal/:id" element={<Proposal />} />
        </Routes>
      )}
      <CreateProposal />
    </div>
  );
};

export default App;
