import { useState, useEffect, useContext, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
// Components
import SearchInput from "../../components/reusableui/SearchInput";
import Button from "../../components/reusableui/Button";
import Modal from "../../components/UI/Modal/Modal";

// Data
import customAxios from "../../config/config";

// Server Side props
export async function getServerSideProps(context) {
  const response = await customAxios.get("/projects");
  return {
    props: { data: response.data },
  };
}

// COntext
import AuthContext from "../../contexts/AuthContext";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

const Index = ({ data: tableData }) => {
  const router = useRouter();
  const { token, loading, setLoading } = useContext(AuthContext);
  const [SearchInputValue, setSearchInputValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Create project Buttom handler
  const createProject = () => {
    router.push("/projects/create");
  };

  // Delete project handler
  const deleteProject = () => {
    setLoading(true);
    setIsLoading(true);
    setError(null);
    customAxios
      .delete(`/projects/${deletingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setLoading(false);
        const temData = [
          ...filteredData.filter((item) => item._id !== deletingId),
        ];
        setFilteredData(temData);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(
          error.response.data.error || error.message || JSON.stringify(error)
        );
      });
  };

  // Search Input handler
  const searchFilterHandler = useCallback(
    (e) => {
      setSearchInputValue(e.target.value);
      const filtered = tableData.filter((item) => {
        return item.name
          .trim()
          .toLowerCase()
          .includes(e.target.value.trim().toLowerCase());
      });
      setFilteredData(filtered);
    },
    [tableData]
  );

  useEffect(() => {
    const e = {
      target: {
        value: SearchInputValue,
      },
    };
    searchFilterHandler(e);
  }, [SearchInputValue, searchFilterHandler]);

  return (
    <>
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
        <section className="h-full mb-4">
          <div className="flex justify-between items-center w-full">
            <SearchInput
              value={SearchInputValue}
              onChangeHandler={(e) => {
                searchFilterHandler(e);
              }}
            />
            <Button text={"Create Project"} onClickHandler={createProject} />
          </div>
          {error && (
            <p className="mx-auto text-red-500 font-bold my-4">{error}</p>
          )}
          {/* Table */}
          <div className="mt-9 overflow-auto rounded-md mb-4 table-shadow bg-white pb-24">
            <table className="w-full whitespace-nowrap  ">
              <thead>
                <tr className="bg-gray-100 rounded-tl-md">
                  <th className=" py-6 pr-10 text-[18px] px-2 rounded-tl-[4px]  text-gray-800 font-normal">
                    Project Name
                  </th>
                  <th className=" text-[18px] px-2  text-gray-800 font-normal">
                    Mint Status
                  </th>
                  <th className=" text-[18px] px-2  text-gray-800 font-normal">
                    Status
                  </th>
                  <th className=" text-[18px] px-2  text-gray-800 font-normal">
                    Project Type
                  </th>
                  <th className=" text-[18px] px-2  text-gray-800 font-normal">
                    Added
                  </th>
                  <th className=" text-[18px] px-2  rounded-tr-[4px] text-gray-600 font-normal">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item, index) => {
                  return (
                    <tr
                      key={index + 30}
                      onClick={() => {
                        router.push(`/projects/${item._id}`);
                      }}
                      className="hover:bg-indigo-50 cursor-pointer bg-white"
                    >
                      <td
                        align="center"
                        className={` text-gray-600  text-[18px] py-6 pr-10 px-2`}
                      >
                        {item.name}
                      </td>
                      <td
                        align="center"
                        className=" text-[18px] px-2  text-gray-600 font-normal"
                      >
                        {item.mintStatus ? item.mintStatus.name : "-"}
                      </td>
                      <td
                        align="center"
                        className=" text-[18px] px-2  text-gray-600 font-normal"
                      >
                        {item.status ? item.status.name : "-"}
                      </td>
                      <td
                        align="center"
                        className=" text-[18px] px-2  text-gray-600 font-normal"
                      >
                        {item.projectType.name}
                      </td>
                      <td
                        align="center"
                        className=" text-[18px] px-2  text-gray-600 font-normal"
                      >
                        {new Date(item.createdAt).toDateString()}
                      </td>
                      <td
                        align="center"
                        className={`text-[18px] px-2     text-gray-800 font-normal`}
                      >
                        <div className="flex gap-4 mt-1 w-fit">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              router.push(`/projects/${item._id}/edit`);
                            }}
                            className="hover:opacity-80 hover:scale-105"
                          >
                            <Image
                              className="cursor-pointer"
                              src="/editIcon.svg"
                              width={24}
                              height={24}
                              alt="Edit Icon"
                            />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeletingId(item._id);
                              setShowDeleteModal(true);
                            }}
                            className="hover:opacity-80 hover:scale-105"
                          >
                            <Image
                              className="cursor-pointer"
                              src="/deleteIcon.svg"
                              width={24}
                              height={24}
                              alt="Delete Icon"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Index;
