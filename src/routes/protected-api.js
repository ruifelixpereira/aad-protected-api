import { Router } from 'express';

const apiProtectionMiddleware = require('../authz/api-protect-mdw');

const router = Router();

// Inject jwt token validation - authorization - protection middleware
const options = {
  allowedRole: 'Reader'
};

router.use(apiProtectionMiddleware(options));

router.get('/', async (req, res) => {
  const message = {
    result: "Hello from Protected API!!"
  };
  
  return res.send(message);
});


export default router;
