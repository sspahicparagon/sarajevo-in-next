import { groupe } from '@prisma/client';
import axios from 'axios';

const GroupService = {
    getGroupes: async function () {
        let result;

        try {
            result = await axios({
                method: 'get',
                url: 'api/groupe'
            });
        } catch (e) {
            return Promise.resolve([]);
        }

        return result?.data;
    }
}

export default GroupService;