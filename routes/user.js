import { Router } from "express";
import { getProfile, login, logout, register, updateProfile } from "../controllers/user.js";
import { localUpload, remoteUpload} from "../middlewares/upload.js";
import { hasPermission, isAuthenticated } from "../middlewares/auth.js";

// create a router
const userRouter = Router();

// define routes
userRouter.post('/users/register', register);
userRouter.post('/users/login', login);
userRouter.get('/users/me', isAuthenticated, hasPermission('get_profile'), getProfile);
userRouter.post('/users/logout', isAuthenticated, logout);
userRouter.patch('/users/me', isAuthenticated, hasPermission('update_profile'), localUpload.single('avatar'), updateProfile);

// export router
export default userRouter;