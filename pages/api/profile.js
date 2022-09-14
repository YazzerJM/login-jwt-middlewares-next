
import { verify } from 'jsonwebtoken';

export default function getProfile(req, res) {


    const { myTokenName } = req.cookies;

    if (!myTokenName) {
        return res.status(401).json({ error: 'no token' });
    }

    try {
        const user = verify(myTokenName, 'secret');
        console.log(user);
        return res.json({ username: user.username, email: user.email });
    } catch (error) {
        return res.status(401).json({ error: 'invalid token' });
    }

    return res.json({
        user: '123'
    });

}