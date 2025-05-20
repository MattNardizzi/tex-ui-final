// src/lib/texAPI.js

export async function fetchTexResponse(prompt) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/think`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  return await res.json();
}
