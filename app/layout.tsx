import type { Metadata } from "next";
import "./globals.css";
import PhoneFrame from "@/components/PhoneFrame";

export const metadata: Metadata = {
  title: "InsureOne · Roinet",
  description: "Roinet InsureOne — Customer Platform UI Preview",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PhoneFrame>{children}</PhoneFrame>
      </body>
    </html>
  );
}
