import { createContext, useReducer } from 'react';
import { crateRarities } from '@/components/crate/Crate';
import userReducer from './userReducer';
import type { ReactNode } from 'react';
import type { CrateRarity } from '@/components/crate/Crate';

interface UserProviderProps {
    children: ReactNode;
}

type OwnedCrates = Partial<Record<CrateRarity, number>>;
export type Theme = 'light' | 'dark';

export type UserState = { ownedCrates: OwnedCrates; theme: Theme };
export type UserData = Partial<UserState>;
type UserDispatch = (action: UserData) => void;
export type UserContextT = { user: UserState; dispatchUser: UserDispatch };

export const UserContext = createContext<UserContextT | undefined>(undefined);

export default function UserProvider(props: UserProviderProps) {
    const [user, dispatchUser] = useReducer(userReducer, {
        ownedCrates: {},
        theme: 'light',
    });
    const value = { user, dispatchUser };
    // TODO get user owned crates
    if (!Object.keys(user.ownedCrates).length) {
        for (const rarity of crateRarities) {
            user.ownedCrates[rarity] = 0;
        }
    }
    return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
}
