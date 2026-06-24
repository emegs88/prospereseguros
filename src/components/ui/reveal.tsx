"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

// ─────────────────────────────────────────────────────────────────────────
//  Primitivas de animação de scroll (Framer Motion).
//
//  <Reveal>        — revela um bloco ao entrar na viewport (fade + slide-up).
//  <StaggerGroup>  — orquestra os filhos <RevealItem> em cascata.
//  <RevealItem>    — item individual dentro de um StaggerGroup.
//
//  Todas respeitam prefers-reduced-motion automaticamente (Framer Motion).
// ─────────────────────────────────────────────────────────────────────────

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** atraso em segundos antes de animar */
  delay?: number;
  /** deslocamento vertical inicial em px (padrão 24) */
  y?: number;
}

export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const groupVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function StaggerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
