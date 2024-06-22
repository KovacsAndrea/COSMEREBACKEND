import express from "express";
import { mongoUserServ } from "../../data";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { User } from "../../../core/model/user";

export const mongoUserRouter = express.Router();

const JWT_SECRET = "q8zAf!yCw#9jN1@sLxP6$#rE%gVuK7^mR3bDw*eHz2!"

mongoUserRouter.get("/", async(_req, _res, _next) => {
    try{
        _res.status(200).json({
            message: "Hello USER"
        });
    }
    catch (error) {
        _res.status(500).json({
            error: error
        }
        );
     }
})

mongoUserRouter.get("/user", async(_req, _res, _next) => {
    try{
        const token = _req.headers["authorization"];
        if(token){
            const decoded = jwt.verify(token, JWT_SECRET) as any;
            const user = await mongoUserServ.getUserByEmail(decoded.email);
            _res.status(200).json({
                user:user
            })
        }
        else{_res.status(400).json({ message: "Invalid token." });}
    }catch (ex) {
        _res.status(400).json({ error: "Invalid token." });
    }
})


mongoUserRouter.put("/:userId", async(_req, _res, _next) => {
    try{
        const userId = _req.params.userId;
        const newAccessLevel = _req.body.accessLevel
        console.log(newAccessLevel)
        const result = await mongoUserServ.updateUser(userId, newAccessLevel)
        _res.status(200).json({
            result:result
        })
    }catch (ex) {
        _res.status(400).json({ error: "Invalid token." });
    }
})

mongoUserRouter.get("/list", async(_req, _res, _next) => {
    try{
        
        const userList = await mongoUserServ.getAllUsers();
            _res.status(200).json({
                userList: userList
            })
    }catch (ex) {
        _res.status(400).json({ error: "Something went wrong while trying to get users." });
    }
}) 


export const authenticateBridgemanJWT = async (_req: any, _res: any, _next: any) => {
    const token = _req.headers["authorization"];
    console.log(token)
    try {
        console.log("DEEEEEEEECODING ")
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        console.log("DECODEEEEEED")
        console.log(decoded)
        _req.user = decoded;
        if(_req.user){
            const user = await mongoUserServ.getUserByEmail(_req.user.email);
            if(user){
                console.log(user)
                if(["Bridgeman","Surgebinder", "Knight Radiant"].includes(user.accessLevel)){
                    return _next();
                }
                else{
                    return _res.status(400).json({ error: "Otherworldeeer!!!" });
                }
            }
        }
    } catch (ex) {
        return _res.status(400).json({ error: "Invalid token." });
    }
};

export const authenticateSurgebinderJWT = async (_req: any, _res: any, _next: any) => {
    const token = _req.headers["authorization"];
    console.log(token)
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        _req.user = decoded;
        if(_req.user){
            const user = await mongoUserServ.getUserByEmail(_req.user.email);
            if(user){
                console.log(user)
                if(user.accessLevel == "Knight Radiant" || user.accessLevel == "Surgebinder"){ return _next();}
                if(user.accessLevel == "Bridgeman"){ return _res.status(400).json({ error: "Gaz says GET BACK TO WORK YOU CREMLING!!!" });}
                else{ return _res.status(400).json({ error: "Otherworlder?????"})}
            }}
    } catch (ex) {
        return _res.status(400).json({ error: "Invalid token." });
    }
};

export const authenticateKnightRadiantJWT = async (_req: any, _res: any, _next: any) => {
    const token = _req.headers["authorization"];
    console.log(token)
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        _req.user = decoded;
        if(_req.user){
            const user = await mongoUserServ.getUserByEmail(_req.user.email);
            if(user){
                if(user.accessLevel == "Knight Radiant"){return _next();}
                if(user.accessLevel == "Surgebinder"){ return _res.status(400).json({ error: "The Vorin Church informs you of your heretic behaviour!!!" });}
                if(user.accessLevel == "Bridgeman"){ return _res.status(400).json({ error: "Gaz says GET BACK TO WORK YOU CREMLING!!!" });}
                else{_res.status(400).json({ error: "Otherworlder?????"})}
            }}
    } catch (ex) {
        return _res.status(400).json({ error: "Invalid token." });
    }
};

mongoUserRouter.get("/auth", async (req, res, _next) => {
    const token = req.query.token;

    if (!token || typeof token !== 'string') {
        return res.status(400).json({ error: "Token is required and must be a string" });
    }

    try {
        console.log("DEEEEEEEECODING ");
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("DECODEEEEEED");
        console.log(decoded);

        res.status(200).json({ decoded: decoded });
    } catch (ex) {
        res.status(400).json({ error: "Invalid token." });
    }
});

mongoUserRouter.post("/register", async(_req, _res, _next) => {
    const email = _req.body._email
    const password = _req.body._password
    const userName = _req.body._username
    if (!email || !password || !userName) {return _res.status(400).json({ error: "Email, password and username are required" });}
    if(!mongoUserServ.emailIsValid(email)){return _res.status(400).json({ error: "Not a real email!" });}
    if(await mongoUserServ.userExists(email)){return _res.status(400).json({ error: "You already have an account!" });}
    
    const hPassword = await mongoUserServ.hashPassword(password)
    try{
        const result = await mongoUserServ.addUser(new User(new ObjectId(), userName, email, hPassword, "Bridgeman"))
        _res.status(200).json({
            result: result
        });
    }
    catch (error) {
        _res.status(500).json({
            error: error
        });
    }
}) 

mongoUserRouter.post("/login", async(_req, _res, _next) => {
    const email = _req.body._email
    const password = _req.body._password
    console.log(email)
    console.log(password)
    if (!email || !password ) {return _res.status(400).json({ error: "Email, password and username are required" });}
    if(!mongoUserServ.emailIsValid(email)){return _res.status(400).json({ error: "Not a real email!" });}
    if(!(await mongoUserServ.userExists(email))){return _res.status(400).json({ error: "You don't have an account!" });}
    
    try{
        const passwordIsValid = await mongoUserServ.verifyPassword(password, email)
        if(!passwordIsValid){ return _res.status(200).json({error: "Wrong password. Did you forget it?"});}
        else{
            const user = await mongoUserServ.getUserByEmail(email)
            if(user){

                const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });
                _res.status(200).json({ token });
            }
            else{
                _res.status(400).json({ error: "Couldn't log in." });
            }
        }
       
    }
    catch (error) {
        _res.status(500).json({
            error: error
        });
    }
}) 

