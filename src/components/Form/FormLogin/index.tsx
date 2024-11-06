"use client";

import { ResponseLoginProps } from "@/app/api/login/route";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
  password1: z.string().min(1, "A senha não pode estar vazia"),
})

type UserRegisterSchema = z.infer<typeof userRegisterSchema>;

export default function Login() {
  const router = useRouter();
  const form = useForm<UserRegisterSchema>({
    resolver: zodResolver(userRegisterSchema),
    defaultValues: {
      email: "",
      password1: "",
    },
  });

  const handleSubmitLogin = async (values: UserRegisterSchema) => {
    try {
      await axios.post<ResponseLoginProps>(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        email: form.getValues("email"),
        password1: form.getValues("password1"),
      });

      router.push("/")

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
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Insira seu e-mail e senha para fazer o login.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmitLogin)}>
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
            </CardContent>
            <CardFooter className="flex flex-col items-center">
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && <LoaderPinwheel className="animate-spin mr-2" />}
                Acessar
              </Button>
              <div className="mt-5 underline text-center">
                <Link href="/cadastro" >Ir para o Cadastro</Link>
              </div>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
