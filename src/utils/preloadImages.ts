function loadImages(imgUrls: string[]): Promise<void[]> {
  const promises = imgUrls.map(src => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => reject();
    });
  });
  return Promise.all(promises);
}

export async function preloadImages (imgUrls: string[]): Promise<void> {
  try {
    await loadImages(imgUrls);
  } catch (error) {
    throw error;
  }
};