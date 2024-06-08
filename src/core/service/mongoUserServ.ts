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

    public async getAllUsers(){
        const userList  = await this.userRepo.getAllUsers();
        return userList;
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

    public async updateUser(id: string, accessLevel: string){
        const result  = await this.userRepo.updateUser(id, accessLevel);
        return result;
    }
    
}