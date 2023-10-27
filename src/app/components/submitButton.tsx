'use client';

export default function SubmitButton() {
  function handleClick(): void {
    const firstNameInput = document.getElementById(
      'grid-first-name'
    ) as HTMLInputElement;
    const lastNameInput = document.getElementById(
      'grid-last-name'
    ) as HTMLInputElement;
    const cityInput = document.getElementById('grid-city') as HTMLInputElement;
    const stateElement = document.getElementById(
      'grid-state'
    ) as HTMLSelectElement;
    const zipInput = document.getElementById('grid-zip') as HTMLInputElement;

    const firstName: string = firstNameInput.value.trim();
    const lastName: string = lastNameInput.value.trim();
    const city: string = cityInput.value.trim();
    const state: string =
      stateElement.options[stateElement.selectedIndex].value;
    const zip: string = zipInput.value.trim();

    // do not submit if all fields are not filled
    if (firstName && lastName && city && state && zip) {
      console.log('First Name:', firstName);
      console.log('Last Name:', lastName);
      console.log('City:', city);
      console.log('State:', state);
      console.log('Zip:', zip);

      // clear input fields
      firstNameInput.value = '';
      lastNameInput.value = '';
      cityInput.value = '';
      zipInput.value = '';
    } else {
      alert('Please fill out all the required fields.');
    }
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
