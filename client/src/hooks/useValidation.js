import { useState } from "react";

const useValidation = () => {
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState([]);

  const setError = (input, name, property) => {
    if (!input) {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          [name]: `${property} is required`,
        };
      });
    }
    else {
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          [name]: undefined,
        };
      });
    }
    return;
  };
  const setMessage = (value, name, nameError, property) => {
    if (value.length > 0) {
      setSuccess((prevSuccesses) => {
        return {
          ...prevSuccesses,
          [name]: "Looks Good!",
        };
      });
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          [nameError]: undefined,
        };
      });
    } else if (value.length === 0) {
      setSuccess((prevSuccesses) => {
        return {
          ...prevSuccesses,
          [name]: undefined,
        };
      });
      setErrors((prevErrors) => {
        return {
          ...prevErrors,
          [nameError]: `${property} is required`,
        };
      });
    }
  };
  return {
    errors,
    setError,
    success,
    setMessage,
  };
};

export default useValidation;
