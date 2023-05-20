import { Avatar, Typography } from "@mui/material";
import Link from "next/link";

export default function CategoryCard({ title, image, slug }) {
  return (
    <Link href={"/categories/" + slug}>
      <div className="w-full cursor-pointer p-2 hover:scale-[1.03] active:scale-100 hover:text-primary border-[1px] rounded-[5px] smooth-transition grid place-items-center my-2">
        <div className="overflow-hidden w-[120px] h-[120px] rounded-[100px] border-[1px]">
          <Avatar
            src={"https://" + image}
            alt={title}
            className="h-[120px] w-full hover:scale-110 smooth-transition"
          />
        </div>
        <Typography className="my-3 text-xl handle-text-overflow line-clamp-1">
          {title}
        </Typography>
      </div>
    </Link>
  );
}
