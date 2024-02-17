import express from 'express';
// import authController from '../controllers/authController.js'
import { registerController,loginController } from '../controllers/authController.js';
import userAuth from '../middleware/authMiddleware.js';
const router = express.Router();
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})


//router

router.post('/register',limiter,registerController);
router.post('/login', limiter,loginController);

export default router;