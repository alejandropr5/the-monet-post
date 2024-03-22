"use client"
import React from "react"
import Link from "next/link";
import * as prismic from "@prismicio/client";
import NavText from "./NavText";
import { PrismicNextLink } from "@prismicio/next";
import { useViewport } from "@/hooks/viewPort";

export const NavItem = ({ children }) => {
  return (
    <li className="font-bold tracking-tight font-heading text-[#322203] uppercase">
      {children}
    </li>
  );
};

export default function NavBar({ navigation, settings }) {
  const { width } = useViewport()
  const breakpoint = 1024
  
  return (
    <>
      {width > breakpoint ? (
        <nav className="flex flex-row justify-center w-full xl:mr-16">
          <ul className="flex flex-wrap justify-center items-center gap-10 xl:gap-20">
            <NavItem key={prismic.asText(navigation?.data.homepageLabel)}>
              <Link href="/">
                <NavText>
                  {prismic.asText(navigation?.data.homepageLabel)}
                </NavText>
              </Link>
            </NavItem>
            {navigation?.data?.links.map((item, index) => (
              <>
                {index === Math.floor(navigation?.data.links.length / 2) && (
                  <NavItem >
                    <div className="mx-5" key={prismic.asText(settings?.data.name)}>
                    <Link href="/">
                      <span
                        className="font-bold tracking-tighter font-heading phone:text-4xl xl:text-5xl text-[#322203] uppercase"
                      >
                        {prismic.asText(settings?.data.name)}
                      </span>
                    </Link>
                    </div>
                  </NavItem>
                )}
                <NavItem key={prismic.asText(item.label)}>
                  <PrismicNextLink field={item.link}>
                    <NavText>
                      {prismic.asText(item.label)}
                    </NavText>
                  </PrismicNextLink>
                </NavItem>
              </>
            ))}
          </ul>
        </nav>
      ) : (
        <div
          className="flex flex-row justify-center w-full mx-2 phone:mx-5"
          key={prismic.asText(settings?.data.name)}
        >
          <Link href="/">
            <span
              className="font-bold tracking-tighter font-heading text-2xl phone:text-4xl xl:text-5xl text-[#322203] uppercase"
            >
              {prismic.asText(settings?.data.name)}
            </span>
          </Link>
        </div>
      )}
    </>
  )
}
