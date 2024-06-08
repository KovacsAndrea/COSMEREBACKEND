import { ObjectId } from "mongodb";
import { collections } from "../../../database.service";
import { User } from "../model/user";

export class MongoUserRepo {

    public async getUserByEmail(email: string) {
        const user = await collections.userCollection?.findOne({ email });
        return user;
    }

    public async getAllUsers(){
        const userList  = await collections.userCollection?.find({}).toArray();
        return userList;
    }
    

    public async addUser(user: User) {
        const result = await collections.userCollection?.insertOne(user);
        return result;
    }

    public async updateUser(id: string, updatedAccessLevel: string) {
        const result = await collections.userCollection?.updateOne(
            { _id: new ObjectId(id) },
            { $set: { accessLevel: updatedAccessLevel } }
        );
        return result;
    }
}