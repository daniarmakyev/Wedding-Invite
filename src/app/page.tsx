"use client";

import { useState, useRef } from "react";
import {
	AnimatePresence,
	motion,
	useScroll,
	useTransform,
} from "framer-motion";
import EnvelopeIntro from "./components/EnvelopeIntro";
import Reveal from "./components/Reveal";
import Countdown from "./components/Countdown";
import Petals from "./components/Petals";

/* ─── GLOBAL STYLES (shimmer) ───────────────────────── */
const GlobalStyles = () => (
	<style>{`
  @keyframes nameShimmer {
    0%   { background-position: -300% center; }
    100% { background-position: 300% center; }
  }
  @keyframes medallionPulse {
    0%, 100% { box-shadow: 0 14px 55px rgba(201,104,128,0.3), inset 0 1px 0 rgba(255,255,255,0.95), 0 0 0 0px rgba(201,169,110,0); }
    50%       { box-shadow: 0 14px 55px rgba(201,104,128,0.45), inset 0 1px 0 rgba(255,255,255,0.95), 0 0 30px 8px rgba(201,169,110,0.18); }
  }
  .name-shimmer {
    background: linear-gradient(90deg, #c96880 30%, #ffe0b5 50%, #c96880 70%);
    background-size: 350% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: nameShimmer 15s linear infinite;
  animation-delay: 5s;
  }
  .medallion-pulse {
    animation: medallionPulse 2s ease-in-out infinite;
  }
`}</style>
);

/* ─── SVG ATOMS ─────────────────────────────────────── */

const FloralCorner = ({ style }: { style?: React.CSSProperties }) => (
	<svg
		viewBox="0 0 160 160"
		style={{
			width: "clamp(70px,11vw,130px)",
			height: "clamp(70px,11vw,130px)",
			...style,
		}}
	>
		<g fill="none" stroke="#c9a96e" strokeWidth="0.85" opacity="0.65">
			<path d="M8,152 Q8,8 152,8" />
			<path d="M14,152 Q14,14 152,14" opacity="0.4" />
			<path d="M20,152 Q20,20 152,20" opacity="0.2" />
			<path d="M8,108 Q34,78 20,40 Q42,64 64,46 Q44,72 58,98" />
			<path d="M8,72 Q28,50 22,22 Q40,44 60,30" />
			<path d="M40,132 Q66,96 102,112 Q72,88 94,64" />
			<path d="M8,44 Q18,30 16,14 Q26,28 38,20" />
			<path d="M68,140 Q90,116 118,128" />
			<circle cx="22" cy="24" r="5" fill="#c9a96e" stroke="none" />
			<circle cx="62" cy="32" r="3.5" fill="#c9a96e" stroke="none" />
			<circle cx="95" cy="64" r="3.5" fill="#c9a96e" stroke="none" />
			<circle cx="58" cy="97" r="3" fill="#c9a96e" stroke="none" />
			<circle
				cx="38"
				cy="21"
				r="2.5"
				fill="#c9a96e"
				stroke="none"
				opacity="0.7"
			/>
			<circle
				cx="118"
				cy="128"
				r="2.5"
				fill="#c9a96e"
				stroke="none"
				opacity="0.7"
			/>
			<path
				d="M20,24 Q26,15 33,21 Q27,30 20,24Z"
				fill="#c9a96e"
				stroke="none"
				opacity="0.7"
			/>
			<path
				d="M60,32 Q66,23 73,29 Q67,38 60,32Z"
				fill="#c9a96e"
				stroke="none"
				opacity="0.7"
			/>
			<path
				d="M93,64 Q99,55 106,61 Q100,70 93,64Z"
				fill="#c9a96e"
				stroke="none"
				opacity="0.7"
			/>
		</g>
	</svg>
);

const GoldDivider = () => (
	<div
		style={{
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			gap: "14px",
			margin: "18px auto",
		}}
	>
		<div
			style={{
				flex: 1,
				height: "1px",
				background: "linear-gradient(90deg, transparent, #c9a96e)",
			}}
		/>
		<svg width="48" height="20" viewBox="0 0 48 20">
			<path
				d="M4,10 L10,4 L16,10 L10,16Z"
				fill="none"
				stroke="#c9a96e"
				strokeWidth="0.8"
				opacity="0.6"
			/>
			<path d="M24,3 L26.5,10 L24,17 L21.5,10Z" fill="#c9a96e" opacity="0.85" />
			<path
				d="M32,10 L38,4 L44,10 L38,16Z"
				fill="none"
				stroke="#c9a96e"
				strokeWidth="0.8"
				opacity="0.6"
			/>
			<circle cx="24" cy="10" r="1.8" fill="#e8d5a3" />
		</svg>
		<div
			style={{
				flex: 1,
				height: "1px",
				background: "linear-gradient(90deg, #c9a96e, transparent)",
			}}
		/>
	</div>
);

const OrnamentBand = () => (
	<svg
		viewBox="0 0 900 28"
		style={{
			width: "100%",
			maxWidth: "720px",
			display: "block",
			margin: "0 auto",
		}}
	>
		<defs>
			<linearGradient id="bandGold" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop offset="0%" stopColor="transparent" />
				<stop offset="15%" stopColor="#c9a96e" />
				<stop offset="50%" stopColor="#e8d5a3" />
				<stop offset="85%" stopColor="#c9a96e" />
				<stop offset="100%" stopColor="transparent" />
			</linearGradient>
		</defs>
		<line
			x1="0"
			y1="14"
			x2="900"
			y2="14"
			stroke="url(#bandGold)"
			strokeWidth="0.7"
		/>
		<line
			x1="0"
			y1="18"
			x2="900"
			y2="18"
			stroke="url(#bandGold)"
			strokeWidth="0.4"
			opacity="0.5"
		/>
		{[150, 270, 390, 450, 510, 630, 750].map((x, i) => (
			<g key={i} transform={`translate(${x},14)`}>
				<path
					d="M-6,0 L0,-6 L6,0 L0,6Z"
					fill="none"
					stroke="#c9a96e"
					strokeWidth="0.7"
					opacity="0.5"
				/>
				{i === 3 && (
					<path d="M-8,0 L0,-8 L8,0 L0,8Z" fill="#c9a96e" opacity="0.8" />
				)}
				{i === 3 && <circle cx="0" cy="0" r="2.5" fill="#e8d5a3" />}
			</g>
		))}
	</svg>
);

