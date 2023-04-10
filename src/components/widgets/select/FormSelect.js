import Select from "./Select";

const FormSelect = ({ id, label, errors, touched, required, ...rest }) => {
  const error = touched !== undefined && errors !== undefined;
  return (
    <div>
      {label !== undefined && (
        <label htmlFor={id} className="block text-lg text-gray-200">
          {label} {required ? "*" : ""}
        </label>
      )}

      <Select
        {...rest}
        className={`${
          error ? "border-red-900 placeholder:text-gray-300" : ""
        } w-full`}
      />
      {error && <p className="text-red-900 text-sm ">{errors}</p>}
    </div>
  );
};

export default FormSelect;
