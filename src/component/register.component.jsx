import { Button, Divider } from "@nextui-org/react";
import FormInput from "./form-input/form-input.component";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const defaultFormFields = {
  email: "",
  password: "",
  passwordConfirm: "",
  username: "",
  code: "",
};

const Register = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, username, passwordConfirm, code } = formFields;
  const navigate = useNavigate();
  const notifyPasswordNotSame = () => toast.error("Passwords not the same!");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== passwordConfirm) {
      notifyPasswordNotSame();
      return;
    }
  };

  return (
    <div className="w-96 bg-white flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="text-4xl font-bold text-center text-gray-800">
          Sign up
        </div>
        <div className="text-gray-500 mt-6 text-sm">
          Sign up with your username, email and password
        </div>
        <div className="w-full px-8 py-4 mt-1 rounded-lg">
          <div className="flex flex-col items-center justify-center">
            <form>
              <div className="w-full mb-8">
                <FormInput
                  label="Username"
                  type="text"
                  required
                  onChange={handleChange}
                  name="username"
                  value={username}
                  icon="user"
                />
              </div>
              <div className="w-full mb-8">
                <FormInput
                  label="Password"
                  type="password"
                  required
                  onChange={handleChange}
                  name="password"
                  value={password}
                  icon="lock"
                />
              </div>
              <div className="w-full mb-8">
                <FormInput
                  label="Password Confirm"
                  type="password"
                  required
                  onChange={handleChange}
                  name="passwordConfirm"
                  value={passwordConfirm}
                  icon="lock"
                />
              </div>
              <div className="w-full mb-8">
                <FormInput
                  label="Email"
                  type="email"
                  required
                  onChange={handleChange}
                  name="email"
                  value={email}
                  icon="email"
                />
              </div>
              <div className="w-2/3">
                <FormInput
                  label="Verification Code"
                  type="password"
                  required
                  onChange={handleChange}
                  name="code"
                  value={code}
                  icon="code"
                />
              </div>
              <Button
                color="primary"
                variant="ghost"
              >Send</Button>
            </form>
            <Button
              color="primary"
              variant="ghost"
              className="my-8"
              fullWidth={true}
              onClick={handleSubmit}
            >
              Sign up
            </Button>
          </div>
          <Divider />
          <Button
            color="secondary"
            variant="ghost"
            className="my-8"
            fullWidth={true}
            onClick={() => navigate("/login")}
          >
            Sign in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
