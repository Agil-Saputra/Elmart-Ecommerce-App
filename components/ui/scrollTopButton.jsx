import { useScrollTrigger, Fab, Zoom } from "@mui/material";
import { KeyboardArrowUp } from "@mui/icons-material";

const scrollTopButton = () => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Zoom in={trigger}>
        <div className="fixed bottom-6 right-5 z-10 bg-primary rounded-[50px] shadow-lg border-gray-100  border-[1px]">
          <Fab
            onClick={scrollToTop}
            color="primary"
            size="small"
            className="shadow-none "
          >
            <KeyboardArrowUp className="text-gray-50" />
          </Fab>
        </div>
      </Zoom>
    </>
  );
};

export default scrollTopButton;
