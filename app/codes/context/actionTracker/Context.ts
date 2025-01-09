/*
 *
 *   Copyright 2022 DZS Inc
 *
 */

import React from "react";
import { ReplOptions } from "repl";

export interface TrackRequestProps {
  /** Request Type */
  action: "create" | "update" | "operation";
  /** Document Name */
  name?: any;
  /** Request title */
  title: string;
  /** page path to open document */
  pagePath?: string;
  /** Request Promise */
  requestPromise: Promise<any>;
}

export interface SnackbarContentsProps extends Omit<TrackRequestProps, "requestPromise"> {
  variant?: "success" | "error" | "info";
  message?: string;
  statusMessage?: string;
}

export interface ReportRpcErrorProps {
  title: string;
  response: any;
}

export interface ActionTrackerContext {
  inprogressCount: number;
  successCount: number;
  failCount: number;
  actionTrackerList: SnackbarContentsProps[];
  deleteActionTracker: (actionTrackerId: number) => void;
  inprogressCountReset: () => void;
  successCountReset: () => void;
  failCountReset: () => void;
  trackRequest: (props: TrackRequestProps) => void;
  reportRpcError: (props: ReportRpcErrorProps) => void;
}

export const Context = React.createContext<ActionTrackerContext>({
  inprogressCount: 0,
  successCount: 0,
  failCount: 0,
  actionTrackerList: [],
  deleteActionTracker: () => {
    console.error("################ ActionTrackerContext is not ready");
  },
  inprogressCountReset: () => {
    console.error("################ ActionTrackerContext is not ready");
  },
  successCountReset: () => {
    console.error("################ ActionTrackerContext is not ready");
  },
  failCountReset: () => {
    console.error("################ ActionTrackerContext is not ready");
  },
  trackRequest: (props) => {
    console.error("################ ActionTrackerContext is not ready");
  },
  reportRpcError: (props) => {
    console.error("################ ActionTrackerContext is not ready");
  },
});

export default Context;
