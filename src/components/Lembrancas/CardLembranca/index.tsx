"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { CalendarIcon } from "lucide-react";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedLembranca, setSelectedLembranca] = useState<Lembranca | null>(null);

  useEffect(() => {
    async function fetchLembrancas() {
      try {
        const response = await axios.get("http://localhost:3000/api/reg-lembranca");
        if (response.status === 200 && response.data.lembrancas) {
          setLembrancas(response.data.lembrancas);
        } else {
          setLembrancas([]);
          console.warn("Nenhuma lembrança encontrada.");
        }
      } catch (err) {
        console.error("Erro ao carregar lembranças:", err);
        setError("Não foi possível carregar as lembranças.");
      }
    }

    fetchLembrancas();
  }, []);

  // Função para truncar a descrição a 160 caracteres
  const truncateDescription = (description: string) => {
    return description.length > 160 ? `${description.slice(0, 160)}...` : description;
  };

  // Função para abrir o modal e exibir a lembrança selecionada
  const handleOpenModal = (lembranca: Lembranca) => {
    setSelectedLembranca(lembranca);
    setModalOpen(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedLembranca(null);
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="flex flex-wrap gap-5 px-5">
      {lembrancas.length > 0 ? (
        lembrancas.map((lembranca) => (
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
        ))
      ) : (
        <p>Não há lembranças disponíveis.</p>
      )}

      {modalOpen && selectedLembranca && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md mx-auto shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{selectedLembranca.title}</h2>
            <p className="mb-4 text-gray-700">
              <strong>Data:</strong> {new Date(selectedLembranca.dateLembranca).toLocaleDateString()}
            </p>
            <p className="mb-4 text-gray-700">{selectedLembranca.description}</p>
            <Button variant="secondary" onClick={handleCloseModal}>Fechar</Button>
          </div>
        </div>
      )}
    </div>
  );
}
