import React from "react";
import Identicon from "react-identicons";
import { Link } from "react-router-dom";
import { daysRemaining, truncate, useGlobalState } from "../store";
import { payoutBeneficiary } from "../Services";
import { toast } from "react-toastify";

const active = `px-4 py-2.5 bg-blue-600 font-medium text-sm leading-tight uppercase  shadow-md shadow-gray-400  active:bg-blue-800  dark:shadow-transparent  transition duration-150 ease-in-out  dark:border  dark:border-blue-500 border-blue-600 hover:text-white `;
const inactive = `px-4 py-2.5 bg-transparent font-medium text-sm leading-tight uppercase text-blue-600 shadow-md shadow-gray-400   active:bg-blue-800   dark:shadow-transparent  transition duration-150 ease-in-out  dark:border dark:border-blue-500 hover:text-white border-blue-600 hover:bg-blue-600 `;

const Proposals = () => {
  const [data] = useGlobalState("proposals");
  const [proposals, setProposals] = React.useState(data);

  const getAll = () => setProposals(data);

  const getOpened = () =>
    setProposals(
      data.filter(
        (proposal) => new Date().getTime() < Number(proposal.duration + "000")
      )
    );

  const getClosed = () =>
    setProposals(
      data.filter(
        (proposal) => new Date().getTime() > Number(proposal.duration + "000")
      )
    );

  const handlePayout = async (id) => {
    await payoutBeneficiary(id);
    toast.success("Beneficiary successfully Paid Out!");
  };

  return (
    <div className="flex flex-col p-8">
      <div className="flex justify-center item-center " role="group">
        <button onClick={getAll} className={` rounded-l-full ${active} `}>
          All
        </button>
        <button onClick={getOpened} className={`  ${inactive} `}>
          Open
        </button>
        <button onClick={getClosed} className={` rounded-r-full ${inactive} `}>
          Closed
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="py-2 inline-block min-w-full ">
          <div className="h-[calc(100vh_-_20rem)] overflow-y-auto shadow-md rounded-md">
            <table className="min-w-full">
              <thead className="border-b dark:border-gray-500">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Created By
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Expires
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {proposals.map((proposal) => (
                  <tr
                    key={proposal.id}
                    className="border-b dark:border-gray-500"
                  >
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-row justify-start items-center space-x-3">
                        <Identicon
                          string={proposal.proposer.toLowerCase()}
                          size={25}
                          className="h-10 w-10 object-contain rounded-full mr-3"
                        />
                        <span>{truncate(proposal.proposer, 4, 4, 11)}</span>
                      </div>
                    </td>
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      {proposal.title.substring(0, 80) + "..."}
                    </td>
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      {new Date().getTime() > Number(proposal.duration + "000")
                        ? "Expired"
                        : daysRemaining(proposal.duration)}
                    </td>
                    <td
                      className="flex justify-start items-center space-x-3
                      text-sm font-light px-6 py-4 whitespace-nowrap"
                    >
                      <Link
                        to={"/proposal/" + proposal.id}
                        className="dark:border rounded-full px-6 py-2.5 dark:border-blue-600
                          dark:text-blue-600 dark:bg-transparent font-medium text-xs leading-tight
                          uppercase hover:border-blue-700 focus:border-blue-700
                          focus:outline-none focus:ring-0 active:border-blue-800
                          transition duration-150 ease-in-out text-white bg-blue-600"
                      >
                        View
                      </Link>

                      {new Date().getTime() >
                      Number(proposal.duration + "000") ? (
                        proposal.upvotes > proposal.downvotes ? (
                          !proposal.paid ? (
                            <button
                              className="dark:border rounded-full px-6 py-2.5 dark:border-orange-600
                                dark:text-orange-600 dark:bg-transparent font-medium text-xs leading-tight
                                uppercase hover:border-orange-700 focus:border-orange-700
                                focus:outline-none focus:ring-0 active:border-orange-800
                                transition duration-150 ease-in-out text-white bg-orange-600"
                              onClick={() => handlePayout(proposal.id)}
                            >
                              Payout
                            </button>
                          ) : (
                            <button
                              className="dark:border rounded-full px-6 py-2.5 dark:border-green-600
                                  dark:text-green-600 dark:bg-transparent font-medium text-xs leading-tight
                                  uppercase hover:border-green-700 focus:border-green-700
                                  focus:outline-none focus:ring-0 active:border-green-800
                                  transition duration-150 ease-in-out text-white bg-green-600"
                            >
                              Paid
                            </button>
                          )
                        ) : (
                          <button
                            className="dark:border rounded-full px-6 py-2.5 dark:border-red-600
                                  dark:text-red-600 dark:bg-transparent font-medium text-xs leading-tight
                                  uppercase hover:border-red-700 focus:border-red-700
                                  focus:outline-none focus:ring-0 active:border-red-800
                                  transition duration-150 ease-in-out text-white bg-red-600"
                          >
                            Rejected
                          </button>
                        )
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proposals;
