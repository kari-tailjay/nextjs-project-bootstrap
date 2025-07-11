import React from "react";

export const metadata = {
  title: "Parking Lot Layout Tool | Upsolut",
  description: "Tool to design efficient parking lot layouts and export DXF for AutoCAD",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Inter', sans-serif", margin: 0, padding: 0, backgroundColor: "#ffffff", color: "#111827" }}>
        <header style={{ padding: "20px", borderBottom: "1px solid #e5e7eb", textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", fontWeight: "600" }}>Upsolut</div>
        </header>
        {children}
      </body>
    </html>
  );
}
