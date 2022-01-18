import styles from '@/styles/components/nav/NavbarTitle.module.scss';
import LogoSVG from '@/components/svg/logo/LogoSVG';
import type { LogoSVGProps } from '@/components/svg/logo/LogoSVG';

interface NavbarTitleProps {
    scrollY: number;
    hidden?: boolean;
}

const logoSvgProps: LogoSVGProps = {
    width: 80,
    height: 80,
    color: 'white',
};

export default function NavbarTitle(props: NavbarTitleProps) {
    const { scrollY } = props;
    return (
        <div className={`${styles['navbar-title']} ${props.hidden ? styles.hidden : ''}`}>
            <LogoSVG
                {...logoSvgProps}
                monochrome={!!scrollY}
                className={scrollY ? styles.small : ''}
            />
            <h1
                className={scrollY && !props.hidden ? styles.visible : styles.hidden}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                CryptoCrate
            </h1>
        </div>
    );
}
