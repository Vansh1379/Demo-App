import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();


export const signupLogic = async (req: Request, res: Response): Promise<void> => {
    try {
        const createPayload = req.body;

        // to check wheather the email already exist or not
        const userExist = await prisma.user.findFirst({
            where: { email: createPayload.email }
        });

        if (userExist) {
            res.status(409).json({
                msg: "User Already Exist! Please login",
            })
            return;
        }

        const newUser = await prisma.user.create({
            data: {
                name: createPayload.name,
                email: createPayload.email,
                phone_no: createPayload.phone_no,
                address: createPayload.address,
                password: createPayload.password,
            }
        });
        const id = newUser.id;

        const token = jwt.sign({
            data: newUser.id
        }, 'secret', { expiresIn: '5h' });

        res.status(201).json({
            token,
            id,
        });

    } catch (err) {
        res.status(500).json({
            msg: "Error in signup Auth controller logic"
        });
        console.error(err);
    }
};

//........................................................................................................................................

export const loginLogic = async (req: Request, res: Response) => {
    try {

        const payload = req.body;

        const UserExist = await prisma.user.findFirst({
            where: {
                email: payload.email,
                password: payload.password
            }
        });
        const id = UserExist?.id;

        if (UserExist) {
            const token = jwt.sign({
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

}

//---------------------------------------------------------------------------------------------------------------------------------------------------

export const UserDeatil = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const id = parseInt(req.params.id);

        const UserDetails = await prisma.user.findUnique({
            where: { id: id }
        });

        if (UserDetails) {
            res.status(200).json({
                UserDetails,
            })
            return;
        } else {
            res.status(404).json({
                msg: "error occured",
            });
            return;
        }

    } catch (err) {
        res.status(404).errored;
    }
}

//...........................................................................................................................................................

export const UpdateDeatils = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const param = req.params.id;
        const UserId = parseInt(param);

        const details = req.body;

        const updateDetails = await prisma.user.update({
            where: { id: UserId },
            data: {
                name: details.name,
                email: details.email,
                address: details.address,
                phone_no: details.phone_no,
                password: details.password,
            }
        })

        res.status(200).json({ msg: "Updated the profile successfully!" });
    }
    catch (err) {
        res.status(404).errored;
    }
}