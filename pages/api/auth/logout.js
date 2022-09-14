
import { verify } from 'jsonwebtoken';
import {serialize} from 'cookie';
export default function logoutHandler(req, res) {

    const { myTokenName } = req.cookies;

    if (!myTokenName) {
        return res.status(401).json({ error: 'no token' });
    }

    try {
        verify(myTokenName, 'secret');
        const serialized = serialize('myTokenName', null, {
            httpOnly: true, // No muestre la cookie en produccion
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', // Si se envia desde otro backend es 'none'
            maxAge: 0,
            path: '/' // Ruta desde donde es entregado
        });
        res.setHeader('Set-Cookie', serialized);
        return res.status(200).json('logout succesfully');
    } catch (error) {
        return res.status(401).json({error: 'invalid token'});
    }
}