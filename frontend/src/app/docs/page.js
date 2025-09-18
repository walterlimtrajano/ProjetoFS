export default function DocsPage() {
  return (
    <div className="w-full h-screen">
      <h1 className="text-2xl font-bold mb-4">Documentação da API</h1>
      <iframe
        src="http://localhost:3001/api/docs/#/"
        className="w-full h-[80vh] border rounded"
        title="API Docs"
      />
    </div>
  );
}