'use client';
import { useState } from 'react';
import { fetchTexResponse } from '../lib/texAPI';

export default function TypingPanel() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(''); // Clear previous response

    try {
      const data = await fetchTexResponse(prompt);
      setResponse(data.response);
    } catch (err) {
      setResponse('⚠️ Error communicating with Tex.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700"
          rows="4"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask Tex anything..."
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Thinking...' : 'Submit'}
        </button>
      </form>

      {response && !loading && (
        <div className="mt-6 p-4 rounded bg-gray-800 text-green-300 border border-green-500">
          {response}
        </div>
      )}
    </div>
  );
}
