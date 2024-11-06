"use server";

import { GenerateSession } from "@/lib/generate-session";
import { PrismaGetInstance } from "@/lib/prisma-pg";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { addHours } from "date-fns";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

interface LoginProps {
    email: string;
    password1: string;
    password2: string;
}

export interface ResponseLoginProps {
    error: string;
    user: User;
}

export async function GET() {
    
    const authCookie = cookies().get("auth-session");
    
    const sessionToken = authCookie?.value || ""; 

    const prisma = PrismaGetInstance();
    const session = await prisma.sessions.findFirst({
        where: {
            token: sessionToken
        },
    });

    if (!session || !session.valid || session.expiresAt < new Date()) NextResponse.json({ status: 401 });

    return NextResponse.json({}, { status: 200 });

}

export async function POST(request: Request) {
    const body = await request.json() as LoginProps;

    const { email, password1 } = body;
    console.log(email);
    

    if (!email || !password1) {
        return NextResponse.json(
            { session: "" }, 
            { status: 400 }
        )
    }
    
    try  {
        const prisma = PrismaGetInstance();
        
        const user = await prisma.user.findFirstOrThrow({
            where: {
                email
            }
        });

        const userPass = user.password

        const passwordResult = bcrypt.compareSync(password1, userPass);

        if (!passwordResult) {
            return NextResponse.json(
                { session: "" }, 
                { status: 400 }
            )
        }

        const sessionToken = GenerateSession({
            email,
            passwordHash: userPass
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
            { session: "deu boa cupinxa" }, 
            { status: 200 }
        )
        
    } catch (err) {
        console.log(err);
        
        return NextResponse.json(
            { session: "" }, 
            { status: 400 }
        )
    }

}