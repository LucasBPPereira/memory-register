import CriarLembrança from "@/components/Form/FormCadastroLembranca";
import axios, { AxiosHeaders } from "axios";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function PageCriarLembranca() {
    try {
        await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/reg-lembranca`, {
          headers: headers() as unknown as AxiosHeaders,
        });
    
      } catch (err) {
        redirect("/login");
        if (err) {
        }
      }
    return (
        <>
            <CriarLembrança />
        </>
    )
}