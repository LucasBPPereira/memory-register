"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { CalendarIcon, X } from "lucide-react";
import { useEffect, useState } from "react";

interface Lembranca {
  id: string;
  title: string;
  description: string;
  dateLembranca: string;
}

export default function CardLembranca() {
  const [lembrancas, setLembrancas] = useState<Lembranca[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [titleFilter, setTitleFilter] = useState<string>("");

  // Modal states
  const [selectedLembranca, setSelectedLembranca] = useState<Lembranca | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Função para buscar lembranças com filtro por título
  const fetchLembrancas = async (title?: string) => {
    try {
      const response = await axios.get(`${process.env.API_URL}/api/reg-lembranca`, {
        params: { title }
      });
      if (response.status === 200 && response.data.lembrancas) {
        setLembrancas(response.data.lembrancas);
      } else {
        setLembrancas([]);
      }
    } catch (err) {
      console.error("Erro ao carregar lembranças:", err);
      setError("Não foi possível carregar as lembranças.");
    }
  };

  useEffect(() => {
    fetchLembrancas(); // Chama a função de busca ao carregar o componente
  }, []);

  useEffect(() => {
    fetchLembrancas(titleFilter); // Chama a busca sempre que o filtro de título mudar
  }, [titleFilter]);

  const truncateDescription = (description: string) => {
    return description.length > 160 ? `${description.slice(0, 160)}...` : description;
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleFilter(event.target.value);
  };

  // Função para abrir o modal e definir a lembrança selecionada
  const handleOpenModal = (lembranca: Lembranca) => {
    setSelectedLembranca(lembranca);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedLembranca(null);
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-col gap-5 px-5">
      <div className="flex gap-4 mb-4">
        <Input
          type="text"
          placeholder="Buscar por título"
          value={titleFilter}
          onChange={handleTitleChange}
          className="border px-2 py-1 rounded w-64"
        />
      </div>

      {lembrancas.length > 0 ? (
        <div className="flex flex-wrap gap-5">
          {lembrancas.map((lembranca) => (
            <Card key={lembranca.id} className="w-80">
              <CardHeader className="relative">
                <CardTitle>
                  <span className="pl-2">{lembranca.title}</span>
                  <span className="bg-rose-100 px-4 py-2 rounded-lg border-2 border-rose-900 text-rose-500 absolute right-3 top-4">
                    Sentimento
                  </span>
                </CardTitle>
                <p className="flex items-center px-2 py-1">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {new Date(lembranca.dateLembranca).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  {truncateDescription(lembranca.description)}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleOpenModal(lembranca)}>Ver Mais</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p>Não há lembranças disponíveis.</p>
      )}

      {/* Modal para exibir detalhes completos */}
      {isModalOpen && selectedLembranca && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96 relative">
            <button className="absolute top-2 right-2" onClick={handleCloseModal}>
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedLembranca.title}</h2>
            <p className="mb-2">
              <CalendarIcon className="mr-2 inline h-4 w-4" />
              {new Date(selectedLembranca.dateLembranca).toLocaleDateString()}
            </p>
            <p>{selectedLembranca.description}</p>
            <div className="mt-4">
              <Button onClick={handleCloseModal}>Fechar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
