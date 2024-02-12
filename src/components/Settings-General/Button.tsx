import { type ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
    href?: never; // Make sure that we don't mix and match.
};

type AnchorProps = ComponentPropsWithoutRef<'a'> & {
    href?: string; // We can never set an href prop with ButtonProps, but can with AnchorProps.
};

// Type predicate to help with <button>.
function isAnchorProps(props: ButtonProps | AnchorProps): props is AnchorProps { // This is a type predicate.
    // The predicate says that this func is a bool func. If true, this type is of
    // a specific type: AnchorProps.
    return 'href' in props;
}

export default function Button(props: ButtonProps | AnchorProps) {
    if (isAnchorProps(props)) {
        return <a className="button" {...props}></a>
    }

    return <button className="button" {...props}></button>
}