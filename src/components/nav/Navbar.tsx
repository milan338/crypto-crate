import { useWindowSize } from '@/hooks/window';
import DesktopNavbar from './navbars/DesktopNavbar';

const DESKTOP_MIN_WIDTH = 850;

export default function Navbar() {
    const windowSize = useWindowSize();
    const [windowW] = windowSize;
    return <>{windowW >= DESKTOP_MIN_WIDTH ? <DesktopNavbar windowSize={windowSize} /> : null}</>;
}
