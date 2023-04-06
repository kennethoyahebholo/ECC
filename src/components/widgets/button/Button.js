import React from "react";
import { Link } from "react-router-dom";

import { TPButtonIcon } from "../../../components/icons";

const Button = ({
  to,
  children,
  size = "md",
  variant = "full",
  className = "",
  icon,
  ...rest
}) => {
  const getSize = (size) => {
    switch (size) {
      case "sm":
        return "px-2 h-10";
      case "md":
        return "px-4 h-12";
      case "lg":
        return "px-6 h-16";

      default:
        return "p-1 h-10";
    }
  };
  const Button = () => (
    <button
      className={`${getSize(size)} ${
        variant === "full"
          ? "bg-white text-[#004DB3]"
          : variant === "full-green"
          ? "text-white bg-green-800"
          : "border border-[#373a36] text-[#373a36] px-[30px]"
      } ${className}  rounded-full font-bold px-10 text-sm flex justify-center items-center max-h-[39px] gap-3`}
      {...rest}
    >
      {children} {icon && <TPButtonIcon />}
    </button>
  );

  if (to !== undefined)
    return (
      <Link to={to}>
        <Button />
      </Link>
    );

  return <Button />;
};

export default Button;
