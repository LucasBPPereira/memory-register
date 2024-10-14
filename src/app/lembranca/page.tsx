"use client"

import DarkMode from "@/components/DarkMode"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon } from "lucide-react"

export default function Component() {
    return (
        <div
            className=" w-full h-screen"
        >
            <header className="p-5 h-20 w-full border-transparent border-b-2 mb-4 flex justify-between">
                <Avatar>
                    <AvatarImage src="" alt="Foto do usuário" />
                    <AvatarFallback>User</AvatarFallback>
                </Avatar>
                <DarkMode />
            </header>
            <div className="flex flex-wrap gap-5 px-5">
                <Card className="w-80">
                    <CardHeader className="relative">
                        <CardTitle>
                            <span className="pl-2">Domingo a tarde</span>
                            <span className="bg-rose-100 px-4 py-2 rounded-lg border-2 border-rose-900 text-rose-500 absolute right-3 top-4">Sentimento</span>
                        </CardTitle>
                        <p className="flex items-center px-2 py-1">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Data do card
                        </p>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias laudantium, similique earum quae ad iste doloremque labore in ipsum maiores optio, consectetur ullam...</CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Button>Relembrar</Button>
                    </CardFooter>
                </Card>
                <Card className="w-80">
                    <CardHeader className="relative">
                        <CardTitle>
                            <span className="pl-2">Domingo a tarde</span>
                            <span className="bg-rose-100 px-4 py-2 rounded-lg border-2 border-rose-900 text-rose-500 absolute right-3 top-4">Sentimento</span>
                        </CardTitle>
                        <p className="flex items-center px-2 py-1">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Data do card
                        </p>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias laudantium, similique earum quae ad iste doloremque labore in ipsum maiores optio, consectetur ullam...</CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Button>Relembrar</Button>
                    </CardFooter>
                </Card>
                <Card className="w-80">
                    <CardHeader className="relative">
                        <CardTitle>
                            <span className="pl-2">Domingo a tarde</span>
                            <span className="bg-rose-100 px-4 py-2 rounded-lg border-2 border-rose-900 text-rose-500 absolute right-3 top-4">Sentimento</span>
                        </CardTitle>
                        <p className="flex items-center px-2 py-1">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Data do card
                        </p>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias laudantium, similique earum quae ad iste doloremque labore in ipsum maiores optio, consectetur ullam...</CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Button>Relembrar</Button>
                    </CardFooter>
                </Card>
                <Card className="w-80">
                    <CardHeader className="relative">
                        <CardTitle>
                            <span className="pl-2">Domingo a tarde</span>
                            <span className="bg-rose-100 px-4 py-2 rounded-lg border-2 border-rose-900 text-rose-500 absolute right-3 top-4">Sentimento</span>
                        </CardTitle>
                        <p className="flex items-center px-2 py-1">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Data do card
                        </p>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias laudantium, similique earum quae ad iste doloremque labore in ipsum maiores optio, consectetur ullam...</CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Button>Relembrar</Button>
                    </CardFooter>
                </Card>
                <Card className="w-80">
                    <CardHeader className="relative">
                        <CardTitle>
                            <span className="pl-2">Domingo a tarde</span>
                            <span className="bg-rose-100 px-4 py-2 rounded-lg border-2 border-rose-900 text-rose-500 absolute right-3 top-4">Sentimento</span>
                        </CardTitle>
                        <p className="flex items-center px-2 py-1">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Data do card
                        </p>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias laudantium, similique earum quae ad iste doloremque labore in ipsum maiores optio, consectetur ullam...</CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Button>Relembrar</Button>
                    </CardFooter>
                </Card>
                <Card className="w-80">
                    <CardHeader className="relative">
                        <CardTitle>
                            <span className="pl-2">Domingo a tarde</span>
                            <span className="bg-rose-100 px-4 py-2 rounded-lg border-2 border-rose-900 text-rose-500 absolute right-3 top-4">Sentimento</span>
                        </CardTitle>
                        <p className="flex items-center px-2 py-1">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Data do card
                        </p>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias laudantium, similique earum quae ad iste doloremque labore in ipsum maiores optio, consectetur ullam...</CardDescription>
                    </CardContent>
                    <CardFooter>
                        <Button>Relembrar</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
