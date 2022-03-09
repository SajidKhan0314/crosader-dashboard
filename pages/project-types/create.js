import { useState, useContext } from "react";
import FormInput from "../../components/create-project/FormInput";
import Button from "../../components/reusableui/Button";
import Layout from "../../components/Layout";
import AuthContext from "../../contexts/AuthContext";
import customAxios from "../../config/config";
import { useRouter } from "next/router";
import Backdrop from "../../components/UI/Backdrop/Backdrop";

const Index = () => {
  const router = useRouter();
  const { token } = useContext(AuthContext);
  const [projectType, setProjectType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    customAxios
      .post(
        "/project-types",
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
        router.push("/project-types");
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error || err.message || JSON.stringify(err));
      });
  };

  return (
    <Layout>
      {isLoading && (
        <Backdrop>
          <div className="loader relative top-56 z-50"></div>
        </Backdrop>
      )}
      <section>
        <div>
          <h2 className="text-2xl leading-normal text-gray-800">
            Project Type
          </h2>
        </div>
        <div className="w-full rounded-md bg-white px-8 mt-8">
          <form onSubmit={submitHandler} className="flex items-center pb-8 ">
            <div className="py-4 w-full">
              <FormInput
                name={"project-type"}
                label="Name"
                value={projectType}
                required={true}
                type={"text"}
                onChangeHandler={(e) => setProjectType(e.target.value)}
                placeholder={"Project Type"}
              />
            </div>
            <Button text={"Create"} />
          </form>
        </div>
        {error && <p className="text-red-500 font-medium mt-4">{error}</p>}
      </section>
    </Layout>
  );
};

export default Index;
