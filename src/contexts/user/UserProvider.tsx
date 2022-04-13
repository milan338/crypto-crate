import { createContext, useReducer } from 'react';
import { crateRarities } from '@/components/crate/Crate';
import userReducer from './userReducer';
import type { ReactNode } from 'react';
import type { CrateRarity } from '@/components/crate/Crate';

interface UserProviderProps {
    children: ReactNode;
}

// TODO store user preferences here i.e. language, ...

export type UserData = {
    action: string;
};
export type UserState = {
    ownedCrates: Partial<Record<CrateRarity, number>>;
};
type UserDispatch = (action: UserData) => void;
export type UserContextT = { user: UserState; dispatchUser: UserDispatch };

export const UserContext = createContext<UserContextT | undefined>(undefined);

export default function UserProvider(props: UserProviderProps) {
    const [user, dispatchUser] = useReducer(userReducer, {
        ownedCrates: {},
    });
    const value = { user, dispatchUser };
    // Initially set all owned crates to 0
    // TODO async fetch user crates
    if (!Object.keys(user.ownedCrates).length) {
        for (const rarity of crateRarities) {
            // TODO change back to 0
            user.ownedCrates[rarity] = 1;
        }
    }
    return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
}
