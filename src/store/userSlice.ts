import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RiotAccount {
  country: string;
  name: string;
  tag: string;
}

interface UserState {
  isLogin: boolean;
  email?: string;
  riotAccount?: RiotAccount[];
  createdAt?: string;
  loginType?: 'site' | 'kakao' | 'discord';
}

const initialState: UserState = {
  isLogin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Partial<UserState>>) => {
      const { riotAccount, ...payload } = action.payload;
      const serializedRiotAccount = riotAccount?.map((account) => ({
        ...account,
      }));
      return {
        ...state,
        ...payload,
        riotAccount: serializedRiotAccount,
        isLogin: true,
      };
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user;

export default userSlice.reducer;
