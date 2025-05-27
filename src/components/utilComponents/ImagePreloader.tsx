import { useEffect } from 'react';
import { preloadImages } from '../../utils/preloadImages';
import { navbarLeft } from '../../config/site-navigation';


export const ImagePreloader: React.FC = () => {
  useEffect(() => {
    const imgUrls: string[] = navbarLeft.flatMap(item => 
      item.menuItems?.map(menu => menu.img).filter(Boolean) as string[] || []);

      preloadImages(imgUrls);
  }, [])
  return null;
};