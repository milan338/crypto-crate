import { cratecolors } from '@/components/crate/Crate';
import KeySVG from '@/components/svg/key/KeySVG';
import type { CrateRarity } from '@/components/crate/Crate';

interface ModalOpenCrateHudBodyProps {
    rarity: CrateRarity;
    nCrates: number;
}

export default function ModalOpenCrateHudBody(props: ModalOpenCrateHudBodyProps) {
    const { rarity, nCrates } = props;
    return (
        <>
            <KeySVG width={64} height={64} color={cratecolors[rarity]} />
            <h1>
                &times; {nCrates} {rarity} crates
            </h1>
        </>
    );
}
