/*
 *
 *   Copyright 2022 DZS Inc
 *
 */
import { Drawer, Box, Toolbar, AppBar, Typography, ListItemButton, SvgIcon, SvgIconProps } from "@mui/material";
import { styled } from "@mui/material";
import Fab from "@mui/material/Fab";
import { memo, PropsWithChildren, ReactComponentElement, useEffect, useRef } from "react";
import { Close } from "@mui/icons-material";
import { useIntl } from "react-intl";
import { useMenu } from "../../providers/Menu";
import ActionTooltip from "../Tooltip";
import React from "react";

interface Props {
  /** Panel's name to display */
  name?: string;
  /** PanelBar's button */
  panelBarButtons?: ReactComponentElement<any>;
}

const drawerWidth = 500;
const StyledDrawer = styled(Drawer)({
  width: drawerWidth,
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    top: 48, // equal to AppBar height
  },
});

export const StyledListItemButton = memo(
  styled(ListItemButton)(({ theme }) => ({
    color: theme.palette.primary.main,
    width: drawerWidth,
    "&.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    "&:hover": {
      color: theme.palette.text.secondary,
      "& .MuiListItemIcon-root": {
        color: theme.palette.text.secondary,
      },
    },
  }))
);

const StyledFab = memo(
  styled(Fab)(({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
  }))
);

const FABIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <Close />
    </SvgIcon>
  );
};

const StyledFABIcon = memo(
  styled(FABIcon)(({ theme }) => ({
    color: "inherit",
    fontSize: "large",
  }))
);

const CloseButtonBox = styled(Box)(({ theme }) => ({
  position: "fixed",
  marginLeft: "-20px",
  top: 80,
}));

export default function UtilityPanel({ panelBarButtons, name, children }: PropsWithChildren<Props>): JSX.Element {
  const intl = useIntl();
  const { isUtilityDrawerOpen, closeUtilityDrawer } = useMenu();
  const PanelButton = panelBarButtons ? panelBarButtons : <Box />;
  const nowOpen = isUtilityDrawerOpen;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (nowOpen) closeButtonRef.current?.focus();
  }, [nowOpen]);

  const checkForEscKey = (e: any) => {
    if (e.key === "Escape") {
      closeUtilityDrawer();
    }
  };

  const closePanel = () => {
    closeUtilityDrawer();
  };

  return (
    <Box onKeyDown={checkForEscKey} tabIndex={0}>
      <StyledDrawer variant="persistent" anchor="right" open={nowOpen}>
        <AppBar position="static" color="default">
          <Toolbar disableGutters>
            <CloseButtonBox>
              <ActionTooltip
                title={`${intl.formatMessage({
                  id: "framework_close_label",
                  defaultMessage: "Close",
                })} ${name}`}
                disableHoverListener={!nowOpen}
              >
                <StyledFab size="medium" onClick={() => closePanel()} ref={closeButtonRef}>
                  <StyledFABIcon />
                </StyledFab>
              </ActionTooltip>
            </CloseButtonBox>
            <Typography variant="h6" color="inherit" marginLeft={"30px"}>
              {name}
            </Typography>
            <Box flex={1} />
            {PanelButton}
          </Toolbar>
        </AppBar>
        <Box width={drawerWidth} display="flex" height="100%" marginTop="10px">
          {children}
        </Box>
      </StyledDrawer>
    </Box>
  );
}
