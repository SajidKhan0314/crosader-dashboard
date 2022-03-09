import "../styles/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { store } from "../redux/store";
import { Provider } from "react-redux";
// Context
import AuthContext from "../contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  // next router
  const router = useRouter();

  const value = {
    token,
    setToken,
    authenticated,
    setAuthenticated,
    loading,
    setLoading,
  };

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (!localToken) {
      setToken(null);
      setAuthenticated(false);
      router.push("/login");
    }
  }, [token, loading, authenticated]);

  useEffect(() => {
    const localToken = localStorage.getItem("token");

    if (localToken !== null) {
      setAuthenticated(true);
      setToken(localToken);
      if (router.pathname === "login") {
        router.push("/projects");
      }
      return;
    }
  }, [authenticated, token]);

  return (
    <Provider store={store}>
      <AuthContext.Provider value={value}>
        <Component {...pageProps} />
      </AuthContext.Provider>
    </Provider>
  );
}

export default MyApp;
