import "./globals.css";
import { useHabit } from "./store/habitStore/habitStore";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-min-100">{children}</body>
    </html>
  );
}
