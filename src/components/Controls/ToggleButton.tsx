import Switch from 'react-switch';
import { useId } from 'react';

export default function ToggleButton(props: {
  labelText: string;
  descriptionText: string;
  checked: boolean;
  onChange: () => void;
}) {
  // Create a unique ID for every Switch component that's created in page.tsx.
  const firstSwitchID = useId();

  // CSS Element for hovering over the text to turn the cursor into a Selector icon.
  const toggleStyle: React.CSSProperties = {
    cursor: 'pointer',
    WebkitUserSelect: 'none',
    userSelect: 'none',
    display: 'block',
  };

  return (
    <div className="flex">
      <Switch
        id={firstSwitchID}
        onChange={props.onChange}
        checked={props.checked}
      />

      <div style={{ paddingLeft: '10px' }}>
        <label style={toggleStyle} htmlFor={firstSwitchID}>
          <span style={{ display: 'block', fontWeight: 'bold' }}>
            {props.labelText}
          </span>
        </label>

        <span style={{ display: 'block' }}>{props.descriptionText}</span>
      </div>
    </div>
  );
}
