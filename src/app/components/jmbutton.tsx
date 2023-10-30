'use client';

type ButtonProps = {
  label: string,
  options: string[]
}

export default function Button({ label, options }: ButtonProps) {
  function clickFun() {
    const inputText = document.getElementById('salient-input').value;
    if (options.includes(inputText)) {
      document.body.style.backgroundColor = inputText;
      if (options.indexOf(inputText) < 3) {
        document.body.style.color = 'black';
      } else {
        document.body.style.color = 'white';
      }
    } else {
      alert('Input must be one of pink, yellow, red, blue, green, or black');
    }
  }

  return (
    <button onClick={clickFun}>{label}</button>
  );
}