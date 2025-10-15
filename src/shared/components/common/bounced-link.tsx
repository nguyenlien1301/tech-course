import Link from "next/link";

import { IconPlus } from "@/shared/components/icons";

interface BouncedLinkProps {
  url: string;
  blank?: string;
}
const BouncedLink = ({ blank, url }: BouncedLinkProps) => {
  return (
    <Link
      className="flexCenter fixed bottom-14 right-10 z-50 size-10 animate-bounce rounded-full border-2 border-transparent bg-primary text-white transition-all hover:border-2 hover:border-primary hover:bg-white hover:text-primary"
      href={url}
      prefetch={true}
      target={blank}
    >
      <IconPlus className="size-5" />
    </Link>
  );
};

export default BouncedLink;
