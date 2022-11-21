// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import JWTService from '../../../services/JWTService';
import { serialize } from "cookie";
import { CookieName } from '../../../values/GlobalValues';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let validUsers = [
        { username: 'sabahudin', password: 'Darklord35421337' },
        { username: 'tester', password: 'hO6BeJ2$W6k7' },
        { username: 'hasan', password: '*OIfAkMo5g09' },
        { username: 'lejla', password: 'AmT3uU9n55F!' }
    ];
    let resultData: { success: boolean } = { success: false };
    const { username, password } = req.body;

    const token = req.cookies[CookieName];

    try {
        let verified = await JWTService.verify(token ?? "");
        return res.status(200).send({ success: true });
    }
    catch (e) { }

    if (username != '' && password != '') {
        let newToken = await JWTService.sign();
        validUsers.map(user => {
            if (user.username == username && user.password == password) {
                let cookie = serialize(CookieName, newToken, { path: '/' });
                res.setHeader('Set-Cookie', cookie);
                res.status(200);
                resultData.success = true;
            }
        })
    }
    if (res.statusCode != 200) res.status(401);

    res.send(resultData);
}


