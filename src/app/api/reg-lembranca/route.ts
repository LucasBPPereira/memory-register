"use server";

import { PrismaGetInstance } from "@/lib/prisma-pg";
import { Lembranca } from "@prisma/client";
import { NextResponse } from "next/server";

interface RegLembrancaProps {
  title: string;
  description: string;
  dateLembranca: Date;
}

export interface ResLembrancaProps {
    error?: string;
    lembranca: Lembranca;
}

export async function GET() {
  const prisma = PrismaGetInstance();
  const lembranca = await prisma.lembranca.findMany();
  
  return NextResponse.json({ lembrancas: lembranca }, { status: 200 });
}

export async function POST(request: Request) {
  const body = (await request.json()) as RegLembrancaProps;
  const { title, description, dateLembranca } = body;

  console.log("verificacao");
  console.log(body);
  

  if (!title || !description || !dateLembranca) {
    return NextResponse.json(
      { error: "Missing Required Fields" },
      { status: 400 }
    );
  }

  try {
    console.log("indo para o cadastro");
    const prisma = PrismaGetInstance();
    const lembranca = await prisma.lembranca.create({
      data: {
        title,
        description,
        dateLembranca,
      },
    });

    console.log("lembrança criada");
    

    return NextResponse.json({ lembranca }, { status: 200 });
  } catch (err) {
    console.log("falhou", err);
    

  }
}
