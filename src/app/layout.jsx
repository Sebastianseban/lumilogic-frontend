import "./globals.css";
import RouteLoader from "@/components/common/RouteLoader";
import { Suspense } from "react";

export const metadata = {
  title: "LumiLogic - Cloud Solutions & IT Services",
  description: "Professional cloud migration and IT services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <Suspense fallback={null}>
          <RouteLoader />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
