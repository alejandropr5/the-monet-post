import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";
import { Layout } from "@/components/Layout";
import { Bounded } from "@/components/Bounded";
import { Article } from "@/components/Article";
import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";
import ClientImage from "@/components/ClientImage"
import rightArrowSVG from "../../public/right-arrow.svg"

export async function generateMetadata() {
  const client = createClient();
  const settings = await client.getSingle("settings");

  return {
    title: prismic.asText(settings.data.name),
  };
}

export default async function Index() {
  const client = createClient();

  const articles = await client.getAllByType("article", {
    orderings: [
      { field: "my.article.publishDate", direction: "desc" },
      { field: "document.first_publication_date", direction: "desc" },
    ],
  });
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");

  const article = articles[0]
  const featuredImage = 
    (prismic.isFilled.image(article.data.featuredImage) &&
      article.data.featuredImage) ||
    findFirstImage(article.data.slices)

  return (
    <Layout
      withHeaderDivider={false}
      navigation={navigation}
      settings={settings}
    >
      <div className="relative h-[calc(100vh-88px)] w-full overflow-hidden">
        {prismic.isFilled.image(featuredImage)&& (
          <PrismicNextImage
            field={featuredImage}
            fill={true}
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div
          className="absolute inset-0 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center backdrop-filter backdrop-blur-sm bg-black/50 w-fit h-fit space-y-6 p-4">
            <h2 className="font-bold tracking-tight font-content text-6xl text-[#EBEBEB] max-w-3xl text-center z-50">
              {article.data.meta_title}
            </h2>
            <Link
              className="bg-[#EBEBEB] px-6 py-3 text-[#a5926b] font-semibold font-content text-sm shadow-lg z-50 relative flex flex-row items-center justify-center"
              href={article.url}
            >
              READ NOW
              <div className="w-4 h-4 ml-2">
                <ClientImage imageComponent={rightArrowSVG} description={"Right Arrow svg"} />
              </div>
            </Link>
          </div>
        </div>
      </div>
      
      <Bounded size="widest">
          
      </Bounded>     

      <Bounded size="widest">
        <ul className="grid grid-cols-1 gap-16">
          {articles.map((article_item, index) => (
            <>
              {index !== 0 &&
                <Article key={article_item.id} article={article_item} />
              }            
            </>
          ))}
        </ul>
      </Bounded>
    </Layout>
  );
}
