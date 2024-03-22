"use client"
import React, { useState } from "react"
import * as prismic from "@prismicio/client";
import Link from "next/link";
import ClientImage from "./ClientImage"
import menuSVG from "../../public/menu.svg"
import closeSVG from "../../public/close.svg"
import { PrismicNextLink } from "@prismicio/next";
import { useViewport } from "@/hooks/viewPort";

export default function HamburgerMenu({ navigation }) {
  const [showDropdown, setShowDropdown] = useState(false)
  const { width } = useViewport()
  const breakpoint = 1024

  if (width > breakpoint) {
    return null
  }

  return (
    <div className="w-full">
      <div
        className="flex w-full justify-center items-center bg-[#EBEBEB] hover:bg-[#dddddd] font-semibold font-content cursor-pointer"
        onClick={() => {setShowDropdown(!showDropdown)}}
      >
        <div className="flex flex-row justify-center items-center space-x-2">
          <div
            className="w-3 h-3"
          >
            <ClientImage
              imageComponent={showDropdown ? closeSVG : menuSVG}
              description="Menu SVG"
            />
          </div>
          <span className="text-sm text-[#a5926b] py-4">
            Menu        
          </span>      
        </div>
      </div>
      {showDropdown &&
        <nav className="flex flex-col w-full">
          <ul className="flex flex-col ">
            <Link href="/" key={prismic.asText(navigation?.data.homepageLabel)}>
              <li
                className="flex items-center pl-4 py-1 tracking-tight text-base font-heading hover:bg-[#dbdbdb] uppercase w-full text-[#a5926b]"
              >
                {prismic.asText(navigation?.data.homepageLabel)}
              </li>
            </Link>              
            {navigation?.data?.links.map((item) => (
              <PrismicNextLink field={item.link} key={prismic.asText(item.label)}>
                <li
                  className="flex items-center pl-4 py-1 tracking-tight text-base font-heading hover:bg-[#dbdbdb] uppercase w-full text-[#a5926b]"
                >
                    {prismic.asText(item.label)}
                </li>
              </PrismicNextLink>                
            ))}
          </ul>
        </nav>
      }
    </div>
  )
}
