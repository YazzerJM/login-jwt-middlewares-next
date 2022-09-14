
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

export default function loginHandler(req, res) {

    const { email, password } = req.body;

    if (email === 'admin@local.com' && password === 'admin') {
        console.log("entro");
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // Expira en 30 dias
            email: 'admin@local.com', // Se obtiene de la base de datos
            username: 'Yasser' // Se obtiene de la base de datos
        }, 'secret'); // llave

        const serialized = serialize('myTokenName', token, {
            httpOnly: true, // No muestre la cookie en produccion
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict', // Si se envia desde otro backend es 'none'
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/' // Ruta desde donde es entregado
        });

        res.setHeader('Set-Cookie', serialized);
        return res.json('login successfully');
    } 

    return res.status(401).json({
        error: 'invalid email or password',
    });

}