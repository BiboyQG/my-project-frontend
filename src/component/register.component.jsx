import { Button, Divider } from "@nextui-org/react";
import FormInput from "./form-input/form-input.component";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AnimatedPage from "./welcome-page-animation.component";
import { get, post } from "../net";

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
  const [cooldown, setCooldown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (cooldown > 0) {
      setIsLoading(true);
      interval = setInterval(() => {
        setCooldown((currentCooldown) => currentCooldown - 1);
      }, 1000);
    } else {
      setIsLoading(false);
    }
    return () => clearInterval(interval);
  }, [cooldown]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const isValidUsername = (username) => {
    if (username === "") {
      toast.warn("Please fill in your username!");
      return false;
    } else if (!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(username)) {
      toast.warn("Username contains special characters!");
      return false;
    } else if (username.length > 25 || username.length < 2) {
      toast.warn(
        "The length of username should be within 2 and 25 characters!"
      );
      return false;
    } else {
      return true;
    }
  };

  const isValidPassword = (password, passwordConfirm) => {
    if (password === "") {
      toast.warn("Pleaes fill in your password!");
      return false;
    } else if (password.length > 30 || password.length < 6) {
      toast.warn(
        "The length of password should be within 6 and 25 characters!"
      );
      return false;
    } else if (password !== passwordConfirm) {
      toast.warn("Passwords not the same!");
      return false;
    } else {
      return true;
    }
  }

  const isValidEmail = (email) => {
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      toast.warn("Please fill in a valid email!");
      return false;
    } else if (email === "") {
      toast.warn("Please fill in your email!");
      return false;
    } else { 
      return true;
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValidUsername(username)) {
      return;
    }

    if (!isValidPassword(password, passwordConfirm)) {
      return;
    }

    if (!isValidEmail(email)) {
      return;
    }
    
    register();
  };

  function register() {
    if (!code) {
      toast.warn("Please fill in your verification code!")
    }
    post("/api/auth/register", {
      email: email,
      code: code,
      username: username,
      password: password
    }, () => {
      toast.success("You have successfully registered! Redirecting you to sign in page...")
      navigate('/login');
    }, (message) => {
      toast.error(message);
    })
  }

  const askCode = () => {
    if (email === '') {
      toast.warn("Please fill in your email address!");
      return;
    }
    if (cooldown === 0) {
      setCooldown(60);
      get(`/api/auth/ask-code?email=${email}&type=register`, () => {
        toast.success(
          `Your verification code has been successfully sent to your email: ${email}!`
        );
      }, (message) => {
        toast.error(message);
        setCooldown(0);
      });
    }
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col items-center justify-center">
        <div className="text-4xl font-bold text-center text-gray-800">
          Sign up
        </div>
        <div className="text-gray-500 mt-6 text-sm">
          Sign up with your username, email and password
        </div>
        <div className="w-full px-16 py-4 mt-1 rounded-lg">
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
              <div className="w-full flex items-end">
                <div className="flex-grow" style={{ marginRight: "1rem" }}>
                  <FormInput
                    label="Verification Code"
                    type="text"
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
                  className="-translate-y-4"
                  onClick={askCode}
                  isLoading={isLoading}
                  isDisabled={isLoading}
                >
                  {isLoading ? `${cooldown}s` : "Send"}
                </Button>
              </div>
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
    </AnimatedPage>
  );
};

export default Register;
