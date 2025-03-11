import { useEffect } from 'react';
import { menuItems } from './config/navbar';


export const ImagePreloader: React.FC = () => {
  useEffect(() => {
    const imagesToPreload: string[] = [];
    
    menuItems.forEach(menuItem => {
      if (menuItem.menuItems) {
        menuItem.menuItems.forEach(item => {
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