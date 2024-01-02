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
  code: "",
};

const Reset = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, passwordConfirm, code } = formFields;
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
  };

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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isValidPassword(password, passwordConfirm)) {
      return;
    }

    if (!isValidEmail(email)) {
      return;
    }

    reset();
  };

  function reset() {
    if (!code) {
      toast.warn("Please fill in your verification code!");
    }
    //post
  }

  const askCode = () => {
    if (cooldown === 0) {
      setCooldown(60);
      get(
        `/api/auth/ask-code?email=${email}&type=reset`,
        () => {
          toast.success(
            `Your verification code has been successfully sent to your email: ${email}!`
          );
        },
        (message) => {
          toast.error(message);
          setCooldown(0);
        }
      );
    }
  };

  return (
    <AnimatedPage>
      <div className="flex flex-col items-center justify-center">
        <div className="text-4xl font-bold text-center text-gray-800">
          Reset
        </div>
        <div className="text-gray-500 mt-6 text-sm">
          Reset account with your email and password
        </div>
        <div className="w-full px-16 py-4 mt-1 rounded-lg">
          <div className="flex flex-col items-center justify-center">
            <form>
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
            </form>
            <Button
              color="primary"
              variant="ghost"
              className="my-8"
              fullWidth={true}
              onClick={handleSubmit}
            >
              Reset
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

export default Reset;
