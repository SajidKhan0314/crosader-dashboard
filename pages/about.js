import { useContext, useState } from "react";
import Layout from "../components/Layout";
import Button from "../components/reusableui/Button";
import Backdrop from "../components/UI/Backdrop/Backdrop";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { EditorView } from "@codemirror/view";
import Iframe from "../components/UI/Iframe/Iframe";
import customAxios from "../config/config";
import AuthContext from "../contexts/AuthContext";
import ImageUploader from "../components/UI/ImageUploader/ImageUploader";
import Image from "next/image";

// Server Side props
export async function getServerSideProps(context) {
  const response = await customAxios.get("/about/code");
  let code = response.data;

  if (code === "") {
    code = "//Write your HTML here";
  } else {
    code = code.code;
  }

  return {
    props: { code },
  };
}

const About = ({ code: fetchedCode }) => {
  const { token } = useContext(AuthContext);
  const [code, setCode] = useState(fetchedCode);
  const [showCode, setShowCode] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const saveCode = () => {
    setIsLoading(true);
    setSuccess(false);
    setError(null);
    customAxios
      .post(
        "/about/code",
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setSuccess(true);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(
          error.response.data.error || error.message || JSON.stringify(error)
        );
      });
  };

  const onImageChangeHandler = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <Layout>
      {isLoading && (
        <Backdrop>
          <div className="loader relative top-56 z-50"></div>
        </Backdrop>
      )}
      <h2 className="text-lg font-bold">About</h2>
      {/* <div className="flex justify-between items-center border border-white py-3 px-5 rounded my-4">
        <ImageUploader />
        <ImageUploader />
        <ImageUploader />
        <ImageUploader />
      </div> */}
      <div className="flex w-full justify-end">
        <button
          className={`rounded bg-white shadow border border-purple-700 outline-none p-2 hover:bg-purple-700 hover:text-white mr-4 ${
            showCode ? "bg-purple-700 text-white" : "text-purple-700"
          }`}
          onClick={() => setShowCode((oldState) => !oldState)}
        >
          {showCode ? "Hide Code" : "Show Code"}
        </button>
        <button
          className={`rounded bg-white shadow border border-purple-700 outline-none p-2 ${
            showPreview ? "bg-purple-700 text-white" : "text-purple-700"
          } hover:bg-purple-700 hover:text-white`}
          onClick={() => setShowPreview((oldState) => !oldState)}
        >
          {showPreview ? "Hide Preview" : "Show Preview"}
        </button>
      </div>
      <div className="mt-4 flex flex-row items-stretch">
        {showCode && (
          <div className={`${showPreview ? "w-1/2" : "w-full"}`}>
            <CodeMirror
              value={code}
              height="450px"
              extensions={[javascript({ jsx: true }), EditorView.lineWrapping]}
              onChange={(value, viewUpdate) => {
                setCode(value);
              }}
            />
          </div>
        )}
        {showPreview && (
          <div
            className={`${
              showCode ? "w-1/2 ml-4" : "w-full"
            } rounded bg-white overflow-auto h-450`}
          >
            <Iframe content={code} />
          </div>
        )}
      </div>
      <div className="flex justify-end items-center my-4">
        {error && <p className="text-red-500 font-medium mr-5">{error}</p>}
        {success && (
          <p className="text-green-500 font-medium mr-5">
            Code saved successfully!
          </p>
        )}
        <Button text="Save" onClickHandler={saveCode} />
      </div>
    </Layout>
  );
};

export default About;
