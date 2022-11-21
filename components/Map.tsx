import style from '../styles/Map.module.css';

interface MapConfing {
    width?: string;
    height?: string;
    lat?: string;
    long?: string;
}

export default function Map({ width = "", height = "", lat = "30", long = "30" }: MapConfing) {
    let source: string = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBNBsYvtVJPcJ-6LEp791c1h1WzReIrRtk&center=${lat},${long}&zoom=19&maptype=satellite`;
    return (
        <div
            className={style.container}
            style={{ height: "100%", width: "100%" }}
        >
            <iframe
                style={{ width: '100%', height: '100%' }}
                loading="lazy"
                allowFullScreen={true}
                referrerPolicy="no-referrer-when-downgrade"
                src={source}
                className={style.map}
            >
            </iframe>
        </div>
    )
};