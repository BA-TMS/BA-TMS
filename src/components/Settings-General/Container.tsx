// This will be a polymorphic wrapper component. It will be a wrapper
// that wraps all kinds of components, but won't know which specific we'll wrap.
import { ComponentPropsWithoutRef, ElementType } from 'react';
import { PropsWithChildren } from 'react';

// We'll need a Container Props type.
type ContainerProps<T extends ElementType> = PropsWithChildren<{ // Generic element must be based on ElementType.
    as?: T, // Identifier of component.
}> & ComponentPropsWithoutRef<T>;

export default function Container<C extends ElementType>({
    as,
    children,
    ...props
}: ContainerProps<C>) {
    const Component = as || 'div'; // Make 'as' optional.
    return (
    <Component {...props}>
        {children}
    </Component>
    ); // That's it. This is a polymorphic component.
}