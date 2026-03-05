import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-script",
});

const cormorant = Cormorant_Garamond({
	weight: ["400", "500", "600"],
	subsets: ["latin", "cyrillic"],
	variable: "--font-body",
});

export const metadata: Metadata = {
	title: "Приглашение на свадьбу Тагая и Мээрим",
	description:
		"С большой любовью приглашаем вас на нашу свадьбу! 5 апреля 2026 • Бишкек • Банкетный зал UNO",
	themeColor: "#fce0e8",

	openGraph: {
		title: "Приглашение на свадьбу Тагая и Мээрим 💍",
		description:
			"5 апреля 2026 • Бишкек • Банкетный зал UNO. Ждём вас с нетерпением! 🌸",
		url: "https://svadba-ecru-two.vercel.app/",
		siteName: "Свадьба Тагая и Мээрим",
		images: [
			{
				url: "/weding.webp",
				width: 1200,
				height: 630,
				alt: "Свадебное приглашение Тагая и Мээрим",
			},
		],
		locale: "ru_RU",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ru" className={`${greatVibes.variable} ${cormorant.variable}`}>
			<head>
				{/* Цвет интерфейса Chrome/Safari */}
				<meta name="theme-color" content="#fce0e8" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />

				{/* Favicon — эмодзи кольца, не нужен файл */}
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
			</head>
			<body>{children}</body>
		</html>
	);
}
