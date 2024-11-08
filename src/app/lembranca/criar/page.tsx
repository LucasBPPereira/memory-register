import CriarLembrança from "@/components/Form/FormCadastroLembranca";
import axios, { AxiosError, AxiosHeaders } from "axios";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function PageCriarLembranca() {
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
        <>
            <CriarLembrança />
        </>
    )
}