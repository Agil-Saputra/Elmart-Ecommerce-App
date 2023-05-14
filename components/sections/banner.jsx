import Image from "next/image";

export default function Banner({ data }) {
  return (
    <Image
      src={"https:" + data[0].fields.bottomBanner.fields.file.url}
      alt='banner Image'
      priority
      width={960}
      height={120}
      className="w-full mt-16 shadow-xl bg-red-400 "
    />
  );
}
