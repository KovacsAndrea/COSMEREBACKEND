import { MongoUserRepo } from "../repo/mongoUserRepo";
import { User } from "../model/user";
import bcrypt from "bcrypt";

export class MongoUserService {
    private userRepo: MongoUserRepo

    constructor(userRepo: MongoUserRepo){
        this.userRepo = userRepo;
    }

    public async getUserByEmail(email: string){
        const result = await this.userRepo.getUserByEmail(email)
        return result;
    }

    public async userExists(email:string){
        const result = await this.userRepo.getUserByEmail(email)
        return result != null
    }

    public async addUser(user: User){
        const result = await this.userRepo.addUser(user)
        return result
    }

    public emailIsValid(email: string){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email)
    }

    public async hashPassword(password: string) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    };

    public async verifyPassword(inputPassword: string, email: string): Promise<boolean> {
        const result = await this.userRepo.getUserByEmail(email)
        if(result){
            const storedPassword = result.password;
            return await bcrypt.compare(inputPassword, storedPassword);
        }
        else{return false}
    }


    
}