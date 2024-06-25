import { useCallback, useState } from "react";
import { CustomAdFull } from "../interfaces/CustomAd";

const useAdManager = (groupedAds: {[key: string]: (CustomAdFull[] | undefined)}) => {
  const ads = groupedAds;
  let orders: {[key: string]: number} = {};

  let ords: {[key: string]: number} = {};
  Object.keys(groupedAds).map((key) => {
    let list = groupedAds[key];
    if(groupedAds && list && groupedAds[key]?.length) {
      ords[key] = list[0].Order!;
    }
  });
  orders = ords;

  const getAd = (width: string | number, height: string | number): CustomAdFull | undefined => {
    let res = getAdByKey(`${width}x${height}`);
    return res;
  };

  const haveNext = (key: string) => {
    return ads[key]?.find((ad) => ad.Order == orders[key]);
  };

  const getAdByKey = (key: string): CustomAdFull | undefined => {
    let nextAd = haveNext(key);

    if(nextAd) {
      orders[key] = orders[key] + 1;
    }
    return nextAd;
  };

  return {getAd, getAdByKey};
};

export default useAdManager;