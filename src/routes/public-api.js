import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  const message = {
    result: "Hello from Public/Unprotected API!!"
  };
  
  return res.send(message);
});


export default router;
