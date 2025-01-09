/* Copyright 2022 DZS Inc */
import React, { useEffect, useMemo, useState } from "react";
import Context, { MenuContext, UtilityPanelComponent } from "./Context";
import { Box } from "@mui/material";
import { produce } from "immer";
import { useConfig } from "../Config";
import { MenuItem, MenuItemBlock } from "../../config";
import useMenuItems from "./useMenuItems";

interface UtiltiyDrawerState {
  isUtilityDrawerOpen: boolean;
  UtilityPanelComponent: UtilityPanelComponent;
}
type ProviderProps = React.PropsWithChildren<{}>;
export default function Provider({ children }: ProviderProps): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [utilityDrawerState, setUtilityDrawerState] = useState<UtiltiyDrawerState>({
    isUtilityDrawerOpen: false,
    UtilityPanelComponent: Box,
  });
  const { appConfig } = useConfig();
  const [menuConfig, setMenuConfig] = useState<MenuItem[] | MenuItemBlock[] | undefined>([]);
  const menuItems = useMenuItems(appConfig.menu);

  useEffect(() => {
    setMenuConfig(menuItems);
  }, [menuItems]);

  const context: MenuContext = useMemo<MenuContext>(() => {
    const openMenu = () => {
      setIsMenuOpen(true);
    };
    const closeMenu = () => {
      setIsMenuOpen(false);
    };
    const openUtility = (UtilityPanelComponent: UtilityPanelComponent) => {
      setUtilityDrawerState({ UtilityPanelComponent, isUtilityDrawerOpen: true });
    };
    const closeUtilityDrawer = () => {
      setUtilityDrawerState({ UtilityPanelComponent: Box, isUtilityDrawerOpen: false });
    };
    const context: MenuContext = {
      openMenu,
      closeMenu,
      openUtility,
      closeUtilityDrawer,
      getMenuItems: () => {
        return menuConfig;
      },
      setMenuItems: setMenuConfig,
      isMenuOpen: isMenuOpen,
      CurrentUtilityPanel: utilityDrawerState.UtilityPanelComponent,
      isUtilityDrawerOpen: utilityDrawerState.isUtilityDrawerOpen,
    };
    return produce<MenuContext>(context, () => {});
  }, [isMenuOpen, menuConfig, utilityDrawerState.UtilityPanelComponent, utilityDrawerState.isUtilityDrawerOpen]);

  return <Context.Provider value={context}>{children}</Context.Provider>;
}