const FullBorder = () => (
	<div
		style={{
			position: "absolute",
			inset: "clamp(10px,2vw,20px)",
			pointerEvents: "none",
			zIndex: 3,
		}}
	>
		<svg
			style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
			viewBox="0 0 100 100"
			preserveAspectRatio="none"
		>
			<defs>
				<linearGradient id="bG" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stopColor="transparent" />
					<stop offset="30%" stopColor="rgba(201,169,110,0.5)" />
					<stop offset="70%" stopColor="rgba(201,169,110,0.5)" />
					<stop offset="100%" stopColor="transparent" />
				</linearGradient>
				<linearGradient id="bGv" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stopColor="transparent" />
					<stop offset="30%" stopColor="rgba(201,169,110,0.5)" />
					<stop offset="70%" stopColor="rgba(201,169,110,0.5)" />
					<stop offset="100%" stopColor="transparent" />
				</linearGradient>
			</defs>
			<line
				x1="0"
				y1="0"
				x2="100"
				y2="0"
				stroke="url(#bG)"
				strokeWidth="0.3"
				vectorEffect="non-scaling-stroke"
			/>
			<line
				x1="0"
				y1="100"
				x2="100"
				y2="100"
				stroke="url(#bG)"
				strokeWidth="0.3"
				vectorEffect="non-scaling-stroke"
			/>
			<line
				x1="0"
				y1="0"
				x2="0"
				y2="100"
				stroke="url(#bGv)"
				strokeWidth="0.3"
				vectorEffect="non-scaling-stroke"
			/>
			<line
				x1="100"
				y1="0"
				x2="100"
				y2="100"
				stroke="url(#bGv)"
				strokeWidth="0.3"
				vectorEffect="non-scaling-stroke"
			/>
		</svg>
		{[
			{ top: "-6px", left: "-6px" },
			{ top: "-6px", right: "-6px" },
			{ bottom: "-6px", left: "-6px" },
			{ bottom: "-6px", right: "-6px" },
		].map((pos, i) => (
			<svg
				key={i}
				style={{ position: "absolute", width: "14px", height: "14px", ...pos }}
				viewBox="0 0 14 14"
			>
				<path
					d="M7,0 L7,14 M0,7 L14,7"
					stroke="#c9a96e"
					strokeWidth="0.8"
					opacity="0.7"
				/>
				<circle cx="7" cy="7" r="2" fill="#c9a96e" opacity="0.6" />
			</svg>
		))}
	</div>
);

const RoseBranch = ({ style }: { style?: React.CSSProperties }) => (
	<svg viewBox="0 0 200 80" style={{ opacity: 0.35, ...style }}>
		<g fill="none" stroke="#c9a96e" strokeWidth="0.8">
			<path d="M10,60 Q60,30 100,40 Q140,50 190,20" />
			<path d="M40,55 Q50,35 45,25" />
			<path d="M80,48 Q90,28 86,18" />
			<path d="M130,42 Q138,22 134,12" />
			<ellipse
				cx="45"
				cy="22"
				rx="8"
				ry="6"
				transform="rotate(-20,45,22)"
				fill="rgba(201,169,110,0.25)"
			/>
			<ellipse
				cx="40"
				cy="24"
				rx="5"
				ry="4"
				transform="rotate(-40,40,24)"
				fill="rgba(201,169,110,0.2)"
			/>
			<ellipse
				cx="50"
				cy="23"
				rx="5"
				ry="4"
				transform="rotate(10,50,23)"
				fill="rgba(201,169,110,0.2)"
			/>
			<ellipse
				cx="86"
				cy="15"
				rx="8"
				ry="6"
				transform="rotate(-15,86,15)"
				fill="rgba(201,169,110,0.25)"
			/>
			<ellipse
				cx="81"
				cy="17"
				rx="5"
				ry="4"
				transform="rotate(-35,81,17)"
				fill="rgba(201,169,110,0.2)"
			/>
			<ellipse
				cx="91"
				cy="16"
				rx="5"
				ry="4"
				transform="rotate(5,91,16)"
				fill="rgba(201,169,110,0.2)"
			/>
			<ellipse
				cx="134"
				cy="9"
				rx="8"
				ry="6"
				transform="rotate(-25,134,9)"
				fill="rgba(201,169,110,0.25)"
			/>
			<ellipse
				cx="129"
				cy="11"
				rx="5"
				ry="4"
				transform="rotate(-45,129,11)"
				fill="rgba(201,169,110,0.2)"
			/>
			<ellipse
				cx="139"
				cy="10"
				rx="5"
				ry="4"
				transform="rotate(0,139,10)"
				fill="rgba(201,169,110,0.2)"
			/>
			<path
				d="M55,52 Q60,44 57,40 Q54,44 55,52Z"
				fill="rgba(201,169,110,0.4)"
				stroke="none"
			/>
			<path
				d="M100,44 Q105,36 102,32 Q99,36 100,44Z"
				fill="rgba(201,169,110,0.4)"
				stroke="none"
			/>
			<path
				d="M148,38 Q153,30 150,26 Q147,30 148,38Z"
				fill="rgba(201,169,110,0.4)"
				stroke="none"
			/>
		</g>
	</svg>
);

