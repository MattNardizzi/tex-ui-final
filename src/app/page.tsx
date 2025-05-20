// app/page.tsx
import TypingPanel from '../components/TypingPanel';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🧠 Tex: Sovereign Cognition Interface</h1>
      <TypingPanel />
    </main>
  );
}
