import { CustomAdFull } from "../../interfaces/CustomAd";
import NormalAd from "./NormalAd";

export interface NormalAdManagerProps {
  adFn: (width: string | number, height: string | number) => CustomAdFull | undefined;
  width: string | number;
  height: string | number;
  condition?: boolean;
}

const NormalAdManager = ({adFn, width, height, condition = true}: NormalAdManagerProps) => {
  let realAdFn = adFn.prototype;
  let ad = undefined;
    ad = adFn(width, height);

  return <NormalAd customAd={ad} condition={condition} />
};

export default NormalAdManager