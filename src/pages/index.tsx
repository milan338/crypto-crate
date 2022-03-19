// TODO add a loading screen for the app but make it so that google bots don't look for that page
// TODO useProgress from react drei for the loading suspense fallback

// https://github.com/framer/motion
// * https://www.framer.com/examples/social-app/
// * https://www.framer.com/examples/perspective-tilt/

// TODO automated ? lighthouse audits

// TODO aria and semantic html names
// TODO server side rendering or something

import styles from '@/styles/components/pages/Index.module.scss';
import Head from 'next/head';
import Image from 'next/image';
import type { NextPage } from 'next';

import CrateScene from '@/components/scenes/CrateScene';

// import ModalCanvas from '@/components/modal/ModalCanvas';
import ContextCanvas from '@/components/canvas/ContextCanvas';

import Starfield from '@/components/starfield/Starfield';

import { Euler } from 'three';

import Navbar from '@/components/nav/Navbar';
import { Suspense } from 'react';

import ExternalButton from '@/components/nav/ExternalButton';

// TODO footer with credits for the google fonts and material icons etc...

const FOV = 45;

// TODO dropped frames during scrolling, amplified by postprocessing

// TODO multiple different layouts for index based on screen width

// TODO add aria text and other accessibility things

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Suspense fallback={null}>
                <Navbar />
            </Suspense>
            <main id="main-content">
                <section id="home" className={styles.home}>
                    {/* //TODO have the better thing cycle between better / fairer / ... */}
                    <h1>CryptoCrate</h1>
                    <p>
                        The better NFT <br /> platform
                    </p>
                    <ExternalButton id="external-button" className={styles.button} showArrow>
                        Join the Crowdfund
                    </ExternalButton>
                    <ContextCanvas mode="concurrent" camera={{ position: [0, 0, 0], fov: FOV }}>
                        <CrateScene
                            center={[0, 0, -15]}
                            rotation={new Euler(0, -0.5, 0)}
                            responsiveX={3.5}
                            rarity="epic"
                        />
                        <Starfield fov={FOV} position={[0, 0, -50]} />
                    </ContextCanvas>
                </section>
                <section id="about">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pretium
                        augue vitae est tempor, sed pretium quam posuere. Phasellus ac tristique
                        mauris, nec vulputate tellus. Praesent feugiat pulvinar rutrum. Nullam arcu
                        ipsum, condimentum quis ipsum ut, commodo tincidunt eros. Morbi tempus at
                        nisi at vehicula. Aliquam hendrerit sed ex nec pulvinar. Morbi consequat
                        ultricies commodo. Fusce ut hendrerit orci. Orci varius natoque penatibus et
                        magnis dis parturient montes, nascetur ridiculus mus. Nam quam odio, dictum
                        ut hendrerit vitae, fringilla et purus. Cras fringilla turpis et laoreet
                        venenatis. Suspendisse eleifend elit eget massa molestie, eget tincidunt
                        nisl ornare. Cras vehicula dictum arcu, eu pretium lacus finibus eu. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor magna id
                        nibh consequat, at lobortis leo laoreet. Ut sodales elementum nibh a
                        lacinia. Maecenas vel odio imperdiet, pharetra lacus sed, hendrerit libero.
                        Etiam nunc odio, varius aliquet dolor eu, mattis volutpat nibh. Nunc sit
                        amet arcu vel purus egestas tincidunt. Etiam molestie ornare elit. Aliquam
                        cursus erat justo, in suscipit nunc pharetra et. Curabitur scelerisque
                        tristique odio, ullamcorper tristique urna malesuada eget. Sed sit amet
                        egestas velit. Donec tempus ligula at rhoncus scelerisque. Sed consectetur
                        mi at malesuada iaculis. Praesent sed viverra odio. Sed vehicula semper
                        ipsum, in sodales mi eleifend eget. Pellentesque iaculis risus sed leo
                        volutpat ullamcorper. Morbi fermentum arcu a est sollicitudin faucibus vitae
                        eget est. Phasellus venenatis ac diam ut lacinia. Sed pharetra ac odio quis
                        dignissim. Cras pharetra quis massa non lacinia. Cras porttitor quam sed sem
                        feugiat, at lobortis ligula egestas. Praesent vestibulum auctor lacus non
                        luctus. Donec faucibus odio purus, id mattis metus ornare sit amet. Integer
                        bibendum fermentum velit, ac gravida lacus condimentum sed. Sed sagittis
                        magna vel nisi semper pellentesque. Sed aliquet, metus eget dignissim
                        imperdiet, eros purus hendrerit lacus, at molestie metus mi eget mauris.
                        Vivamus non libero risus. Mauris dapibus eros est, eu suscipit risus
                        dignissim eu. Etiam tincidunt facilisis massa. Vivamus sed vulputate sapien.
                        Maecenas pretium tristique risus eget rhoncus. Etiam in ullamcorper enim.
                        Vivamus efficitur ullamcorper dui eget posuere. Sed mi urna, condimentum non
                        gravida nec, tristique in orci. Sed tristique accumsan enim, quis tempor
                        odio suscipit sit amet. Aliquam molestie massa eget lorem iaculis auctor.
                        Nam sed erat at mi commodo bibendum. Quisque quis est at massa consectetur
                        faucibus. Aliquam metus ante, pretium et scelerisque feugiat, accumsan nec
                        ex. Cras quis nulla non nisl mattis sodales sed sit amet mauris. Vestibulum
                        ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                        Vivamus tempor massa ut ultrices lacinia. Aliquam arcu nisl, porta ac varius
                        euismod, dapibus eget augue. Suspendisse ut ipsum elementum, malesuada
                        tortor eget, rhoncus enim. Suspendisse porta ornare gravida. Class aptent
                        taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                        himenaeos. Curabitur hendrerit nisl ac ipsum vulputate eleifend Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit. Aenean pretium augue vitae est
                        tempor, sed pretium quam posuere. Phasellus ac tristique mauris, nec
                        vulputate tellus. Praesent feugiat pulvinar rutrum. Nullam arcu ipsum,
                        condimentum quis ipsum ut, commodo tincidunt eros. Morbi tempus at nisi at
                        vehicula. Aliquam hendrerit sed ex nec pulvinar. Morbi consequat ultricies
                        commodo. Fusce ut hendrerit orci. Orci varius natoque penatibus et magnis
                        dis parturient montes, nascetur ridiculus mus. Nam quam odio, dictum ut
                        hendrerit vitae, fringilla et purus. Cras fringilla turpis et laoreet
                        venenatis. Suspendisse eleifend elit eget massa molestie, eget tincidunt
                        nisl ornare. Cras vehicula dictum arcu, eu pretium lacus finibus eu. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor magna id
                        nibh consequat, at lobortis leo laoreet. Ut sodales elementum nibh a
                        lacinia. Maecenas vel odio imperdiet, pharetra lacus sed, hendrerit libero.
                        Etiam nunc odio, varius aliquet dolor eu, mattis volutpat nibh. Nunc sit
                        amet arcu vel purus egestas tincidunt. Etiam molestie ornare elit. Aliquam
                        cursus erat justo, in suscipit nunc pharetra et. Curabitur scelerisque
                        tristique odio, ullamcorper tristique urna malesuada eget. Sed sit amet
                        egestas velit. Donec tempus ligula at rhoncus scelerisque. Sed consectetur
                        mi at malesuada iaculis. Praesent sed viverra odio. Sed vehicula semper
                        ipsum, in sodales mi eleifend eget. Pellentesque iaculis risus sed leo
                        volutpat ullamcorper. Morbi fermentum arcu a est sollicitudin faucibus vitae
                        eget est. Phasellus venenatis ac diam ut lacinia. Sed pharetra ac odio quis
                        dignissim. Cras pharetra quis massa non lacinia. Cras porttitor quam sed sem
                        feugiat, at lobortis ligula egestas. Praesent vestibulum auctor lacus non
                        luctus. Donec faucibus odio purus, id mattis metus ornare sit amet. Integer
                        bibendum fermentum velit, ac gravida lacus condimentum sed. Sed sagittis
                        magna vel nisi semper pellentesque. Sed aliquet, metus eget dignissim
                        imperdiet, eros purus hendrerit lacus, at molestie metus mi eget mauris.
                        Vivamus non libero risus. Mauris dapibus eros est, eu suscipit risus
                        dignissim eu. Etiam tincidunt facilisis massa. Vivamus sed vulputate sapien.
                        Maecenas pretium tristique risus eget rhoncus. Etiam in ullamcorper enim.
                        Vivamus efficitur ullamcorper dui eget posuere. Sed mi urna, condimentum non
                        gravida nec, tristique in orci. Sed tristique accumsan enim, quis tempor
                        odio suscipit sit amet. Aliquam molestie massa eget lorem iaculis auctor.
                        Nam sed erat at mi commodo bibendum. Quisque quis est at massa consectetur
                        faucibus. Aliquam metus ante, pretium et scelerisque feugiat, accumsan nec
                        ex. Cras quis nulla non nisl mattis sodales sed sit amet mauris. Vestibulum
                        ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                        Vivamus tempor massa ut ultrices lacinia. Aliquam arcu nisl, porta ac varius
                        euismod, dapibus eget augue. Suspendisse ut ipsum elementum, malesuada
                        tortor eget, rhoncus enim. Suspendisse porta ornare gravida. Class aptent
                        taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                        himenaeos. Curabitur hendrerit nisl ac ipsum vulputate eleifend Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit. Aenean pretium augue vitae est
                        tempor, sed pretium quam posuere. Phasellus ac tristique mauris, nec
                        vulputate tellus. Praesent feugiat pulvinar rutrum. Nullam arcu ipsum,
                        condimentum quis ipsum ut, commodo tincidunt eros. Morbi tempus at nisi at
                        vehicula. Aliquam hendrerit sed ex nec pulvinar. Morbi consequat ultricies
                        commodo. Fusce ut hendrerit orci. Orci varius natoque penatibus et magnis
                        dis parturient montes, nascetur ridiculus mus. Nam quam odio, dictum ut
                        hendrerit vitae, fringilla et purus. Cras fringilla turpis et laoreet
                        venenatis. Suspendisse eleifend elit eget massa molestie, eget tincidunt
                        nisl ornare. Cras vehicula dictum arcu, eu pretium lacus finibus eu. Lorem
                        ipsum dolor sit amet,
                    </p>
                </section>
                <section id="buyers">
                    <p>
                        consectetur adipiscing elit. Curabitur tempor magna id nibh consequat, at
                        lobortis leo laoreet. Ut sodales elementum nibh a lacinia. Maecenas vel odio
                        imperdiet, pharetra lacus sed, hendrerit libero. Etiam nunc odio, varius
                        aliquet dolor eu, mattis volutpat nibh. Nunc sit amet arcu vel purus egestas
                        tincidunt. Etiam molestie ornare elit. Aliquam cursus erat justo, in
                        suscipit nunc pharetra et. Curabitur scelerisque tristique odio, ullamcorper
                        tristique urna malesuada eget. Sed sit amet egestas velit. Donec tempus
                        ligula at rhoncus scelerisque. Sed consectetur mi at malesuada iaculis.
                        Praesent sed viverra odio. Sed vehicula semper ipsum, in sodales mi eleifend
                        eget. Pellentesque iaculis risus sed leo volutpat ullamcorper. Morbi
                        fermentum arcu a est sollicitudin faucibus vitae eget est. Phasellus
                        venenatis ac diam ut lacinia. Sed pharetra ac odio quis dignissim. Cras
                        pharetra quis massa non lacinia. Cras porttitor quam sed sem feugiat, at
                        lobortis ligula egestas. Praesent vestibulum auctor lacus non luctus. Donec
                        faucibus odio purus, id mattis metus ornare sit amet. Integer bibendum
                        fermentum velit, ac gravida lacus condimentum sed. Sed sagittis magna vel
                        nisi semper pellentesque. Sed aliquet, metus eget dignissim imperdiet, eros
                        purus hendrerit lacus, at molestie metus mi eget mauris. Vivamus non libero
                        risus. Mauris dapibus eros est, eu suscipit risus dignissim eu. Etiam
                        tincidunt facilisis massa. Vivamus sed vulputate sapien. Maecenas pretium
                        tristique risus eget rhoncus. Etiam in ullamcorper enim. Vivamus efficitur
                        ullamcorper dui eget posuere. Sed mi urna, condimentum non gravida nec,
                        tristique in orci. Sed tristique accumsan enim, quis tempor odio suscipit
                        sit amet. Aliquam molestie massa eget lorem iaculis auctor. Nam sed erat at
                        mi commodo bibendum. Quisque quis est at massa consectetur faucibus. Aliquam
                        metus ante, pretium et scelerisque feugiat, accumsan nec ex. Cras quis nulla
                        non nisl mattis sodales sed sit amet mauris. Vestibulum ante ipsum primis in
                        faucibus orci luctus et ultrices posuere cubilia curae; Vivamus tempor massa
                        ut ultrices lacinia. Aliquam arcu nisl, porta ac varius euismod, dapibus
                        eget augue. Suspendisse ut ipsum elementum, malesuada tortor eget, rhoncus
                        enim. Suspendisse porta ornare gravida. Class aptent taciti sociosqu ad
                        litora torquent per conubia nostra, per inceptos himenaeos. Curabitur
                        hendrerit nisl ac ipsum vulputate eleifend Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Aenean pretium augue vitae est tempor, sed
                        pretium quam posuere. Phasellus ac tristique mauris, nec vulputate tellus.
                        Praesent feugiat pulvinar rutrum. Nullam arcu ipsum, condimentum quis ipsum
                        ut, commodo tincidunt eros. Morbi tempus at nisi at vehicula. Aliquam
                        hendrerit sed ex nec pulvinar. Morbi consequat ultricies commodo. Fusce ut
                        hendrerit orci. Orci varius natoque penatibus et magnis dis parturient
                        montes, nascetur ridiculus mus. Nam quam odio, dictum ut hendrerit vitae,
                        fringilla et purus. Cras fringilla turpis et laoreet venenatis. Suspendisse
                        eleifend elit eget massa molestie, eget tincidunt nisl ornare. Cras vehicula
                        dictum arcu, eu pretium lacus finibus eu. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Curabitur tempor magna id nibh consequat, at
                        lobortis leo laoreet. Ut sodales elementum nibh a lacinia. Maecenas vel odio
                        imperdiet, pharetra lacus sed, hendrerit libero. Etiam nunc odio, varius
                        aliquet dolor eu, mattis volutpat nibh. Nunc sit amet arcu vel purus egestas
                        tincidunt. Etiam molestie ornare elit. Aliquam cursus erat justo, in
                        suscipit nunc pharetra et. Curabitur scelerisque tristique odio, ullamcorper
                        tristique urna malesuada eget. Sed sit amet egestas velit. Donec tempus
                        ligula at rhoncus scelerisque. Sed consectetur mi at malesuada iaculis.
                        Praesent sed viverra odio. Sed vehicula semper ipsum, in sodales mi eleifend
                        eget. Pellentesque iaculis risus sed leo volutpat ullamcorper. Morbi
                        fermentum arcu a est sollicitudin faucibus vitae eget est. Phasellus
                        venenatis ac diam ut lacinia. Sed pharetra ac odio quis dignissim. Cras
                        pharetra quis massa non lacinia. Cras porttitor quam sed sem feugiat, at
                        lobortis ligula egestas. Praesent vestibulum auctor lacus non luctus. Donec
                        faucibus odio purus, id mattis metus ornare sit amet. Integer bibendum
                        fermentum velit, ac gravida lacus condimentum sed. Sed sagittis magna vel
                        nisi semper pellentesque. Sed aliquet, metus eget dignissim imperdiet, eros
                        purus hendrerit lacus, at molestie metus mi eget mauris. Vivamus non libero
                        risus. Mauris dapibus eros est, eu suscipit risus dignissim eu. Etiam
                        tincidunt facilisis massa. Vivamus sed vulputate sapien. Maecenas pretium
                        tristique risus eget rhoncus. Etiam in ullamcorper enim. Vivamus efficitur
                        ullamcorper dui eget posuere. Sed mi urna, condimentum non gravida nec,
                        tristique in orci. Sed tristique accumsan enim, quis tempor odio suscipit
                        sit amet. Aliquam molestie massa eget lorem iaculis auctor. Nam sed erat at
                        mi commodo bibendum. Quisque quis est at massa consectetur faucibus. Aliquam
                        metus ante, pretium et scelerisque feugiat, accumsan nec ex. Cras quis nulla
                        non nisl mattis sodales sed sit amet mauris. Vestibulum ante ipsum primis in
                        faucibus orci luctus et ultrices posuere cubilia curae; Vivamus tempor massa
                        ut ultrices lacinia. Aliquam arcu nisl, porta ac varius euismod, dapibus
                        eget augue. Suspendisse ut ipsum elementum, malesuada tortor eget, rhoncus
                        enim. Suspendisse porta ornare gravida. Class aptent taciti sociosqu ad
                        litora torquent per conubia nostra, per inceptos himenaeos. Curabitur
                        hendrerit nisl ac ipsum vulputate eleifend Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Aenean pretium augue vitae est tempor, sed
                        pretium quam posuere. Phasellus ac tristique mauris, nec vulputate tellus.
                        Praesent feugiat pulvinar rutrum. Nullam arcu ipsum, condimentum quis ipsum
                        ut, commodo tincidunt eros. Morbi tempus at nisi at vehicula. Aliquam
                        hendrerit sed ex nec pulvinar. Morbi consequat ultricies commodo. Fusce ut
                        hendrerit orci. Orci varius natoque penatibus et magnis dis parturient
                        montes, nascetur ridiculus mus. Nam quam odio, dictum ut hendrerit vitae,
                        fringilla et purus. Cras fringilla turpis et laoreet venenatis. Suspendisse
                        eleifend elit eget massa molestie, eget tincidunt nisl ornare. Cras vehicula
                        dictum arcu, eu pretium lacus finibus eu. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Curabitur tempor magna id nibh consequat, at
                        lobortis leo laoreet. Ut sodales elementum nibh a lacinia. Maecenas vel odio
                        imperdiet, pharetra lacus sed, hendrerit libero. Etiam nunc odio, varius
                        aliquet dolor eu, mattis volutpat nibh. Nunc sit amet arcu vel purus egestas
                        tincidunt. Etiam molestie ornare elit. Aliquam cursus erat justo, in
                        suscipit nunc pharetra et. Curabitur scelerisque tristique odio, ullamcorper
                        tristique urna malesuada eget. Sed sit amet egestas velit. Donec tempus
                        ligula at rhoncus scelerisque. Sed consectetur mi at malesuada iaculis.
                        Praesent sed viverra odio. Sed vehicula semper ipsum, in sodales mi eleifend
                        eget. Pellentesque iaculis risus sed leo volutpat ullamcorper. Morbi
                        fermentum arcu a est sollicitudin faucibus vitae eget est. Phasellus
                        venenatis ac diam ut lacinia. Sed pharetra ac odio quis dignissim. Cras
                        pharetra quis massa non lacinia. Cras porttitor quam sed sem feugiat, at
                        lobortis ligula egestas. Praesent vestibulum auctor lacus non luctus. Donec
                        faucibus odio purus, id mattis metus ornare sit amet. Integer bibendum
                        fermentum velit, ac gravida lacus condimentum sed. Sed sagittis magna vel
                        nisi semper pellentesque. Sed aliquet, metus eget dignissim imperdiet, eros
                        purus hendrerit lacus, at molestie metus mi eget mauris. Vivamus non libero
                        risus. Mauris dapibus eros est, eu suscipit risus dignissim eu. Etiam
                        tincidunt facilisis massa. Vivamus sed vulputate sapien. Maecenas pretium
                        tristique risus eget rhoncus. Etiam in ullamcorper enim. Vivamus efficitur
                        ullamcorper dui eget posuere. Sed mi urna, condimentum non gravida nec,
                        tristique in orci. Sed tristique accumsan enim, quis tempor odio suscipit
                        sit amet. Aliquam molestie massa eget lorem iaculis auctor. Nam sed erat at
                        mi commodo bibendum. Quisque quis est at massa consectetur faucibus. Aliquam
                        metus ante, pretium et scelerisque feugiat, accumsan nec ex. Cras quis nulla
                        non nisl mattis sodales sed sit amet mauris. Vestibulum ante ipsum primis in
                        faucibus orci luctus et ultrices posuere cubilia curae; Vivamus tempor massa
                        ut ultrices lacinia.
                    </p>
                </section>
                <section id="sellers">
                    <p>
                        Aliquam arcu nisl, porta ac varius euismod, dapibus eget augue. Suspendisse
                        ut ipsum elementum, malesuada tortor eget, rhoncus enim. Suspendisse porta
                        ornare gravida. Class aptent taciti sociosqu ad litora torquent per conubia
                        nostra, per inceptos himenaeos. Curabitur hendrerit nisl ac ipsum vulputate
                        eleifend Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                        pretium augue vitae est tempor, sed pretium quam posuere. Phasellus ac
                        tristique mauris, nec vulputate tellus. Praesent feugiat pulvinar rutrum.
                        Nullam arcu ipsum, condimentum quis ipsum ut, commodo tincidunt eros. Morbi
                        tempus at nisi at vehicula. Aliquam hendrerit sed ex nec pulvinar. Morbi
                        consequat ultricies commodo. Fusce ut hendrerit orci. Orci varius natoque
                        penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam quam
                        odio, dictum ut hendrerit vitae, fringilla et purus. Cras fringilla turpis
                        et laoreet venenatis. Suspendisse eleifend elit eget massa molestie, eget
                        tincidunt nisl ornare. Cras vehicula dictum arcu, eu pretium lacus finibus
                        eu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
                        tempor magna id nibh consequat, at lobortis leo laoreet. Ut sodales
                        elementum nibh a lacinia. Maecenas vel odio imperdiet, pharetra lacus sed,
                        hendrerit libero. Etiam nunc odio, varius aliquet dolor eu, mattis volutpat
                        nibh. Nunc sit amet arcu vel purus egestas tincidunt. Etiam molestie ornare
                        elit. Aliquam cursus erat justo, in suscipit nunc pharetra et. Curabitur
                        scelerisque tristique odio, ullamcorper tristique urna malesuada eget. Sed
                        sit amet egestas velit. Donec tempus ligula at rhoncus scelerisque. Sed
                        consectetur mi at malesuada iaculis. Praesent sed viverra odio. Sed vehicula
                        semper ipsum, in sodales mi eleifend eget. Pellentesque iaculis risus sed
                        leo volutpat ullamcorper. Morbi fermentum arcu a est sollicitudin faucibus
                        vitae eget est. Phasellus venenatis ac diam ut lacinia. Sed pharetra ac odio
                        quis dignissim. Cras pharetra quis massa non lacinia. Cras porttitor quam
                        sed sem feugiat, at lobortis ligula egestas. Praesent vestibulum auctor
                        lacus non luctus. Donec faucibus odio purus, id mattis metus ornare sit
                        amet. Integer bibendum fermentum velit, ac gravida lacus condimentum sed.
                        Sed sagittis magna vel nisi semper pellentesque. Sed aliquet, metus eget
                        dignissim imperdiet, eros purus hendrerit lacus, at molestie metus mi eget
                        mauris. Vivamus non libero risus. Mauris dapibus eros est, eu suscipit risus
                        dignissim eu. Etiam tincidunt facilisis massa. Vivamus sed vulputate sapien.
                        Maecenas pretium tristique risus eget rhoncus. Etiam in ullamcorper enim.
                        Vivamus efficitur ullamcorper dui eget posuere. Sed mi urna, condimentum non
                        gravida nec, tristique in orci. Sed tristique accumsan enim, quis tempor
                        odio suscipit sit amet. Aliquam molestie massa eget lorem iaculis auctor.
                        Nam sed erat at mi commodo bibendum. Quisque quis est at massa consectetur
                        faucibus. Aliquam metus ante, pretium et scelerisque feugiat, accumsan nec
                        ex. Cras quis nulla non nisl mattis sodales sed sit amet mauris. Vestibulum
                        ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                        Vivamus tempor massa ut ultrices lacinia. Aliquam arcu nisl, porta ac varius
                        euismod, dapibus eget augue. Suspendisse ut ipsum elementum, malesuada
                        tortor eget, rhoncus enim. Suspendisse porta ornare gravida. Class aptent
                        taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                        himenaeos. Curabitur hendrerit nisl ac ipsum vulputate eleifend Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit. Aenean pretium augue vitae est
                        tempor, sed pretium quam posuere. Phasellus ac tristique mauris, nec
                        vulputate tellus. Praesent feugiat pulvinar rutrum. Nullam arcu ipsum,
                        condimentum quis ipsum ut, commodo tincidunt eros. Morbi tempus at nisi at
                        vehicula. Aliquam hendrerit sed ex nec pulvinar. Morbi consequat ultricies
                        commodo. Fusce ut hendrerit orci. Orci varius natoque penatibus et magnis
                        dis parturient montes, nascetur ridiculus mus. Nam quam odio, dictum ut
                        hendrerit vitae, fringilla et purus. Cras fringilla turpis et laoreet
                        venenatis. Suspendisse eleifend elit eget massa molestie, eget tincidunt
                        nisl ornare. Cras vehicula dictum arcu, eu pretium lacus finibus eu. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor magna id
                        nibh consequat, at lobortis leo laoreet. Ut sodales elementum nibh a
                        lacinia. Maecenas vel odio imperdiet, pharetra lacus sed, hendrerit libero.
                        Etiam nunc odio, varius aliquet dolor eu, mattis volutpat nibh. Nunc sit
                        amet arcu vel purus egestas tincidunt. Etiam molestie ornare elit. Aliquam
                        cursus erat justo, in suscipit nunc pharetra et. Curabitur scelerisque
                        tristique odio, ullamcorper tristique urna malesuada eget. Sed sit amet
                        egestas velit. Donec tempus ligula at rhoncus scelerisque. Sed consectetur
                        mi at malesuada iaculis. Praesent sed viverra odio. Sed vehicula semper
                        ipsum, in sodales mi eleifend eget. Pellentesque iaculis risus sed leo
                        volutpat ullamcorper. Morbi fermentum arcu a est sollicitudin faucibus vitae
                        eget est. Phasellus venenatis ac diam ut lacinia. Sed pharetra ac odio quis
                        dignissim. Cras pharetra quis massa non lacinia. Cras porttitor quam sed sem
                        feugiat, at lobortis ligula egestas. Praesent vestibulum auctor lacus non
                        luctus. Donec faucibus odio purus, id mattis metus ornare sit amet. Integer
                        bibendum fermentum velit, ac gravida lacus condimentum sed. Sed sagittis
                        magna vel nisi semper pellentesque. Sed aliquet, metus eget dignissim
                        imperdiet, eros purus hendrerit lacus, at molestie metus mi eget mauris.
                        Vivamus non libero risus. Mauris dapibus eros est, eu suscipit risus
                        dignissim eu. Etiam tincidunt facilisis massa. Vivamus sed vulputate sapien.
                        Maecenas pretium tristique risus eget rhoncus. Etiam in ullamcorper enim.
                        Vivamus efficitur ullamcorper dui eget posuere. Sed mi urna, condimentum non
                        gravida nec, tristique in orci. Sed tristique accumsan enim, quis tempor
                        odio suscipit sit amet. Aliquam molestie massa eget lorem iaculis auctor.
                        Nam sed erat at mi commodo bibendum. Quisque quis est at massa consectetur
                        faucibus. Aliquam metus ante, pretium et scelerisque feugiat, accumsan nec
                        ex. Cras quis nulla non nisl mattis sodales sed sit amet mauris. Vestibulum
                        ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                        Vivamus tempor massa ut ultrices lacinia. Aliquam arcu nisl, porta ac varius
                        euismod, dapibus eget augue. Suspendisse ut ipsum elementum, malesuada
                        tortor eget, rhoncus enim. Suspendisse porta ornare gravida. Class aptent
                        taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                        himenaeos. Curabitur hendrerit nisl ac ipsum vulputate eleifend Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit. Aenean pretium augue vitae est
                        tempor, sed pretium quam posuere. Phasellus ac tristique mauris, nec
                        vulputate tellus. Praesent feugiat pulvinar rutrum. Nullam arcu ipsum,
                        condimentum quis ipsum ut, commodo tincidunt eros. Morbi tempus at nisi at
                        vehicula. Aliquam hendrerit sed ex nec pulvinar. Morbi consequat ultricies
                        commodo. Fusce ut hendrerit orci. Orci varius natoque penatibus et magnis
                        dis parturient montes, nascetur ridiculus mus. Nam quam odio, dictum ut
                        hendrerit vitae, fringilla et purus. Cras fringilla turpis et laoreet
                        venenatis. Suspendisse eleifend elit eget massa molestie, eget tincidunt
                        nisl ornare. Cras vehicula dictum arcu, eu pretium lacus finibus eu. Lorem
                        ipsum dolor sit amet, consectetur adipiscing elit. Curabitur tempor magna id
                        nibh consequat, at lobortis leo laoreet. Ut sodales elementum nibh a
                        lacinia. Maecenas vel odio imperdiet, pharetra lacus sed, hendrerit libero.
                        Etiam nunc odio, varius aliquet dolor eu, mattis volutpat nibh. Nunc sit
                        amet arcu vel purus egestas tincidunt. Etiam molestie ornare elit. Aliquam
                        cursus erat justo, in suscipit nunc pharetra et. Curabitur scelerisque
                        tristique odio, ullamcorper tristique urna malesuada eget. Sed sit amet
                        egestas velit. Donec tempus ligula at rhoncus scelerisque. Sed consectetur
                        mi at malesuada iaculis. Praesent sed viverra odio. Sed vehicula semper
                        ipsum, in sodales mi eleifend eget. Pellentesque iaculis risus sed leo
                        volutpat ullamcorper. Morbi fermentum arcu a est sollicitudin faucibus vitae
                        eget est. Phasellus venenatis ac diam ut lacinia. Sed pharetra ac odio quis
                        dignissim. Cras pharetra quis massa non lacinia. Cras porttitor quam sed sem
                        feugiat, at lobortis ligula egestas. Praesent vestibulum auctor lacus non
                        luctus. Donec faucibus odio purus, id mattis metus ornare sit amet. Integer
                        bibendum fermentum velit, ac gravida lacus condimentum sed. Sed sagittis
                        magna vel nisi semper pellentesque. Sed aliquet, metus eget dignissim
                        imperdiet, eros purus hendrerit lacus, at molestie metus mi eget mauris.
                        Vivamus non libero risus. Mauris dapibus eros est, eu suscipit risus
                        dignissim eu. Etiam tincidunt facilisis massa. Vivamus sed vulputate sapien.
                        Maecenas pretium tristique risus eget rhoncus. Etiam in ullamcorper enim.
                        Vivamus efficitur ullamcorper dui eget posuere. Sed mi urna, condimentum non
                        gravida nec, tristique in orci. Sed tristique accumsan enim, quis tempor
                        odio suscipit sit amet. Aliquam molestie massa eget lorem iaculis auctor.
                        Nam sed erat at mi commodo bibendum. Quisque quis est at massa consectetur
                        faucibus. Aliquam metus ante, pretium et scelerisque feugiat, accumsan nec
                        ex. Cras quis nulla non nisl mattis sodales sed sit amet mauris. Vestibulum
                        ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                        Vivamus tempor massa ut ultrices lacinia. Aliquam arcu nisl, porta ac varius
                        euismod, dapibus eget augue. Suspendisse ut ipsum elementum, malesuada
                        tortor eget, rhoncus enim. Suspendisse porta ornare gravida. Class aptent
                        taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                        himenaeos. Curabitur hendrerit nisl ac ipsum vulputate eleifend
                    </p>
                </section>
            </main>

            {/* <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
                        <Image
                            src="/vercel.svg"
                            alt="Vercel Logo"
                            width={72}
                            height={16}
                        />
                    </span>
                </a>
            </footer> */}
            {/* <button
                type="button"
                onClick={() =>
                    (document.documentElement.dataset.theme = 'auto')
                }
            >
                Auto
            </button>
            <button
                type="button"
                onClick={() =>
                    (document.documentElement.dataset.theme = 'dark')
                }
            >
                Dark
            </button>
            <button
                type="button"
                onClick={() =>
                    (document.documentElement.dataset.theme = 'light')
                }
            >
                Light
            </button> */}
        </>
    );
};

export default Home;