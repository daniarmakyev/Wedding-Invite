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
	title: "Тагай & Мээрим — 5 апреля",
	description: "Свадебное приглашение",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ru" className={`${greatVibes.variable} ${cormorant.variable}`}>
			<body>{children}</body>
		</html>
	);
}
