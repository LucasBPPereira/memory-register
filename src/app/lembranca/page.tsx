import DarkMode from "@/components/DarkMode";
import CardLembranca from "@/components/Lembrancas/CardLembranca";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function Component() {
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
