import {
  UseControllerProps,
  useController,
  type Merge,
  type FieldError,
  type FieldValues,
  type UseControllerReturn,
} from 'react-hook-form';

type InputBaseProps = {
  labelProps?: React.HTMLAttributes<HTMLLabelElement | HTMLDivElement>;
  inputProps?: React.InputHTMLAttributes<
    HTMLInputElement | HTMLTextAreaElement
  >;
  label: string;
  error?: Merge<FieldError, (FieldError | undefined)[]>;
};

type InputProps<TForm extends FieldValues> =
  | (InputBaseProps & {
      as?: 'text' | 'textarea';
      controllerProps: UseControllerProps<TForm>;
      children?: never;
    })
  | (InputBaseProps & {
      as?: never;
      children: React.ReactNode;
      controllerProps?: never;
    });

// Label
function LabelText<TForm extends FieldValues>({
  label,
  error,
}: Pick<InputProps<TForm>, 'label' | 'error'>) {
  return (
    <span className="flex items-center justify-between gap-x-3">
      {label}
      {error && (
        <span
          role="alert"
          aria-hidden={error === undefined}
          className="flex items-center gap-1 text-xs text-gray-700 dark:text-gray-400"
        >
          {/* <ExclamationCircleIcon className="h-4 text-red-500" /> */}
          {Array.isArray(error) ? (
            error.map((error) => (
              <span key={error.message}>{error.message}</span>
            ))
          ) : (
            <span>{error.message}</span>
          )}
        </span>
      )}
    </span>
  );
}

// controlled input
function ControlledInput<TForm extends FieldValues>({
  controller,
  children,
}: {
  controller: NonNullable<InputProps<TForm>['controllerProps']>;
  children: (props: {
    field: UseControllerReturn<TForm>['field'];
  }) => JSX.Element;
}) {
  const { field } = useController(controller);
  return <>{children({ field })}</>;
}

export function Input<TForm extends FieldValues>({
  label,
  inputProps = {},
  labelProps = {},
  error,
  children,
  controllerProps,
  as = 'text',
}: InputProps<TForm>) {
  const { className: labelClass, ...labelRest } = labelProps;
  const { className: inputClass, ...inputRest } = inputProps;

  if (controllerProps !== undefined)
    return (
      <div
        className={`flex flex-col gap-y-0.5${
          label === undefined ? ' flex-col-reverse' : ''
        }${labelClass ? ` ${labelClass}` : ''}`}
        {...labelRest}
      >
        <div
          className={`flex items-center justify-between gap-x-3${
            label === undefined ? ' flex-row-reverse' : ''
          }`}
        >
          <label htmlFor={controllerProps.name}>{label}</label>
          {/* <Error error={error} /> */}
        </div>
        <ControlledInput controller={controllerProps}>
          {({ field }) => (
            <div className="relative">
              {as === 'textarea' ? (
                <textarea
                  {...field}
                  {...inputRest}
                  aria-invalid={error !== undefined}
                  onChange={(e) => field.onChange(e.target.value)}
                  className={`px-4 py-2${inputClass ? ` ${inputClass}` : ''}`}
                />
              ) : (
                <input
                  {...field}
                  {...inputRest}
                  aria-invalid={error !== undefined}
                  onChange={(e) => {
                    let value: string | number = e.target.value;

                    if (inputProps?.type === 'number') {
                      const valAsNum = Number(value);

                      if (isNaN(valAsNum)) {
                        value = 0;
                      } else {
                        if (typeof value === 'number') {
                          if (inputProps.max && valAsNum > inputProps.max) {
                            value = inputProps.max;
                          } else if (
                            inputProps.min &&
                            valAsNum < inputProps.min
                          ) {
                            value = inputProps.min;
                          }
                        }
                      }
                    }
                  }}
                />
              )}
              {children}
            </div>
          )}
        </ControlledInput>
      </div>
    );
  return (
    <div
      {...labelRest}
      className={`space-y-0.5${labelClass ? ` ${labelClass}` : ''}`}
    >
      <LabelText label={label} error={error} />
      {children}
    </div>
  );
}
