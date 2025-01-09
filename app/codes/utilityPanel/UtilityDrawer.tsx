/*
 *
 *   Copyright 2023 DZS Inc
 *
 */
import { Box, Drawer, styled, Theme, Toolbar, CSSObject } from "@mui/material";
import React, { memo } from "react";
import AboutButton from "./AboutButton";
import GoToButton from "./GoToButton";
import { useConfig } from "../../providers/Config";
import { TrackedActionsButton } from "./TrackedActionsButton";
import { useMenu } from "../../providers/Menu";
import ProjectButton from "./ProjectButton";

const drawerExpandWidth = 57;
const drawerCollapseWidth = 0;

const expandedDrawer = (theme: Theme): CSSObject => ({
  top: 48,
  width: drawerExpandWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const collapsedDrawer = (theme: Theme): CSSObject => ({
  top: 48,
  width: drawerCollapseWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
});

const StyledDrawer = memo(
  styled(Drawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerExpandWidth,
    "& .MuiPaper-root": {
      width: "inherit",
    },
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...expandedDrawer(theme),
      "& .MuiDrawer-paper": expandedDrawer(theme),
    }),
    ...(!open && {
      ...collapsedDrawer(theme),
      "& .MuiDrawer-paper": collapsedDrawer(theme),
    }),
  }))
);

export default function UtilityDrawer(): JSX.Element {
  const { isUtilityDrawerOpen, CurrentUtilityPanel } = useMenu();
  const { appConfig } = useConfig();
  const ProjectManagement = appConfig.ProjectManagement;

  return (
    <Box display={"flex"}>
      <StyledDrawer open={!isUtilityDrawerOpen} anchor="right" variant="permanent">
        <Toolbar disableGutters>
          <Box marginLeft="auto" marginRight="auto">
            <TrackedActionsButton />
            <GoToButton />
            {/* help temporarily disabled */}
            {/* <HelpButton /> */}
            {!!ProjectManagement ? <ProjectButton /> : null}
            <AboutButton />
          </Box>
        </Toolbar>
      </StyledDrawer>
      <CurrentUtilityPanel />
    </Box>
  );
}
