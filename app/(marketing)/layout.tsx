import "@/app/globals.css";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="">{children}</body>
    </html>
  );
}
