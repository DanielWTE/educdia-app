import React from 'react';

export default function CourseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex flex-col min-h-screen">{children}</div>;
}
