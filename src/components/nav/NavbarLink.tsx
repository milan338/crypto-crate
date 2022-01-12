import type { ReactNode } from 'react';

interface NavbarLinkProps {
    className?: string;
    href?: string;
    children?: ReactNode;
}

export default function NavbarLink(props: NavbarLinkProps) {
    return (
        <li>
            <a className={props.className} href={props.href}>
                {props.children}
            </a>
        </li>
    );
}
