import DarkMode from "@/components/DarkMode";
import CardLembranca from "@/components/Lembrancas/CardLembranca";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import axios, { AxiosError, AxiosHeaders } from "axios";
import { Home } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Component() {

  try {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
      headers: headers() as unknown as AxiosHeaders,
    });
  } catch (err) {
    if (err instanceof AxiosError) {
      if (err.response?.status === 401) {
        redirect("/login");
      }
    }
  }

  return (
    <div className="w-full h-screen">
      <header className="p-5 h-20 w-full border-transparent border-b-2 mb-4 flex justify-between">
        <Avatar>
          <AvatarImage src="" alt="Foto do usuário" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <div>
            <Link href="/">
                <Button variant="outline" size="icon">
                    <Home />
                </Button>
            </Link>
            <DarkMode />
        </div>
      </header>
      <CardLembranca />
    </div>
  );
}
