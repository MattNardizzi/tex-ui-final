'use client';

import React, { useEffect, useState } from 'react';
import { getMutationLog } from '@/systems/mutationLog';

export default function MutationOverlay() {
  const [mutations, setMutations] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMutations(getMutationLog().slice(-5)); // last 5
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-20 left-6 text-xs font-mono text-yellow-300 z-30 bg-black/50 px-4 py-2 rounded-md border border-yellow-600 max-w-xs">
      <div className="font-bold mb-1">Mutation Log</div>
      {mutations.map((m, i) => (
        <div key={i} className="truncate">
          • {m.entry}
        </div>
      ))}
    </div>
  );
}
