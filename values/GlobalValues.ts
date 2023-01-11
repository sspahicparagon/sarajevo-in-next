import { faBowlingBall, faBuildingColumns, faBullseye, faCarBurst, faFilm, faMasksTheater, faPersonRifle, faPersonRunning, faPersonThroughWindow, faSpa, faTree, faWandSparkles } from "@fortawesome/free-solid-svg-icons";

const InstagramLink: string = 'https://www.instagram.com/';
const DetailsLink: string = 'details/';
const CookieName: string = 'Sarajevoin-Auth';
const ImageStorage: string | undefined = process.env.FILE_URL ?? "https://file.sarajevoin.ba/public";
const GoogleMapsUrl = (location: string) => { return `https://maps.google.com/maps?ll=${location}&z=20&t=h&hl=en-US&gl=US&mapclient=embed` }
const CategoryIcons = {
    "Muzej": faBuildingColumns,
    "Bazen i Spa centar": faSpa,
    "Bilijar": faWandSparkles,
    "Rekreacija i Sportski teren": faPersonRunning,
    "Pikado": faBullseye,
    "Park": faTree,
    "Pozorište": faMasksTheater,
    "Kino": faFilm,
    "Karting": faCarBurst,
    "Paintbal": faPersonRifle,
    "Kuglana": faBowlingBall,
    "Escape Room": faPersonThroughWindow
}
const PriorityLoadTreshold: number = 10;
const ImageLoadSpinner: string = '/Eclipse-1s-200px.gif';
const LogoImage: string = '/sarajevo.in-logo-removebg (1).png';
export { InstagramLink, DetailsLink, CookieName, ImageStorage, GoogleMapsUrl, CategoryIcons, PriorityLoadTreshold, ImageLoadSpinner, LogoImage };