import styles from '@/styles/components/pages/Index.module.scss';
import Head from 'next/head';
import { Suspense, useRef } from 'react';
import { Vector3 } from 'three';
import { useCurrentRef } from '@/hooks/ref';
import { useModal } from '@/hooks/context';
import ContextCanvas from '@/components/canvas/ContextCanvas';
import Starfield from '@/components/starfield/Starfield';
import HomeScene from '@/components/scenes/index/HomeScene';
import FooterScene from '@/components/scenes/index/FooterScene';
import AboutScene from '@/components/scenes/index/AboutScene';
import AboutSceneSection from '@/components/scenes/index/AboutSceneSection';
import TextCycle from '@/components/text/TextCycle';
import TextUnderlineSVG from '@/components/svg/text/TextUnderlineSVG';
import Navbar from '@/components/nav/Navbar';
import ExternalButton from '@/components/nav/ExternalButton';
import DotsBackgroundSVG from '@/components/svg/background/DotsBackgroundSVG';
import LargeArrowSVG from '@/components/svg/arrow/LargeArrowSVG';
import FloatTextContentContainer from '@/components/container/FloatTextContentContainer';
import type { NextPage } from 'next';

const FOV = 45;
const CAMERA_POS = new Vector3(0, 0, 0);

const Home: NextPage = () => {
    const [aboutRef, onAboutRefChange] = useCurrentRef<HTMLElement>();
    const homeBgRef = useRef<HTMLDivElement>(null);
    const { dispatchModal } = useModal();
    const onExternalButtonClick = () => {
        dispatchModal({
            visible: true,
            content: {
                title: "We're not ready yet",
                body: (
                    <>
                        <p>Sorry, CryptoCrate isn&apos;t ready just yet.</p>
                        <button onClick={() => dispatchModal({ visible: false })}>Go back</button>
                    </>
                ),
            },
        });
    };
    return (
        <>
            <Head>
                <title>CryptoCrate</title>
                <meta name="description" content="The better NFT platform" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Suspense fallback={null}>
                <Navbar onExternalButtonClick={onExternalButtonClick} />
            </Suspense>
            <main id="main-content">
                {/* Landing page home section */}
                <section id="home" className={styles.home}>
                    <div className={styles['home-content']}>
                        <div>
                            <h1>CryptoCrate</h1>
                            <TextCycle
                                defaultText="The better"
                                wordToCycle="better"
                                altWords={['better', 'fairer', 'more fun', 'innovative']}
                                period={2200}
                            >
                                <br /> NFT platform
                            </TextCycle>
                            <ExternalButton
                                id="external-button"
                                className={styles.button}
                                onClick={onExternalButtonClick}
                                showArrow
                            >
                                Launch App
                            </ExternalButton>
                        </div>
                    </div>
                    <ContextCanvas camera={{ position: CAMERA_POS, fov: FOV }}>
                        <HomeScene />
                        <Starfield fov={FOV} position={[0, 0, -50]} />
                    </ContextCanvas>
                </section>
                {/* Intro about section */}
                <section ref={onAboutRefChange} className={styles['about-section']} id="about">
                    <div ref={homeBgRef} className={styles['home-background']} />
                    <h1>
                        Re-thinking NFT platforms
                        <TextUnderlineSVG width="10vw" z={2} rot={1} tX="-80vw" tY="6vw" />
                    </h1>
                    <div className={styles.inset}>
                        <DotsBackgroundSVG
                            element={aboutRef}
                            radius={3.2}
                            spacing={44}
                            fadeConst={1.23}
                            fadeN={4}
                        />
                        <FloatTextContentContainer
                            heading="A luck-based platform"
                            subheading="Randomised NFTs"
                            content={<LargeArrowSVG color={'black'} width={300} type={1} />}
                        >
                            Instead of bidding for NFTs on CryptoCrate, you open a crate that is
                            guaranteed to give a random NFT. That means no price manipulation.
                            Simple.
                        </FloatTextContentContainer>
                        <FloatTextContentContainer
                            heading="Better for everyone"
                            subheading="Helping creators and collectors"
                            content={
                                <LargeArrowSVG
                                    color={'black'}
                                    width={300}
                                    type={2}
                                    marginTop={-60}
                                    style={{
                                        transform: 'translateY(2rem) translateX(4rem) scale(1.1)',
                                    }}
                                />
                            }
                            rightAlign
                        >
                            CryptoCrate helps collectors and artists - both established and
                            up-and-coming. Our platform makes it easier than ever to distribute,
                            discover, and collect NFTs.
                        </FloatTextContentContainer>
                        <FloatTextContentContainer
                            heading="It's all on Ethereum"
                            subheading="Crates are tokens"
                            content={
                                <LargeArrowSVG
                                    color={'black'}
                                    width={300}
                                    type={3}
                                    marginTop={-110}
                                    style={{
                                        transform: 'translateX(-3rem) translateY(-1rem) scale(1.3)',
                                    }}
                                />
                            }
                        >
                            The crates and the NFTs in them are tokens themselves on the Ethereum
                            blockchain. You can open them, store them, or trade them with other
                            people.
                        </FloatTextContentContainer>
                    </div>
                </section>
                {/* Interactive detailed about section */}
                <AboutScene homeBgRef={homeBgRef} />
                {/* Collectors section */}
                <AboutSceneSection
                    id="collectors"
                    sectionHeader="Designed for collectors"
                    heading1="Better NFT collection"
                    content1="Bidding drives NFT prices up way too high, leaving the average collector out
                        of luck. CryptoCrate evens the playing field."
                    heading2="No cheating, just luck"
                    content2="CryptoCrate distributes its NFTs randomly - you never know what you'll
                        get when you open a crate - it's unpredictable."
                    heading3="They're just tokens"
                    content3="Crates are Ethereum tokens, so you can store, open, trade, or use them
                        in any other CryptoCrate contract functions."
                />
                {/* Creators section */}
                <AboutSceneSection
                    id="creators"
                    sectionHeader="Built for creators"
                    heading1="Make yourself known"
                    content1="When anyone opens a crate, they'll have the same chance of finding your
                        work, for both established and up-and-coming creators."
                    heading2="Get rewarded"
                    content2="Each time your creation is found in a crate, you get a cut of the fees. You
                        also get a portion of the fees whenever you work is traded."
                    heading3="No more hassle"
                    content3="Don't worry about the underlying implementation - we do all that work
                        behind the scenes for you, so you can focus on what's important."
                />
                {/* Outro footer scene */}
                <div style={{ height: '30rem' }} />
                <FooterScene onExternalButtonClick={onExternalButtonClick} />
            </main>
        </>
    );
};

export default Home;
