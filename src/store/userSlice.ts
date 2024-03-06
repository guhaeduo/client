import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RiotAccount {
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
      const { ...payload } = action.payload;

      return {
        ...state,
        ...payload,
        isLogin: true,
      };
    },
    updateToken: (state, action: PayloadAction<Partial<Token>>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login, logout, updateToken } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user;

export default userSlice.reducer;
