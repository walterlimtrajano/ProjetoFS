"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
  const { userId, token, logout } = useAuth();
  const [user, setUser] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  
  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    async function fetchUser() {
      try {
        const res = await fetch(`http://localhost:3001/api/usuarios/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Erro ao carregar usuário");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    }

    async function fetchReservas() {
      try {
        const res = await fetch(
          `http://localhost:3001/api/usuarios/${userId}/reservas`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error("Erro ao carregar reservas");
        const data = await res.json();
        setReservas(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
    fetchReservas();
  }, [token, userId, router]);

  
  async function cancelarReserva(idReserva) {
    try {
      await fetch(
        `http://localhost:3001/api/usuarios/${userId}/reservas/${idReserva}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReservas(reservas.filter((r) => r.id !== idReserva));
    } catch (err) {
      console.error(err);
    }
  }

  
  async function atualizarReserva(idReserva) {
    try {
      const novoHorario = prompt("Digite o novo ID do horário:");
      if (!novoHorario) return;

      const res = await fetch(
        `http://localhost:3001/api/usuarios/${userId}/reservas/${idReserva}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ horario_id: Number(novoHorario) }),
        }
      );

      if (!res.ok) throw new Error("Erro ao atualizar reserva");
      const updated = await res.json();

      setReservas(reservas.map((r) => (r.id === idReserva ? updated : r)));
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <p>Carregando...</p>;

  if (!user) return <p>Erro ao carregar dados do usuário.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Perfil</h1>
      <p>
        <b>Nome:</b> {user.nome}
      </p>
      <p>
        <b>Email:</b> {user.email}
      </p>

      <h2 className="text-xl font-semibold mt-4">Minhas Reservas</h2>
      {reservas.length === 0 ? (
        <p>Nenhuma reserva encontrada.</p>
      ) : (
        <ul>
          {reservas.map((r) => (
            <li key={r.id} className="mb-2">
              Sala: {r.sala_id} | Data: {r.data} | Horário: {r.horario_id}
              <button
                onClick={() => cancelarReserva(r.id)}
                className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
              >
                Cancelar
              </button>
              <button
                onClick={() => atualizarReserva(r.id)}
                className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
              >
                Atualizar
              </button>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => {
          logout();
          router.push("/login");
        }}
        className="mt-4 px-4 py-2 bg-gray-700 text-white rounded"
      >
        Sair
      </button>
    </div>
  );
}
