import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Image } from "@nextui-org/react";

const Welcome = () => {
  return (
    <Fragment>
      <div className="flex h-screen w-screen overflow-hidden">
        <div
          className="flex-1"
          style={{
            backgroundImage: `url(https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <Outlet />
      </div>
    </Fragment>
  );
};

export default Welcome;
