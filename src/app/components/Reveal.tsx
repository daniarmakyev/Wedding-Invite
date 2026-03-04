"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RevealProps {
	children: React.ReactNode;
	delay?: number;
	className?: string;
	direction?: "up" | "left" | "right" | "none";
}

export default function Reveal({
	children,
	delay = 0,
	className = "",
	direction = "up",
}: RevealProps) {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true, margin: "-60px" });

	const initial =
		direction === "up"
			? { opacity: 0, y: 50 }
			: direction === "left"
				? { opacity: 0, x: -50 }
				: direction === "right"
					? { opacity: 0, x: 50 }
					: { opacity: 0 };

	const animate = inView ? { opacity: 1, y: 0, x: 0 } : initial;

	return (
		<motion.div
			ref={ref}
			initial={initial}
			animate={animate}
			transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
			className={className}
		>
			{children}
		</motion.div>
	);
}
