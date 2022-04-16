import { useMemo } from 'react';
import { Vector3, Euler } from 'three';
import { useWindowSize } from '@/hooks/window';
import { useCurrentRef } from '@/hooks/ref';
import { DESKTOP_MIN_W } from '@/util/constants';
import Crate from '@/components/crate/Crate';
import CrateScene from '../CrateScene';
import type { Mesh } from 'three';

const RESPONSIVE_X = 3.5;
const POSITION = new Vector3(-1.2, 0, -12.5);
const LIGHT_POS = new Vector3(-2, 10, 4);
const ROT_DESKTOP = new Euler(0, -0.5, 0);
const ROT_MOBILE = new Euler(-0.1, -0.25, 0);

export default function HomeScene() {
    const [windowW, windowH] = useWindowSize();
    const [sunRef, onSunRefChange] = useCurrentRef<Mesh>();
    const [desktopPos, mobilePos] = useMemo(
        () => [
            POSITION.clone().setX((windowW / windowH) * RESPONSIVE_X + POSITION.x),
            POSITION.clone().set(
                (windowW / windowH) * RESPONSIVE_X * 0.25,
                POSITION.y - 1.45,
                POSITION.z * 1.3
            ),
        ],
        [windowW, windowH]
    );
    return (
        <CrateScene lightPosition={LIGHT_POS} suns={[sunRef]} keys={['sun-home']}>
            <Crate
                // TODO fix position and rotation not updating when switching between mobile / desktop
                position={windowW >= DESKTOP_MIN_W ? desktopPos : mobilePos}
                rotation={windowW >= DESKTOP_MIN_W ? ROT_DESKTOP : ROT_MOBILE}
                sunRef={onSunRefChange}
                rarity="epic"
            />
        </CrateScene>
    );
}
