import { Router } from 'express';

const apiProtectionMiddleware = require('../authz/api-protect-mdw');

const router = Router();

// Inject jwt token validation - authorization - protection middleware
const options = {
  allowedRole: 'Admin'
};

router.use(apiProtectionMiddleware(options));

router.get('/', async (req, res) => {
  const message = {
    result: "Hello from Admin API!!"
  };
  
  return res.send(message);
});


export default router;
