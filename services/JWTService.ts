import axios from 'axios';
import { JWTVerifyResult, SignJWT, jwtVerify } from 'jose';
import { useCookies } from 'react-cookie';
import { CookieName } from '../values/GlobalValues';

function JWTServiceFunction() {

    const sign = async function () {
        const iat = Math.floor(Date.now() / 1000);
        const exp = iat + 60; // one hour
        let newToken = await new SignJWT({ id: 1 })
            .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
            .setExpirationTime(exp)
            .setIssuedAt(iat)
            .setNotBefore(iat)
            .sign(new TextEncoder().encode(process.env.TOKEN_SECRET));

        return newToken;
    };
    const verify = async function (token: string): Promise<boolean> {
        let success = false;
        try {
            await jwtVerify(token, new TextEncoder().encode(process.env.TOKEN_SECRET));
            success = true;
        }
        catch(e) { console.log({e}) }
        return success;
    };
    const login = async function (username: string, password: string) {
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
    };

    return {
        sign,
        verify,
        login
    }
}

export const JWTService = JWTServiceFunction();
