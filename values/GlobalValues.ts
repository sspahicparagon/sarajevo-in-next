import { faBinoculars, faBowlingBall, faBuildingColumns, faBullseye, faCarBurst, faFilm, faHotel, faMasksTheater, faMugSaucer, faPersonRifle, faPersonRunning, faPersonThroughWindow, faSpa, faTree, faWandSparkles, IconDefinition } from "@fortawesome/free-solid-svg-icons";

const InstagramLink: string = 'https://www.instagram.com/';
const DetailsLink: string = 'details/';
const CookieName: string = 'Sarajevoin-Auth';
const ImageStorage: string | undefined = process.env.FILE_URL ?? "https://file.sarajevoin.ba/public";
const GoogleMapsUrl = (location: string) => { return `https://maps.google.com/maps?ll=${location}&z=20&t=h&hl=en-US&gl=US&mapclient=embed` }
const CategoryIcons: { item: (string | IconDefinition)[] }[] = [
    { item: ["Hotel", faHotel] },
    { item: ["Restoran-Kafic", faMugSaucer] },
    { item: ["Muzej", faBuildingColumns] },
    { item: ["Bazen i Spa centar", faSpa] },
    { item: ["Bilijar", faWandSparkles] },
    { item: ["Rekreacija i Sportski teren", faPersonRunning] },
    { item: ["Pikado", faBullseye] },
    { item: ["Park", faTree] },
    { item: ["Pozorište", faMasksTheater] },
    { item: ["Kino", faFilm] },
    { item: ["Karting", faCarBurst] },
    { item: ["Paintbal", faPersonRifle] },
    { item: ["Kuglana", faBowlingBall] },
    { item: ["Escape Room", faPersonThroughWindow] },
    { item: ["Vidikovac", faBinoculars] }
];
const PriorityLoadTreshold: number = 10;
const ImageLoadSpinner: string = '/Eclipse-1s-200px.gif';
const LogoImage: string = '/sarajevo.in-logo-removebg (1).png';
export { InstagramLink, DetailsLink, CookieName, ImageStorage, GoogleMapsUrl, CategoryIcons, PriorityLoadTreshold, ImageLoadSpinner, LogoImage };