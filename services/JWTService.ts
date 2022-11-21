import axios from 'axios';
import { SignJWT, jwtVerify } from 'jose';

const JWTService = {
    sign: async function () {
        const iat = Math.floor(Date.now() / 1000);
        const exp = iat + 60 * 60; // one hour
        let newToken = await new SignJWT({ id: 1 })
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setExpirationTime(exp)
            .setIssuedAt(iat)
            .setNotBefore(iat)
            .sign(new TextEncoder().encode(process.env.TOKEN_SECRET));

        return newToken;
    },
    verify: function (token: string) {
        return jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET));
    },
    login: async function (username: string, password: string) {
        let result;

        try {
            result = await axios({
                method: 'post',
                url: '/api/login/',
                data: {
                    username: username,
                    password: password
                },
                headers: {
                    'Accept': '*/*'
                },
                withCredentials: true
            });
        }
        catch (e) {
            return Promise.resolve({ success: false });
        }
        return result.data;
    }
}

export default JWTService;
