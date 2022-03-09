import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/router";
import AuthContext from "../../contexts/AuthContext";
import customAxios from "../../config/config";

const ROUTES = [
  {
    text: "Dashboard",
    link: "/dashboard",
    icon: "/homeIcon.svg",
  },
  {
    text: "Projects",
    link: "/projects",
  },
  {
    text: "Status",
    link: "/status",
  },
  {
    text: "Project Types",
    link: "/project-types",
  },
  {
    text: "Mint Status",
    link: "/mint-status",
  },
  {
    text: "Right Panel",
    link: "/right-panel",
  },
  {
    text: "Left Panel",
    link: "/left-panel",
  },
  {
    text: "About",
    link: "/about",
  },
];

const SideNavigation = () => {
  const router = useRouter();

  const { token, setAuthenticated, setToken, setLoading } =
    useContext(AuthContext);

  const logout = async () => {
    setLoading(true);
    await customAxios
      .post(
        "/users/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .catch((e) => {
        console.log(e);
      });
    localStorage.clear();
    setAuthenticated(false);
    setToken(null);
  };

  // Check active link
  return (
    <nav className="w-[260px] h-full fixed flex flex-col justify-between bg-gray-900">
      <div>
        {/* Logo */}
        {/* <div className="h-24 p-5 flex items-center justify-center border-b border-[#1F2937]">
          <Image src={"/logo.svg"} width={56} height={56} alt="Logo" />
        </div> */}
        {/* Menu links */}
        <div>
          <ul className="mt-5">
            {ROUTES.map((route) => {
              return (
                <li key={route.link} className="relative">
                  {route.icon && (
                    <div className="absolute top-4 left-7">
                      <Image
                        src={route.icon}
                        width={24}
                        height={24}
                        alt="Route Icon"
                      />
                    </div>
                  )}
                  <Link href={route.link}>
                    <a
                      className={`w-full flex ${
                        router.asPath.includes(route.link)
                          ? "bg-purple-700"
                          : ""
                      }  hover:bg-purple-700 cursor-pointer  items-center h-14 pl-16 gap-3 text-gray-200 text-[18px] font-semibold leading-[18px]`}
                    >
                      {route.text}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* Logout Button */}
      <div>
        <div
          onClick={logout}
          className="flex hover:bg-red-500 cursor-pointer h-14  items-center mb-10 pl-9 gap-3 text-gray-200 text-[18px] font-semibold leading-[18px]"
        >
          <Image
            src={"/logoutIcon.svg"}
            width={24}
            height={24}
            alt="Logout Icon"
          />
          Logout
        </div>
      </div>
    </nav>
  );
};

export default SideNavigation;
