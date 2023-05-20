import { SkipPrevious, SkipNext,  } from "@mui/icons-material";
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';


const iconSettings = {
    fontSize : "small",
    className : "p-[2px]"
}

export function NextArrow({onClick, className} ) {
    return (
      <div
        className={(className?.includes("slick-disabled") ? "arrow-disabled " : "") + "arrow arrow-right"}
        onClick={onClick}
      >
        <ArrowForwardIosRoundedIcon {...iconSettings}/>
      </div>
    );
  }
  
  export function PrevArrow({onClick, className} ) {
    return (
      <div
        className={(className?.includes("slick-disabled") ? "arrow-disabled " : "") + "arrow arrow-left"}
        onClick={onClick}
      >
      <ArrowBackIosNewRoundedIcon {...iconSettings}/>
      </div>
    );
  }