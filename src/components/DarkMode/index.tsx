"use client"

import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Laptop } from "lucide-react"

export default function DarkMode() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className={cn("cursor-pointer flex justify-between")}  onClick={() => setTheme("light")}>
          <p>Light</p> <SunIcon />
        </DropdownMenuItem>
        <DropdownMenuItem  className={cn("cursor-pointer flex justify-between")} onClick={() => setTheme("dark")}>
          <p>Dark</p>  <MoonIcon />
        </DropdownMenuItem>
        <DropdownMenuItem  className={cn("cursor-pointer flex justify-between")} onClick={() => setTheme("system")}>
          <p>System</p> <Laptop className=" h-[1.2rem] w-[1.2rem]" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
