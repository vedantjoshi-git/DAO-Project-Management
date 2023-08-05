import React from "react";

import { toast } from "react-toastify";
import { performContribute } from "../Services";
import { setGlobalState, useGlobalState } from "../store";

const Hero = () => {
  const [amount, setAmount] = React.useState("");
  const [proposals] = useGlobalState("proposals");
  const [isStakeholder] = useGlobalState("isStakeholder");
  const [balance] = useGlobalState("balance");
  const [mybalance] = useGlobalState("mybalance");

  const onContribute = async () => {
    if (!amount || amount == "") {
      return;
    }
    await performContribute(amount);
    toast.success("Contribution received!");
    setAmount("");
  };

  const opened = () =>
    proposals.filter(
      (proposal) => new Date().getTime() < Number(proposal.duration + "000")
    ).length;
  return (
    <div className="p-8 ">
      <h2 className="font-semibold text-3xl mb-5 ">
        {opened()} Proposal{opened() == 1 ? "" : "s"} currently active
      </h2>
      <p>
        Current balance:
        <strong>{balance} ETH</strong>
        <br />
        Your Contributions:
        <span>
          <strong>{mybalance} ETH</strong>
          {isStakeholder && " You are now a stakeholder"}
        </span>
      </p>
      <hr className="my-6 border-gray-300 dark:border-gray-500" />
      <p>
        {isStakeholder
          ? "You can now raise proposals here"
          : "When you contribute 1 ETH you become a stakeholder"}
      </p>
      <div className="flex justify-start item-center md:w-1/3 w-full mt-4">
        <input
          type="number"
          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-clip-padding border border-solid border-gray-700 dark:bg-transparent rounded transition ease-in-out m-0 shadow-md focus:text-gray-500 focus:outline-none dark:border-gray-500"
          placeholder="e.g.: 2.6 ETH"
          required
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="flex justify-start item-center md:w-1/3 w-full mt-4 space-x-2">
        <button
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase shadow-md rounded-full hover:bg-blue-700 shadow-gray-500 dark:shadow-transparent transition duration-150 ease-in-out"
          onClick={onContribute}
        >
          Contribute
        </button>{" "}
        {isStakeholder && (
          <button
            className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase shadow-md rounded-full hover:bg-blue-700 shadow-gray-500 dark:shadow-transparent transition duration-150 ease-in-out  "
            onClick={() => setGlobalState("createModal", "scale-100")}
          >
            Proposal
          </button>
        )}
      </div>
    </div>
  );
};

export default Hero;
