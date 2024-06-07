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
            _res.status(200).json({
                decoded: decoded
            })
        }
        else{_res.status(400).json({ error: "Invalid token." });}
    }catch (ex) {
        _res.status(400).json({ error: "Invalid token." });
    }
})


export const authenticateJWT = (_req: any, _res: any, _next: any) => {
    const token = _req.headers["authorization"];
    console.log(token)
    try {
        
        console.log("DEEEEEEEECODING ")
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        console.log("DECODEEEEEED")
        console.log(decoded)
        _req.user = decoded;
        _next();
    } catch (ex) {
        _res.status(400).json({ error: "Invalid token." });
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
        const result = await mongoUserServ.addUser(new User(new ObjectId(), userName, email, hPassword))
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

mongoUserRouter.get("/protected", authenticateJWT, async (_req, _res, _next) => {
    try {
        _res.status(200).json({
            message: "This is a protected route"
        });
    } catch (error) {
        _res.status(500).json({
            error: error
        });
    }
});

