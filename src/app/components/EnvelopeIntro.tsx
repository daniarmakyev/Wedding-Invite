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
			className="fixed inset-0 z-50 flex flex-col items-center justify-center"
			style={{
				background:
					"radial-gradient(ellipse 90% 80% at 50% 48%, #f0d8d8 0%, #e2bfbf 35%, #d4a8a8 60%, #c89090 80%, #be8080 100%)",
			}}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			<AnimatePresence>
				{phase === "flash" && (
					<motion.div
						key="flash"
						className="fixed inset-0 z-50 pointer-events-none"
						style={{ background: "#fdf0f2" }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 1.2, ease: "easeInOut" }}
					/>
				)}
			</AnimatePresence>

			{phase === "idle" && (
				<motion.p
					className="font-script text-center"
					style={{
						color: "#b07080",
						fontSize: "clamp(1.3rem, 3.5vw, 1.9rem)",
						marginBottom: "clamp(24px, 5vw, 44px)",
						letterSpacing: "0.02em",
					}}
					initial={{ opacity: 0, y: -14 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.9 }}
				>
					Вам пришло приглашение
				</motion.p>
			)}

			<motion.div
				onClick={handleClick}
				style={{
					cursor: phase === "idle" ? "pointer" : "default",
					userSelect: "none",
					position: "relative",
					width: "clamp(280px, 72vw, 520px)",
					borderRadius: "12px",
					overflow: "hidden",
				}}
				initial={{ opacity: 0, scale: 0.92 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ delay: 0.6, duration: 1, type: "spring", bounce: 0.2 }}
				whileHover={phase === "idle" ? { scale: 1.02, y: -4 } : {}}
			>
				<video
					ref={videoRef}
					src="/final.mp4"
					muted
					playsInline
					onEnded={handleVideoEnd}
					style={{
						width: "100%",
						display: "block",
						borderRadius: "12px",
						objectFit: "cover",
					}}
				/>

				{phase === "idle" && (
					<motion.div
						style={{
							position: "absolute",
							inset: 0,
							borderRadius: "12px",
							border: "1px solid rgba(201,169,110,0.3)",
							pointerEvents: "none",
						}}
					/>
				)}
			</motion.div>

			{phase === "idle" && (
				<motion.div
					style={{
						marginTop: "clamp(20px, 4vw, 36px)",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: "8px",
					}}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 1.3, duration: 0.6 }}
				>
					<p
						className="font-script text-center"
						style={{
							color: "#b07080",
							fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
						}}
					>
						нажмите, чтобы открыть
					</p>
					<motion.div
						animate={{ y: [0, 6, 0] }}
						transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
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
		</motion.div>
	);
}
