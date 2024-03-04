import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLogin: boolean;
  email?: string;
  riotAccount?: { country: string; name: string; tag: string }[];
  createdAt?: string;
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
        country: account.country,
        name: account.name,
        tag: account.tag,
      }));
      return {
        ...state,
        ...payload,
        riotAccount: serializedRiotAccount,
        isLogin: true,
      };
    },
    logout: (state) => {
      state.isLogin = false;
      state.email = undefined;
      state.riotAccount = undefined;
      state.createdAt = undefined;
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user;

export default userSlice.reducer;
