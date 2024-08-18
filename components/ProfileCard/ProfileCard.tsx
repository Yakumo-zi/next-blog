"use client";
import { cn } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";
import Tag from "../UI/Tag";

type Props = {} & ComponentProps<"div">;
const mostLanguagesPicture =
  "https://github-readme-stats-iota-sandy-24.vercel.app/api/top-langs/?username=Yakumo-zi&layout=compact&size_weight=0.5&count_weight=0.5&exclude_repo=github-readme-stats,mcu_study,dotfiles,build-your-own-x,note,rust&hide=Makefile,HTML,Assembly,Shell,CMake";
const avatarPicture = "https://avatars.githubusercontent.com/u/78243070?v=4";

const ProfileCard = ({ className, ...props }: Props) => {
  return (
    <div
      className={cn(
        "w-[260px] flex flex-col items-center justify-center rounded-sm overflow-hidden gap-4 bg-white pb-2",
        className
      )}
      {...props}
    >
      <Link
        href="https://github.com/Yakumo-zi"
        className="w-full flex items-center justify-around p-2 bg-sky-50"
      >
        <Image
          className=" rounded-md"
          src={avatarPicture}
          priority={true}
          alt="avatar"
          width={100}
          height={100}
          unoptimized
        />
        <div className="flex flex-col gap-2">
          <strong className="font-bold font-mono text-xl ">Yakumo-Zi</strong>
          <Tag className="bg-sky-100 text-slate-900 font-mono shrink-0">
            Programmer
          </Tag>
          <Tag className="bg-cyan-100 text-slate-900 font-mono shrink-0">
            Learner
          </Tag>
        </div>
      </Link>
      <div className="w-11/12 p-2 shadow-md">
        <span className=" italic text-lg text-pretty antialiased underline">
          Talk is cheap. Show me the code.
        </span>
      </div>
      <Image
        src={mostLanguagesPicture}
        alt="profile"
        width={244}
        height={144}
        unoptimized
      />
    </div>
  );
};

export default ProfileCard;
