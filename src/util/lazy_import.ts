import dynamic from 'next/dynamic';
import type { ComponentType, LazyExoticComponent } from 'react';

// Dynamic lazy import for use in react suspense
export default function lazyImport<T extends ComponentType<any>>(
    factory: () => Promise<{ default: T }>
): LazyExoticComponent<T> {
    // TODO remove this ignore once Next is updated to fix this
    // TODO ssr props option
    // @ts-ignore
    const mod = dynamic(factory, { suspense: true });
    return mod as LazyExoticComponent<T>;
}
