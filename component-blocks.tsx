import { gallery } from "keystone6-document-gallery-block";

// naming the export componentBlocks is important because the Admin UI
// expects to find the components like on the componentBlocks export
export const componentBlocks = {
    gallery: gallery({
        listKey: "Image",
    }),
};