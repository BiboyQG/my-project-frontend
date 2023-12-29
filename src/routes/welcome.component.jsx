import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const Welcome = () => {
  return (
    <Fragment>
      <div className="flex h-screen w-screen overflow-hidden">
        <div
          className="flex-1"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute left-8 bottom-8 text-base text-stone-100 shadow-black/50 text-shadow">
          <div className='text-4xl my-3'>Welcome to the platform</div>
          <div className="text-base my-1">
            A place where you can feel free to dive into the ocean of knowledge
          </div>
          <div className="text-base">
            A place where you can enjoy life-long learning
          </div>
        </div>
        <Outlet />
      </div>
    </Fragment>
  );
};

export default Welcome;
