import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 라이엇 계정 타입입니다.
export interface RiotAccount {
  country: string;
  name: string;
  tag: string;
}

// 유저 토큰 타입입니다.
interface Token {
  accessToken?: string;
  refreshToken?: string;
  tokenType?: string;
}

// 유저의 상태 입니다.
interface UserState extends Token {
  isLogin: boolean;
  email?: string;
  riotAccountList?: RiotAccount[];
  createdAt?: string;
  loginType?: 'SITE' | 'KAKAO' | 'DISCORD';
  memberId?: number;
}

// 기본 상태입니다.
const initialState: UserState = {
  isLogin: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    /** 유저가 로그인 하였을 때 실행되는 함수로, 유저의 정보를 저장하고 로그인 상태를 업데이트 합니다. */
    login: (state, action: PayloadAction<Partial<UserState>>) => {
      const { ...payload } = action.payload;
      return {
        ...state,
        ...payload,
        isLogin: true,
      };
    },
    /** 유저의 토큰을 업데이트 하는 함수로 토큰을 전달받아 상태를 업데이트 합니다. */
    updateToken: (state, action: PayloadAction<Partial<Token>>) => ({
      ...state,
      ...action.payload,
    }),
    /** 로그아웃 함수이며, 기존의 상태를 초기화 합니다. */
    logout: () => ({ isLogin: false }),
  },
});

export const { login, logout, updateToken } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user;

export default userSlice.reducer;
