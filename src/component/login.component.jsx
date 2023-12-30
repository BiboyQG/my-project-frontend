import { Button } from "@nextui-org/react";
import FormInput from "./form-input/form-input.component";
import { useState } from "react";

const defaultFormFields = {
  email: "",
  password: "",
};

const Login = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="w-96 bg-white flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="text-4xl font-bold text-center text-gray-800">
          Login
        </div>
        <div className="w-full px-8 py-4 mt-6 bg-gray-100 rounded-lg">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full">
              <FormInput
                label="Email"
                type="email"
                required
                onChange={handleChange}
                name="email"
                value={email}
              />
            </div>
            <div className="w-full mt-4">
              <FormInput
                label="Password"
                type="password"
                required
                onChange={handleChange}
                name="password"
                value={password}
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
