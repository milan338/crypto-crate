import { useState, useEffect, useRef } from 'react';

export function useMousePosition(debounceDelay: number) {
    const [position, setPosition] = useState({ mouseX: 0, mouseY: 0 });
    const wait = useRef(false);
    useEffect(() => {
        const mouseListener = (event: MouseEvent) => {
            // Debounce delay
            if (wait.current) return;
            setTimeout(() => {
                wait.current = false;
            }, debounceDelay);
            wait.current = true;
            setPosition({ mouseX: event.x, mouseY: event.y });
        };
        window.addEventListener('mousemove', mouseListener);
        return () => {
            window.removeEventListener('mousemove', mouseListener);
        };
    }, [debounceDelay]);
    return position;
}
