import FooterCommonComponent from "./common/footer/FooterCommonComponent";
import HeaderCommonComponent from "./common/header/HeaderCommonComponent";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh relative pb-50 bg-cyan-900 text-white">
        <HeaderCommonComponent />
        {children}
        <FooterCommonComponent />
      </body>
    </html>
  );
}