const MonogramCircle = () => {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});
	const outerRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
	const innerRotate = useTransform(scrollYProgress, [0, 1], [0, -180]);

	return (
		<div
			ref={ref}
			style={{
				position: "relative",
				display: "inline-flex",
				alignItems: "center",
				justifyContent: "center",
				width: "clamp(260px,40vw,380px)",
				height: "clamp(260px,40vw,380px)",
			}}
		>
			<motion.div
				style={{ position: "absolute", inset: 0, rotate: outerRotate }}
			>
				<svg viewBox="0 0 380 380" style={{ width: "100%", height: "100%" }}>
					<g fill="none" stroke="#c9a96e" strokeWidth="0.8" opacity="0.55">
						<circle cx="190" cy="190" r="186" />
						<circle
							cx="190"
							cy="190"
							r="178"
							strokeDasharray="5,7"
							opacity="0.5"
						/>
						{Array.from({ length: 48 }, (_, i) => {
							const a = (i * 7.5 * Math.PI) / 180;
							const isMajor = i % 4 === 0;
							const r1 = 180,
								r2 = isMajor ? 172 : 175;
							return (
								<line
									key={i}
									x1={190 + r1 * Math.cos(a)}
									y1={190 + r1 * Math.sin(a)}
									x2={190 + r2 * Math.cos(a)}
									y2={190 + r2 * Math.sin(a)}
									strokeWidth={isMajor ? 1.2 : 0.6}
									opacity={isMajor ? 0.8 : 0.4}
								/>
							);
						})}
						{[0, 90, 180, 270].map((deg, i) => {
							const a = (deg * Math.PI) / 180;
							return (
								<path
									key={i}
									d={`M${190 + 163 * Math.cos(a)},${190 + 163 * Math.sin(a)} L${190 + 156 * Math.cos(a - 0.06)},${190 + 156 * Math.sin(a - 0.06)} L${190 + 148 * Math.cos(a)},${190 + 148 * Math.sin(a)} L${190 + 156 * Math.cos(a + 0.06)},${190 + 156 * Math.sin(a + 0.06)}Z`}
									fill="#c9a96e"
									stroke="none"
								/>
							);
						})}
					</g>
				</svg>
			</motion.div>

			<motion.div
				style={{
					position: "absolute",
					inset: "clamp(18px,4vw,36px)",
					rotate: innerRotate,
				}}
			>
				<svg viewBox="0 0 300 300" style={{ width: "100%", height: "100%" }}>
					<g fill="none" stroke="#c9a96e" strokeWidth="0.7" opacity="0.45">
						<circle cx="150" cy="150" r="146" />
						<circle
							cx="150"
							cy="150"
							r="138"
							strokeDasharray="3,8"
							opacity="0.6"
						/>
						{Array.from({ length: 36 }, (_, i) => {
							const a = (i * 10 * Math.PI) / 180;
							const isMajor = i % 3 === 0;
							return (
								<g key={i}>
									<line
										x1={150 + 140 * Math.cos(a)}
										y1={150 + 140 * Math.sin(a)}
										x2={150 + (isMajor ? 132 : 135) * Math.cos(a)}
										y2={150 + (isMajor ? 132 : 135) * Math.sin(a)}
										strokeWidth={isMajor ? 1 : 0.5}
										opacity={isMajor ? 0.7 : 0.35}
									/>
									{isMajor && (
										<circle
											cx={150 + 126 * Math.cos(a)}
											cy={150 + 126 * Math.sin(a)}
											r="1.8"
											fill="#c9a96e"
											stroke="none"
											opacity="0.6"
										/>
									)}
								</g>
							);
						})}
					</g>
				</svg>
			</motion.div>

			{/* медальон с пульсацией */}
			<div
				className="medallion-pulse"
				style={{
					width: "clamp(200px,28vw,250px)",
					height: "clamp(200px,28vw,250px)",
					borderRadius: "50%",
					background:
						"linear-gradient(145deg, rgba(253,232,238,0.98), rgba(249,214,222,0.95))",
					border: "1px solid rgba(201,169,110,0.65)",
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					position: "relative",
					zIndex: 2,
					padding: "0 15px",
				}}
			>
				<div
					style={{
						position: "absolute",
						inset: "10px",
						borderRadius: "50%",
						border: "1px solid rgba(201,169,110,0.4)",
					}}
				/>
				<span
					className="font-script"
					style={{
						fontSize: "clamp(2.2rem,5vw,2.5rem)",
						color: "#b94f6a",
						lineHeight: 1.05,
						position: "relative",
						zIndex: 1,
						textShadow: "0 4px 12px rgba(201,104,128,0.38)",
						textAlign: "center",
						whiteSpace: "nowrap",
					}}
				>
					Т &amp; М
				</span>
				<div
					style={{
						width: "65%",
						height: "2px",
						background:
							"linear-gradient(90deg, transparent, #c9a96e, transparent)",
						margin: "12px 0",
						position: "relative",
						zIndex: 1,
					}}
				/>
				<span
					style={{
						fontFamily: "var(--font-body)",
						fontSize: "clamp(1.2rem,2.2vw,1.5rem)",
						letterSpacing: "0.45em",
						color: "#b89652",
						textTransform: "uppercase",
						fontWeight: 600,
						position: "relative",
						zIndex: 1,
					}}
				>
					2026
				</span>
			</div>
		</div>
	);
};

const SectionGoldLine = () => (
	<div
		style={{
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			height: "2px",
			background:
				"linear-gradient(90deg, transparent, #c9a96e, #e8d5a3, #c9a96e, transparent)",
		}}
	/>
);

const GoldOrb = ({
	size = 300,
	x = "50%",
	y = "50%",
	opacity = 0.1,
	color = "201,104,128",
}: {
	size?: number;
	x?: string;
	y?: string;
	opacity?: number;
	color?: string;
}) => (
	<div
		style={{
			position: "absolute",
			width: size,
			height: size,
			left: x,
			top: y,
			transform: "translate(-50%,-50%)",
			borderRadius: "50%",
			background: `radial-gradient(circle, rgba(${color},${opacity}) 0%, transparent 70%)`,
			pointerEvents: "none",
		}}
	/>
);

