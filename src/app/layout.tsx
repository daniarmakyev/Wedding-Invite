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
	title: "Приглашение на свадьбу",
	description: "Свадебное приглашение · Бишкек · Банкетный зал UNO",
	themeColor: "#fce0e8",
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
