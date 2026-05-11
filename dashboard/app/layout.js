// dashboard/app/layout.js
import "./globals.css"; // Esta línea es VITAL

export const metadata = {
  title: "User Management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}