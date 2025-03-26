'use client';

import Button from '@/components/UI_Elements/Buttons/Button';
import { useRouter } from 'next/navigation';

// this component shows if there is a problem displaying customer data
// TODO: make design better?

const ViewCustomerSkeleton = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <div className="relative my-1.5">
        <p className="subtitle2 px-2 text-grey-800 dark:text-white bg-transparent">
          Customer Name
        </p>
        <p className="block indent-5 px-3 py-3.5 w-full h-12 body2 text-grey-800 bg-grey-300 rounded-[7px]">
          {''}
        </p>
      </div>

      <p className="caption mt-1.5 mb-5 text-error-dark text-center">
        Oops! Something went wrong- Could not find customer.
      </p>

      <div className="py-3.5 gap-2 border-t border-grey-300 dark:border-grey-700 flex justify-end sticky bottom-0 bg-white dark:bg-grey-900 z-10">
        <Button
          type="button"
          onClick={() => {
            router.back();
          }}
        >
          Ok
        </Button>
      </div>
    </div>
  );
};

export default ViewCustomerSkeleton;
