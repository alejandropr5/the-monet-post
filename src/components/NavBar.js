"use client"
import React from "react"
import Link from "next/link";
import * as prismic from "@prismicio/client";
import NavText from "./NavText";
import { PrismicNextLink } from "@prismicio/next";

export const NavItem = ({ children, key, isTitle }) => {
  return (
    <li
      className={`font-bold tracking-tight font-heading text-[#322203] uppercase
        ${isTitle ? "" : "max-lg:hidden" }`}
      key={key}
    >
      {children}
    </li>
  );
};

export default function NavBar({ navigation, settings }) {
  return (
    <nav className="flex flex-row justify-center w-full xl:mr-16">
      <ul className="flex flex-wrap justify-center items-center gap-10 xl:gap-20">
        <NavItem key={prismic.asText(navigation?.data.homepageLabel)} isTitle={false}>
          <Link href="/">
            <NavText>
              {prismic.asText(navigation?.data.homepageLabel)}
            </NavText>
          </Link>
        </NavItem>
        {navigation?.data?.links.map((item, index) => (
          <>
            {index === Math.floor(navigation?.data.links.length / 2) && (
              <NavItem key={prismic.asText(settings?.data.name)} isTitle={true}>
                <div className="ml-3 phone:mx-5" key={prismic.asText(settings?.data.name)}>
                  <Link href="/">
                    <h1
                      className="font-bold tracking-tighter font-heading text-2xl phone:text-4xl xl:text-5xl text-[#322203] uppercase"
                    >
                      {prismic.asText(settings?.data.name)}
                    </h1>
                  </Link>
                </div>
              </NavItem>
            )}
            <NavItem key={prismic.asText(item.label)} isTitle={false}>
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
  )
}
