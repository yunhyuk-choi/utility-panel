/*
 *
 *   Copyright 2022-2023 DZS Inc
 *
 */

import { Box } from "@mui/system";
import { dropRight, pullAt } from "lodash";
import { SnackbarKey, useSnackbar } from "notistack";
import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import Context, { ActionTrackerContext, SnackbarContentsProps } from "./Context";
import ActionResultLink from "../../components/ActionTrackerPanel/ActionResultLink";
type ProviderProps = React.PropsWithChildren<{}>;

const RequestTracking = (props: SnackbarContentsProps) => {
  const { title, name, variant, message, statusMessage } = props;
  const intl = useIntl();
  const snackbarHeader = intl.formatMessage(
    { id: "framework_track_request_action_result_message" },
    {
      name: title || name,
      result:
        !variant || variant === "info"
          ? ""
          : statusMessage
          ? statusMessage
          : intl.formatMessage({
              id: variant == "success" ? "framework_track_request_complete" : "framework_track_request_failed",
            }),
    }
  );
  return (
    <Box>
      <Box>{snackbarHeader}</Box>
      <Box>{message}</Box>
      <ActionResultLink {...props} />
    </Box>
  );
};
const RequestError = ({ response, title }: { response: any; title: string }) => {
  const rpcError = response?.data?.["rpc-error"];
  const message = rpcError?.["error-message"] || response?.data?.error || response?.statusText;

  return (
    <Box>
      <Box>{title}</Box>
      <Box>{message}</Box>
    </Box>
  );
};

export default function Provider({ children }: ProviderProps): JSX.Element {
  const [inprogressCount, setInprogressCount] = React.useState(0);
  const [successCount, setSuccessCount] = React.useState(0);
  const [failCount, setFailCount] = React.useState(0);
  const [actionTrackerList, updateActionTrackerList] = React.useState<SnackbarContentsProps[]>([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const context: ActionTrackerContext = useMemo(() => {
    const addActionTracker = (action: SnackbarContentsProps) => {
      const maxListLength: number = 10;
      updateActionTrackerList((actionTrackerList) => [action, ...actionTrackerList]);
      if (actionTrackerList.length > maxListLength)
        updateActionTrackerList((actionTrackerList) => [...dropRight(actionTrackerList)]);
    };

    const deleteActionTracker = (actionTrackerId: number) => {
      pullAt(actionTrackerList, actionTrackerId);
      updateActionTrackerList(actionTrackerList);
    };

    return {
      inprogressCount,
      successCount,
      failCount,
      actionTrackerList,
      deleteActionTracker,
      trackRequest: (props) => {
        const popupNotification = (
          variant: "success" | "error" | "info",
          props: SnackbarContentsProps,
          snackBarId?: SnackbarKey
        ) => {
          if (snackBarId) closeSnackbar(snackBarId);
          snackBarId = enqueueSnackbar(<RequestTracking {...props} variant={variant} />, {
            variant,
            autoHideDuration: 8000,
            preventDuplicate: true,
            anchorOrigin: {
              vertical: "top",
              horizontal: "center",
            },
          });
          return snackBarId;
        };
        const snackBarProps: SnackbarContentsProps = { ...props };
        setInprogressCount((prevCount) => prevCount + 1);
        const trackingKey = popupNotification("info", snackBarProps);
        const waitForResult = async (key: SnackbarKey, requestPromise: Promise<any>) => {
          requestPromise
            .then((result) => {
              setSuccessCount((prevCount) => prevCount + 1);
              popupNotification("success", { ...snackBarProps, ...result }, key);
              addActionTracker({
                ...snackBarProps,
                ...result,
                variant: "success",
              });
              // updateActionTrackerList( actionTrackerList => [ {...snackBarProps, variant: "success"}, ...actionTrackerList])
            })
            .catch((result) => {
              setFailCount((prevCount) => prevCount + 1);
              popupNotification("error", { ...snackBarProps, ...result }, key);
              addActionTracker({
                ...snackBarProps,
                ...result,
                variant: "error",
              });
              // updateActionTrackerList( actionTrackerList => [ {...snackBarProps, variant: "error"}, ...actionTrackerList])
            })
            .finally(() => {
              setInprogressCount((prevCount) => prevCount - 1);
            });
        };
        waitForResult(trackingKey, props.requestPromise);
      },
      reportRpcError: ({ response, title }) => {
        enqueueSnackbar(<RequestError title={title} response={response} />, {
          variant: "error",
          autoHideDuration: 8000,
          preventDuplicate: true,
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      },
      inprogressCountReset: () => {
        setInprogressCount(0);
      },
      successCountReset: () => {
        setSuccessCount(0);
      },
      failCountReset: () => {
        setFailCount(0);
      },
    };
  }, [actionTrackerList, closeSnackbar, enqueueSnackbar, failCount, inprogressCount, successCount]);

  return <Context.Provider value={context}>{children}</Context.Provider>;
}
