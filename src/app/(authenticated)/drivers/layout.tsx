'use client';

// slots are passed as props to the shared parent layout
// slots render parallel alongside children prop

export default function DriverTemplate({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
