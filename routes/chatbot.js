import express from 'express';

import { handleChat } from '../controllers/chatController.js';

export const router = express.Router();

// router.post('/message', handleChat);
router.get('/message', async (req, res) => handleChat(req, res));
