import type { UserState, UserData } from './UserProvider';

export default function userReducer(state: UserState, data: UserData): UserState {
    return { ...state };
}
