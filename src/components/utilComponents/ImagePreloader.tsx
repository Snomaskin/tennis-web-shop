import { useEffect } from 'react';
import { preloadImages } from '../../utils/preloadImages';
import { navItems } from '../../config/navbar';


export const ImagePreloader: React.FC = () => {
  useEffect(() => {
    const imgUrls: string[] = navItems.flatMap(item => 
      item.menuItems?.map(menu => menu.img).filter(Boolean) as string[] || []);

      preloadImages(imgUrls);
  }, [])
  return null;
};