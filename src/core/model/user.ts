import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

export interface User {
    _id: ObjectId;
    username: string;
    email: string;
    password: string; // Store hashed passwords
}

export class User {
    public _id: ObjectId;
    public username: string;
    public email: string;
    public password: string;

    constructor(id: ObjectId, username: string, email: string, password: string) {
        this._id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // Method to hash passwords
    public static async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    // Method to check if a password matches the hashed password
    public async comparePassword(candidatePassword: string): Promise<boolean> {
        return await bcrypt.compare(candidatePassword, this.password);
    }
}