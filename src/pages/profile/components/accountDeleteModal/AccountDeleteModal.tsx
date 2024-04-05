import classNames from 'classnames/bind';
import CheckBox from 'components/common/checkBox/CheckBox';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from 'store/userSlice';
import instance from 'service/instance';
import Toast from 'utils/toast';
import MESSAGE from 'constants/message';
import { UNKNOWN_NET_ERROR_MESSAGE } from 'constants/api';
import isCustomAxiosError from 'service/isCustomAxiosError';
import styles from './accountDeleteModal.module.scss';

const cn = classNames.bind(styles);

type Props = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AccountDeleteModal({ setIsModalOpen }: Props) {
  const [isAccountDeleteCheck, setIsAccountDeleteCheck] = useState(false);
  const dispatch = useDispatch();
  const accountDelete = async () => {
    if (!isAccountDeleteCheck) return;
    setIsModalOpen(false);
    try {
      await instance.delete('/api/member/delete');
      dispatch(logout());
      Toast.success(MESSAGE.ACCOUNT_DELETE_SUCCESS);
    } catch (err) {
      if (isCustomAxiosError(err) && err.response) {
        Toast.error(err.response.data.message);
        return;
      }
      Toast.error(UNKNOWN_NET_ERROR_MESSAGE);
    }
  };

  return (
    <div className={cn('container')}>
      <h3>계정 삭제하기</h3>
      <div className={cn('accountDeleteAlert')}>
        <h6>개인 정보 및 기록 삭제</h6>
        <p>
          모든 개인정보와 개인 기록이 삭제됩니다. 삭제된 정보는 복구할 수 없으니
          필요한 데이터는 백업해 두시기 바랍니다.
        </p>
        <h6>SNS 계정 연동 해제</h6>
        <p>탈퇴 시 모든 SNS 계정 연동이 해제됩니다.</p>
        <h6>게시물</h6>
        <p>
          등록한 게시물은 탈퇴 후에도 삭제되지 않습니다. 게시물 삭제를
          원하신다면 계정을 탈퇴하기 전 삭제를 원하는 게시물을 직접 삭제하실 수
          있습니다.
        </p>
      </div>
      <div className={cn('accountDeleteCheckWrapper')}>
        <CheckBox
          className={cn('checkBox')}
          value={isAccountDeleteCheck}
          setValue={setIsAccountDeleteCheck}
        />
        <p>
          해당 내용을 확인하였으며, 구해듀오 계정 탈퇴에 동의합니다. 이 작업은
          취소할 수 없습니다.
        </p>
      </div>
      <div className={cn('buttons')}>
        <button
          type="button"
          className={cn('cancelBtn')}
          onClick={() => setIsModalOpen(false)}
        >
          취소
        </button>
        <button
          onClick={accountDelete}
          className={cn({
            redBtn: isAccountDeleteCheck,
            disabledBtn: !isAccountDeleteCheck,
          })}
        >
          삭제
        </button>
      </div>
    </div>
  );
}
