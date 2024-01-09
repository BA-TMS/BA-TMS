'use client';

import { useState } from 'react';
import { ArrowRightIcon, ArrowLeftIcon, MinimizeIcon } from '@heroicons/react/solid';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <div className={`w-64 bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2">
          {isOpen ? <ArrowLeftIcon className="h-5" /> : <ArrowRightIcon className="h-5" />}
        </button>
        {isOpen && <nav>Navigation Content</nav>}
        {!isOpen && <MinimizeIcon className="h-5" />}
      </div>
      <main className="flex-grow">
        Main Content
      </main>
    </div>
  )
}
