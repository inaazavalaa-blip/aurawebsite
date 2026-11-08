/*
 * Ilustraciones del "gabinete de curiosidades": busto con collar
 * y la escultura de El beso (Rodin) en mármol.
 */

const ORO = ["#8a6420", "#d9b45a", "#f6e3a1", "#b8892e"];

function GradienteOro({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stopColor={ORO[0]} />
      <stop offset="0.35" stopColor={ORO[1]} />
      <stop offset="0.55" stopColor={ORO[2]} />
      <stop offset="1" stopColor={ORO[3]} />
    </linearGradient>
  );
}

export function Busto({ className = "", collar = "#f3ede0" }: { className?: string; collar?: string }) {
  const cuentas = Array.from({ length: 13 }, (_, i) => {
    const t = i / 12;
    const x = 42 + t * 36;
    const y = 58 + Math.sin(t * Math.PI) * 18;
    return { x, y };
  });
  return (
    <svg viewBox="0 0 120 160" className={className} aria-hidden>
      <defs>
        <GradienteOro id="oro-busto" />
        <linearGradient id="lino-busto" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e9e1cf" />
          <stop offset="0.5" stopColor="#fbf6ea" />
          <stop offset="1" stopColor="#ddd3bd" />
        </linearGradient>
      </defs>
      <path
        d="M50 8 H70 V34 C70 40 76 44 86 46 C100 50 108 58 108 72 L104 116 C96 124 78 128 60 128 C42 128 24 124 16 116 L12 72 C12 58 20 50 34 46 C44 44 50 40 50 34 Z"
        fill="url(#lino-busto)"
        stroke="#c9bfa8"
        strokeWidth="1"
      />
      <ellipse cx="60" cy="8" rx="10" ry="3" fill="#ddd3bd" />
      {cuentas.map((c, i) => (
        <circle key={i} cx={c.x} cy={c.y} r={i === 6 ? 4.4 : 3.1} fill={i === 6 ? "#d9506b" : collar} stroke="#b8892e" strokeWidth="0.6" />
      ))}
      <rect x="57" y="128" width="6" height="20" fill="url(#oro-busto)" />
      <path d="M36 156 C40 146 80 146 84 156 Z" fill="url(#oro-busto)" />
    </svg>
  );
}

/** Interpretación lineal de El beso de Rodin: dos figuras en mármol fundidas en un abrazo. */
export function BesoRodin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 220" className={className} aria-hidden>
      <defs>
        <linearGradient id="marmol" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fbf8f2" />
          <stop offset="0.6" stopColor="#ece6da" />
          <stop offset="1" stopColor="#d6cfc1" />
        </linearGradient>
      </defs>
      <path d="M20 200 H180 L172 176 H28 Z" fill="url(#marmol)" stroke="#c7bfae" />
      <path
        d="M58 176 C46 150 50 120 64 104 C70 96 72 84 70 72 C68 58 76 46 90 44 C100 43 106 50 106 58 C106 66 100 72 98 80 C110 84 120 96 122 112 C124 132 116 156 110 176 Z"
        fill="url(#marmol)"
        stroke="#bdb4a2"
        strokeWidth="1.2"
      />
      <path
        d="M150 176 C158 150 156 122 142 106 C134 96 128 86 126 76 C124 62 116 52 104 52 C96 52 92 58 94 66 C96 72 100 76 98 82 C88 92 84 108 86 124 C88 144 96 162 100 176 Z"
        fill="url(#marmol)"
        stroke="#bdb4a2"
        strokeWidth="1.2"
      />
      <path d="M98 80 C104 76 110 76 116 82" stroke="#bdb4a2" strokeWidth="1.2" fill="none" />
      <path d="M72 108 C86 100 104 98 124 104" stroke="#bdb4a2" strokeWidth="1.4" fill="none" />
      <path d="M90 130 C100 124 114 126 122 134" stroke="#cfc7b6" strokeWidth="1.2" fill="none" />
      <path d="M96 60 C98 62 100 62 102 60" stroke="#a89f8c" strokeWidth="1" fill="none" />
    </svg>
  );
}
