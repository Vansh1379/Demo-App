"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDeatils = exports.UserDeatil = exports.loginLogic = exports.signupLogic = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const signupLogic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createPayload = req.body;
        // to check wheather the email already exist or not
        const userExist = yield prisma.user.findFirst({
            where: { email: createPayload.email }
        });
        if (userExist) {
            res.status(409).json({
                msg: "User Already Exist! Please login",
            });
            return;
        }
        const newUser = yield prisma.user.create({
            data: {
                name: createPayload.name,
                email: createPayload.email,
                phone_no: createPayload.phone_no,
                address: createPayload.address,
                password: createPayload.password,
            }
        });
        const id = newUser.id;
        const token = jsonwebtoken_1.default.sign({
            data: newUser.id
        }, 'secret', { expiresIn: '5h' });
        res.status(201).json({
            token,
            id,
        });
    }
    catch (err) {
        res.status(500).json({
            msg: "Error in signup Auth controller logic"
        });
        console.error(err);
    }
});
exports.signupLogic = signupLogic;
//........................................................................................................................................
const loginLogic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const UserExist = yield prisma.user.findFirst({
            where: {
                email: payload.email,
                password: payload.password
            }
        });
        const id = UserExist === null || UserExist === void 0 ? void 0 : UserExist.id;
        if (UserExist) {
            const token = jsonwebtoken_1.default.sign({
                data: UserExist.id
            }, 'secret', { expiresIn: '5h' });
            res.status(200).json({
                token,
                id,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            msg: "error in logging you in controller logic"
        });
        console.error(err);
    }
});
exports.loginLogic = loginLogic;
//---------------------------------------------------------------------------------------------------------------------------------------------------
const UserDeatil = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const UserDetails = yield prisma.user.findUnique({
            where: { id: id }
        });
        if (UserDetails) {
            res.status(200).json({
                UserDetails,
            });
            return;
        }
        else {
            res.status(404).json({
                msg: "error occured",
            });
            return;
        }
    }
    catch (err) {
        res.status(404).errored;
    }
});
exports.UserDeatil = UserDeatil;
//...........................................................................................................................................................
const UpdateDeatils = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const param = req.params.id;
        const UserId = parseInt(param);
        const details = req.body;
        const updateDetails = yield prisma.user.update({
            where: { id: UserId },
            data: {
                name: details.name,
                email: details.email,
                address: details.address,
                phone_no: details.phone_no,
                password: details.password,
            }
        });
        res.status(200).json({ msg: "Updated the profile successfully!" });
    }
    catch (err) {
        res.status(404).errored;
    }
});
exports.UpdateDeatils = UpdateDeatils;
