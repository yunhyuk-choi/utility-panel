/*
 *
 *   Copyright 2023 DZS Inc
 *
 */
import { useIntl } from "react-intl";
import { IconButton, Box, MenuList, MenuItem, Grid, ListItemIcon } from "@mui/material";
import UtilityPanel from "../UtilityDrawer/UtilityPanel";
import { useState } from "react";
import { useActionTracker } from "../../providers/ActionTracker";
import Scrollbar from "../Scrollbar/Scrollbar";
import { MenuItemText } from "../user-profile";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";
import ActionResultLink from "./ActionResultLink";

interface TabPanelProps {
  children?: React.ReactNode;
  tabIndex: number;
  isSelected: boolean;
  
}

interface Hovers {
  [id: string]: boolean;
}

interface ActionIconProps {
  path?: string;
}

function ActionIcon(props: ActionIconProps): JSX.Element {
  function getIconForVariant(): JSX.Element {
    const icons: { [key: string]: JSX.Element } = {
      success: <CheckCircleIcon color="success" />,
      error: <ErrorIcon color="error" />,
      info: <NotificationsActiveIcon color="secondary" />,
    };
    return icons[props.path ? props.path : "info"];
  }

  return <>{getIconForVariant()}</>;
}

export default function ActionTrackerPanel(): JSX.Element {
  const intl = useIntl();
  const { actionTrackerList, deleteActionTracker } = useActionTracker();
  const [isHovering, setIsHovering] = useState<Hovers>();

  const actionTrackerNotifications = actionTrackerList?.map((actionTracker, index) => (
    <MenuItem
      disableGutters={true}
      key={`${actionTracker}_${index}`}
      onMouseEnter={() => {
        setIsHovering({ [`${actionTracker}_${index}`]: true });
      }}
      onMouseLeave={() => {
        setIsHovering({ [`${actionTracker}_${index}`]: false });
      }}
    >
      <Grid container>
        <Grid item container xs={1} alignItems="center">
          <ListItemIcon sx={{ justifyContent: "center" }}>
            <ActionIcon path={actionTracker.variant}></ActionIcon>
          </ListItemIcon>
        </Grid>
        <Grid item xs={10}>
          <MenuItemText style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            <Box>{actionTracker.title}</Box>
            <Box>{actionTracker.message}</Box>
            <Box display="flex" justifyContent="center">
              <ActionResultLink {...actionTracker}></ActionResultLink>
            </Box>
          </MenuItemText>
        </Grid>
        <Grid item container alignItems="center" justifyContent="center" xs={1}>
          <IconButton
            size="small"
            aria-label={`Delete ${actionTracker.title}`}
            aria-haspopup="true"
            style={{
              visibility: isHovering && isHovering[`${actionTracker}_${index}`] ? "visible" : "hidden",
            }}
            onClick={(e) => {
              deleteActionTracker(index);
              e.preventDefault();
            }}
          >
            <CloseIcon titleAccess={`Delete ${actionTracker.title}`} fontSize="inherit" />
          </IconButton>
        </Grid>
      </Grid>
    </MenuItem>
  ));

  return (
    <UtilityPanel name={intl.formatMessage({ id: "framework_action_tracker", defaultMessage: "Action Tracker" })}>
      <Box width="100%" height="100%">
        <Scrollbar>
          <MenuList disablePadding={true}>{actionTrackerNotifications}</MenuList>
        </Scrollbar>
      </Box>
    </UtilityPanel>
  );
}
