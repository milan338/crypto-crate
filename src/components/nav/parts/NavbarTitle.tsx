import styles from '@/styles/components/nav/NavbarTitle.module.scss';
import LogoSVG from '@/components/svg/logo/LogoSVG';
import type { LogoSVGProps } from '@/components/svg/logo/LogoSVG';

interface NavbarTitleProps {
    small: boolean;
    hidden?: boolean;
}

const logoSvgProps: LogoSVGProps = {
    width: 80,
    height: 80,
    color: 'white',
};

export default function NavbarTitle(props: NavbarTitleProps) {
    const { small, hidden } = props;
    return (
        <div className={`${styles['navbar-title']} ${hidden ? styles.hidden : ''}`}>
            <LogoSVG {...logoSvgProps} monochrome={small} className={small ? styles.small : ''} />
            <h1
                className={small && !hidden ? styles.visible : styles.hidden}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                CryptoCrate
            </h1>
        </div>
    );
}
