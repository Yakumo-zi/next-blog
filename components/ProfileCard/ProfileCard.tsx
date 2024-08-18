import { cn } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps } from "react";

type Props = {} & ComponentProps<"div">;
const mostLanguagesPicture =
  "https://camo.githubusercontent.com/a4d5172a859ec46e1a15291e1f382ca6ba10a49cd0e059d774d66001cf2c605e/68747470733a2f2f6769746875622d726561646d652d73746174732d696f74612d73616e64792d32342e76657263656c2e6170702f6170692f746f702d6c616e67732f3f757365726e616d653d59616b756d6f2d7a69266c61796f75743d636f6d706163742673697a655f7765696768743d302e3526636f756e745f7765696768743d302e35266578636c7564655f7265706f3d6769746875622d726561646d652d73746174732c6d63755f73747564792c646f7466696c65732c6275696c642d796f75722d6f776e2d782c6e6f74652c7275737426686964653d4d616b6566696c652c48544d4c2c417373656d626c792c5368656c6c2c434d616b65";
const avatarPicture = "https://avatars.githubusercontent.com/u/78243070?v=4";
const ProfileCard = ({ className, ...props }: Props) => {
  return (
    <div
      className={cn(
        "w-[260px] flex flex-col items-center justify-center rounded-sm overflow-hidden gap-2 bg-white p-2 select-none",
        className
      )}
      {...props}
    >
      <Link
        href="https://github.com/Yakumo-zi"
        className="font-bold font-mono text-xl flex flex-col items-center justify-center gap-2"
      >
        <div className="w-full h-[180px] flex items-center justify-center">
          <Image
            className="rounded-full"
            src={avatarPicture}
            alt="avatar"
            width={160}
            height={160}
          />
        </div>
        <strong>Yakumo-Zi</strong>
      </Link>
      <Image
        src={mostLanguagesPicture}
        alt="profile"
        width={260}
        height={260}
      />
    </div>
  );
};

export default ProfileCard;
