'use client';

import React, { useEffect, useState } from 'react';

const API_KEY = 'agCchIFQeGT96szCrVR_jxyR6UABqpZV';
const symbols = ['AAPL', 'MSFT', 'TSLA', 'NVDA', 'GOOGL', 'AMZN'];

export default function FinanceTicker() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const results = await Promise.all(
          symbols.map(async (symbol) => {
            const res = await fetch(
              `https://api.polygon.io/v2/last/trade/${symbol}?apiKey=${API_KEY}`
            );
            const data = await res.json();
            return {
              symbol,
              price: data?.results?.p ?? 0,
            };
          })
        );
        setPrices(results);
      } catch (err) {
        console.error('Ticker fetch error:', err);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap text-sm text-green-400 font-mono">
        {prices.map(({ symbol, price }) => (
          <span key={symbol} className="mx-4">
            {symbol}: ${price.toFixed(2)}
          </span>
        ))}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 18s linear infinite;
        }
      `}</style>
    </div>
  );
}
