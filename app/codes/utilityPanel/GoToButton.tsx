/** Copyright 2022-2023 DZS Inc */
import React, { memo } from "react";
import { useIntl } from "react-intl";
import UtilityDrawerButton from "./UtilityDrawerButton";
import FilterPanel from "../FilterPanel";
import AssignmentReturnOutlinedIcon from "@mui/icons-material/AssignmentReturnOutlined";

function GoToButton(): JSX.Element | null {
  const intl = useIntl();

  return (
    <UtilityDrawerButton
      Icon={AssignmentReturnOutlinedIcon}
      UtilityPanelComponent={FilterPanel}
      title={intl.formatMessage({ id: "framework_app_bar_icon_go_to" })}
    />
  );
}

export default memo(GoToButton);
