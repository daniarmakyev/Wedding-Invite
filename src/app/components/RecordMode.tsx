"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
	{ selector: "section:nth-of-type(1)", pause: 3200 },
	{ selector: "section:nth-of-type(3)", pause: 6500 },
	{ selector: "section:nth-of-type(4)", pause: 6500 },
	{ selector: "section:nth-of-type(5)", pause: 6500 },
	{ selector: "footer", pause: 2000 },
];

function smoothScrollTo(targetY: number, duration: number): Promise<void> {
	return new Promise((resolve) => {
		const startY = window.scrollY;
		const distance = targetY - startY;
		const startTime = performance.now();

		function step(now: number) {
			const elapsed = now - startTime;
			const progress = Math.min(elapsed / duration, 1);

			const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
			const ease =
				progress < 0.5
					? 4 * progress * progress * progress
					: 1 - easeOutQuart(1 - (progress - 0.5) * 2);

			window.scrollTo(0, startY + distance * ease);

			if (progress < 1) requestAnimationFrame(step);
			else resolve();
		}

		requestAnimationFrame(step);
	});
}

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function RecordMode() {
	const searchParams = useSearchParams();
	const isRecord = searchParams.get("record") === "true";
	const [showOutro, setShowOutro] = useState(false);

	useEffect(() => {
		if (!isRecord) return;

		document.documentElement.style.setProperty("cursor", "none", "important");
		document.body.style.setProperty("cursor", "none", "important");

		const style = document.createElement("style");
		style.textContent = `
      *, *::before, *::after { cursor: none !important; }
      ::-webkit-scrollbar { display: none !important; }
      html { scrollbar-width: none !important; }
    `;
		document.head.appendChild(style);

		async function run() {
			await delay(100);

			for (const { selector, pause } of SECTIONS) {
				const el = document.querySelector(selector);
				if (!el) continue;

				const rect = el.getBoundingClientRect();
				let targetY = window.scrollY + rect.top;

				if (selector === "section:nth-of-type(3)") {
					targetY -= 280;
				}

				if (selector === "section:nth-of-type(4)") {
					targetY += 165;
				}

				if (selector === "section:nth-of-type(5)") {
					targetY -= 50;
				}

				const scrollDistance = Math.abs(targetY - window.scrollY);
				const baseDuration = 1800;
				const speedFactor = 1.9;
				const scrollDuration = Math.max(
					baseDuration,
					scrollDistance * speedFactor,
				);

				await smoothScrollTo(targetY, scrollDuration);
				await delay(pause);
			}

			await delay(500);
			await smoothScrollTo(0, 2000);
			await delay(1000);
			setShowOutro(true);
		}

		run();

		return () => {
			document.head.removeChild(style);
		};
	}, [isRecord]);

	if (!isRecord) return null;
	return (
		<AnimatePresence>
			{showOutro && (
				<motion.div
					key="outro"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1.5, ease: "easeInOut" }}
					style={{
						position: "fixed",
						inset: 0,
						zIndex: 9999,
						background:
							"radial-gradient(ellipse 80% 70% at 50% 50%, #fff8f2 0%, #fdeef4 50%, #fce0e8 100%)",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						overflow: "hidden",
					}}
				>
					<motion.div
						initial={{ opacity: 0, scale: 0.6 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
						style={{
							position: "absolute",
							width: "clamp(400px, 70vw, 900px)",
							height: "clamp(400px, 70vw, 900px)",
							borderRadius: "50%",
							background:
								"radial-gradient(circle, rgba(255,220,230,0.7) 0%, rgba(253,232,238,0.4) 40%, transparent 70%)",
							filter: "blur(40px)",
							pointerEvents: "none",
						}}
					/>

					<motion.div
						initial={{ opacity: 0, scale: 1.8 }}
						animate={{ opacity: [0, 0.15, 0] }}
						transition={{ delay: 0.8, duration: 3, ease: "easeInOut" }}
						style={{
							position: "absolute",
							width: "100%",
							height: "100%",
							background:
								"radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9) 0%, transparent 60%)",
							pointerEvents: "none",
						}}
					/>

					<motion.div
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
						style={{
							position: "relative",
							zIndex: 1,
							textAlign: "center",
							padding: "0 clamp(24px,6vw,80px)",
						}}
					>
						<div
							style={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								gap: "16px",
								marginBottom: "32px",
							}}
						>
							<div
								style={{
									flex: 1,
									maxWidth: "120px",
									height: "1px",
									background: "linear-gradient(90deg, transparent, #c9a96e)",
								}}
							/>
							<svg width="32" height="32" viewBox="0 0 52 52">
								<path
									d="M26 4C26 4 33 17 46 17C46 17 33 23.5 33 37C33 37 26 26 19 37C19 37 19 23.5 6 17C6 17 19 17 26 4Z"
									fill="#c9a96e"
									opacity="0.8"
								/>
								<circle cx="26" cy="17" r="3" fill="#e8d5a3" />
							</svg>
							<div
								style={{
									flex: 1,
									maxWidth: "120px",
									height: "1px",
									background: "linear-gradient(90deg, #c9a96e, transparent)",
								}}
							/>
						</div>

						<motion.p
							initial={{ opacity: 0, letterSpacing: "0.1em" }}
							animate={{ opacity: 1, letterSpacing: "0.4em" }}
							transition={{ delay: 1.3, duration: 1.5 }}
							style={{
								fontFamily: "var(--font-body)",
								fontSize: "clamp(1rem, 1.5vw, 1rem)",
								color: "#b58d44",
								textTransform: "uppercase",
								marginBottom: "20px",
							}}
						>
							той
						</motion.p>

						<motion.h2
							initial={{ opacity: 0, y: 16 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								delay: 1.5,
								duration: 1.2,
								ease: [0.22, 1, 0.36, 1],
							}}
							style={{
								fontFamily: "var(--font-script)",
								fontSize: "clamp(3rem, 9vw, 7rem)",
								color: "#c96880",
								lineHeight: 1,
								textShadow:
									"0 4px 30px rgba(201,104,128,0.25), 0 1px 0 rgba(255,255,255,0.9)",
								marginBottom: "24px",
							}}
						>
							Тагай &amp; Мээрим
						</motion.h2>

						<motion.div
							initial={{ scaleX: 0 }}
							animate={{ scaleX: 1 }}
							transition={{ delay: 2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
							style={{
								width: "clamp(120px, 20vw, 220px)",
								height: "1px",
								background:
									"linear-gradient(90deg, transparent, #c9a96e, transparent)",
								margin: "0 auto 28px",
							}}
						/>

						<motion.p
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 2.2, duration: 1 }}
							style={{
								fontFamily: "var(--font-body)",
								fontSize: "clamp(1.34rem, 2.8vw, 1.8rem)",
								color: "#c96880",
								fontStyle: "italic",
								fontWeight: 500,
								lineHeight: 1.7,
								letterSpacing: "0.05em",
							}}
						>
							Сизди асыга күтүп жатабыз
						</motion.p>

						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.7 }}
							transition={{ delay: 2.8, duration: 1 }}
							style={{
								fontFamily: "var(--font-body)",
								fontSize: "clamp(1rem, 1.5vw, 1rem)",
								color: "#bd954a",
								fontWeight: "bold",
								letterSpacing: "0.35em",
								textTransform: "uppercase",
								marginTop: "20px",
							}}
						>
							5-апрель 2026 · Бишкек · UNO
						</motion.p>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
