import {useEffect, useState} from "react";
import {CustomAdFull} from "../interfaces/CustomAd";
import {useRouter} from "next/router";
import axios, {HttpStatusCode} from "axios";

const useReorderNormalAd = (ads : CustomAdFull[]) => {
  const [items, setItems] = useState < CustomAdFull[] > (ads);
  const {push} = useRouter();

  const onReorder = (elements : CustomAdFull[]) => {
    setItems(elements);
  };

  useEffect(() => {
    setItems(ads);
  }, [ads]);

  const onSave = async () => {
    const res = await axios({
      url: '/api/ad/update-order',
      method: 'PUT',
      data: {
        ids: items.map(x => x.CustomAdID)
      }
    });

    if (res.status == HttpStatusCode.Ok) {
      return push('/admin-ad');
    }
  };

  return {items, onReorder, onSave}
};

export default useReorderNormalAd;

