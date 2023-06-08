import * as React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Badge,
} from "@mui/material";
import Link from "next/link";
import { styled } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 45,
    top: 18,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
    borderRadius: "2px",
    width: "100px",
    color: "white",
    fontWeight : "bold",
    backgroundColor : "#5369D4",
  },
}));

export default function ProductCard({
  title,
  price,
  category,
  desc,
  image,
  slug,
  trending,
}) {
  return title ? (
    <Link href={"/" + slug}>
      <StyledBadge badgeContent={trending ? "Trending" : 0} color="primary" >
        <Card className="ms:w-full shadow-none cursor-pointer p-1 hover:scale-[1.01] border-[1px] smooth-transition active:scale-[1.01] hover:text-primary group">
          <CardMedia
            image={"https:" + image}
            className="w-full h-[180px] md:h-[200px] rounded-[2px] bg-contain bg-slate-100 group-hover:bg-cover"
          />

          <CardContent className="p-1 last:pb-0">
            <Typography
              className="font-bold text-sm handle-text-overflow line-clamp-1"
              color="text.secondary"
            >
              {category}
            </Typography>
            <Stack direction="row" justifyContent="space-between" gap={2}>
              <Typography className="font-bold text-lg handle-text-overflow line-clamp-1">
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
      </StyledBadge>
    </Link>
  ) : null;
}
