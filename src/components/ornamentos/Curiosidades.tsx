/*
 * Objetos del "gabinete de curiosidades": sagrado corazón, busto con collar,
 * frasco de perfume, camafeo y la escultura de El beso (Rodin) en mármol.
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

export function SagradoCorazon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 140" className={className} aria-hidden>
      <defs>
        <GradienteOro id="oro-corazon" />
      </defs>
      {Array.from({ length: 16 }, (_, i) => {
        const a = (i / 16) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={60 + Math.cos(a) * 44}
            y1={84 + Math.sin(a) * 44}
            x2={60 + Math.cos(a) * (i % 2 ? 54 : 60)}
            y2={84 + Math.sin(a) * (i % 2 ? 54 : 60)}
            stroke="url(#oro-corazon)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        );
      })}
      <path d="M60 30 C54 20 56 10 60 2 C64 10 66 20 60 30 Z" fill="#f3d33b" />
      <path d="M52 34 C44 28 44 20 48 14 C50 22 56 26 56 34 Z" fill="#f0b23a" />
      <path d="M68 34 C76 28 76 20 72 14 C70 22 64 26 64 34 Z" fill="#f0b23a" />
      <rect x="50" y="32" width="20" height="8" rx="2" fill="url(#oro-corazon)" />
      <path
        d="M60 124 C34 104 18 88 18 68 C18 52 30 42 44 42 C52 42 57 46 60 52 C63 46 68 42 76 42 C90 42 102 52 102 68 C102 88 86 104 60 124 Z"
        fill="url(#oro-corazon)"
      />
      <path
        d="M60 112 C40 96 28 84 28 69 C28 58 36 51 46 51 C52 51 57 55 60 61 C63 55 68 51 74 51 C84 51 92 58 92 69 C92 84 80 96 60 112 Z"
        fill="#d9506b"
      />
      <path d="M44 66 C50 70 70 70 76 66" stroke="#f6e3a1" strokeWidth="2" fill="none" strokeDasharray="0 4" strokeLinecap="round" />
      <path d="M60 64 V96 M50 76 H70" stroke="url(#oro-corazon)" strokeWidth="3" strokeLinecap="round" />
    </svg>
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

export function FrascoPerfume({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 160" className={className} aria-hidden>
      <defs>
        <GradienteOro id="oro-frasco" />
        <linearGradient id="vidrio-frasco" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e9c22a" />
          <stop offset="0.35" stopColor="#f8e46a" />
          <stop offset="1" stopColor="#e3b91f" />
        </linearGradient>
      </defs>
      <rect x="30" y="4" width="40" height="34" rx="3" fill="url(#oro-frasco)" />
      {Array.from({ length: 12 }, (_, i) => (
        <line key={i} x1={33 + i * 3} y1="6" x2={33 + i * 3} y2="36" stroke="#7a5718" strokeWidth="0.6" opacity="0.5" />
      ))}
      <rect x="36" y="38" width="28" height="6" fill="#d9b45a" />
      <path d="M14 58 L26 44 H74 L86 58 V150 C86 154 84 156 80 156 H20 C16 156 14 154 14 150 Z" fill="url(#vidrio-frasco)" />
      <path d="M28 146 V84 C28 70 38 62 50 62 C62 62 72 70 72 84 V146 Z" fill="#141210" />
      <path d="M31 143 V85 C31 73 40 66 50 66 C60 66 69 73 69 85 V143 Z" fill="#fbf6ea" />
      <g transform="translate(50 120) scale(0.32)">
        <path d="M0 60 C0 20 -4 -10 0 -60" stroke="#3e8e4e" strokeWidth="5" fill="none" />
        <circle cx="0" cy="-60" r="16" fill="#d9506b" />
        <circle cx="-26" cy="-14" r="11" fill="#5b7fd1" />
        <circle cx="24" cy="4" r="12" fill="#d9506b" />
        <circle cx="-20" cy="34" r="9" fill="#f3d33b" />
      </g>
      <text x="50" y="92" textAnchor="middle" fontFamily="var(--font-pinyon)" fontSize="15" fill="#1d1a16">
        Aura
      </text>
    </svg>
  );
}

export function Camafeo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 130" className={className} aria-hidden>
      <defs>
        <GradienteOro id="oro-camafeo" />
      </defs>
      <ellipse cx="50" cy="65" rx="46" ry="60" fill="url(#oro-camafeo)" />
      <ellipse cx="50" cy="65" rx="42" ry="56" fill="none" stroke="#f6e3a1" strokeWidth="1.6" strokeDasharray="0 4.2" strokeLinecap="round" />
      <ellipse cx="50" cy="65" rx="37" ry="50" fill="#d9506b" />
      <path
        d="M54 30 C66 30 72 42 70 52 C76 56 74 60 70 62 C72 66 70 68 68 70 C70 74 66 78 60 78 C60 86 66 92 74 96 C66 104 40 104 30 98 C38 92 42 86 40 76 C32 70 30 56 34 46 C38 36 46 30 54 30 Z"
        fill="#fbf6ea"
      />
      <path d="M40 40 C34 46 34 54 38 60" stroke="#e7dcc6" strokeWidth="2" fill="none" />
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
