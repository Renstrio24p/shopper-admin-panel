
const 
    arrow_icon = '/arrow_icon',
    cross_icon = '/cross_icon',
    nav_logo = '/nav-logo',
    nav_profile = '/waren',
    product_cart = '/Product_Cart',
    product_list_icon = '/Product_list_icon',
    upload_area = '/upload_area',
    upload_cloud_icon = '/upload_cloud_icon';

const ext = 'avif';

export const images: { [key: string]: string } = {
    arrow_icon,
    cross_icon,
    nav_logo,
    nav_profile,
    product_cart,
    product_list_icon,
    upload_area,
    upload_cloud_icon
};

for (const key in images) {
    if (Object.hasOwnProperty.call(images, key)) {
        images[key] += `.${ext}`;
    }
}

