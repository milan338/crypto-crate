import type { CrateRarity } from '@/components/crate/Crate';

interface ModalOpenCrateErrorBodyProps {
    rarity: CrateRarity;
    callback: () => void;
}

export default function ModalOpenCrateErrorBody(props: ModalOpenCrateErrorBodyProps) {
    const { rarity, callback } = props;
    return (
        <div>
            <p>It looks like you don&apos;t have any {rarity} crates.</p>
            <div>
                <button onClick={callback}>Go Back</button>
            </div>
        </div>
    );
}
