import axios from "axios";

const InformationService = {
    getInformationForItem: async function (id: string) {
        let result;

        try {
            result = await axios({
                method: 'get',
                url: '/api/location/' + id
            });
        } catch (e) {
            return Promise.resolve({});
        }
        return result?.data;
    }
};

export default InformationService;