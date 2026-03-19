import "./globals.css";

export const metadata = {
  title: "PyASL Workbench",
  description: "Visual workflows for ASL MRI analysis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
