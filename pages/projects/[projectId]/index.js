import Image from "next/image";
import { useEffect, useState, useContext, Fragment } from "react";
import { useRouter } from "next/router";
import ErrorPage from "../../../components/ErrorPage/ErrorPage";
import Layout from "../../../components/Layout";
import customAxios from "../../../config/config";
import AuthContext from "../../../contexts/AuthContext";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";
import Modal from "../../../components/UI/Modal/Modal";

const PROPERTIES = [
  { text: "Project Name", key: "name" },
  { text: "Description", key: "description" },
  { text: "Added", key: "createdAt" },
  { text: "Partner", key: "partner" },
  { text: "Project Type", key: "projectType.name" },
  { text: "Mint Status", key: "mintStatus.name" },
  { text: "Status", key: "status.name" },
  { text: "Mint Quantity", key: "mintQuantity" },
  { text: "Quantity Details", key: "quantityDetails" },
  { text: "Whitelist Methods", key: "whitelistMethods" },
  { text: "Whitelist Mint Price", key: "whitelistMintPrice" },
  { text: "Whitelist Details", key: "whitelistDetails" },
  { text: "Public Mint Price", key: "publicMintPrice" },
  { text: "Ebisu’s Bay Mint Price", key: "ebPrice" },
  { text: "Whitelist Mint Date", key: "whitelistMintDate" },
  { text: "Whitelist Mint Time UTC", key: "whitelistMintTimeUTC" },
  { text: "Public Mint Date", key: "publicMintDate" },
  { text: "Mint Close Date", key: "mintCloseDate" },
  { text: "Rarity", key: "rarity" },
  { text: "Utility", key: "utility" },
  { text: "Utility Details", key: "utilityDetails" },
  { text: "Tokenomics", key: "tokenomics" },
  { text: "Staking", key: "staking" },
  { text: "Staking Details", key: "stakingDetails" },
  { text: "Token", key: "token" },
  { text: "Token Contract", key: "tokenContract" },
  { text: "DAO", key: "dao" },
  { text: "DAO Details", key: "daoDetails" },
  { text: "Twitter Followers", key: "twitterFollowers" },
  { text: "Discord Members", key: "discordMembers" },
  { text: "Contract Address", key: "contractAddress" },
  { text: "Discord", key: "discordLink" },
  { text: "Website", key: "websiteLink" },
  { text: "White Paper", key: "whitePaperLink" },
  { text: "Twitter", key: "twitterLink" },
  { text: "Tiktok", key: "tiktokLink" },
  { text: "Instagram", key: "instagramLink" },
  { text: "EbisusBay", key: "ebLink" },
  { text: "Agora", key: "agoraLink" },
  { text: "NFT Contract", key: "nftContract" },
];

// Server Side props
export async function getServerSideProps(context) {
  const projectId = context.params.projectId;
  let projectData = {};
  let errorCode = "";

  try {
    const response = await customAxios.get(`/projects/${projectId}`);
    projectData = response.data;
  } catch (error) {
    errorCode = error.response.status;
  }

  return {
    props: {
      projectData,
      errorCode,
    },
  };
}

const Index = ({ projectData: tableData, errorCode }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Next Router
  const router = useRouter();

  // Context
  const { token } = useContext(AuthContext);

  // Delete project handler
  const deleteProject = () => {
    setIsLoading(true);
    setError(null);
    customAxios
      .delete(`/projects/${tableData._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        router.push("/projects");
      })
      .catch((error) => {
        setIsLoading(false);
        setError(
          error.response.data.error || error.message || JSON.stringify(error)
        );
      });
  };

  const getValue = (key) => {
    if (key.includes(".")) {
      if (tableData[key.split(".")[0]]) {
        return tableData[key.split(".")[0]][key.split(".")[1]];
      }
      return "N/A";
    }
    return tableData[key] ? tableData[key] : "N/A";
  };

  if (errorCode) {
    return <ErrorPage statusCode={errorCode} />;
  }

  return (
    <Fragment>
      {showDeleteModal && (
        <Backdrop onClicked={() => setShowDeleteModal(false)}>
          <Modal
            header="Delete?"
            body="Delete this project?"
            onCanceled={() => setShowDeleteModal(false)}
            onConfirmed={deleteProject}
          />
        </Backdrop>
      )}
      {isLoading && (
        <Backdrop>
          <div className="loader relative top-56 z-50"></div>
        </Backdrop>
      )}
      <Layout>
        <section className="">
          {/* Heading and buttons */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl leading-normal text-gray-800">
              Project Details
            </h2>
            <div className="flex gap-3">
              <button
                onClick={() => router.push(`/projects/${tableData._id}/edit`)}
                className="hover:bg-indigo-600 rounded-md w-10 h-10 bg-indigo-700 shadow-md "
              >
                <Image
                  src={"/editButton.svg"}
                  width={24}
                  height={24}
                  alt="Edit Icon"
                />
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(true);
                }}
                className="hover:bg-gray-100 w-10 h-10 rounded-md bg-gray-50 shadow-md "
              >
                <Image
                  src={"/trashIcon.svg"}
                  width={24}
                  height={24}
                  alt="Delete Icon"
                />
              </button>
            </div>
          </div>
          {/* Table */}
          <div className="mt-4 bg-white project-details-table-shadow mb-8 px-8 w-full rounded-md">
            <table className="w-full">
              <tbody>
                {PROPERTIES.map((property) => {
                  return (
                    <tr
                      key={property.key}
                      className="border-b border-[#F3F4F6]"
                    >
                      <td
                        className={`py-8 text-lg  leading-[18px]  text-gray-600`}
                      >
                        {property.text}
                      </td>
                      <td className="text-lg leading-[18px]  text-gray-800 rounded-tr-md font-semibold">
                        {getValue(property.key)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </Layout>
    </Fragment>
  );
};

export default Index;
