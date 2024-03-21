"use client"
import React, { useRef, useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import ClientImage from "./ClientImage"
import upArrowSVG from "../../public/up-arrow.svg"

export default function TopButton ({ children }) {
  const header = useRef(null)
  const [isInView, setIsInView] = useState(false)

  const pathname = usePathname()
  const isHomePage = pathname === "/"

  const checkInView = () => {
    const rect = header.current?.getBoundingClientRect()
    setIsInView(
      rect.top < window.innerHeight && rect.bottom >= 0
    )
    // console.log({
    //   "rect.top": rect.top,
    //   "window.innerHeight": window.innerHeight,
    //   "rect.bottom": rect.bottom,
    // })
  }

  useEffect(() => {
      checkInView()
  }, [])

  useEffect(() => {
    document.addEventListener("scroll", checkInView)
    return () => {
        document.removeEventListener("scroll", checkInView)
    }
  }, [])

  return (
    <>
      <div ref={header}>
        {children}
      </div>
      {!isInView && isHomePage &&
        <button
          className="fixed bottom-8 right-8 rounded-full bg-[#a5926b] z-50 p-1"
          onClick={() => {header.current?.scrollIntoView({behavior: "smooth"})}}
        >
          <div className="w-7 h-7">
            <ClientImage imageComponent={upArrowSVG} description={"Up Arrow svg"} />
          </div>
        </button>
      }
    </>
  )
}
