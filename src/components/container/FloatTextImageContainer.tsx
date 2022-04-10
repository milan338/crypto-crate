import styles from '@/styles/components/container/FloatTextImageContainer.module.scss';
import Image from 'next/image';
import { useRef } from 'react';
import { useHasMounted } from '@/hooks/ssr';
import { useScrollPosition, useWindowSize } from '@/hooks/window';
import { useMousePosition } from '@/hooks/mouse';
import FloatTextContainer from './FloatTextContainer';
import type { ImageProps } from 'next/image';
import type { FloatTextContainerProps } from './FloatTextContainer';

interface FloatTextImageContainerProps extends FloatTextContainerProps {
    img: ImageProps['src'];
    bg?: ImageProps['src'];
    alt?: string;
}

export default function FloatTextImageContainer(props: FloatTextImageContainerProps) {
    const { img, bg, alt, heading, subheading, rightAlign, children } = props;
    const { mouseX, mouseY } = useMousePosition(100);
    const [windowW, windowH] = useWindowSize();
    const scrollY = useScrollPosition(100);
    const hasMounted = useHasMounted();
    const imgRef = useRef<HTMLDivElement>(null);
    const shiftX = (mouseX - windowW / 2) / 70;
    const shiftY = (mouseY - windowH / 2) / 70;
    return (
        <div
            className={styles.container}
            style={{ flexDirection: rightAlign ? 'row' : 'row-reverse' }}
        >
            <div
                ref={imgRef}
                className={styles['stacked-img']}
                style={
                    hasMounted
                        ? /* eslint-disable indent */
                          {
                              transform: imgRef.current
                                  ? `translateY(${
                                        (imgRef.current.offsetTop - scrollY) / 15 + scrollY / 100
                                    }px)
                               translateX(${rightAlign ? '-' : ''}50px)`
                                  : '',
                          }
                        : {}
                    /* eslint-enable indent */
                }
            >
                <div
                    className={styles['img-container']}
                    style={
                        hasMounted
                            ? /* eslint-disable indent */
                              {
                                  zIndex: 2,
                                  transform: `translateX(${shiftX}px) translateY(${shiftY}px)`,
                              }
                            : {}
                        /* eslint-enable indent */
                    }
                >
                    <Image className={styles.fg} src={img} alt={alt} />
                </div>
                {bg && (
                    <div
                        className={styles['img-container']}
                        style={
                            hasMounted
                                ? /* eslint-disable indent */
                                  {
                                      transform: `translateX(${-shiftX * 0.8}px) translateY(${
                                          -shiftY * 0.8
                                      }px)`,
                                  }
                                : {}
                            /* eslint-enable indent */
                        }
                    >
                        <Image className={styles.bg} src={bg} alt="" />
                    </div>
                )}
            </div>
            <FloatTextContainer {...{ heading, subheading, rightAlign }}>
                {children}
            </FloatTextContainer>
        </div>
    );
}
