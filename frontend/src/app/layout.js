export const metadata = {
  title: "ProjetoFS",
  description: "Sistema de Reserva de Salas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
        {/* Navbar */}
        <header className="bg-blue-600 text-white shadow-md">
          <nav className="container mx-auto flex justify-between items-center p-4">
            <h1 className="text-xl font-bold">ProjetoFS</h1>
            <ul className="flex gap-6">
              <li><a href="/login" className="hover:underline">Login</a></li>
              <li><a href="/register" className="hover:underline">Registro</a></li>
              <li><a href="/rooms" className="hover:underline">Salas</a></li>
              <li><a href="/profile" className="hover:underline">Perfil</a></li>
              <li><a href="/docs" className="hover:underline">Docs</a></li>
            </ul>
          </nav>
        </header>

        {/* Conteúdo principal */}
        <main className="flex-1 container mx-auto p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-blue-600 text-white text-center p-4 mt-6">
          <p>&copy; {new Date().getFullYear()} ProjetoFS - Sistema de Reserva de Salas</p>
        </footer>
      </body>
    </html>
  );
}
