import React from 'react';

const NeuralSpine = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center perspective">
        <div className="spine-core">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="spine-node animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }

        .spine-core {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          transform-style: preserve-3d;
          transform: rotateX(45deg);
        }

        .spine-node {
          width: 10px;
          height: 20px;
          background: radial-gradient(circle, #00f0ff, #005577);
          border-radius: 50%;
          box-shadow: 0 0 8px #00f0ff, 0 0 16px #00f0ff;
          animation: pulse 2s infinite ease-in-out;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.4);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default NeuralSpine;
