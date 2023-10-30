type InputProps = {
  label: string,
  placeholder: string
}

export default function Input({ label, placeholder }: InputProps) {
  return (
    <div>
      {label}<input id="salient-input" placeholder={placeholder}></input>
    </div>
  );
}