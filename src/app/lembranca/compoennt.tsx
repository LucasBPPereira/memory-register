import DarkMode from "@/components/DarkMode";
import CardLembranca from "@/components/Lembrancas/CardLembranca";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Home, Link } from "lucide-react";

export default function Componente() {
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
