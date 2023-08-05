import React from "react";
import { useParams } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { daysRemaining, useGlobalState } from "../store";
import { getProposal, voteOnProposal } from "../Services";
import { toast } from "react-toastify";

const ProposalDetails = () => {
  const { id } = useParams();
  const [proposal, setProposal] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [isStakeholder] = useGlobalState("isStakeholder");

  const retrieveProposal = async () => {
    await getProposal(id).then((res) => {
      setProposal(res);
      setData([
        { name: "Voters", Acceptees: res?.upvotes, Rejectees: res?.downvotes },
      ]);
    });
  };

  const onVote = async (choice) => {
    if (new Date().getTime() > Number(proposal.duration + "000")) {
      toast.warning("Proposal Expired");
      return;
    }

    await voteOnProposal(id, choice);
    toast.success("Voted Successfully");
  };

  React.useEffect(() => {
    retrieveProposal();
  }, []);
  return (
    <div className="p-8 ">
      <h2 className="font-semibold text-3xl  mb-5">{proposal?.title}</h2>
      <p>
        The proposal is to payout <strong>{proposal?.amount} ETH</strong> and
        currently have{" "}
        <strong>{proposal?.upvotes + proposal?.downvotes} votes</strong> and
        will expire in <strong>{daysRemaining(proposal?.duration)}</strong>
      </p>
      <hr className="my-6 border-gray-300 dark:border-gray-500" />
      <p>{proposal?.description}</p>
      <div className="flex justify-start items-center w-full mt-4 overflow-auto">
        <BarChart width={750} height={250} data={data}>
          <CartesianGrid strokeDasharray={"3 3"}></CartesianGrid>
          <XAxis dataKey={"name"}></XAxis>
          <YAxis></YAxis>
          <Tooltip></Tooltip>
          <Legend></Legend>
          <Bar dataKey={"Acceptees"} fill="#2563eb"></Bar>
          <Bar dataKey={"Rejectees"} fill="#dc2626"></Bar>
        </BarChart>
      </div>
      {isStakeholder && (
        <div
          role="group"
          className="flex justify-start items-center space-x-3 mt-4"
        >
          <button
            type="button"
            className="px-4 py-2.5 bg-transparent font-medium text-sm leading-tight uppercase text-blue-600 shadow-md shadow-gray-400   active:bg-blue-800   dark:shadow-transparent  transition duration-150 ease-in-out  dark:border dark:border-blue-500 hover:text-white border-blue-600 hover:bg-blue-600  rounded-full"
            onClick={() => onVote(true)}
          >
            Accept
          </button>
          <button
            type="button"
            className="px-4 py-2.5 bg-transparent font-medium text-sm leading-tight uppercase text-red-600 shadow-md shadow-gray-400   active:bg-red-800   dark:shadow-transparent  transition duration-150 ease-in-out  dark:border dark:border-red-500 hover:text-white border-red-600 hover:bg-red-600  rounded-full"
            onClick={() => onVote(false)}
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
};

export default ProposalDetails;
