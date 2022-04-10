import { useState, useEffect } from 'react';

export function isServer() {
    return typeof window === 'undefined';
}

export function useHasMounted() {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => setHasMounted(true), []);
    return hasMounted;
}
