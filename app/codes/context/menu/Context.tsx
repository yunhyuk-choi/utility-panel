import { Box } from "@mui/material";
import React from "react";
import { MenuItem, MenuItemBlock } from "../../config";

export type UtilityPanelComponent = React.VoidFunctionComponent;

export interface MenuContext {
  openMenu: () => void;
  closeMenu: () => void;
  closeUtilityDrawer: () => void;
  openUtility: (UtilityComponent: UtilityPanelComponent) => void;
  CurrentUtilityPanel: UtilityPanelComponent;
  isUtilityDrawerOpen: boolean;
  isMenuOpen?: boolean;
  getMenuItems: () => MenuItem[] | MenuItemBlock[] | undefined;
  setMenuItems: (menuItems: MenuItem[] | MenuItemBlock[] | undefined) => void;  
}
const nullContext: MenuContext = {
  openMenu: () => {
    console.error("################ UtilityContext is not ready");
  },
  closeMenu: () => {
    console.error("################ UtilityContext is not ready");
  },
  closeUtilityDrawer: () => {
    console.error("################ UtilityContext is not ready");
  },
  openUtility: (UtilityComponent) => {
    console.error("################ UtilityContext is not ready");
  },
  isUtilityDrawerOpen: false,
  CurrentUtilityPanel: () => <Box />,
  getMenuItems: () => {
    return undefined;
  },
  setMenuItems: (menuItems: MenuItem[] | MenuItemBlock[] | undefined) => {},  
};
const Context = React.createContext<MenuContext>(nullContext);

export default Context;
