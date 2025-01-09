/** Copyright 2022 DZS Inc */
import React, { memo } from "react";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/material";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/types";
import { useMenu } from "../../providers/Menu";
import ActionTooltip from "../Tooltip/ActionTooltip";

type MuiIcon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  /** MUI icon component */
  muiName: string;
};

interface UtilityButtonProps {
  /** MUI icon component */
  Icon: MuiIcon;
  /** Option's name and link or onClick */
  UtilityPanelComponent: () => JSX.Element;
  /** Button's name */
  title: string;
}

function UtilityDrawerButton({ Icon, UtilityPanelComponent, title }: UtilityButtonProps): JSX.Element {
  const { openUtility } = useMenu();
  const handleButtonClick = () => {
    openUtility(UtilityPanelComponent);
  };

  return (
    <ActionTooltip title={title}>
      <Box paddingTop={5} paddingBottom={5}>
        <IconButton color="inherit" size="large" aria-controls={title} onClick={handleButtonClick}>
          <Icon />
        </IconButton>
      </Box>
    </ActionTooltip>
  );
}

export default memo(UtilityDrawerButton);
