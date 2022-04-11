import { useState, useCallback } from 'react';

// Returns the current ref to an element, or undefined if not yet mounted
// Will update the current ref when the element becomes defined or the ref changes
// Use ref to access the element, and use onRefChange as the component's ref prop
export function useCurrentRef<T>(): [T | undefined, (element: T) => void] {
    const [ref, setRef] = useState<T | undefined>(undefined);
    const onRefChange = useCallback((element: T) => setRef(element), []);
    return [ref, onRefChange];
}
