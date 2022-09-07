import React from "react";

const FormInput = (props) => {
  return (
    <div className="flex flex-col mb-3">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={props.forwardRef}
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        className={`border p-2 ${props.classes} focus:border-2 focus:outline-none`}
        onChange={props.changeHandler}
        required
        min={props.min}
        max={props.max}
        defaultValue={props.value}
      />
      <p className="text-red-600">{props.error && props.error}</p>
      <p className="text-green-500">
        {props.success && props.success}
      </p>
    </div>
  );
};

export default FormInput;
