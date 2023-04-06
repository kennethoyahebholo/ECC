import React from "react";
const SvgTPAddIcon = ({ size, color, className, ...props }) => {
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
      <path d="M6 14V8H0V6H6V0H8V6H14V8H8V14H6Z" fill="#000F24" />
    </svg>
  );
};
SvgTPAddIcon.defaultProps = {
  size: 14,
  color: "currentColor" || "none",
};
export default SvgTPAddIcon;
