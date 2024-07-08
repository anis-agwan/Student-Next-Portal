import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar/Navbar";
import { AuthContextProvider } from "./store/auth-context";
import { QuestionContextProvider } from "./store/questions-context";
import { Providers } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SOM Assessment",
  description: "A psychological assessment for MBA students.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <AuthContextProvider>
          <div className="flex flex-col">
          <Providers>
              <Navbar />
              <QuestionContextProvider>{children}</QuestionContextProvider>
            </Providers>
          </div>
        </AuthContextProvider>
      </body>
    </html>
  );
}
