import CardElement from '../interfaces/CardElement';
import axios from 'axios';
import { trackimage } from '@prisma/client';
import prisma from '../lib/prisma';

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
    },
    trackImages: async function () {
        let imageResults: CardElement[] = [];
        const results = await prisma.trackimage.findMany({
            orderBy: {
                Image: 'asc'
            }
        });
        results?.map((item: trackimage) => {
            imageResults.push({ Image: "/images" + item.Image });
        });

        return imageResults;
    }
}

export default TrackImagesService;