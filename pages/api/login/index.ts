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
    const { username, password } = req.body;

    let validUser = validUsers.find(user => user.username == username && user.password == password);

    if(!validUser) res.status(400);
        
    res.send({user: validUser?.username});
}


