"use client";
import { useState, useEffect, useRef } from "react";

const WEDDING_DATE = new Date("2026-04-05T17:00:00");

function getTimeLeft() {
	const now = new Date();
	const diff = WEDDING_DATE.getTime() - now.getTime();
	if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
	return {
		days: Math.floor(diff / 86400000),
		hours: Math.floor((diff / 3600000) % 24),
		minutes: Math.floor((diff / 60000) % 60),
		seconds: Math.floor((diff / 1000) % 60),
	};
}

function FlipUnit({ value, label }: { value: number; label: string }) {
	const [flip, setFlip] = useState(false);
	const prevValue = useRef(value);

	useEffect(() => {
		if (prevValue.current !== value) {
			prevValue.current = value;
			const t1 = setTimeout(() => setFlip(true), 0);
			const t2 = setTimeout(() => setFlip(false), 350);
			return () => {
				clearTimeout(t1);
				clearTimeout(t2);
			};
		}
	}, [value]);

	return (
		<div
			style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
		>
			<div
				style={{
					position: "relative",
					padding: "clamp(18px,3vw,28px) clamp(16px,3vw,28px)",
					minWidth: "clamp(80px,14vw,110px)",
					background:
						"linear-gradient(145deg, rgba(255,248,242,0.98), rgba(253,232,238,0.9))",
					border: "1px solid rgba(201,169,110,0.4)",
					borderRadius: "3px",
					textAlign: "center",
					boxShadow:
						"0 8px 32px rgba(201,104,128,0.12), inset 0 1px 0 rgba(255,255,255,0.9), 0 0 0 4px rgba(201,169,110,0.06)",
					overflow: "hidden",
				}}
			>
				{/* золотые линии по краям */}
				{["top", "bottom"].map((side) => (
					<div
						key={side}
						style={{
							position: "absolute",
							[side]: 0,
							left: "12%",
							right: "12%",
							height: "1.5px",
							background:
								"linear-gradient(90deg, transparent, #c9a96e, transparent)",
						}}
					/>
				))}
				{["left", "right"].map((side) => (
					<div
						key={side}
						style={{
							position: "absolute",
							[side]: 0,
							top: "12%",
							bottom: "12%",
							width: "1.5px",
							background:
								"linear-gradient(180deg, transparent, #c9a96e, transparent)",
						}}
					/>
				))}
				{/* угловые крестики */}
				{[
					{ top: "-5px", left: "-5px" },
					{ top: "-5px", right: "-5px" },
					{ bottom: "-5px", left: "-5px" },
					{ bottom: "-5px", right: "-5px" },
				].map((pos, j) => (
					<svg
						key={j}
						style={{
							position: "absolute",
							width: "10px",
							height: "10px",
							...pos,
						}}
						viewBox="0 0 10 10"
					>
						<path
							d="M5,1 L5,9 M1,5 L9,5"
							stroke="#c9a96e"
							strokeWidth="1"
							opacity="0.7"
						/>
					</svg>
				))}

				<style>{`
          @keyframes flipIn {
            0%   { transform: translateY(-60%) scaleY(0.4); opacity: 0; }
            60%  { transform: translateY(8%) scaleY(1.05); opacity: 1; }
            100% { transform: translateY(0%) scaleY(1); opacity: 1; }
          }
          .flip-animate {
            animation: flipIn 0.35s cubic-bezier(0.22,1,0.36,1) forwards;
          }
        `}</style>

				<span
					className={`font-script${flip ? " flip-animate" : ""}`}
					style={{
						fontSize: "clamp(2.6rem,6vw,4rem)",
						lineHeight: 1,
						display: "block",
						color: "#c96880",
						textShadow: "0 2px 12px rgba(201,104,128,0.2)",
					}}
				>
					{String(value).padStart(2, "0")}
				</span>
			</div>
			<span
				style={{
					fontFamily: "var(--font-body)",
					marginTop: "12px",
					fontSize: "clamp(0.58rem,1.1vw,0.7rem)",
					letterSpacing: "0.35em",
					textTransform: "uppercase",
					color: "#c9a96e",
				}}
			>
				{label}
			</span>
		</div>
	);
}

export default function Countdown() {
	const [timeLeft, setTimeLeft] = useState(() => getTimeLeft());

	useEffect(() => {
		const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div
			style={{
				display: "flex",
				gap: "clamp(10px,2.5vw,24px)",
				justifyContent: "center",
				flexWrap: "nowrap",
			}}
		>
			<FlipUnit value={timeLeft.days} label="күн" />
			<FlipUnit value={timeLeft.hours} label="саат" />
			<FlipUnit value={timeLeft.minutes} label="мүнөт" />
			<FlipUnit value={timeLeft.seconds} label="секунд" />
		</div>
	);
}
