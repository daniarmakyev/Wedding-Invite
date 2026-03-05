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
	title: "Тагай менен Мээримдин үйлөнүү тоюна чакыруусу 💍",
	description:
		"Сүйүү менен тоюбузга чакырабыз! 5-апрель 2026 • Бишкек • UNO банкет залы",
	themeColor: "#fce0e8",

	openGraph: {
		title: "Тагай менен Мээримдин үйлөнүү тоюна чакыруу 💍",
		description:
			"5-апрель 2026 • Бишкек • UNO банкет залы. Сизди күтүп жатабыз! 🌸",
		url: "https://svadba-ecru-two.vercel.app/",
		siteName: "Тагай менен Мээримдин тою",
		images: [
			{
				url: "/weding.webp",
				width: 1200,
				height: 630,
				alt: "Тагай менен Мээримдин үйлөнүү той чакыруусу",
			},
		],
		locale: "ky_KG",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="ky" className={`${greatVibes.variable} ${cormorant.variable}`}>
			<head>
				<meta name="theme-color" content="#fce0e8" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
			</head>
			<body>{children}</body>
		</html>
	);
}
