import Image from 'next/image'
import imageLoader, { wordpressImageLoader } from '../../lib/imageLoader';
import { Flex } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { sendTag } from '../../lib/tagManager';
import { CustomAdFull } from '../../interfaces/CustomAd';
import { ResponsiveAdFormatsPerPage } from '../../values/GlobalValues';
import { useCookies } from 'react-cookie';
import ChakraNextLink from '../ChakraNextLink';

export interface NormalAdProps {
  customAd?: CustomAdFull;
  condition?: boolean;
};

const NormalAd = ({customAd, condition = true}: NormalAdProps) => {
  let ad: CustomAdFull | undefined = customAd ? {...customAd} : undefined;
  const adRef = useRef(null);

  const [cookies] = useCookies(['consentid']);

  useEffect(() => {
    if (! adRef.current) 
      return;
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        sendTag('ad-view', {
          'ad-url': `https://dummyimage.com/${ad?.custom_ad_type?.Width}x${ad?.custom_ad_type?.Height}/fff/000.jpg`,
          'ad-name': `${ad?.custom_ad_type?.Width}x${ad?.custom_ad_type?.Height}`
        });
      }
    });

    observer.observe(adRef.current);
  }, []);

  let displayBasedOnSize = ResponsiveAdFormatsPerPage[`${ad?.custom_ad_type?.Width}x${ad?.custom_ad_type?.Height}`];

  return (
    <> {
      condition && ad &&
        <Flex 
          className={'custom-ad-space'}
          justify={'center'}
          align={'flex-start'}
          height={{'base': `${displayBasedOnSize?.Height}px`, 'md': '100%'}}
          width={{'base': `${displayBasedOnSize?.Width}px`, 'md': `${ad?.custom_ad_type?.Width}px`}}
          ref={adRef}
          display={{'base': displayBasedOnSize == null ? 'none': 'flex', 'xl': 'flex'}}
          position={'relative'}
          marginBottom={5}
        >
          <ChakraNextLink href={ad?.Url! ?? 'https://google.com'} rel={"noopener noreferrer"} target={"_blank"}
          >
          <Image width={ad?.custom_ad_type?.Width}
            height={ad?.custom_ad_type?.Height}
            src={ad?.Image!}
            loader={ad ? imageLoader : wordpressImageLoader}/>
          </ChakraNextLink>
        </Flex>
    } </>
  )
};

export default NormalAd;
