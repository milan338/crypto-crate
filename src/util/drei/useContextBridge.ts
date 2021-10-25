// Adapted from https://github.com/pmndrs/drei/blob/master/src/core/useContextBridge.tsx
import { useRef, useContext, useMemo, createElement } from 'react';
import type { Context } from 'react';

export function useContextBridge(...contexts: Array<Context<any>>) {
    const cRef = useRef<Array<Context<any>>>([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    cRef.current = contexts.map((context) => useContext(context));
    return useMemo(
        () =>
            ({ children }: { children: React.ReactNode }): JSX.Element =>
                contexts.reduceRight(
                    (acc, Context, i) =>
                        // eslint-disable-next-line react/no-children-prop
                        /*#__PURE__*/ createElement(Context.Provider, {
                            value: cRef.current[i],
                            children: acc,
                        }),
                    children
                    /*
                     * done this way in reference to:
                     * https://github.com/DefinitelyTyped/DefinitelyTyped/issues/44572#issuecomment-625878049
                     * https://github.com/microsoft/TypeScript/issues/14729
                     */
                ) as unknown as JSX.Element,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
}
