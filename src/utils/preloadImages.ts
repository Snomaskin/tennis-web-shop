function loadImages(imgUrls: string[] | string): Promise<void[]> {
  const urls = typeof imgUrls === 'string' ? [imgUrls] : imgUrls;

  const promises = urls.map(src => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => reject();
    });
  });
  return Promise.all(promises);
};

export async function preloadImages (imgUrls: string[] | string): Promise<void> {
  try {
    await loadImages(imgUrls);
  } catch (error) {
    throw error;
  }
};