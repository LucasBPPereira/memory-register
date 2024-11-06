"use server";

import { GenerateSession } from "@/lib/generate-session";
import { PrismaGetInstance } from "@/lib/prisma-pg";
import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcrypt";
import { addHours } from "date-fns";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface RegisterProps {
    email: string;
    password1: string;
    password2: string;
}

export interface ResRegisterProps {
    error: string;
    user: User;
}

export async function POST(request: Request) {
    const body = await request.json() as RegisterProps;

    const { email, password1, password2 } = body;
    console.log(email);
    

    if (!email || !password1 || !password2) {
        return NextResponse.json(
            { error: "Missing Required Fields" }, 
            { status: 400 }
        )
    }

    const emailReg = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    if (!emailReg.test(email)) {
        return NextResponse.json(
            { error: "Invalid e-mail" }, 
            { status: 400 }
        )
    }

    if (password1.length < 6 || password2.length < 6 || password1 !== password2) {
        return NextResponse.json(
            { error: "Invalid password" }, 
            { status: 400 }
        )
    }

    const hash = bcrypt.hashSync(password1, 10);

    
    try  {
        const prisma = PrismaGetInstance();
        const user = await prisma.user.create({
            data: {
                email,
                password: hash
            }
        });

        const sessionToken = GenerateSession({
            email,
            passwordHash: hash
        });

        await prisma.sessions.create({
            data: {
                userId: user.id,
                token: sessionToken,
                valid: true,
                expiresAt: addHours(new Date(), 24)
            }
        })

        cookies().set({
            name: "auth-session",
            value: sessionToken,
            httpOnly: true,
            path: "/"
        })
    
    
        return NextResponse.json(
            { user }, 
            { status: 200 }
        )
        
    } catch (err) {
        if (err instanceof PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                return NextResponse.json(
                    { error: "user already exists" }, 
                    { status: 400 }
                )
            }
        }
    }

}