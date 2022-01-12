import { Context, useContext } from 'react';
import { ModalContext } from '@/contexts/ModalProvider';
import { UserContext } from '@/contexts/UserProvider';
import type { ModalContextT } from '@/contexts/ModalProvider';
import type { UserContextT } from '@/contexts/UserProvider';

function useContextBase(baseContext: Context<any>) {
    const context = useContext(baseContext);
    if (context === undefined) {
        throw new Error('useContext must be used within the appropriate provider');
    }
    return context;
}

// Must be used within a ModalProvider
export function useModal(): ModalContextT {
    return useContextBase(ModalContext);
}

// Must be used within a UserProvider
export function useUser(): UserContextT {
    return useContextBase(UserContext);
}
