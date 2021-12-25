import styles from '@/styles/svg/Logo.module.scss';
import LogoSVG from './LogoSVG';
import type { LogoSVGProps } from './LogoSVG';

interface LogoDynamicSVGProps extends LogoSVGProps {
    sizeClassName: 'small' | 'full';
}

export default function LogoDynamicSVG(props: LogoDynamicSVGProps) {
    const sizeClassName = styles[props.sizeClassName];
    return (
        <div className={styles['logo-dynamic']}>
            <div className={styles['logo-dynamic-inner']}>
                <LogoSVG {...props} className={`${styles['top-logo']} ${sizeClassName}`} />
            </div>
            <div className={styles['logo-dynamic-inner']}>
                <LogoSVG {...props} monochrome className={sizeClassName} />
            </div>
        </div>
    );
}
