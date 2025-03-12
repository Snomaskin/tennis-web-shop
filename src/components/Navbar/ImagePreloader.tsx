import { useEffect } from 'react';
import { navItems } from './config/navbar';


export const ImagePreloader: React.FC = () => {
  useEffect(() => {
    const imagesToPreload: string[] = [];
    
    navItems.forEach(item => {
      if (item.menuItems) {
        item.menuItems.forEach(item => {
          if (item.img) {
            imagesToPreload.push(item.img);
          }
        });
      }
    });

    imagesToPreload.forEach(imageSrc => {
      const img = new Image();
      img.src = imageSrc;
    });
  }, []);
  
  return null;
};