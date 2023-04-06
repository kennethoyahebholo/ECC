import React from "react";
import { Link } from "react-router-dom";

import {
  TPFacebookIcon,
  TPTwitterIcon,
  TPYoutubeIcon,
  TPInstagramIcon,
  TPDiscordIcon,
} from "../../../components/icons";
import { Button } from "../../widgets";

const Footer = () => {
  return (
    <div className="w-full px-3 md:px-10 xl:px-20  pt-10 md:pt-6 pb-1 md:pb-1 flex justify-between bg-[#f1f1f1]">
      <div className="w-full grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2">
        <div className="space-y-3 w-full mb-20">
          <div className="mb-8 space-y-4">
            <p className=" text-[18px] text-[#3d3d3d]">
              Sign up to our newsletter and get 10% off your first online order
            </p>
            <Button variant="full-green">Sign up</Button>
          </div>
          <div className="space-y-5">
            <h4 className="text-[18px] md:text-[20px] font-semibold text-[#3d3d3d]">
              Customer Services
            </h4>
            <div className="flex flex-col text-[12px] md:text-[15px] text-[#3d3d3d] space-y-3">
              <Link to="#">Customer Services</Link>
              <Link to="#">Contact Us</Link>
              <Link to="#">Returns & Refunds</Link>
              <Link to="#">Delivery Information</Link>
              <Link to="#">Pricing Policy</Link>
              <Link to="#">Finance Options</Link>
              <Link to="#">Book Your Kitchen Consultation</Link>
              <Link to="#">Bespoke Sliding Wardrobes</Link>
              <Link to="#">Room Planners</Link>
              <Link to="#">Tapi Carpet</Link>
              <Link to="#">Cookie Settings</Link>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="mb-10 space-y-3">
            <p className="max-w-[280px] text-[16px] md:text-[18px] text-[#3d3d3d]">
              Connect with us
            </p>
            <div className="flex flex-wrap max-w-[230px] justify-between">
              <TPFacebookIcon />
              <TPTwitterIcon />
              <TPYoutubeIcon />
              <TPInstagramIcon />
              <TPDiscordIcon />
            </div>
          </div>
          <div className="grid grid-col-1 md:grid-cols-3 gap-5">
            <div className="space-y-5 text-[#3d3d3d]">
              <h4 className="text-[18px] md:text-[20px] font-semibold">
                Resources
              </h4>
              <div className="flex flex-col text-[12px] md:text-[15px] space-y-3 max-w-[150px]">
                <Link to="#">In Store Services</Link>
                <Link to="#">Brochures</Link>
                <Link to="#">Our Brands</Link>
                <Link to="#">DIY Safety Tips</Link>
                <Link to="#">FAQs</Link>
                <Link to="#">Cookie Policy</Link>
                <Link to="#">Privacy Policy</Link>
                <Link to="#">Terms & Conditions</Link>
                <Link to="#">Competition terms & condition</Link>
                <Link to="#">Accessibility</Link>
                <Link to="#">Product Recalls</Link>
              </div>
            </div>
            <div className="space-y-5 text-[#3d3d3d]">
              <h4 className="text-[18px] md:text-[20px] font-semibold">
                Top Categories
              </h4>
              <div className="flex flex-col text-[12px] md:text-[15px] space-y-3 max-w-[150px]">
                <Link to="#">Paint & Decorating</Link>
                <Link to="#">Garden & Outdoor</Link>
                <Link to="#">Kitchens</Link>
                <Link to="#">Bathrooms & Plumbing</Link>
                <Link to="#">Flooring & Tiling</Link>
                <Link to="#">Lighting, Electrical & Heating</Link>
                <Link to="#">Furniture</Link>
                <Link to="#">Storage & Home</Link>
                <Link to="#">Building & Hardware</Link>
                <Link to="#">Tools</Link>
              </div>
            </div>
            <div className="space-y-5 text-[#3d3d3d]">
              <h4 className="text-[18px] md:text-[20px] font-semibold ">
                About Us
              </h4>
              <div className="flex flex-col text-[12px] md:text-[15px] space-y-3 max-w-[150px]">
                <Link to="#">About Us</Link>
                <Link to="#">Our Team</Link>
                <Link to="#">Our History</Link>
                <Link to="#">Growing Responsibly</Link>
                <Link to="#">Statements & Policies</Link>
                <Link to="#">Press Office</Link>
                <Link to="#">Careers</Link>
                <Link to="#">Student Discounts</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