const MapEmbed = () => {
	const LAT = 42.833421;
	const LON = 74.542202;
	const ZOOM = 15.39;

	const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  html, body, #map { width:100%; height:100%; }
  .leaflet-tile-pane { filter: saturate(0.7) sepia(0.15) hue-rotate(310deg) brightness(1.05); }
  .custom-pin { background: none; border: none; }
  .pin-inner {
    width: 36px; height: 36px; border-radius: 50% 50% 50% 0;
    background: linear-gradient(135deg, #c96880, #e8a0b0);
    transform: rotate(-45deg);
    border: 2px solid #fff;
    box-shadow: 0 4px 16px rgba(201,104,128,0.5);
    display: flex; align-items: center; justify-content: center;
  }
  .pin-dot { width: 10px; height: 10px; border-radius: 50%; background: #fff; transform: rotate(45deg); }
  .leaflet-popup-content-wrapper {
    border-radius: 4px !important;
    border: 1px solid rgba(201,169,110,0.4) !important;
    box-shadow: 0 8px 32px rgba(201,104,128,0.2) !important;
    font-family: Georgia, serif !important;
    padding: 0 !important;
  }
  .leaflet-popup-content { margin: 0 !important; padding: 8px 12px !important; font-size: 11px !important; color: #8a5a40 !important; line-height: 1.5 !important; }
  .popup-title { font-size: 12px; color: #c96880; font-weight: 600; margin-bottom: 2px; }
  .popup-gold { color: #c9a96e; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; }
  .leaflet-popup-tip { background: #fff !important; }
  .leaflet-control-zoom a { border: 1px solid rgba(201,169,110,0.4) !important; color: #c9a96e !important; font-size: 16px !important; }
  .leaflet-control-zoom a:hover { background: rgba(201,169,110,0.1) !important; }
  .leaflet-attribution-flag { display: none !important; }
</style>
</head>
<body>
<div id="map"></div>
<script>
var map = L.map('map', { zoomControl: true, scrollWheelZoom: false, attributionControl: false }).setView([${LAT}, ${LON}], ${ZOOM});
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
var pinIcon = L.divIcon({ className: 'custom-pin', html: '<div class="pin-inner"><div class="pin-dot"></div></div>', iconSize: [36,36], iconAnchor: [18,36], popupAnchor: [0,-38] });
L.marker([${LAT}, ${LON}], { icon: pinIcon }).addTo(map).bindPopup('<div class="popup-title">Банкетный зал UNO</div><div class="popup-gold">Бишкек · 5 апреля 2026</div>').openPopup();
</script>
</body>
</html>`;

	return (
		<iframe
			srcDoc={html}
			width="100%"
			style={{
				border: 0,
				display: "block",
				height: "clamp(280px, 55vw, 600px)",
			}}
			title="Банкетный зал UNO"
		/>
	);
};

const ParallaxLayer = ({
	children,
	speed = 0.3,
	style,
}: {
	children: React.ReactNode;
	speed?: number;
	style?: React.CSSProperties;
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});
	const y = useTransform(
		scrollYProgress,
		[0, 1],
		[`${-speed * 80}px`, `${speed * 80}px`],
	);
	return (
		<motion.div ref={ref} style={{ y, ...style }}>
			{children}
		</motion.div>
	);
};

/* ─── TILT CARD — карточка с поворотом ─────────────── */
const TiltCard = ({
	children,
	delay = 0,
}: {
	children: React.ReactNode;
	delay?: number;
}) => (
	<Reveal delay={delay} direction="up">
		<motion.div
			initial={{ rotate: -2, opacity: 0 }}
			whileInView={{ rotate: 0, opacity: 1 }}
			viewport={{ once: true, margin: "-40px" }}
			transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
			whileHover={{ y: -4, boxShadow: "0 16px 50px rgba(201,104,128,0.18)" }}
		>
			{children}
		</motion.div>
	</Reveal>
);

export default function Home() {
	const [phase, setPhase] = useState<"envelope" | "flash" | "site">("envelope");

	const handleOpen = () => {
		setPhase("flash");
		setTimeout(() => setPhase("site"), 900);
	};

	return (
		<>
			<GlobalStyles />

			<AnimatePresence>
				{phase === "envelope" && (
					<motion.div
						key="envelope"
						exit={{ opacity: 0 }}
						transition={{ duration: 0.4 }}
					>
						<EnvelopeIntro onOpen={handleOpen} />
					</motion.div>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{phase === "flash" && (
					<motion.div
						key="flash"
						className="fixed inset-0 z-40"
						style={{ background: "#fdf0f2" }}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.45 }}
					/>
				)}
			</AnimatePresence>

			<AnimatePresence>
				{phase === "site" && (
					<motion.div
						key="site"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 1.2 }}
					>
						<Petals />
						<main style={{ position: "relative", zIndex: 2 }}>
							{/* ══ HERO ══ */}
							<section
								style={{
									minHeight: "100svh",
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									textAlign: "center",
									padding: "clamp(90px,14vw,150px) clamp(24px,6vw,100px)",
									background:
										"linear-gradient(170deg, #fff8f2 0%, #fdeef4 45%, #fce0e8 100%)",
									position: "relative",
									overflow: "hidden",
								}}
							>
								<GoldOrb
									size={700}
									x="50%"
									y="45%"
									opacity={0.08}
									color="201,104,128"
								/>
								<GoldOrb
									size={300}
									x="10%"
									y="25%"
									opacity={0.06}
									color="201,169,110"
								/>
								<GoldOrb
									size={250}
									x="90%"
									y="75%"
									opacity={0.05}
									color="201,169,110"
								/>

								<ParallaxLayer
									speed={0.15}
									style={{
										position: "absolute",
										top: "clamp(16px,3vw,32px)",
										left: "clamp(16px,3vw,32px)",
									}}
								>
									<FloralCorner />
								</ParallaxLayer>
								<ParallaxLayer
									speed={0.15}
									style={{
										position: "absolute",
										top: "clamp(16px,3vw,32px)",
										right: "clamp(16px,3vw,32px)",
									}}
								>
									<FloralCorner style={{ transform: "scaleX(-1)" }} />
								</ParallaxLayer>
								<ParallaxLayer
									speed={0.15}
									style={{
										position: "absolute",
										bottom: "clamp(16px,3vw,32px)",
										left: "clamp(16px,3vw,32px)",
									}}
								>
									<FloralCorner style={{ transform: "scaleY(-1)" }} />
								</ParallaxLayer>
								<ParallaxLayer
									speed={0.15}
									style={{
										position: "absolute",
										bottom: "clamp(16px,3vw,32px)",
										right: "clamp(16px,3vw,32px)",
									}}
								>
									<FloralCorner style={{ transform: "scale(-1,-1)" }} />
								</ParallaxLayer>

								<ParallaxLayer
									speed={0.35}
									style={{
										position: "absolute",
										top: "clamp(100px,16vw,180px)",
										left: "clamp(16px,3vw,32px)",
									}}
								>
									<RoseBranch style={{ width: "clamp(120px,18vw,220px)" }} />
								</ParallaxLayer>
								<ParallaxLayer
									speed={0.35}
									style={{
										position: "absolute",
										bottom: "clamp(100px,16vw,180px)",
										right: "clamp(16px,3vw,32px)",
									}}
								>
									<RoseBranch
										style={{
											width: "clamp(120px,18vw,220px)",
											transform: "scale(-1,-1)",
										}}
									/>
								</ParallaxLayer>

								<FullBorder />
								<SectionGoldLine />
								<div
									style={{
										position: "absolute",
										bottom: 0,
										left: 0,
										right: 0,
										height: "2px",
										background:
											"linear-gradient(90deg, transparent, #c9a96e, #e8d5a3, #c9a96e, transparent)",
									}}
								/>

								<motion.div
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										delay: 0.3,
										duration: 1.2,
										ease: [0.22, 1, 0.36, 1],
									}}
									style={{
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
									}}
								>
									<p
										style={{
											fontFamily: "var(--font-body)",
											color: "#c9a96e",
											fontSize: "clamp(0.68rem,1.3vw,0.82rem)",
											letterSpacing: "0.55em",
											textTransform: "uppercase",
											marginBottom: "clamp(12px,2.5vw,24px)",
										}}
									>
										с любовью приглашают вас
									</p>
									<OrnamentBand />

									{/* ✨ Shimmer на именах */}
									<h1
										className="font-script name-shimmer"
										style={{
											fontSize: "clamp(5rem,15vw,10.5rem)",
											lineHeight: 1.3,
											marginTop: "12px",
										}}
									>
										Тагай
									</h1>

									<div
										style={{
											display: "flex",
											alignItems: "center",
											gap: "clamp(12px,3vw,32px)",
											margin: "clamp(2px,0.8vw,8px) 0",
										}}
									>
										<div
											style={{
												width: "clamp(40px,8vw,100px)",
												height: "1px",
												background:
													"linear-gradient(90deg, transparent, #c9a96e)",
											}}
										/>
										<svg
											width="clamp(36px,5.5vw,52px)"
											height="clamp(36px,5.5vw,52px)"
											viewBox="0 0 52 52"
										>
											<path
												d="M26 4C26 4 33 17 46 17C46 17 33 23.5 33 37C33 37 26 26 19 37C19 37 19 23.5 6 17C6 17 19 17 26 4Z"
												fill="#c9a96e"
												opacity="0.9"
											/>
											<circle cx="26" cy="17" r="3" fill="#e8d5a3" />
										</svg>
										<div
											style={{
												width: "clamp(40px,8vw,100px)",
												height: "1px",
												background:
													"linear-gradient(90deg, #c9a96e, transparent)",
											}}
										/>
									</div>

									<h1
										className="font-script name-shimmer"
										style={{
											fontSize: "clamp(5rem,15vw,10.5rem)",
											lineHeight: 0.95,
											marginBottom: "12px",
										}}
									>
										Мээрим
									</h1>
									<OrnamentBand />
								</motion.div>

								<motion.div
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.9, duration: 1 }}
									style={{
										marginTop: "clamp(24px,4vw,44px)",
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										gap: "8px",
									}}
								>
									<GoldDivider />
									<p
										className="font-script"
										style={{
											fontSize: "clamp(2rem,5vw,3.4rem)",
											color: "#c9a96e",
										}}
									>
										5 апреля 2026
									</p>
									<p
										style={{
											fontFamily: "var(--font-body)",
											color: "#c96880",
											fontSize: "clamp(0.9rem,1.8vw,1.2rem)",
											letterSpacing: "0.25em",
											textTransform: "uppercase",
											fontWeight: 500,
										}}
									>
										Бишкек
									</p>
								</motion.div>

								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ delay: 1.8, duration: 0.8 }}
									style={{
										position: "absolute",
										bottom: "clamp(24px,5vw,44px)",
										display: "flex",
										flexDirection: "column",
										alignItems: "center",
										gap: "6px",
									}}
								>
									<p
										style={{
											fontFamily: "var(--font-body)",
											color: "rgba(201,169,110,0.5)",
											fontSize: "0.6rem",
											letterSpacing: "0.3em",
											textTransform: "uppercase",
										}}
									>
										листайте вниз
									</p>
									<motion.div
										animate={{ y: [0, 8, 0] }}
										transition={{ duration: 2, repeat: Infinity }}
									>
										<svg width="14" height="24" viewBox="0 0 14 24" fill="none">
											<path
												d="M7 0L7 18M1 12L7 20L13 12"
												stroke="#c9a96e"
												strokeWidth="1.2"
												strokeLinecap="round"
												opacity="0.55"
											/>
										</svg>
									</motion.div>
								</motion.div>
							</section>

							{/* ══ MONOGRAM ══ */}
							<section
								style={{
									padding: "clamp(50px,8vw,90px) 24px",
									background:
										"linear-gradient(180deg, #fce0e8 0%, #fff8f2 100%)",
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									position: "relative",
									overflow: "hidden",
								}}
							>
								<SectionGoldLine />
								<GoldOrb size={400} x="50%" y="50%" opacity={0.07} />
								<Reveal>
									<MonogramCircle />
								</Reveal>
							</section>

							{/* ══ COUNTDOWN ══ */}
							<section
								style={{
									padding: "clamp(80px,12vw,130px) clamp(24px,6vw,100px)",
									background:
										"linear-gradient(180deg, #fff8f2 0%, #fdf0f4 100%)",
									textAlign: "center",
									position: "relative",
									overflow: "hidden",
								}}
							>
								<SectionGoldLine />
								<GoldOrb size={600} x="50%" y="50%" opacity={0.06} />
								<GoldOrb
									size={200}
									x="5%"
									y="50%"
									opacity={0.05}
									color="201,169,110"
								/>
								<GoldOrb
									size={200}
									x="95%"
									y="50%"
									opacity={0.05}
									color="201,169,110"
								/>
								<div
									style={{
										position: "absolute",
										top: "clamp(20px,4vw,40px)",
										left: "clamp(20px,4vw,40px)",
									}}
								>
									<FloralCorner
										style={{ opacity: "0.45" } as React.CSSProperties}
									/>
								</div>
								<div
									style={{
										position: "absolute",
										top: "clamp(20px,4vw,40px)",
										right: "clamp(20px,4vw,40px)",
									}}
								>
									<FloralCorner
										style={
											{
												transform: "scaleX(-1)",
												opacity: "0.45",
											} as React.CSSProperties
										}
									/>
								</div>

								<Reveal>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											gap: "20px",
										}}
									>
										<ParallaxLayer speed={0.2}>
											<RoseBranch style={{ width: "clamp(80px,12vw,160px)" }} />
										</ParallaxLayer>
										<h2
											className="font-script"
											style={{
												fontSize: "clamp(2.4rem,6.5vw,5rem)",
												color: "#c96880",
												lineHeight: 1,
											}}
										>
											До нашего торжества
										</h2>
										<ParallaxLayer speed={0.2}>
											<RoseBranch
												style={{
													width: "clamp(80px,12vw,160px)",
													transform: "scaleX(-1)",
												}}
											/>
										</ParallaxLayer>
									</div>
									<GoldDivider />
								</Reveal>

								<Reveal delay={0.2}>
									<div style={{ marginTop: "clamp(24px,4vw,40px)" }}>
										<Countdown />
									</div>
								</Reveal>

								<Reveal delay={0.4}>
									<p
										style={{
											fontFamily: "var(--font-body)",
											maxWidth: "580px",
											margin: "clamp(28px,5vw,48px) auto 0",
											fontSize: "clamp(1.05rem,2.2vw,1.25rem)",
											lineHeight: 2,
											color: "#b07888",
											fontStyle: "italic",
											fontWeight: 400,
										}}
									>
										Мы с радостью разделим этот особенный день с теми, кто нам
										дорог. Ваше присутствие — самый дорогой подарок.
									</p>
								</Reveal>
								<div
									style={{
										position: "absolute",
										bottom: 0,
										left: 0,
										right: 0,
										height: "2px",
										background:
											"linear-gradient(90deg, transparent, #c9a96e, #e8d5a3, #c9a96e, transparent)",
									}}
								/>
							</section>

							{/* ══ DETAILS ══ */}
							<section
								style={{
									padding: "clamp(80px,12vw,130px) clamp(24px,6vw,100px)",
									background:
										"linear-gradient(160deg, #fdeef4 0%, #fff8f2 100%)",
									textAlign: "center",
									position: "relative",
									overflow: "hidden",
								}}
							>
								<SectionGoldLine />
								<GoldOrb size={500} x="50%" y="50%" opacity={0.06} />
								<div
									style={{
										position: "absolute",
										bottom: "clamp(20px,4vw,40px)",
										left: "clamp(20px,4vw,40px)",
									}}
								>
									<FloralCorner
										style={
											{
												transform: "scaleY(-1)",
												opacity: "0.4",
											} as React.CSSProperties
										}
									/>
								</div>
								<div
									style={{
										position: "absolute",
										bottom: "clamp(20px,4vw,40px)",
										right: "clamp(20px,4vw,40px)",
									}}
								>
									<FloralCorner
										style={
											{
												transform: "scale(-1,-1)",
												opacity: "0.4",
											} as React.CSSProperties
										}
									/>
								</div>

								<Reveal>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											gap: "20px",
										}}
									>
										<FloralCorner
											style={{ opacity: "0.4" } as React.CSSProperties}
										/>
										<h2
											className="font-script"
											style={{
												fontSize: "clamp(2.4rem,6.5vw,5rem)",
												color: "#c96880",
												lineHeight: 1,
											}}
										>
											Детали торжества
										</h2>
										<FloralCorner
											style={
												{
													transform: "scaleX(-1)",
													opacity: "0.4",
												} as React.CSSProperties
											}
										/>
									</div>
									<GoldDivider />
								</Reveal>

								<div
									style={{
										maxWidth: "980px",
										margin: "clamp(28px,5vw,52px) auto 0",
										display: "grid",
										gridTemplateColumns:
											"repeat(auto-fit, minmax(min(100%, 270px), 1fr))",
										gap: "clamp(16px,2.5vw,28px)",
									}}
								>
									{[
										{
											title: "Дата",
											desc: "5 апреля 2026\nСуббота",
											icon: (
												<svg
													width="44"
													height="44"
													viewBox="0 0 44 44"
													fill="none"
												>
													<rect
														x="4"
														y="8"
														width="36"
														height="32"
														rx="3"
														stroke="#c9a96e"
														strokeWidth="1.1"
													/>
													<line
														x1="4"
														y1="18"
														x2="40"
														y2="18"
														stroke="#c9a96e"
														strokeWidth="0.8"
													/>
													<line
														x1="14"
														y1="4"
														x2="14"
														y2="12"
														stroke="#c9a96e"
														strokeWidth="1.5"
														strokeLinecap="round"
													/>
													<line
														x1="30"
														y1="4"
														x2="30"
														y2="12"
														stroke="#c9a96e"
														strokeWidth="1.5"
														strokeLinecap="round"
													/>
													<rect
														x="15"
														y="25"
														width="6"
														height="6"
														rx="1"
														fill="#c9a96e"
														opacity="0.8"
													/>
													<rect
														x="23"
														y="25"
														width="6"
														height="6"
														rx="1"
														fill="#c9a96e"
														opacity="0.35"
													/>
													<rect
														x="15"
														y="33"
														width="6"
														height="3"
														rx="1"
														fill="#c9a96e"
														opacity="0.25"
													/>
												</svg>
											),
										},
										{
											title: "Время",
											desc: "Сбор гостей в 17:00\nЦеремония в 18:00",
											icon: (
												<svg
													width="44"
													height="44"
													viewBox="0 0 44 44"
													fill="none"
												>
													<circle
														cx="22"
														cy="22"
														r="18"
														stroke="#c9a96e"
														strokeWidth="1.1"
													/>
													<circle
														cx="22"
														cy="22"
														r="13"
														stroke="#c9a96e"
														strokeWidth="0.5"
														opacity="0.3"
													/>
													{[
														0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300,
														330,
													].map((a, i) => (
														<line
															key={i}
															x1={22 + 15 * Math.cos((a * Math.PI) / 180)}
															y1={22 + 15 * Math.sin((a * Math.PI) / 180)}
															x2={
																22 +
																(i % 3 === 0 ? 17.5 : 16.5) *
																	Math.cos((a * Math.PI) / 180)
															}
															y2={
																22 +
																(i % 3 === 0 ? 17.5 : 16.5) *
																	Math.sin((a * Math.PI) / 180)
															}
															stroke="#c9a96e"
															strokeWidth={i % 3 === 0 ? 1 : 0.6}
															opacity="0.6"
														/>
													))}
													<line
														x1="22"
														y1="10"
														x2="22"
														y2="22"
														stroke="#c9a96e"
														strokeWidth="1.6"
														strokeLinecap="round"
													/>
													<line
														x1="22"
														y1="22"
														x2="30"
														y2="27"
														stroke="#c9a96e"
														strokeWidth="1.3"
														strokeLinecap="round"
													/>
													<circle cx="22" cy="22" r="2.2" fill="#c9a96e" />
												</svg>
											),
										},
										{
											title: "Место",
											desc: "Банкетный зал UNO\nБишкек",
											icon: (
												<svg
													width="44"
													height="44"
													viewBox="0 0 44 44"
													fill="none"
												>
													<path
														d="M22 3C14 3 8 10 8 17C8 27 22 41 22 41C22 41 36 27 36 17C36 10 30 3 22 3Z"
														stroke="#c9a96e"
														strokeWidth="1.1"
													/>
													<circle
														cx="22"
														cy="17"
														r="6"
														stroke="#c9a96e"
														strokeWidth="1"
													/>
													<circle
														cx="22"
														cy="17"
														r="2.5"
														fill="#c9a96e"
														opacity="0.8"
													/>
													<path
														d="M22 3C22 3 24 8 28 8"
														stroke="#c9a96e"
														strokeWidth="0.6"
														opacity="0.4"
													/>
												</svg>
											),
										},
									].map(({ title, desc, icon }, i) => (
										<TiltCard key={title} delay={i * 0.14}>
											<div
												style={{
													background:
														"linear-gradient(145deg, rgba(255,248,242,0.98), rgba(253,232,240,0.85))",
													border: "1px solid rgba(201,169,110,0.3)",
													borderRadius: "3px",
													padding:
														"clamp(32px,5vw,50px) clamp(24px,3.5vw,38px)",
													position: "relative",
													overflow: "hidden",
													boxShadow:
														"0 8px 40px rgba(201,104,128,0.09), 0 0 0 4px rgba(201,169,110,0.05)",
												}}
											>
												<div
													style={{
														position: "absolute",
														top: 0,
														left: 0,
														right: 0,
														height: "2px",
														background:
															"linear-gradient(90deg, transparent, #c9a96e, transparent)",
													}}
												/>
												<div
													style={{
														position: "absolute",
														bottom: 0,
														left: 0,
														right: 0,
														height: "1px",
														background:
															"linear-gradient(90deg, transparent, rgba(201,169,110,0.35), transparent)",
													}}
												/>
												<div
													style={{
														position: "absolute",
														top: "10px",
														left: "10px",
														opacity: 0.1,
													}}
												>
													<FloralCorner
														style={{ width: "60px", height: "60px" }}
													/>
												</div>
												<div
													style={{
														position: "absolute",
														bottom: "10px",
														right: "10px",
														opacity: 0.1,
													}}
												>
													<FloralCorner
														style={{
															width: "60px",
															height: "60px",
															transform: "scale(-1,-1)",
														}}
													/>
												</div>
												{[
													{ top: "-4px", left: "-4px" },
													{ top: "-4px", right: "-4px" },
													{ bottom: "-4px", left: "-4px" },
													{ bottom: "-4px", right: "-4px" },
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
															d="M5,0 L5,10 M0,5 L10,5"
															stroke="#c9a96e"
															strokeWidth="0.8"
															opacity="0.6"
														/>
													</svg>
												))}
												<div
													style={{
														marginBottom: "20px",
														display: "flex",
														justifyContent: "center",
													}}
												>
													{icon}
												</div>
												<h3
													className="font-script"
													style={{
														fontSize: "clamp(1.8rem,3.5vw,2.4rem)",
														color: "#c96880",
														marginBottom: "12px",
													}}
												>
													{title}
												</h3>
												<p
													style={{
														fontFamily: "var(--font-body)",
														color: "#b07888",
														lineHeight: 1.9,
														fontSize: "clamp(0.9rem,1.6vw,1rem)",
														whiteSpace: "pre-line",
														fontWeight: 400,
													}}
												>
													{desc}
												</p>
											</div>
										</TiltCard>
									))}
								</div>
								<div
									style={{
										position: "absolute",
										bottom: 0,
										left: 0,
										right: 0,
										height: "2px",
										background:
											"linear-gradient(90deg, transparent, #c9a96e, #e8d5a3, #c9a96e, transparent)",
									}}
								/>
							</section>

							{/* ══ MAP ══ */}
							<section
								style={{
									padding: "clamp(80px,12vw,130px) clamp(24px,6vw,100px)",
									background:
										"linear-gradient(180deg, #fff8f2 0%, #fdf0f4 100%)",
									textAlign: "center",
									position: "relative",
									overflow: "hidden",
								}}
							>
								<SectionGoldLine />
								<GoldOrb
									size={400}
									x="80%"
									y="30%"
									opacity={0.06}
									color="201,169,110"
								/>
								<GoldOrb size={350} x="20%" y="70%" opacity={0.05} />
								<Reveal>
									<div
										style={{
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											gap: "20px",
										}}
									>
										<ParallaxLayer speed={0.2}>
											<RoseBranch style={{ width: "clamp(80px,12vw,160px)" }} />
										</ParallaxLayer>
										<h2
											className="font-script"
											style={{
												fontSize: "clamp(2.4rem,6.5vw,5rem)",
												color: "#c96880",
												lineHeight: 1,
											}}
										>
											Как нас найти
										</h2>
										<ParallaxLayer speed={0.2}>
											<RoseBranch
												style={{
													width: "clamp(80px,12vw,160px)",
													transform: "scaleX(-1)",
												}}
											/>
										</ParallaxLayer>
									</div>
									<GoldDivider />
									<p
										style={{
											fontFamily: "var(--font-body)",
											color: "#b07888",
											fontSize: "clamp(0.85rem,1.8vw,1rem)",
											letterSpacing: "0.15em",
											marginBottom: "clamp(28px,5vw,48px)",
										}}
									>
										Банкетный зал{" "}
										<span style={{ color: "#a07840", fontWeight: 500 }}>
											UNO
										</span>{" "}
										· Бишкек
									</p>
								</Reveal>
								<Reveal delay={0.2}>
									<div
										style={{
											maxWidth: "900px",
											margin: "0 auto",
											borderRadius: "3px",
											overflow: "hidden",
											border: "1px solid rgba(201,169,110,0.35)",
											boxShadow:
												"0 0 0 4px rgba(201,169,110,0.07), 0 24px 70px rgba(201,104,128,0.12)",
											position: "relative",
										}}
									>
										<div
											style={{
												position: "absolute",
												inset: 0,
												pointerEvents: "none",
												zIndex: 1,
												boxShadow: "inset 0 0 0 1px rgba(201,169,110,0.2)",
											}}
										/>
										<MapEmbed />
									</div>
								</Reveal>
								<Reveal delay={0.3}>
									<a
										href="https://go.2gis.com/sUlqD"
										target="_blank"
										rel="noopener noreferrer"
										style={{
											display: "inline-block",
											marginTop: "clamp(24px,4vw,40px)",
											padding: "clamp(14px,2vw,18px) clamp(36px,6vw,60px)",
											background:
												"linear-gradient(135deg, #a07840 0%, #e8d5a3 50%, #a07840 100%)",
											backgroundSize: "200% auto",
											color: "#fff",
											borderRadius: "2px",
											textDecoration: "none",
											fontFamily: "var(--font-body)",
											fontSize: "clamp(0.72rem,1.4vw,0.84rem)",
											letterSpacing: "0.28em",
											textTransform: "uppercase",
											fontWeight: 500,
											boxShadow:
												"0 8px 32px rgba(160,120,64,0.35), 0 0 0 1px rgba(201,169,110,0.3)",
											transition:
												"background-position 0.4s, transform 0.2s, box-shadow 0.2s",
										}}
										onMouseEnter={(e) => {
											const el = e.currentTarget as HTMLAnchorElement;
											el.style.backgroundPosition = "right center";
											el.style.transform = "translateY(-2px)";
											el.style.boxShadow =
												"0 14px 44px rgba(160,120,64,0.5), 0 0 0 1px rgba(201,169,110,0.5)";
										}}
										onMouseLeave={(e) => {
											const el = e.currentTarget as HTMLAnchorElement;
											el.style.backgroundPosition = "left center";
											el.style.transform = "translateY(0)";
											el.style.boxShadow =
												"0 8px 32px rgba(160,120,64,0.35), 0 0 0 1px rgba(201,169,110,0.3)";
										}}
									>
										Открыть в 2GIS
									</a>
								</Reveal>
								<div
									style={{
										position: "absolute",
										bottom: 0,
										left: 0,
										right: 0,
										height: "2px",
										background:
											"linear-gradient(90deg, transparent, #c9a96e, #e8d5a3, #c9a96e, transparent)",
									}}
								/>
							</section>

							{/* ══ FOOTER ══ */}
							<footer
								style={{
									padding: "clamp(90px,14vw,160px) clamp(24px,6vw,100px)",
									background:
										"linear-gradient(170deg, #fdeef4 0%, #fce0e8 50%, #fdeef4 100%)",
									textAlign: "center",
									position: "relative",
									overflow: "hidden",
								}}
							>
								<SectionGoldLine />
								<GoldOrb size={700} x="50%" y="50%" opacity={0.09} />
								<div
									style={{
										position: "absolute",
										top: "clamp(16px,3vw,32px)",
										left: "clamp(16px,3vw,32px)",
									}}
								>
									<FloralCorner />
								</div>
								<div
									style={{
										position: "absolute",
										top: "clamp(16px,3vw,32px)",
										right: "clamp(16px,3vw,32px)",
									}}
								>
									<FloralCorner style={{ transform: "scaleX(-1)" }} />
								</div>
								<div
									style={{
										position: "absolute",
										bottom: "clamp(16px,3vw,32px)",
										left: "clamp(16px,3vw,32px)",
									}}
								>
									<FloralCorner style={{ transform: "scaleY(-1)" }} />
								</div>
								<div
									style={{
										position: "absolute",
										bottom: "clamp(16px,3vw,32px)",
										right: "clamp(16px,3vw,32px)",
									}}
								>
									<FloralCorner style={{ transform: "scale(-1,-1)" }} />
								</div>
								<ParallaxLayer
									speed={0.25}
									style={{
										position: "absolute",
										top: "clamp(100px,16vw,180px)",
										left: "clamp(16px,3vw,32px)",
									}}
								>
									<RoseBranch style={{ width: "clamp(100px,15vw,200px)" }} />
								</ParallaxLayer>
								<ParallaxLayer
									speed={0.25}
									style={{
										position: "absolute",
										top: "clamp(100px,16vw,180px)",
										right: "clamp(16px,3vw,32px)",
									}}
								>
									<RoseBranch
										style={{
											width: "clamp(100px,15vw,200px)",
											transform: "scaleX(-1)",
										}}
									/>
								</ParallaxLayer>
								<FullBorder />

								<Reveal>
									<p
										style={{
											fontFamily: "var(--font-body)",
											color: "#a06878",
											fontSize: "clamp(0.56rem,1vw,0.68rem)",
											letterSpacing: "0.55em",
											textTransform: "uppercase",
											marginBottom: "clamp(12px,2.5vw,24px)",
										}}
									>
										свадьба
									</p>
									<OrnamentBand />
									<h2
										className="font-script name-shimmer"
										style={{
											fontSize: "clamp(3.5rem,10vw,8rem)",
											lineHeight: 0.95,
											marginTop: "12px",
										}}
									>
										Тагай &amp; Мээрим
									</h2>
									<OrnamentBand />
									<p
										style={{
											fontFamily: "var(--font-body)",
											color: "#b07888",
											fontWeight: 600,
											fontSize: "clamp(0.7rem,1.3vw,0.82rem)",
											letterSpacing: "0.45em",
											textTransform: "uppercase",
											marginTop: "12px",
										}}
									>
										5 апреля 2026 · Бишкек · UNO
									</p>
									<div style={{ marginTop: "clamp(28px,5vw,48px)" }}>
										<MonogramCircle />
									</div>
									<p
										className="font-script"
										style={{
											color: "#c9a96e",
											fontSize: "clamp(1.2rem,3vw,2rem)",
											marginTop: "clamp(20px,3.5vw,36px)",
											opacity: 0.8,
										}}
									>
										Ждём вас с нетерпением
									</p>
								</Reveal>
							</footer>
						</main>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
