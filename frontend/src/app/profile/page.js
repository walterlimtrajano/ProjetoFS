"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function ProfilePage() {
  const { userId, token, logout } = useAuth();
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }
    fetch(`http://localhost:3001/api/usuarios/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error(err));
  }, [token, userId, router]);

  if (!user) return <p>Carregando...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 className="text-2xl font-bold">Perfil</h1>
      <p><b>Nome:</b> {user.nome}</p>
      <p><b>Email:</b> {user.email}</p>

      <h2 className="text-xl font-semibold mt-4">Reservas</h2>
      <p>Aqui vamos mostrar os dados do usuário e suas reservas.</p>

      <button
        onClick={() => {
          logout();
          router.push("/login");
        }}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Sair
      </button>
    </div>
  );
}
