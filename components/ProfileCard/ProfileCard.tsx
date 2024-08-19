"use client";
import { cn } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";
import Tag from "../UI/Tag";

type Props = {} & ComponentProps<"div">;
const mostLanguagesPicture =
  "https://github-readme-stats-iota-sandy-24.vercel.app/api/top-langs/?username=Yakumo-zi&layout=compact&size_weight=0.5&count_weight=0.5&exclude_repo=github-readme-stats,mcu_study,dotfiles,build-your-own-x,note,rust&hide=Makefile,HTML,Assembly,Shell,CMake";

const ProfileCard = ({ className, ...props }: Props) => {
  return (
    <div
      className={cn(
        "flex w-[260px] flex-col items-center justify-center gap-4 overflow-hidden rounded-sm bg-white pb-2",
        className,
      )}
      {...props}
    >
      <Link
        href="https://github.com/Yakumo-zi"
        className="flex w-full items-center justify-around bg-sky-50 p-2"
      >
        <Image
          className="rounded-md"
          src={"/avatar.jpg"}
          priority={true}
          alt="avatar"
          width={100}
          height={100}
        />
        <div className="flex flex-col gap-2">
          <strong className="font-mono text-xl font-bold">Yakumo-Zi</strong>
          <Tag className="shrink-0 bg-sky-100 font-mono text-slate-900">
            Programmer
          </Tag>
          <Tag className="shrink-0 bg-cyan-100 font-mono text-slate-900">
            Learner
          </Tag>
        </div>
      </Link>
      <div className="w-11/12 p-2 shadow-md">
        <span className="text-pretty text-lg italic underline antialiased">
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
