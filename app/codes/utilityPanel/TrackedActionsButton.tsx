/** Copyright 2022-2023 DZS Inc */
import React from "react";
import { Badge, Box, IconButton, styled } from "@mui/material";
import { useActionTracker } from "../../providers/ActionTracker";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ErrorIcon from "@mui/icons-material/Error";
import { useIntl } from "react-intl";
import ActionTrackerPanel from "../ActionTrackerPanel";
import { useMenu } from "../../providers/Menu";

export function TrackedActionsButton(): JSX.Element | null {
  const intl = useIntl();
  const { openUtility } = useMenu();
  const handleButtonClick = () => {
    openUtility(ActionTrackerPanel);
  };
  const {
    actionTrackerList,
    inprogressCount,
    successCount,
    failCount,
    inprogressCountReset,
    successCountReset,
    failCountReset,
  } = useActionTracker();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      top: 3,
    },
  }));

  return (
    <Box paddingTop={5} paddingBottom={5}>
      {actionTrackerList.length !== 0 && successCount === 0 && failCount === 0 && (
        <IconButton
          color="inherit"
          size="large"
          onClick={() => {
            handleButtonClick();
            inprogressCountReset();
          }}
        >
          <StyledBadge badgeContent={inprogressCount} color="secondary" max={99}>
            <NotificationsNoneOutlinedIcon />
          </StyledBadge>
        </IconButton>
      )}
      {successCount > 0 && failCount === 0 && (
        <IconButton
          color="inherit"
          size="large"
          onClick={() => {
            handleButtonClick();
            successCountReset();
          }}
        >
          <StyledBadge badgeContent={successCount} color="info" max={99}>
            <CheckCircleIcon />
          </StyledBadge>
        </IconButton>
      )}
      {failCount > 0 && (
        <IconButton
          color="inherit"
          size="large"
          onClick={() => {
            handleButtonClick();
            failCountReset();
            successCountReset();
          }}
        >
          <StyledBadge badgeContent={failCount} color="error" max={99}>
            <ErrorIcon />
          </StyledBadge>
        </IconButton>
      )}
      {actionTrackerList.length === 0 && <Box width="48px" height="48px" />}
    </Box>
  );
}
