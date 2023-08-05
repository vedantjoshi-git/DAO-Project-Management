import React from "react";
import ProposalDetails from "../components/ProposalDetails";
import Voters from "../components/Voters";

const Proposal = () => {
  return (
    <React.Fragment>
      <ProposalDetails />
      <Voters />
    </React.Fragment>
  );
};

export default Proposal;
