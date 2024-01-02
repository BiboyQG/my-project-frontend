import { Button, Checkbox, Link, Divider } from "@nextui-org/react";
import FormInput from "./form-input/form-input.component";
import { useState } from "react";
import { login } from "../net";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AnimatedPage from "./welcome-page-animation.component";

const defaultFormFields = {
  email: "",
  password: "",
  remember: true
};

const Login = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, remember } = formFields;
  const navigate = useNavigate();
  const notifyLoginFailed = () => toast.error("Username/email or password incorrect!");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      login(email, password, remember, () => {
        navigate("/");
      }, () => { 
        notifyLoginFailed();
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AnimatedPage>
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-center text-gray-800">
            Login
          </div>
          <div className="text-gray-500 mt-6 text-sm">
            Sign in with your username/email and password
          </div>
          <div className="w-full px-8 py-4 mt-1 rounded-lg">
            <div className="flex flex-col items-center justify-center">
              <form>
                <div className="w-full mb-8">
                  <FormInput
                    label="Username/email"
                    type="text"
                    required
                    onChange={handleChange}
                    name="email"
                    value={email}
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
                <div className="flex justify-between w-full">
                  <Checkbox defaultSelected onChange={handleChange} name="remember">
                    Remember
                  </Checkbox>
                  <Link color href="#">
                    Forgot
                  </Link>
                </div>
              </form>
              <Button
                color="primary"
                variant="ghost"
                className="my-8"
                fullWidth={true}
                onClick={handleSubmit}
              >
                Sign in
              </Button>
            </div>
            <Divider />
            <Button
              color="secondary"
              variant="ghost"
              className="my-8"
              fullWidth={true}
              onClick={() => navigate("/register")}
            >
              Sign up
            </Button>
          </div>
        </div>
    </AnimatedPage>
  );
};

export default Login;
