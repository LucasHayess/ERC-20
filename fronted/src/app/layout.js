import "./globals.css";

export const metadata = {
  title: "Mint LucasCoin",
  description: "Mint your first LucasCoin token.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">{children}</body>
    </html>
  );
}
