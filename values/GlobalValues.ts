const InstagramLink: string = 'https://www.instagram.com/';
const DetailsLink: string = 'details/';
const CookieName: string = 'Sarajevoin-Auth';
const ImageStorage: string | undefined = process.env.FILE_URL;
const GoogleMapsUrl = (location: string) => { return `https://maps.google.com/maps?ll=${location}&z=20&t=h&hl=en-US&gl=US&mapclient=embed` }
export { InstagramLink, DetailsLink, CookieName, ImageStorage, GoogleMapsUrl };