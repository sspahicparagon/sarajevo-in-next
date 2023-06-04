// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { JWTService } from '../../../services/JWTService';
import { serialize } from "cookie";
import { CookieName } from '../../../values/GlobalValues';
import { glob } from "glob";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    let validUsers = [
        { username: 'sabahudin', password: 'Darklord35421337' },
        { username: 'tester', password: 'hO6BeJ2$W6k7' },
        { username: 'hasan', password: 'HasanSarajevoIN!' },
        { username: 'lejla', password: 'LejlaSarajevoIN!' }
    ];
    let resultData: { success: boolean } = { success: false };
    const { username, password } = req.body;

    const token = req.cookies[CookieName];

    resultData.success = await JWTService.verify(token ?? "");

    if (username != '' && password != '' && !resultData.success) {
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
    let pages = await glob('pages/**/*.js', { cwd: __dirname });
    console.log({pages});

    res.send(resultData);
}


