import { Router } from "express";
import { loginLogic, signupLogic, UpdateDeatils, UserDeatil } from "../controlllers/authApi";

const router = Router();

router.post('/signup', signupLogic);
router.post('/login', loginLogic);
router.get('/detail/:id', UserDeatil);
router.put('/update/:id', UpdateDeatils );

export default router;