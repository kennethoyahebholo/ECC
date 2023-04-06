import React from "react";
const SvgTPMinusIcon = ({ size, color, className, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <path d="M0 2V0H14V2H0Z" fill="#004DB3" />
    </svg>
  );
};
SvgTPMinusIcon.defaultProps = {
  size: 14,
  color: "currentColor" || "none",
};
export default SvgTPMinusIcon;
