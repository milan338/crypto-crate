import { cratecolors } from '@/components/crate/Crate';
import type { CrateRarity } from '@/components/crate/Crate';

interface ModalOpenCrateBodyProps {
    rarity: CrateRarity;
    onYes: () => void;
    onNo: () => void;
}

export default function ModalOpenCrateBody(props: ModalOpenCrateBodyProps) {
    const { rarity, onYes, onNo } = props;
    return (
        <div>
            <p>
                {/* TODO change this regex into some utility that works with other languages later */}
                {/* TODO display keys */}
                You&apos;re about to open{' '}
                {RegExp(/^[c|r|l|o][A-Za-z0-9 -]*$/).test(rarity) ? 'a ' : 'an '}
                <span r-glow="true" style={{ color: cratecolors[rarity] }}>
                    {rarity}
                </span>{' '}
                crate. This will use up a crate. Continue?
            </p>
            {/* TODO change the styling of this div and set a custom classname */}
            {/* TODO or maybe instead handle the div style inside the modalTextBox directly? */}
            <div>
                <button onClick={onYes}>Yes</button>
                <button onClick={onNo}>No</button>
            </div>
        </div>
    );
}
