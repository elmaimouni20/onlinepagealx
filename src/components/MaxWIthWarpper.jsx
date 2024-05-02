import { cn } from "@/lib/utils";
import Image from "next/image";

export default function MaxWithWrapper({className,children}) {
  return (
    <div className={cn("mx-auto w-full max-w-screen-xl px-2.5 md:px-20",className)}>
        {children}
    </div>
  );
}
