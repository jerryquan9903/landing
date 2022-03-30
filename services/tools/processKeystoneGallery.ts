export const processKeystoneGallery = (gallery: any): string[] => {
  const imgs: string[] = [];
  for (const img of gallery.props.items) imgs.push(img.image.url);
  return imgs;

}