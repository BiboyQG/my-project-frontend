import "./form-input.styles.scss";
import { FaLock, FaUser } from "react-icons/fa"

const FormInput = ({ label, icon, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          <div className="flex flex-row">
            {icon === "user" ? (
              <FaUser className="mt-0.5 pt-1 mr-0.5" />
            ) : (
              <FaLock className="mt-0.5 pt-1 mr-0.5" />
            )}
            {label}
          </div>
        </label>
      )}
    </div>
  );
};

export default FormInput;
