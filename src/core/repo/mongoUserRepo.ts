import { collections } from "../../../database.service";
import { User } from "../model/user";

export class MongoUserRepo {

    public async getUserByEmail(email: string) {
        const user = await collections.userCollection?.findOne({ email });
        return user;
    }
    

    public async addUser(user: User) {
        const result = await collections.userCollection?.insertOne(user);
        return result;
    }
}