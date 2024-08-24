"use client";
import * as React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa";
import { Bounce, toast } from "react-toastify";

type Props = {
  code: string;
};
function CopyButton({ code }: Props) {
  const notify = () => {
    toast("🚀Copy code to clipboard", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  return (
    <button className="absolute right-3 top-1" onClick={notify}>
      <CopyToClipboard text={code}>
        <div>
          <FaRegCopy className="text-xl text-slate-300 hover:text-slate-600 active:text-slate-900" />
        </div>
      </CopyToClipboard>
    </button>
  );
}

export default CopyButton;
