
const jwtUtils = require('./jwt-utils.js');

module.exports = function(options) {

    return function(req, res, next) {

        // check header for the token
        const bearerToken = req.headers['authorization'];
        const token = bearerToken.substring(7);

        //console.log("Token: " + token);

        // decode token
        if (token) {
            // verifies secret and checks if the token is expired
            jwtUtils.verifyToken(token, (err, decoded) =>{      
                if (err) {
                    console.log(err.name + ": " + err.message);
                    res.status(401);
                    return res.json({ message: 'Invalid authorization token.' });    
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    console.log("Decoded token: " + JSON.stringify(decoded));

                    // Verify proper Application roles
                    const hasRequiredRole = decoded.roles.includes(options.allowedRole);
                    console.log("Has role? " + hasRequiredRole);

                    if (!hasRequiredRole) {
                        res.status(401);
                        return res.json({ message: 'Does not have required role.' });
                    }

                    // Verify Server Application ID match
                    const hasCorrectServerApplicationId = (decoded.aud === process.env.SERVER_APP_CLIENT_APP_ID);

                    if (!hasCorrectServerApplicationId) {
                        res.status(401);
                        return res.json({ message: 'Invalid application ID.' });
                    }

                    // Verify Tenant ID match
                    const hasCorrectTenantId = (decoded.tid === process.env.TENANT_DIRECTORY_ID);

                    if (!hasCorrectTenantId) {
                        res.status(401);
                        return res.json({ message: 'Invalid tenant ID.' });
                    }

                    // Everything is fine
                    next();
                }
            });
        } else {
            // if there is no token
            res.status(401);  
            res.send({ 
                message: 'No token provided.' 
            });
        }
    };
};
