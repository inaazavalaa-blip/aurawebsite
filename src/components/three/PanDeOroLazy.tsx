"use client";

import dynamic from "next/dynamic";

// Three.js solo se carga en el cliente.
const PanDeOroLazy = dynamic(() => import("./PanDeOro"), { ssr: false, loading: () => null });

export default PanDeOroLazy;
