export function getFastBoundingClientRect(target: Element, cb: (rect: DOMRect) => void) {
    const observer = new IntersectionObserver(([element]) => {
        const rect = element.boundingClientRect;
        cb(rect);
        observer.disconnect();
    });
    observer.observe(target);
}
