import Image from 'next/image';
import Form from './components/form';
import { FormProps } from '@/types';

export default function Home() {
  function handleClick() {
    const firstName = (
      document.getElementById('grid-first-name') as HTMLInputElement
    ).value;
    const lastName = (
      document.getElementById('grid-last-name') as HTMLInputElement
    ).value;
    const password = (
      document.getElementById('grid-password') as HTMLInputElement
    ).value;
    const city = (document.getElementById('grid-city') as HTMLInputElement)
      .value;
    const stateElement = document.getElementById(
      'grid-state'
    ) as HTMLSelectElement;
    const state = stateElement.options[stateElement.selectedIndex].value;
    const zip = (document.getElementById('grid-zip') as HTMLInputElement).value;

    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Password:', password);
    console.log('City:', city);
    console.log('State:', state);
    console.log('Zip:', zip);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none"></div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[var(accent-blue)] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left"></div>
      <Form></Form>
      <button
        className="block uppercase font-bold tracking-wide bg-blue-500 hover:bg-blue-700 text-white-700 py-3 px-4 rounded"
        type="submit"
        // onClick={handleClick}
      >
        Submit
      </button>
    </main>
  );
}
