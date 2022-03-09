import Page404 from "./Page404";
import Page500 from "./Page500";

const ErrorPage = ({ statusCode }) => {
  let errorPge = null;

  switch (statusCode) {
    case 500:
      errorPge = <Page500 />;
      break;
    case 404:
      errorPge = <Page404 />;
      break;
    default:
      errorPge = <Page404 />;
      break;
  }

  return errorPge;
};

export default ErrorPage;
