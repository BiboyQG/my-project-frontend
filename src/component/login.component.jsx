import { Button, Input } from "@nextui-org/react";

const Login = () => {
    return (
      <div className="w-96 bg-white flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-center text-gray-800">
            Login
          </div>
          <div className="w-full px-8 py-4 mt-6 bg-gray-100 rounded-lg">
            <div className="flex flex-col items-center justify-center">
              <div className="w-full">
                <Input type="email" label="Email" />
              </div>
              <div className="w-full mt-4">
                <Input
                  type="password"
                  label="Password"
                  className="drop-shadow-none"
                />
              </div>
              <Button color="primary" variant="ghost" className="mt-4">
                Ghost
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Login;
