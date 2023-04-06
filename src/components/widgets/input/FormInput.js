import Input from "./Input";


const FormInput = ({ id, label, errors, touched, required, ...rest }) => {
  const error = touched !== undefined && errors !== undefined;
  return (
    <div className="space-y-2">
      {label !== undefined && (
        <label htmlFor={id} className="block text-lg text-gray-200">
          {label} {required ? "*" : ""}
        </label>
      )}

      <Input
        {...rest}
        className={`${error ? "border-red text-red placeholder:text-red" : ""} w-full`}
      />
      {error && <p className="text-red text-base ">{errors}</p>}
    </div>
  );
};

export default FormInput;
