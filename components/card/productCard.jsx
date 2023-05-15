import * as React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import Link from "next/link";

export default function ProductCard({
  title,
  price,
  category,
  desc,
  image,
  slug,
  data,
}) {
  return title ? (
    <Link href={"/" + slug}>
      <Card className="ms:w-full shadow-none cursor-pointer p-1 hover:scale-[1.02] border-[1px] smooth-transition active:scale-[1.01] ">
        <CardMedia
          image={"https:" + image}
          className="w-full h-[180px] md:h-[200px] rounded-[2px] object-fill"
        />
        <CardContent className="p-1 last:pb-0">
          <Typography className="font-bold text-sm" color="text.secondary">
            {category}
          </Typography>
          <Stack direction="row" justifyContent="space-between" gap={2}>
            <Typography className="font-bold text-lg text-black  handle-text-overflow line-clamp-1">
              {title}
            </Typography>
            <Typography className="font-bold text-xl text-black">
              ${price}
            </Typography>
          </Stack>
          <Typography
            className="text-[14px] min-h-[16px] handle-text-overflow line-clamp-2 my-2"
            component="div"
          >
            {desc}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  ) : null;
}