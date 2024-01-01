import "./form-input.styles.scss";
import {
  FaLock,
  FaUser,
  FaEnvelope,
  FaFingerprint,
} from "react-icons/fa";

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
            ) : icon === "lock" ? (
              <FaLock className="mt-0.5 pt-1 mr-0.5" />
            ) : icon === "code" ? (
              <FaFingerprint className="mt-0.5 pt-1 mr-0.5" />
            ) : (
              <FaEnvelope className="mt-1 pt-0.5 mr-1" />
            )}
            {label}
          </div>
        </label>
      )}
    </div>
  );
};

export default FormInput;
