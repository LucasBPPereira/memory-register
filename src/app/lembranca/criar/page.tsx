"use client"

import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { ptBR } from "date-fns/locale"

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
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
    data: z.date({
      required_error: "A date is required.",
    }),
    descricao: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
    titulo: z.string().min(1, "Não pode estar vazio")

});

type FormSchema = z.infer<typeof formSchema>;

export default function CriarLemmbrança() {
    //const [date, setDate] = React.useState<Date>();
    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            data: new Date(),
            descricao: "",
            titulo: ""
        }
    });

    const handlerOnSubmit = async () => {
        console.log(form.getValues("data"));
        
        await form.trigger()
        toast({
            title: "Lembrança criada!",
            description: `Lembrança do dia ${form.getValues("data")} criada!`
        })
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
                        name="titulo"
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
                        name="data"
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
                                                        date > new Date() || date < new Date("2018-01-01")
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
                        name="descricao"
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
                    <Button>Criar lembrança</Button>
                </form>
            </Form>
            </CardContent>
            </Card>
        </div>
    )
}