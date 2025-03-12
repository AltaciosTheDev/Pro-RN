import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={"/"}>
      <Image
        height={12}
        width={53}
        alt="EVENTO logo"
        src="https://bytegrad.com/course-assets/react-nextjs/evento.png"
      ></Image>
    </Link>
  );
}
