"use client"

import React from "react"
import Image from "next/image"

export default function ClientImage({ imageComponent,  description}) {
    return (
      <Image
        src={imageComponent}
        alt={description}
        className="w-auto h-auto"
      />
    )
  }