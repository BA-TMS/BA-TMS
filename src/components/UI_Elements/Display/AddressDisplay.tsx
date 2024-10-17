/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

// this component formats an address

// optional props
interface DisplayProps {
  title: string;
  addressLine1: string;
  addressLine2?: string | null;
  addressLine3?: string | null;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const AddressDisplay = ({
  title,
  addressLine1,
  addressLine2,
  addressLine3,
  city,
  state,
  zip,
  country,
}: DisplayProps) => {
  return (
    <div className="relative my-1.5">
      <p className="subtitle2 px-2 address-grey-800 dark:text-white bg-transparent">
        {title}
      </p>
      <div className="block indent-5 px-3 py-3.5 w-full body2 text-grey-800 bg-grey-300 rounded-[7px]">
        <p>{addressLine1}</p>
        <p>{addressLine2}</p>
        <p>{addressLine3}</p>
        <p>{`${city}, ${state} ${zip}`}</p>
        <p>{`${country}`}</p>
      </div>
    </div>
  );
};

export default AddressDisplay;
