"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface EnvelopeIntroProps {
	onOpen: () => void;
}

export default function EnvelopeIntro({ onOpen }: EnvelopeIntroProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const [phase, setPhase] = useState<"idle" | "playing" | "flash">("idle");

	const handleClick = () => {
		if (phase !== "idle") return;
		setPhase("playing");
		videoRef.current?.play();
	};

	const handleVideoEnd = () => {
		setPhase("flash");
		setTimeout(() => onOpen(), 1400);
	};

	return (
		<motion.div
			className="fixed inset-0 z-50"
			style={{
				background:
					"radial-gradient(ellipse 90% 80% at 50% 48%, #f0d8d8 0%, #e2bfbf 35%, #d4a8a8 60%, #c89090 80%, #be8080 100%)",
				cursor: phase === "idle" ? "pointer" : "default",
			}}
			onClick={handleClick}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			{/* Видео — на весь экран */}
			<video
				ref={videoRef}
				src="/crop.mp4"
				muted
				playsInline
				onEnded={handleVideoEnd}
				style={{
					position: "absolute",
					inset: 0,
					width: "100%",
					height: "100%",
					objectFit: "cover",
					objectPosition: "center",
				}}
			/>

			{/* Текст сверху — исчезает при нажатии */}
			<AnimatePresence>
				{phase === "idle" && (
					<motion.p
						className="font-script text-center"
						style={{
							position: "absolute",
							top: "clamp(20px, 5vw, 40px)",
							left: 0,
							right: 0,
							color: "#b06175",
							fontSize: "clamp(1.5rem, 3.5vw, 1.9rem)",
							letterSpacing: "0.02em",
							zIndex: 2,
							textShadow: "0 2px 12px rgba(255,255,255,0.4)",
						}}
						initial={{ opacity: 0, y: -14 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						transition={{ delay: 0.4, duration: 0.9 }}
					>
						Сизге чакыруу келди
					</motion.p>
				)}
			</AnimatePresence>

			{/* Подсказка снизу — исчезает при нажатии */}
			<AnimatePresence>
				{phase === "idle" && (
					<motion.div
						style={{
							position: "absolute",
							bottom: "clamp(40px, 8vw, 70px)",
							left: 0,
							right: 0,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							gap: "8px",
							zIndex: 2,
						}}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ delay: 1.3, duration: 0.6 }}
					>
						<p
							className="font-script text-center"
							style={{
								color: "#af6275",
								fontWeight: "bold",
								fontSize: "clamp(1.3rem, 2.5vw, 1.2rem)",
								fontFamily: "Great Vibes, var(--font-body)",
								letterSpacing: "0.2em",
								fontStyle: "italic",
							}}
						>
							Aчуу учун басыңыз
						</p>
						<motion.div
							animate={{ y: [0, 6, 0] }}
							transition={{
								duration: 1.8,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						>
							<svg width="14" height="22" viewBox="0 0 14 22" fill="none">
								<path
									d="M7 0 L7 16 M1 10 L7 18 L13 10"
									stroke="#c9a96e"
									strokeWidth="1.3"
									strokeLinecap="round"
									strokeLinejoin="round"
									opacity="0.75"
								/>
							</svg>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Вспышка при переходе */}
			<AnimatePresence>
				{phase === "flash" && (
					<motion.div
						key="flash"
						style={{
							position: "absolute",
							inset: 0,
							background: "#fdf0f2",
							zIndex: 10,
							pointerEvents: "none",
						}}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1.2, ease: "easeInOut" }}
					/>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
