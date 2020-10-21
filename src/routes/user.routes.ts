import { Request, Response, Router } from "express";
import { updateUser } from "../controllers/user.controller";
import { User } from "../interface/user";
import { authenticate } from "../middleware";


const router = Router();

router.route("/:id")
    .put(authenticate, (req: Request, res: Response) => {
        updateUser(req.params.id, req.body as User);
        res.json(200);
    });

export default router;