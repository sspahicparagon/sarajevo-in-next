import { faBeerMugEmpty, faBinoculars, faBowlingBall, faBuildingColumns, faBullseye, faCarBurst, faFilm, faHotel, faMasksTheater, faMugSaucer, faPersonRifle, faPersonRunning, faPersonThroughWindow, faSpa, faTag, faTree, faWandSparkles, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { CustomAdTypeFull } from "../interfaces/CustomAd";

const InstagramLink: string = 'https://www.instagram.com/';
const DetailsLink: string = 'details/';
const CookieName: string = 'Sarajevoin-Auth';
const ImageStorage: string | undefined = process.env.FILE_URL ?? "https://test.sarajevoin.ba";
const GoogleMapsUrl = (location: string) => { return `https://maps.google.com/maps?ll=${location}&z=20&t=h&hl=en-US&gl=US&mapclient=embed` }
const CategoryIcons: { [key: string]: IconDefinition } = {
    "Hotel": faHotel,
    "Restoran-Kafic": faMugSaucer,
    "Pub i klub": faBeerMugEmpty,
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
    "Escape Room": faPersonThroughWindow,
    "Vidikovac": faBinoculars,
};
const RedisKeys: { 
    FilteredEventsForNextTwoMonths: string,
    CustomAds: string
 } = {
    FilteredEventsForNextTwoMonths: 'FilteredEventsForNextTwoMonths',
    CustomAds: 'CustomAds'
};
const CategoryIconsJson: {[key: number]: IconDefinition} = {
    16: faHotel,
    15: faMugSaucer,
    17: faBeerMugEmpty,
    7: faBuildingColumns,
    11: faSpa,
    1: faWandSparkles,
    12: faPersonRunning,
    3: faBullseye,
    6: faTree,
    8: faMasksTheater,
    9: faFilm,
    2: faCarBurst,
    5: faPersonRifle,
    10: faBowlingBall,
    13: faPersonThroughWindow,
    14: faBinoculars,
    18: faTag
};
const PriorityLoadTreshold: number = 10;
const ImageLoadSpinner: string = '/Eclipse-1s-200px.gif';
const LogoImage: string = '/sarajevo.in-logo-removebg (1).png';
const NumberOfSentencesInParagraph: number = 4;
const MinimumLengthToCreateNewParagraph: number = 6;
const ImageUploadKeyValue = 'image-media';
const AdFormatsPerPage: { [key: string]: CustomAdTypeFull[] } = {
    'event': [
        {
            Width: '200',
            Height: '700'
        },
        {
            Width: '550',
            Height: '200'
        }
    ],
    'home': [
        {
            Width: '900',
            Height: '250'
        }
    ],
    'blog': [
        {
            Width: '350',
            Height: '250'
        }
    ],
    'groupes': [
        {
            Width: '300',
            Height: '325'
        }
    ],
    'details': [
        {
            Width: '300',
            Height: '315'
        }
    ]
};

const ResponsiveAdFormatsPerPage: { [key: string]: CustomAdTypeFull | null} = {
    '550x200': {
        Width: '300',
        Height: '100'
    },
    '200x700': null,
    '300x325': {
        Width: '300',
        Height: '325'
    },
    '300x315': {
        Width: '300',
        Height: '315'
    },
    '900x250': {
        Width: '300',
        Height: '100'
    }
};

export { 
    InstagramLink, 
    DetailsLink, 
    CookieName, 
    ImageStorage, 
    GoogleMapsUrl, 
    CategoryIcons, 
    PriorityLoadTreshold, 
    ImageLoadSpinner, 
    LogoImage,
    NumberOfSentencesInParagraph,
    MinimumLengthToCreateNewParagraph,
    ImageUploadKeyValue,
    CategoryIconsJson,
    RedisKeys,
    AdFormatsPerPage,
    ResponsiveAdFormatsPerPage
};