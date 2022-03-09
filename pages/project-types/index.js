import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import Button from "../../components/reusableui/Button";
import customAxios from "../../config/config";
import AuthContext from "../../contexts/AuthContext";
import Modal from "../../components/UI/Modal/Modal";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

// Server Side props
export async function getServerSideProps(context) {
  const response = await customAxios.get("/project-types");
  return {
    props: { data: response.data },
  };
}

const Index = ({ data }) => {
  const router = useRouter();
  const { token } = useContext(AuthContext);
  const [tableData, setTableData] = useState(data);
  const [deletingId, setDeletingId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteProject = async () => {
    setIsLoading(true);
    setError(null);
    await customAxios
      .delete(`/project-types/${deletingId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        setTableData(tableData.filter((item) => item._id !== deletingId));
      })
      .catch((error) => {
        setIsLoading(false);
        setError(
          error.response.data.error || error.message || JSON.stringify(error)
        );
      });
  };

  // Craete project Buttom handler
  const createProjectType = () => {
    router.push("/project-types/create");
  };

  return (
    <>
      {showDeleteModal && (
        <Backdrop onClicked={() => setShowDeleteModal(false)}>
          <Modal
            header="Delete?"
            body="Delete this project type?"
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
            <h2 className="text-2xl leading-normal text-gray-800">
              Project Types
            </h2>
            <Button
              text={"Create Project Type"}
              onClickHandler={createProjectType}
            />
          </div>
          {/* Table */}
          <div className="mt-9 overflow-auto rounded-md mb-4 table-shadow bg-white pb-14">
            <table className="w-full whitespace-nowrap  ">
              <thead>
                <tr className="bg-gray-100 rounded-tl-md">
                  <th className=" py-6 pr-10 text-[18px] px-2 rounded-tl-[4px]  text-gray-800 font-normal">
                    Name
                  </th>
                  <th className=" text-[18px] px-2  text-gray-800 font-normal">
                    Added
                  </th>
                  <th className=" text-[18px] px-2  text-gray-800 font-normal">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData?.map((item, index) => {
                  return (
                    <tr
                      key={index + 30}
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
                        {new Date(item.createdAt).toDateString()}
                      </td>

                      <td
                        align="center"
                        className={`text-[18px] px-2     text-gray-800 font-normal`}
                      >
                        <div className="flex gap-4 mt-1 w-fit">
                          <button
                            type="button"
                            onClick={() => {
                              router.push(`/project-types/${item._id}/edit`);
                            }}
                            className="hover:opacity-80 hover:scale-105"
                          >
                            <Image
                              className="cursor-pointer"
                              src="/editIcon.svg"
                              width={24}
                              height={24}
                              alt="Icon"
                            />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
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
                              alt="Icon"
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
