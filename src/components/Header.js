import Link from "next/link";
import * as prismic from "@prismicio/client";
import { PrismicText } from "@prismicio/react";
import { PrismicNextLink, PrismicNextImage } from "@prismicio/next";

import { Bounded } from "./Bounded";
import { Heading } from "./Heading";
import { HorizontalDivider } from "./HorizontalDivider";
import ClientImage from "./ClientImage"
import instagramSVG from "../../public/instagram.svg"
import twitterSVG from "../../public/twitter.svg"
import NavText from "./NavText";

const Profile = ({ name, description, profilePicture }) => {
  return (
    <div className="px-4">
      <div className="grid max-w-lg grid-cols-1 justify-items-center gap-8">
        <PrismicNextLink href="/" tabIndex="-1">
          <div className="relative h-40 w-40 overflow-hidden rounded-full bg-slate-300">
            {prismic.isFilled.image(profilePicture) && (
              <PrismicNextImage
                field={profilePicture}
                fill={true}
                sizes="100vw"
                className="object-cover"
              />
            )}
          </div>
        </PrismicNextLink>
        {(prismic.isFilled.richText(name) ||
          prismic.isFilled.richText(description)) && (
          <div className="grid grid-cols-1 gap-2 text-center">
            {prismic.isFilled.richText(name) && (
              <Heading>
                <PrismicNextLink href="/">
                  <PrismicText field={name} />
                </PrismicNextLink>
              </Heading>
            )}
            {prismic.isFilled.richText(description) && (
              <p className="font-serif text-2xl italic leading-normal tracking-tight text-slate-500">
                <PrismicText field={description} />
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const NavItem = ({ children }) => {
  return (
    <li className="font-bold tracking-tight font-heading text-[#322203] uppercase">
      {children}
    </li>
  );
};

export const Header = ({
  withDivider = true,
  withProfile = true,
  navigation,
  settings,
}) => {
  const socialMedia = [
    {
      imageComponent: instagramSVG,
      description: "Instagram svg",
      url: "https://www.instagram.com/themonetpost"
    },
    {
      imageComponent: twitterSVG,
      description: "Twitter svg",
      url: "https://x.com/themonetpost"
    }    
  ]  
  return (
    <div
      as="header"
      className={`py-3 px-8 bg-[#EBEBEB]
      ${withDivider ? "border-b-[1px] border-b-[#e2e5ec]" : ""}`}
    >
      <div className="flex flex-row items-center">
        <div className="w-fit">
          <div className="relative h-16 w-16 overflow-hidden rounded-full">
            {prismic.isFilled.image(settings.data.profilePicture) && (
              <PrismicNextImage
                field={settings.data.profilePicture}
                fill={true}
                sizes="100vw"
                className="object-cover"
              />
            )}
          </div>
        </div>
        <nav className="flex flex-row justify-center w-full mr-16">
          <ul className="flex flex-wrap justify-center items-center gap-20">
            <NavItem>
              <Link href="/">
                <NavText>
                  {prismic.asText(navigation.data.homepageLabel)}
                </NavText>                
              </Link>
            </NavItem>
            {navigation.data?.links.map((item, index) => (
              <>
                {index === Math.floor(navigation.data.links.length / 2) && (
                  <div className="mx-5">
                    <NavItem key={prismic.asText(settings.data.name)}>
                      <Link href="/">
                        <span
                          className="font-bold tracking-tighter font-heading text-5xl text-[#322203] uppercase"
                        >
                          {prismic.asText(settings.data.name)}
                        </span>
                      </Link>
                    </NavItem>
                  </div>
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
        <nav className="flex flex-row space-x-4">
          {socialMedia.map(item => 
            <a
              key={item.description}
              className="w-7 h-7"
              href={item.url}
              target="_blank"
            >
              <ClientImage imageComponent={item.imageComponent} description={item.description} />
            </a>
          )}
        </nav>
      </div>
        {/* {withDivider && <HorizontalDivider />} */}
    </div>
  );
};
