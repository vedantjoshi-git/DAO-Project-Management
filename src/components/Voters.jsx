import React from "react";
import { Link, useParams } from "react-router-dom";
import Identicon from "react-identicons";
import moment from "moment";
import { listVoters } from "../Services";
import { truncate } from "../store";

const active = `px-4 py-2.5 bg-blue-600 font-medium text-sm leading-tight uppercase  shadow-md shadow-gray-400  active:bg-blue-800  dark:shadow-transparent  transition duration-150 ease-in-out  dark:border  dark:border-blue-500 border-blue-600 hover:text-white `;

const inactive = `px-4 py-2.5 bg-transparent font-medium text-sm leading-tight uppercase text-blue-600 shadow-md shadow-gray-400   active:bg-blue-800   dark:shadow-transparent  transition duration-150 ease-in-out  dark:border dark:border-blue-500 hover:text-white border-blue-600 hover:bg-blue-600 `;
const Voters = () => {
  const [voters, setVoters] = React.useState([]);
  const [data, setData] = React.useState([]);
  const { id } = useParams();

  const timeAgo = (timestamp) => moment(Number(timestamp + "000")).fromNow();

  React.useEffect(async () => {
    await listVoters(id).then((res) => {
      setVoters(res);
      setData(res);
    });
  }, [id]);

  const getAll = () => setVoters(data);

  const getAccepted = () => setVoters(data.filter((vote) => vote.choosen));

  const getRejected = () => setVoters(data.filter((vote) => !vote.choosen));
  return (
    <div className="flex flex-col p-8">
      {" "}
      <div className="flex justify-center item-center " role="group">
        <button className={` rounded-l-full ${active} `} onClick={getAll}>
          All
        </button>
        <button className={`  ${inactive} `} onClick={getAccepted}>
          Acceptees
        </button>
        <button
          className={` rounded-r-full ${inactive} `}
          onClick={getRejected}
        >
          Rejectees
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
                    Voter
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Voted
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium px-6 py-4 text-left"
                  >
                    Vote
                  </th>
                </tr>
              </thead>
              <tbody>
                {voters.map((voter, i) => (
                  <tr
                    key={i}
                    className="border-b dark:border-gray-500 transition duration-300 ease-in-out"
                  >
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-row justify-start items-center space-x-3">
                        <Identicon
                          string={voter.voter.toLowerCase()}
                          size={25}
                          className="h-10 w-10 object-contain rounded-full"
                        />
                        <span>{truncate(voter.voter, 4, 4, 11)}</span>
                      </div>
                    </td>
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      {timeAgo(voter.timestamp)}
                    </td>
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap space-x-2">
                      {voter.choosen ? (
                        <button
                          className="border-2 rounded-full px-6 py-2.5 border-blue-600
                          text-blue-600 font-medium text-xs leading-tight
                          uppercase hover:border-blue-700 focus:border-blue-700
                          focus:outline-none focus:ring-0 active:border-blue-800
                          transition duration-150 ease-in-out"
                        >
                          Accepted
                        </button>
                      ) : (
                        <button
                          className="border-2 rounded-full px-6 py-2.5 border-red-600
                          text-red-600 font-medium text-xs leading-tight
                          uppercase hover:border-red-700 focus:border-red-700
                          focus:outline-none focus:ring-0 active:border-red-800
                          transition duration-150 ease-in-out"
                        >
                          Rejected
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 py-2 text-center">
          {voters.length >= 10 && (
            <button className="px-4 py-2.5 bg-transparent font-medium text-sm leading-tight uppercase text-blue-600 shadow-md shadow-gray-400   active:bg-blue-800   dark:shadow-transparent  transition duration-150 ease-in-out  dark:border dark:border-blue-500 hover:text-white border-blue-600 hover:bg-blue-600 ">
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Voters;
