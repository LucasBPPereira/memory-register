import DarkMode from "@/components/DarkMode";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios, { AxiosError, AxiosHeaders } from "axios";
import { BookOpen, Heart, SmilePlus } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  try {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      headers: headers() as unknown as AxiosHeaders,
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) {
        redirect("/login");
      }
    }
  }

  const horaAtual = new Date().getHours();
  let cumprimento = "";
  if (horaAtual >= 18) {
    cumprimento = "boa noite.";
  } else if (horaAtual > 6 && horaAtual < 12) {
    cumprimento = "bom dia!";
  } else {
    cumprimento = "boa tarde!";
  }
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center">
      <div className="mb-5">
        <DarkMode />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-center mb-2">
            Olá, {cumprimento} O que deseja agora?
          </CardTitle>
          <CardDescription className="text-center ">
            Clique em uma das opções
            <Heart className=" ml-2 inline fill-red-300 stroke-red-600" />
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div>
            <Link href="/lembranca/criar">
              <div className="group flex flex-col gap-7 cursor-pointer h-28 w-36 px-4 py-2 border border-input bg-background shadow-sm hover:bg-purple-100 hover:text-purple-800 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                <SmilePlus className="group-hover:stroke-purple-600" />
                <p>Criar Lembrança</p>
              </div>
            </Link>
          </div>
          <div>
            <Link href="/lembranca">
              <div className="group flex flex-col gap-7 cursor-pointer h-28 w-36 px-4 py-2 border border-input bg-background shadow-sm hover:bg-blue-50 hover:text-blue-800 items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                <BookOpen className="group-hover:stroke-blue-700" />
                <p>Ler</p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
