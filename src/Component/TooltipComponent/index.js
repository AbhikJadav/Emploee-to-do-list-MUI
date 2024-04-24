import React from "react";
import Tooltip from "@mui/material/Tooltip";

const TooltipComponent = ({
  title = "",
  content,
  placement = "bottom",
  ...rest
}) => {
  return (
    <div>
      <Tooltip title={title} placement={placement} {...rest}>
        {content}
      </Tooltip>
    </div>
  );
};

export default TooltipComponent;
