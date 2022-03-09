import { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Dropdown from "../../components/create-project/Dropdown";
import FormInput from "../../components/create-project/FormInput";
import Layout from "../../components/Layout";
import Button from "../../components/reusableui/Button";
import AuthContext from "../../contexts/AuthContext";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import customAxios from "../../config/config";
import Image from "next/image";

const PROPERTIES = [
  { text: "Project Name", key: "name", type: "text" },
  { text: "Description", key: "description", type: "text" },
  { text: "Partner", key: "partner", type: "text" },
  { text: "Mint Quantity", key: "mintQuantity", type: "text" },
  { text: "Quantity Details", key: "quantityDetails", type: "text" },
  { text: "Whitelist Methods", key: "whitelistMethods", type: "text" },
  { text: "Whitelist Mint Price", key: "whitelistMintPrice", type: "number" },
  { text: "Whitelist Details", key: "whitelistDetails", type: "text" },
  { text: "Public Mint Price", key: "publicMintPrice", type: "number" },
  { text: "Ebisu’s Bay Mint Price", key: "ebPrice", type: "number" },
  { text: "Whitelist Mint Date", key: "whitelistMintDate", type: "date" },
  {
    text: "Whitelist Mint Time UTC",
    key: "whitelistMintTimeUTC",
    type: "date",
  },
  { text: "Public Mint Date", key: "publicMintDate", type: "date" },
  { text: "Mint Close Date", key: "mintCloseDate", type: "date" },
  { text: "Rarity", key: "rarity", type: "text" },
  { text: "Utility", key: "utility", type: "text" },
  { text: "Utility Details", key: "utilityDetails", type: "text" },
  { text: "Tokenomics", key: "tokenomics", type: "text" },
  { text: "Staking", key: "staking", type: "text" },
  { text: "Staking Details", key: "stakingDetails", type: "text" },
  { text: "Token", key: "token", type: "text" },
  { text: "Token Contract", key: "tokenContract", type: "text" },
  { text: "DAO", key: "dao", type: "text" },
  { text: "DAO Details", key: "daoDetails", type: "text" },
  { text: "Twitter Followers", key: "twitterFollowers", type: "number" },
  { text: "Discord Members", key: "discordMembers", type: "number" },
  { text: "Contract Address", key: "contractAddress", type: "text" },
  { text: "Discord", key: "discordLink", type: "text" },
  { text: "Website", key: "websiteLink", type: "text" },
  { text: "White Paper", key: "whitePaperLink", type: "text" },
  { text: "Twitter", key: "twitterLink", type: "text" },
  { text: "Tiktok", key: "tiktokLink", type: "text" },
  { text: "Instagram", key: "instagramLink", type: "text" },
  { text: "EbisusBay", key: "ebLink", type: "text" },
  { text: "Agora", key: "agoraLink", type: "text" },
  { text: "NFT Contract", key: "nftContract", type: "text" },
];

// Server Side props
export async function getServerSideProps(context) {
  const [projectTypeOptions, mintStatusOptions, statusOptions] =
    await Promise.all([
      customAxios.get(`/project-types`),
      customAxios.get(`/mint-status`),
      customAxios.get(`/status`),
    ]);

  return {
    props: {
      projectTypeOptions: projectTypeOptions.data,
      mintStatusOptions: mintStatusOptions.data,
      statusOptions: statusOptions.data,
    },
  };
}

const Index = ({
  projectTypeOptions = [],
  mintStatusOptions = [],
  statusOptions = [],
}) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [image, setImage] = useState(null);
  const [selectedMint, setSelectedMint] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedProjectType, setSelectedProjectType] = useState("");
  const [nftOptionId, setNftOptionId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const formRef = useRef(null);
  // Context
  const authToken = useContext(AuthContext);

  // Router
  const router = useRouter();

  const submitHandler = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const bodyFormData = new FormData();

    for (let element of formRef.current.elements) {
      if (element.value) {
        if (element.name === "image") {
          bodyFormData.set("image", image);
        } else {
          bodyFormData.set(element.name, element.value);
        }
      }
    }

    if (nftOptionId !== selectedProjectType) {
      bodyFormData.set("mintStatus", "");
    } else if (selectedMint) {
      bodyFormData.set("mintStatus", selectedMint);
    }
    bodyFormData.set("projectType", selectedProjectType);
    bodyFormData.set("status", selectedStatus);

    customAxios
      .post("/projects", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken.token}`,
        },
      })
      .then((res) => {
        router.push("/projects");
      })
      .catch((error) => {
        setIsLoading(false);
        setError(
          error.response.data.error || error.messge || JSON.stringify(error)
        );
      });
  };

  const onImageChangeHandler = (event) => {
    setImage(event.target.files[0]);
  };

  useEffect(() => {
    if (statusOptions[0]) {
      setSelectedStatus(statusOptions[0]._id);
    }
    if (projectTypeOptions[0]) {
      setSelectedProjectType(projectTypeOptions[0]._id);
    }
  }, [statusOptions, projectTypeOptions]);

  useEffect(() => {
    if (!image) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImagePreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(image);
  }, [image]);

  useEffect(() => {
    if (projectTypeOptions) {
      const projectTypeOption = projectTypeOptions.find((option) =>
        option.name.toLowerCase().includes("nfts")
      );
      setNftOptionId(projectTypeOption._id);
    }
  }, [projectTypeOptions]);

  return (
    <Layout>
      {isLoading && (
        <Backdrop>
          <div className="loader relative top-56 z-50"></div>
        </Backdrop>
      )}
      <section>
        {/* Heading */}
        <div>
          <h2 className="text-2xl leading-normal text-gray-800">
            Create Project
          </h2>
        </div>
        {/* Form for create project */}
        <div className="w-full rounded-md bg-white px-8 mt-8">
          <form onSubmit={submitHandler} ref={formRef}>
            {/* Upload File */}
            <div className="py-6 w-full grid border-b items-center grid-cols-7 border-[#F3F4F6]">
              <span className="text-gray-600 col-span-2 text-lg leading-[18px]">
                Image
              </span>
              <label
                htmlFor="upload"
                className="col-span-4 cursor-pointer flex items-center"
              >
                <div className="mr-4">
                  {!imagePreviewUrl && (
                    <Image
                      className="rounded-full relative"
                      src={"/default.jpg"}
                      width={150}
                      height={150}
                      objectFit="cover"
                      alt="Project Image"
                    />
                  )}
                  {imagePreviewUrl && (
                    <Image
                      className="rounded-full relative"
                      src={imagePreviewUrl}
                      width={150}
                      height={150}
                      objectFit="cover"
                      alt="Project Image"
                    />
                  )}
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-sm text-gray-600 leading-4 mb-4">
                    No files selected
                  </span>
                  <button
                    type="button"
                    className="text-purple-700 hover:bg-purple-50 border-purple-700 border py-3 w-40 rounded-lg pointer-events-none"
                  >
                    Choose FIle
                  </button>

                  <input
                    name="image"
                    type="file"
                    id="upload"
                    className="hidden"
                    onChange={onImageChangeHandler}
                  />
                </div>
              </label>
            </div>
            {PROPERTIES.map((property) => {
              return (
                <div
                  key={property.key}
                  className="py-6 w-full border-b border-[#F3F4F6]"
                >
                  <FormInput
                    name={property.key}
                    type={property.type}
                    label={property.text}
                    placeholder={property.text}
                  />
                </div>
              );
            })}
            <div className="py-6 w-full border-b border-[#F3F4F6]">
              <Dropdown
                setSelectedValue={setSelectedProjectType}
                options={projectTypeOptions}
                name={"project-types-lookup"}
                label="Project Types"
                selectedStatus={selectedProjectType}
              />
            </div>
            {nftOptionId === selectedProjectType && (
              <div className="py-6 w-full border-b border-[#F3F4F6]">
                <Dropdown
                  setSelectedValue={setSelectedMint}
                  options={mintStatusOptions}
                  name={"Mint Status"}
                  label="Mint Status"
                  selectedStatus={selectedMint}
                />
              </div>
            )}
            <div className="py-6 w-full border-b border-[#F3F4F6]">
              <Dropdown
                setSelectedValue={setSelectedStatus}
                options={statusOptions}
                name={"status"}
                label="Status"
                selectedStatus={selectedStatus}
              />
            </div>
            {error && (
              <p className="mx-auto text-red-500 font-bold my-4">{error}</p>
            )}
            <div className="w-full pt-14 pb-4 mb-4 flex items-center gap-8 justify-end">
              <button
                onClick={() => router.push("/projects")}
                className="text-gray-600 font-bold"
              >
                Cancel
              </button>
              <Button text="Create Project" onClickHandler={() => {}} />
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
