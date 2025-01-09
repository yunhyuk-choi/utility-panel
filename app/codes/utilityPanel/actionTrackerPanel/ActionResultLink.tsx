/** Copyright 2023 DZS Inc */

import { useIntl } from "react-intl";
import { SnackbarContentsProps } from "../../providers/ActionTracker/Context";
import { includes, last } from "lodash";
import PageLink from "../PageLink";
import { Button, Typography } from "@mui/material";

const getDocumentId = (pagepath: string, name: string) => {
  const pathList = pagepath.split("/");
  return name ? name : last(pathList);
};

const ActionResultLink = ({ variant, pagePath, name }: Omit<SnackbarContentsProps, "action">): JSX.Element | null => {
  const intl = useIntl();
  if (variant === "success" && pagePath && !includes(window.location.pathname, pagePath)) {
    const docName = getDocumentId(pagePath, name);
    const openDocument = intl.formatMessage({ id: "framework_track_request_open" }, { name: docName });
    return (
      <PageLink pageRef={pagePath} underline="none" color="inherit">
        <Button sx={{ float: "right", textTransform: "none" }} color="secondary" size="small">
          <Typography variant="body1">{openDocument}</Typography>
        </Button>
      </PageLink>
    );
  } else return null;
};
export default ActionResultLink;
