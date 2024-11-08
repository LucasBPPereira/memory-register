import Componente from "./compoennt";

export default async function Component() {

  // try {
  //   await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
  //     headers: headers() as unknown as AxiosHeaders,
  //   });
  // } catch (err) {
  //   if (err instanceof AxiosError) {
  //     if (err.response?.status === 401) {
  //       redirect("/login");
  //     }
  //   }
  // }

  return (
    <Componente />
  );
}
