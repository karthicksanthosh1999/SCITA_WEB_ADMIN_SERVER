import { ApiError } from "../../lib/ApiError";
import { JWTService } from "../../lib/JWTService";
import { UserEntity } from "../users/user.entity";
import { UserRepository } from "../users/user.repository";
import { LoginDTO } from "./dto/auth.login.dto";
import bcrypt from 'bcrypt';

export class AuthService{
    private readonly userRepository: UserRepository;
    constructor(){
        this.userRepository = new UserRepository();
    };

    async login(user: LoginDTO):Promise<{ user: UserEntity, accessToken: string, refreshToken: string }> {
        const loginUser = await this.userRepository.findByEmail(user.email);

        if(!loginUser) throw new ApiError("Invalid Email Address", 401);
        
        const validPassword = await bcrypt.compare(user.password, loginUser.password);
        
        if(!validPassword) throw new ApiError("Invalid Password", 401);

        let accessToken = JWTService.generateAccessToken({ id: loginUser.id, email:loginUser.email, role: loginUser.role });
        let refreshToken = JWTService.generateRefreshToken({ id: loginUser.id });

        return { user: loginUser, accessToken, refreshToken }        
    };

}