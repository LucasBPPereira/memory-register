"use client"

import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { ptBR } from "date-fns/locale"

import { ResLembrancaProps } from "@/app/api/reg-lembranca/route"
import DarkMode from "@/components/DarkMode"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { LoaderPinwheel } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const lembrancaRegisterSchema = z.object({
    dateLembranca: z.date({
      required_error: "A date is required.",
    }),
    description: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
    title: z.string().min(1, "Não pode estar vazio")

});

type LembrancaRegisterSchema = z.infer<typeof lembrancaRegisterSchema>;

export default function CriarLemmbrança() {
    
    const router = useRouter();
    //const [date, setDate] = React.useState<Date>();
    const form = useForm<LembrancaRegisterSchema>({
        resolver: zodResolver(lembrancaRegisterSchema),
        defaultValues: {
            dateLembranca: new Date(),
            description: "",
            title: ""
        }
    });

    const handlerOnSubmit = async (data: LembrancaRegisterSchema) => {
        
        await form.trigger()
        console.log(form.getValues("dateLembranca"));

        try {
            await axios.post<ResLembrancaProps>("/api/reg-lembranca", {
                title: form.getValues("title"),
                description: form.getValues("description"),
                dateLembranca: form.getValues("dateLembranca")
            })
            toast({
                title: "Lembrança criada!",
                description: `Lembrança do dia ${form.getValues("dateLembranca")} criada!`
            });

            router.push("/")
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response && err.response.data.error) {
                    // Usando o `setError` para exibir o erro geral no campo de e-mail
                    const errorMessage = err.response.data.error;
                    console.log(errorMessage);
                    
                }
            }
        }
        console.log(data);
    }

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <div className="mb-5">
                <DarkMode />
            </div>
            <Card >
                <CardHeader>
                    <CardTitle>Crie sua lembrança aqui!</CardTitle>
                    <CardDescription>Escreva seus melhores momentos aqui e após isso clique no botão para salvar e adicionar</CardDescription>
                </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handlerOnSubmit)} className="space-y-5">
                    <FormField 
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Titulo da lembrança</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormDescription>Isso vai ajudar a encontrar na sua lista</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dateLembranca"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Data da lembrança</FormLabel>
                                <div>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[240px] justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? format(field.value, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent
                                            align="start"
                                            className="flex w-auto flex-col space-y-2 p-2"
                                        >
                                            <Select
                                                onValueChange={(value) =>
                                                    addDays(new Date(), parseInt(value))
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione" />
                                                </SelectTrigger>
                                                <SelectContent position="popper">
                                                    <SelectItem value="0">Hoje</SelectItem>
                                                    <SelectItem value="1">Amanhã</SelectItem>
                                                    <SelectItem value="3">Em 3 dias</SelectItem>
                                                    <SelectItem value="7">Em uma semana</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <div className="rounded-md border">
                                                <Calendar
                                                    locale={ptBR}
                                                    mode="single"
                                                    selected={field.value}
                                                    onSelect={field.onChange}
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("2022-06-23")
                                                    }
                                                />
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <FormDescription>Selecione a data da qual você deseja lembrar futuramente</FormDescription>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descrição sobre a lembrança</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Comece escrevendo aqui, não esqueça nenhum detalhe em"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button 
                        type="submit"
                        disabled={form.formState.isSubmitting}
                    >
                    {form.formState.isSubmitting && <LoaderPinwheel className="animate-spin mr-2"/>}
                        Criar lembrança
                    </Button>
                </form>
            </Form>
            </CardContent>
            </Card>
        </div>
    )
}