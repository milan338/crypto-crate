import ModalOpenCrateBody from '../modals/ModalOpenCrateBody';
import ModalOpenCrateErrorBody from '../modals/ModalOpenCrateErrorBody';
import ModalOpenCrateHudBody from '../modals/ModalOpenCrateHudBody';
import type { ModalDispatch } from '@/contexts/modal/ModalProvider';
import type { UserState } from '@/contexts/user/UserProvider';
import type { EnableReloadCb } from '@/hooks/window';
import type { CrateRarity } from '../Crate';

// TODO error shake the button
// TODO nicer animations for the glowing text

export default function openCrate(
    user: UserState,
    dispatchModal: ModalDispatch,
    rarity: CrateRarity,
    errTime: number,
    enableReload: EnableReloadCb
) {
    const nCrates = user.ownedCrates[rarity];
    const closeCb = () => {
        enableReload();
        dispatchModal({ visible: false });
    };
    if (!nCrates) {
        setTimeout(() => {
            dispatchModal({
                visible: true,
                content: {
                    title: 'Oops',
                    body: <ModalOpenCrateErrorBody rarity={rarity} callback={closeCb} />,
                },
                onBgClick: closeCb,
            });
        }, errTime);
        return 'Not enough crates';
    }
    dispatchModal({
        visible: true,
        content: {
            title: 'Open Crate?',
            body: (
                <ModalOpenCrateBody
                    rarity={rarity}
                    onYes={() => {
                        // TODO open the crate
                        // TODO instead of opening the crate straight away, instead show a secondary modal
                        // TODO that will show the new number of crates that the user will have after opening
                        // TODO and require them to confirm a second time
                    }}
                    onNo={closeCb}
                />
            ),
        },
        hudContent: {
            hudActive: true,
            hudBody: <ModalOpenCrateHudBody rarity={rarity} nCrates={nCrates ?? 0} />,
        },
        onBgClick: closeCb,
    });
    return '';
}
