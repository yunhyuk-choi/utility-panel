/* Copyright 2023 DZS Inc */
import { useIntl } from "react-intl";
import { UseQueryResult, useQueries } from "react-query";
import { isEqual, map, reduce } from "lodash";
import { useEffect, useState } from "react";
import { MenuItem, MenuItemBlock } from "../../config";
import { MenuConfig } from "../Config/Context";
import { useUserProfile } from "../UserProfile";
import { usePlatformApi } from "../..";

const useMenuItems = (menuConfig: MenuConfig) => {
  const intl = useIntl();
  const { userProfile } = useUserProfile();
  const { projectConfigRequest } = usePlatformApi();
  const [menuItem, setMenuItem] = useState<MenuItem[] | MenuItemBlock[] | undefined>();
  const [dataList, setDataList] = useState<any[]>([]);

  const queryList = map(menuConfig.queryProject, (queryKey: any) => ({
    queryKey: [queryKey],
    queryFn: projectConfigRequest,
  }));

  const queryResults = useQueries<UseQueryResult<any>[]>(queryList);

  useEffect(() => {
    const newDataList = reduce<UseQueryResult, any[]>(
      queryResults,
      (list, result) => {
        result.data && list.push(result.data);
        return list;
      },
      []
    );
    //console.debug("useMenuItems useEffect1 ", { dataList, queryResults, newDataList });
    if (!isEqual(dataList, newDataList)) {
      //console.debug("useMenuItems useEffect1 If ", { dataList, newDataList });
      setDataList(newDataList);
    }
  }, [dataList, queryResults]);

  useEffect(() => {
    const newMenuItems =
      menuConfig.menuItemHandler?.({ data: dataList, intl, userProfile }) ||
      menuConfig.getMenuItems?.({ intl, userProfile });
    //console.debug("useMenuItems useEffect2 ", { newMenuItems, menuConfig, userProfile, menuItem });
    if (!isEqual(menuItem, newMenuItems)) {
      //console.debug("useMenuItems useEffect2 If ", { menuItem, newMenuItems });
      setMenuItem(newMenuItems);
    }
  }, [dataList, intl, menuConfig, menuItem, userProfile]);
  //console.debug("useMenuItems ", { menuItem });

  return menuItem;
};

export default useMenuItems;
