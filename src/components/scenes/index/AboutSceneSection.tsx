import styles from '@/styles/components/scenes/AboutSceneSection.module.scss';
import { useState } from 'react';
import { useCurrentRef } from '@/hooks/ref';
import DotsBackgroundSVG from '@/components/svg/background/DotsBackgroundSVG';

interface AboutSceneSectionProps {
    id: string;
    sectionHeader: string;
    heading1: string;
    heading2: string;
    heading3: string;
    content1: string;
    content2: string;
    content3: string;
}

interface AboutSceneSectionPartProps {
    heading: string;
    children: string;
}

function AboutSceneSectionPart(props: AboutSceneSectionPartProps) {
    const { heading, children } = props;
    const [hovered, setHovered] = useState(false);
    return (
        <div
            className={`${styles.part} ${hovered ? styles.hovered : ''}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <h2>{heading}</h2>
            <p>{children}</p>
        </div>
    );
}

export default function AboutSceneSection(props: AboutSceneSectionProps) {
    const { id, sectionHeader, heading1, heading2, heading3, content1, content2, content3 } = props;
    const [ref, onRefChange] = useCurrentRef<HTMLElement>();
    return (
        <section ref={onRefChange} id={id} className={styles.section}>
            <h1 className={styles['section-header']}>{sectionHeader}</h1>
            <div className={styles.container}>
                <AboutSceneSectionPart heading={heading1}>{content1}</AboutSceneSectionPart>
                <AboutSceneSectionPart heading={heading2}>{content2}</AboutSceneSectionPart>
                <AboutSceneSectionPart heading={heading3}>{content3}</AboutSceneSectionPart>
            </div>
            <DotsBackgroundSVG element={ref} radius={3.2} spacing={30} fadeConst={1.23} fadeN={9} />
        </section>
    );
}
