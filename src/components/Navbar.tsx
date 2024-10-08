import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearJwtToken } from "../features/jwtTokenslice";
import { RootState } from "../store";

function NavList({ handleLogin, isWannaLogin, isLogin }: React.ComponentState) {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(clearJwtToken());
    handleLogin(false);
  };

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        {isLogin ? (
          <a
            href=""
            className="flex items-center hover:text-blue-500 transition-colors"
            onClick={handleLogout}
          >
            Logout
          </a>
        ) : (
          <Link
            className="flex items-center hover:text-blue-500 transition-colors"
            onClick={() => handleLogin(!isWannaLogin)}
            to="/signin"
          >
            Login
          </Link>
        )}
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a
          href="https://github.com/Catopish"
          className="flex items-center hover:text-blue-500 transition-colors"
        >
          Github
        </a>
      </Typography>
    </ul>
  );
}

export function NavbarSimple({
  handleLogin,
  isWannaLogin,
  isLogin,
}: React.ComponentState) {
  const [openNav, setOpenNav] = React.useState(false);
  const auth = useSelector((state: RootState) => state.auth);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <Navbar className="mx-auto max-w-screen-xl px-6 py-3 slide-in-top">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to="/">
          <Typography
            as="a"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5"
          >
            Task Management
            <em className="opacity-65"> ~manage your task with ease~</em>
          </Typography>
        </Link>
        {auth.name !== "" ? (
          <Typography
            as="a"
            variant="h5"
            className="mr-4 cursor-pointer py-1.5"
          >
            <em>Welcome {auth.name}</em>
          </Typography>
        ) : null}
        <div className="hidden lg:block">
          <NavList
            isLogin={isLogin}
            handleLogin={handleLogin}
            isWannaLogin={isWannaLogin}
          />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList handleLogin={handleLogin} isWannaLogin={isWannaLogin} />
      </Collapse>
    </Navbar>
  );
}
