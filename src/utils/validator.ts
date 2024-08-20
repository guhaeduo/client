// 이메일 유효성 검사를 위한 규칙과 에러 메시지를 포함하는 객체입니다.
const emailValidation = {
  required: '이메일을 입력하세요.',
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: '올바른 이메일 주소를 입력하세요.',
  },
};

// 비밀번호 유효성 검사를 위한 규칙과 에러 메시지를 포함하는 객체입니다.
const passwordValidation = {
  required: '비밀번호를 입력하세요.',
  minLength: {
    value: 8,
    message: '비밀번호는 최소 8글자 이상이어야 합니다.',
  },
  pattern: {
    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/,
    message: '비밀번호는 영문자와 숫자를 포함하여야 합니다.',
  },
};

// 인증번호 유효성 검사를 위한 규칙과 에러 메시지를 포함하는 객체입니다.
const verificationCodeValidation = {
  required: '인증번호를 입력하세요.',
  minLength: {
    value: 6,
    message: '인증번호는 6글자여야 합니다.',
  },
  maxLength: {
    value: 6,
    message: '인증번호는 6글자여야 합니다.',
  },
};

// 소환사 이름과 태그 유효성 검사를 위한 규칙과 에러 메시지를 포함하는 객체입니다.
const summonerNameTagValidation = {
  required: '소환사 이름을 입력해주세요',
  pattern: {
    value: /^[^\s#]+(\s?[^\s#]+)*#[^\s#]+$/,
    message: '소환사 이름 형식을 다시 확인해주세요',
  },
};

// 게시물 비밀번호 유효성 검사를 위한 규칙과 에러 메시지를 포함하는 객체입니다.
const duoPostPasswordValidation = {
  required: '비밀번호는 필수 입력 사항 입니다.',
  minLength: { value: 4, message: '최소 4자 이상 입력해주세요.' },
};

export {
  emailValidation,
  passwordValidation,
  verificationCodeValidation,
  summonerNameTagValidation,
  duoPostPasswordValidation,
};
