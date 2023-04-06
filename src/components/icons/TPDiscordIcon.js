import React from "react";
const SvgTPDiscordIcon = ({ size, color, className, ...props }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 26"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      {...props}
    >
      <path
        d="M27.0894 2.8129C25.0498 1.87706 22.8626 1.18757 20.5759 0.792672C20.5342 0.785051 20.4926 0.804097 20.4712 0.842191C20.1899 1.34248 19.8783 1.99514 19.6601 2.50813C17.2005 2.13991 14.7536 2.13991 12.3444 2.50813C12.1262 1.98374 11.8033 1.34248 11.5208 0.842191C11.4993 0.805368 11.4577 0.786322 11.4161 0.792672C9.13055 1.18631 6.94341 1.8758 4.90258 2.8129C4.88491 2.82052 4.86977 2.83323 4.85972 2.84972C0.711189 9.04754 -0.425267 15.093 0.13224 21.0635C0.134763 21.0927 0.15116 21.1207 0.173864 21.1384C2.91095 23.1485 5.56228 24.3688 8.16437 25.1776C8.20602 25.1903 8.25014 25.1751 8.27664 25.1408C8.89217 24.3002 9.44086 23.4139 9.9113 22.4819C9.93906 22.4273 9.91256 22.3625 9.85582 22.3409C8.98551 22.0108 8.1568 21.6083 7.35964 21.1512C7.29659 21.1143 7.29154 21.0241 7.34954 20.981C7.5173 20.8553 7.68509 20.7245 7.84527 20.5924C7.87425 20.5683 7.91464 20.5632 7.94871 20.5784C13.1857 22.9695 18.8554 22.9695 24.0306 20.5784C24.0647 20.5619 24.1051 20.567 24.1353 20.5912C24.2955 20.7232 24.4633 20.8553 24.6323 20.981C24.6903 21.0241 24.6865 21.1143 24.6235 21.1512C23.8263 21.6171 22.9976 22.0108 22.126 22.3397C22.0693 22.3612 22.044 22.4273 22.0718 22.4819C22.5523 23.4126 23.101 24.2989 23.7052 25.1395C23.7304 25.1751 23.7758 25.1903 23.8175 25.1776C26.4322 24.3688 29.0835 23.1485 31.8206 21.1384C31.8446 21.1207 31.8597 21.094 31.8622 21.0648C32.5294 14.1622 30.7447 8.16632 27.131 2.85098C27.1221 2.83323 27.107 2.82052 27.0894 2.8129ZM10.6934 17.4281C9.11666 17.4281 7.81751 15.9806 7.81751 14.2029C7.81751 12.4252 9.09147 10.9776 10.6934 10.9776C12.3078 10.9776 13.5944 12.4379 13.5692 14.2029C13.5692 15.9806 12.2952 17.4281 10.6934 17.4281ZM21.3263 17.4281C19.7497 17.4281 18.4505 15.9806 18.4505 14.2029C18.4505 12.4252 19.7244 10.9776 21.3263 10.9776C22.9408 10.9776 24.2274 12.4379 24.2022 14.2029C24.2022 15.9806 22.9408 17.4281 21.3263 17.4281Z"
        fill="#2A2A2B"
      />
    </svg>
  );
};
SvgTPDiscordIcon.defaultProps = {
  size: 32,
  color: "currentColor" || "none",
};
export default SvgTPDiscordIcon;
