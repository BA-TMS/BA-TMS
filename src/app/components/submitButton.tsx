'use client';

export default function SubmitButton() {
  function handleClick() {
    const firstName = (
      document.getElementById('grid-first-name') as HTMLInputElement
    ).value;
    const lastName = (
      document.getElementById('grid-last-name') as HTMLInputElement
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
    console.log('City:', city);
    console.log('State:', state);
    console.log('Zip:', zip);
  }
  return (
    <button
      className="inline-block w-auto uppercase font-bold tracking-wide bg-blue-500 hover:bg-blue-700 text-white-700 py-3 px-4 rounded"
      type="submit"
      onClick={handleClick}
    >
      Submit
    </button>
  );
}
