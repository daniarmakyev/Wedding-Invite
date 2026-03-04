"use client";

const PETALS = [
	{
		id: 0,
		left: 5,
		size: 20,
		duration: 13,
		delay: -3,
		rotation: 45,
		drift: 25,
	},
	{
		id: 1,
		left: 20,
		size: 16,
		duration: 15,
		delay: -8,
		rotation: 120,
		drift: -20,
	},
	{
		id: 2,
		left: 38,
		size: 22,
		duration: 12,
		delay: -5,
		rotation: 200,
		drift: 35,
	},
	{
		id: 3,
		left: 55,
		size: 18,
		duration: 14,
		delay: -11,
		rotation: 310,
		drift: -30,
	},
	{
		id: 4,
		left: 70,
		size: 24,
		duration: 16,
		delay: -2,
		rotation: 70,
		drift: 20,
	},
	{
		id: 5,
		left: 83,
		size: 15,
		duration: 13,
		delay: -9,
		rotation: 150,
		drift: -25,
	},
	{
		id: 6,
		left: 93,
		size: 20,
		duration: 15,
		delay: -6,
		rotation: 240,
		drift: 30,
	},
];

const SPARKLES = [
	{ id: 0, left: 8, top: 75, size: 5, duration: 11, delay: -4 },
	{ id: 1, left: 23, top: 50, size: 4, duration: 13, delay: -8 },
	{ id: 2, left: 40, top: 65, size: 6, duration: 10, delay: -2 },
	{ id: 3, left: 57, top: 40, size: 4, duration: 14, delay: -7 },
	{ id: 4, left: 72, top: 70, size: 5, duration: 12, delay: -5 },
	{ id: 5, left: 88, top: 55, size: 6, duration: 11, delay: -10 },
	{ id: 6, left: 32, top: 80, size: 4, duration: 13, delay: -3 },
	{ id: 7, left: 63, top: 30, size: 5, duration: 12, delay: -9 },
];

export default function Petals() {
	return (
		<div
			style={{
				position: "fixed",
				inset: 0,
				pointerEvents: "none",
				zIndex: 9999,
			}}
		>
			<style>{`
        @keyframes petalFall {
          0%   { opacity: 0; transform: translateY(-40px) rotate(0deg) translateX(0px); }
          6%   { opacity: 0.6; }
          90%  { opacity: 0.35; }
          100% { opacity: 0; transform: translateY(110vh) rotate(400deg) translateX(var(--petal-drift)); }
        }
        @keyframes sparkleFloat {
          0%   { opacity: 0;   transform: translateY(0px) scale(0.8); }
          20%  { opacity: 0.7;   transform: translateY(-18px) scale(1); }
          50%  { opacity: 0.7; transform: translateY(-40px) scale(0.9); }
          80%  { opacity: 0.4; transform: translateY(-65px) scale(1); }
          100% { opacity: 0;   transform: translateY(-90px) scale(0.6); }
        }
      `}</style>

			{PETALS.map((p) => (
				<div
					key={p.id}
					style={
						{
							position: "absolute",
							left: `${p.left}%`,
							top: "-30px",
							width: `${p.size}px`,
							height: `${p.size * 1.35}px`,
							background:
								"radial-gradient(ellipse at 38% 32%, #fdeef2, #f0a0b4)",
							borderRadius: "50% 0 50% 0",
							["--petal-drift" as string]: `${p.drift}px`,
							animation: `petalFall ${p.duration}s ${p.delay}s linear infinite`,
						} as React.CSSProperties
					}
				/>
			))}

			{SPARKLES.map((s) => (
				<div
					key={s.id}
					style={{
						position: "absolute",
						left: `${s.left}%`,
						top: `${s.top}vh`,
						width: `${s.size}px`,
						height: `${s.size}px`,
						borderRadius: "50%",
						background: "radial-gradient(circle, #fffbe8 20%, #f9b5b5 70%)",
						boxShadow: `0 0 ${s.size}px ${s.size * 0.5}px rgba(212,168,75,0.25)`,
						animation: `sparkleFloat ${s.duration}s ${s.delay}s ease-in-out infinite`,
						opacity: 0.45,
					}}
				/>
			))}
		</div>
	);
}
