// import Header from "@/components/header";

import LandingPageHeader from "@/components/LandingPageHeader";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <LandingPageHeader />
      {children}
    </>
  );
}
