"use client";

import { useEffect, useRef, useState } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────
//  Contador animado que dispara ao entrar na viewport.
//
//  Aceita números puros ("23", "100") com prefixo/sufixo opcionais
//  ("+", "%", " min"). Para rótulos não-numéricos, exibe o valor cru.
// ─────────────────────────────────────────────────────────────────────────

interface CountUpProps {
  /** valor final numérico (ex.: 23, 100, 8) */
  to: number;
  prefix?: string;
  suffix?: string;
  /** duração em segundos */
  duration?: number;
  className?: string;
}

export function CountUp({
  to,
  prefix = "",
  suffix = "",
  duration = 1.4,
  className,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [valor, setValor] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValor(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {valor}
      {suffix}
    </span>
  );
}

// Versão para valores fracionários/decimais (ex.: notas como 4.9).
export function CountUpDecimal({
  to,
  decimals = 1,
  prefix = "",
  suffix = "",
  duration = 1.4,
  className,
}: CountUpProps & { decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });
  const [texto, setTexto] = useState("0");

  useEffect(() => {
    if (inView) mv.set(to);
  }, [inView, to, mv]);

  useEffect(() => {
    return spring.on("change", (v) => setTexto(v.toFixed(decimals)));
  }, [spring, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {texto}
      {suffix}
    </span>
  );
}
