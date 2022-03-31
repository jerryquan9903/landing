export const processKeystoneGallery = (gallery: any): string[] => {
  if (!gallery) return [];
  const imgs: string[] = [];
  for (const img of gallery.props.items) imgs.push(img.image.url);
  return imgs;

}