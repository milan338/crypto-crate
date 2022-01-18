import type { MouseEventHandler, ReactNode } from 'react';

export interface NavbarLinkProps {
    className?: string;
    href?: string;
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export default function NavbarLink(props: NavbarLinkProps) {
    return (
        <li>
            <a className={props.className} href={props.href} onClick={props.onClick}>
                {props.children}
            </a>
        </li>
    );
}
