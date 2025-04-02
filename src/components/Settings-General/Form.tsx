import {
  type FormEvent,
  type ComponentPropsWithoutRef,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';

export type FormHandle = {
  clear: () => void; // A function that takes no input and returns nothing.
}; // We need a new type to access in App soon. It described what's in ImperativeRef.

type FormProps = ComponentPropsWithoutRef<'form'> & {
  onSave: (value: unknown) => void; // Value is a function type. unknown: We don't know in advance.
};

// <> First generic type: Describes the type of ref. 2nd: type of props object.
const Form = forwardRef<FormHandle, FormProps>(function Form(
  { onSave, children, ...otherProps },
  ref
) {
  const form = useRef<HTMLFormElement>(null);

  // Expose the API with ImperativeHandle(). This only works w/ a component w/ a forwardedRef.
  useImperativeHandle(ref, () => {
    // Needs a ref value as a first argument.
    return {
      // Return an object.
      clear() {
        console.log('CLEARING');
        form.current?.reset(); // Only execute this if it's not null.
      },
    };
  });

  // Handle the save form.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Make sure default browser behavior is prevented.

    // Extract the newly saved data.
    const formData = new FormData(event.currentTarget);

    // Convert formData from an object to a simpler object where we can get the name.
    const data = Object.fromEntries(formData);

    // Now it must be passed from the Form component to the component that's using it. (line 3)
    onSave(data);
  }

  return (
    <form onSubmit={handleSubmit} {...otherProps} ref={form}>
      {children}
    </form>
  );
});

export default Form;
