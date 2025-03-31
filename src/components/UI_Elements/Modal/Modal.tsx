import { ReactNode } from 'react';

interface ModalProps {
  title: string;
  children: ReactNode;
}

export default function Modal({ title, children }: ModalProps) {
  return (
    <div style={{ overflowAnchor: 'none' }}>
      <div className="fixed z-999999 top-0 left-0 flex h-full min-h-screen w-full items-start justify-center bg-black/90 px-4 py-5">
        <div className="my-auto w-[694px] h-5/6 overflow-auto rounded-[14.5px] border-grey-300 dark:border-grey-700 bg-white dark:bg-grey-900">
          <section className="px-4.5 w-full h-full flex flex-col">
            <header className="py-4 border-b border-grey-300 dark:border-grey-700">
              <h6 className="subtitle1 text-grey-800 dark:text-white">
                {title}
              </h6>
            </header>
            <div className="grow overflow-auto">{children}</div>
          </section>
        </div>
      </div>
    </div>
  );
}
