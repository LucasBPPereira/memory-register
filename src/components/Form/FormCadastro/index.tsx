"use client";

import DarkMode from "@/components/DarkMode";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { LoaderPinwheel } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const userRegisterSchema = z.object({
    email: z.string().email().min(1, "O email não pode estar vazio"),
    password1: z.string().min(6, "No minimo 6 caracteres"),
    password2: z.string().min(6, "No minimo 6 caracteres")
}).superRefine((data, ctx) => {
    const emailReg = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    if (!emailReg.test(data.email)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["email"],
            message: "Digite um e-mail válido."
        });
    }

    if (data.password1 !== data.password2) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["password2"],
            message: "As senhas devem ser iguais",
        });
    }
});

type UserRegisterSchema = z.infer<typeof userRegisterSchema>;

export default function CadastroForm() {
    const router = useRouter();
    const form = useForm<UserRegisterSchema>({
        resolver: zodResolver(userRegisterSchema),
        defaultValues: {
            email: "",
            password1: "",
            password2: ""
        }
    })

    const handleSubmitForm = async (values: UserRegisterSchema) => {
        try {
            await axios.post(`${process.env.API_URL}/api/register`, {
                email: form.getValues("email"),
                password1: form.getValues("password1"),
                password2: form.getValues("password2")
            });

            router.push("/")

            return true
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response && err.response.data.error) {
                    // Usando o `setError` para exibir o erro geral no campo de e-mail
                    const errorMessage = err.response.data.error;

                    // Exibimos o erro no campo correto conforme o erro retornado pela API
                    if (errorMessage.includes("Invalid e-mail")) {
                        form.setError("email", {
                            type: "server",
                            message: "E-mail inválido.",
                        });
                    } else if (errorMessage.includes("Invalid password")) {
                        form.setError("password1", {
                            type: "server",
                            message: "Senha inválida ou as senhas não coincidem.",
                        });
                        form.setError("password2", {
                            type: "server",
                            message: "Senha inválida ou as senhas não coincidem.",
                        });
                    } else if (errorMessage.includes("Missing Required Fields")) {
                        form.setError("email", {
                            type: "server",
                            message: "Campos obrigatórios estão faltando.",
                        });
                    } else {
                        form.setError("email", {
                            type: "server",
                            message: "Erro inesperado. Tente novamente.",
                        });
                    }
                } else {
                    // Exibir um erro genérico se não houver resposta do servidor
                    form.setError("email", {
                        type: "server",
                        message: "Erro de conexão. Tente novamente mais tarde.",
                    });
                }

            }
        }
        console.log(values);

    }


    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="mb-5">
                <DarkMode />
            </div>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Cadastro</CardTitle>
                    <CardDescription>
                        Insira seu e-mail e senha para fazer o cadastro.
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmitForm)}>
                        <CardContent className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Insira aqui..." {...field} />
                                        </FormControl>
                                        <FormDescription>Pode ser o padrão</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password1"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Insira aqui..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password2"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Repita a senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Insira aqui..." {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex flex-col items-center">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={form.formState.isSubmitting}
                            >
                                {form.formState.isSubmitting && <LoaderPinwheel className="animate-spin mr-2"/>}
                                Cadastrar
                            </Button>
                            <div className="mt-5 underline text-center">
                                <Link href="/login" >Tente ir para o login</Link>
                            </div>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    )
}
