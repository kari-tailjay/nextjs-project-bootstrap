import React from "react";

export const metadata = {
  title: "Parking Lot Layout Tool",
  description: "Tool to design efficient parking lot layouts and export DXF for AutoCAD",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">{children}</body>
    </html>
  );
}
