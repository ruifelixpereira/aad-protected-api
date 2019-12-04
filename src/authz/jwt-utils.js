// This comes from https://login.microsoftonline.com/common/discovery/keys
const keys = require('./keys.json').keys;

const jwt = require('jsonwebtoken');

const verifyToken = (jwtToken, cb) => {

    var verifiedToken = {};
    var verificationError = null;
    var verifiedOk = false;

    for (var i = 0; i < keys.length; i++) {
        var pk = getPublicKey(keys[i].x5c[0]);
        
        try {
            verifiedToken = jwt.verify(jwtToken, pk);
            // verified Successfully so we can jump out;
            verifiedOk = true;
            break;
        }
        catch (err) {
            //console.log(err.name + ": " + err.message);
            if (err.message !== 'invalid signature') {
                // we can break
                verifiedOk = false;
                verificationError = err;
                break;
            }
        }
    };

    if (verifiedOk) {
        cb(null, verifiedToken);
    }
    else {
        cb(verificationError);
    }
};

const getPublicKey = (certificate) => {
    return '-----BEGIN CERTIFICATE-----\n' + certificate + '\n-----END CERTIFICATE-----';
};

module.exports = {
    verifyToken
};
