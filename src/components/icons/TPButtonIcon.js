import React from "react";
const SvgTPButtonIcon = ({ size, color, className, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 11 11"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <path
        d="M1.33341 11L0.166748 9.83329L8.16675 1.83329H1.00008V0.166626H11.0001V10.1666H9.33341V2.99996L1.33341 11Z"
        fill="white"
      />
    </svg>
  );
};
SvgTPButtonIcon.defaultProps = {
  size: 8,
  color: "currentColor" || "none",
};
export default SvgTPButtonIcon;
