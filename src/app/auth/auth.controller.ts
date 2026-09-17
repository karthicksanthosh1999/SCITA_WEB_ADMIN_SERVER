import { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { APIResponse } from "../../lib/APIResponse";

export class AuthController{

    private readonly authService: AuthService;
    constructor(){ this.authService = new AuthService(); };

    login = async(req: Request, res: Response) => {
        const { email, password } = req.body;

        const loginUser = await this.authService.login({ email, password });

        res.cookie('accessToken', loginUser.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 15 * 60 * 1000,
        });
          res.cookie('refreshToken', loginUser.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 15 * 60 * 1000,
        });

        res.status(200).json( new APIResponse("User Login Successfully", 200, loginUser.user));
    };

    logout = async(req: Request, res: Response):Promise<void> => {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        res.status(200).json( new APIResponse("User Logout Successfully", 200, null));
    };
}