"use client";
import React from "react";
import dynamic from "next/dynamic";

const MobileFooter = dynamic(() => import("./MobileFooter"));
const PCFooter = dynamic(() => import("./PCFooter"));

const Footer = () => {
  return (
    <>
      <div className="block lg:hidden">
        <MobileFooter />
      </div>

      <div className="hidden lg:block">
        <PCFooter />
      </div>
    </>
  );
};

export default Footer;