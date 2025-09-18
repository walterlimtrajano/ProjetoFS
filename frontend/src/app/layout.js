export const metadata = {
  title: "ProjetoFS",
  description: "Sistema de Reserva de Salas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="font-sans bg-gray-100">
        <header className="bg-blue-600 text-white p-4 flex gap-4">
          <a href="/login">Login</a>
          <a href="/register">Registro</a>
          <a href="/rooms">Salas</a>
          <a href="/profile">Perfil</a>
          <a href="/docs">Docs</a>
        </header>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
