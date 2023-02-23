const jwt = require('jsonwebtoken');

verifytoken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log("token")
        if (!token) {
            return res.status(401).json({ error: 'Requête non authentifiée car pas de token!' });
        }
        console.log("decodedToken before");
        const decodedToken = jwt.verify(token, `${process.env.SECRET_TOKEN}`);
        console.log("decodedToken after");
        const userId = decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        }
        else {
            req.body.userId = userId;
        }
        next();
    } catch (error) {
        const message = 'Requête non authentifiée je suis dans le catch!'
        res.status(401).json({
          error: message
        }) 
    }
}

const authJWT = {
    verifytoken: verifytoken
};

module.exports = authJWT;


