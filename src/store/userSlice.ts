import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RiotAccount {
  country: string;
  name: string;
  tag: string;
}

interface Token {
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
}

interface UserState extends Token {
  isLogin: boolean;
  email?: string;
  riotAccountList?: RiotAccount[];
  createdAt?: string;
  loginType?: 'SITE' | 'KAKAO' | 'DISCORD';
  memberId?: number;
}

const initialState: UserState = {
  isLogin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Partial<UserState>>) => {
      const { ...payload } = action.payload;
      return {
        ...state,
        ...payload,
        isLogin: true,
      };
    },
    updateToken: (state, action: PayloadAction<Partial<Token>>) => ({
      ...state,
      ...action.payload,
    }),
    logout: () => ({ isLogin: false }),
  },
});

export const { login, logout, updateToken } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user;

export default userSlice.reducer;
