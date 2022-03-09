import { useState, useContext } from "react";
import FormInput from "../../../components/create-project/FormInput";
import Button from "../../../components/reusableui/Button";
import Layout from "../../../components/Layout";
import AuthContext from "../../../contexts/AuthContext";
import customAxios from "../../../config/config";
import { useRouter } from "next/router";
import ErrorPage from "../../../components/ErrorPage/ErrorPage";
import Backdrop from "../../../components/UI/Backdrop/Backdrop";

// Server Side props
export async function getServerSideProps(context) {
  const mintStatusId = context.params.mintStatusId;
  let mintStatusData = {};
  let errorCode = "";

  try {
    const response = await customAxios.get(`/mint-status/${mintStatusId}`);
    mintStatusData = response.data;
  } catch (error) {
    errorCode = error.response.status;
  }

  return {
    props: {
      mintStatusData,
      errorCode,
    },
  };
}

const Index = ({ mintStatusData, errorCode }) => {
  const router = useRouter();
  const { token } = useContext(AuthContext);
  const [projectType, setProjectType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    customAxios
      .patch(
        `/mint-status/${mintStatusData._id}`,
        {
          name: projectType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        router.push("/mint-status");
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error || err.message || JSON.stringify(err));
      });
  };

  if (errorCode) {
    return <ErrorPage statusCode={errorCode} />;
  }

  return (
    <Layout>
      {isLoading && (
        <Backdrop>
          <div className="loader relative top-56 z-50"></div>
        </Backdrop>
      )}
      <section>
        <div>
          <h2 className="text-2xl leading-normal text-gray-800">Mint Status</h2>
        </div>
        <div className="w-full rounded-md bg-white px-8 mt-8">
          <form onSubmit={submitHandler} className="flex items-center pb-8 ">
            <div className="py-4 w-full">
              <FormInput
                name={"mint-status"}
                label="Name"
                required={true}
                defaultValue={mintStatusData.name}
                onChangeHandler={(e) => setProjectType(e.target.value)}
                placeholder={"Mint Status"}
              />
            </div>
            <Button type="submit" text={"Update"} />
          </form>
        </div>
        {error && <p className="text-red-500 font-medium mt-4">{error}</p>}
      </section>
    </Layout>
  );
};

export default Index;
