import CardElement from '../interfaces/CardElement';
import axios from 'axios';
import { trackimage } from '@prisma/client';

const TrackImagesService = {
    getTrackImages: async function () {
        let results;

        try {
            results = await axios({
                method: 'get',
                url: '/api/track-image'
            });

        } catch (e) {
            return Promise.resolve([]);
        }

        let imageResults: CardElement[] = [];
        results?.data.map((item: trackimage) => {
            imageResults.push({ Image: "/images" + item.Image });
        });
        return Promise.resolve(imageResults);
    }
}

export default TrackImagesService;