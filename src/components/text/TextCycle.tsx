import { useState } from 'react';
import type { ReactNode } from 'react';

interface TextCycleProps {
    defaultText: string;
    wordToCycle: string;
    altWords: string[];
    period: number;
    children?: ReactNode;
}

export default function TextCycle(props: TextCycleProps) {
    const { defaultText, wordToCycle, altWords, period, children } = props;
    const [wordI, setWordI] = useState(0);
    const words = defaultText.split(' ');
    // Find index of text to cycle - assumes looking for first occurrence
    const i = words.indexOf(wordToCycle);
    // Construct new text
    words[i] = altWords[wordI];
    const text = words.join(' ');
    // Increment word text periodically
    setTimeout(() => {
        setWordI(wordI === altWords.length - 1 ? 0 : wordI + 1);
    }, period);
    return (
        <p>
            {text}
            {children}
        </p>
    );
}
