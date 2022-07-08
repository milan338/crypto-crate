import '@/styles/main.scss';
import { Suspense } from 'react';
import lazyImport from '@/util/lazy_import';
import ModalProvider from '@/contexts/modal/ModalProvider';
import UserProvider from '@/contexts/user/UserProvider';
import type { AppProps } from 'next/app';

const Modal = lazyImport(() => import('@/components/modal/Modal'));
const ThemeLoader = lazyImport(() => import('@/components/theme/ThemeLoader'));

export default function App(props: AppProps) {
    const { Component, pageProps } = props;
    return (
        <UserProvider>
            <ModalProvider>
                <Suspense fallback={null}>
                    <Modal />
                </Suspense>
                <Suspense fallback={null}>
                    <ThemeLoader />
                </Suspense>
                <Component {...pageProps} />
            </ModalProvider>
        </UserProvider>
    );
}
