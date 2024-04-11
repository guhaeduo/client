import { useEffect, useState } from 'react';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import getFindDuoPosts from 'service/getFindDuoPosts';

/**
 * 듀오 게시판 페이지에서 필요한 값들을 관리하는 훅입니다.
 * @return {string} tierOption - 듀오 게시판 티어 필터 옵션
 * @return {(newOption: string) => void} setTierOption - 듀오 게시판 티어 필터 옵션 변경 함수
 * @return {string} queueOption - 듀오 게시판 게임 타입 필터 옵션
 * @return {(newOption: string) => void} setQueueOption - 듀오 게시판 게임 타입 필터 옵션 변경 함수
 * @return {string} laneOption - 듀오 게시판 라인 필터 옵션
 * @return {(newOption: string) => void} setLaneOption - 듀오 게시판 라인 필터 옵션 변경 함수
 * @return {boolean} isTierDropDownOpen - 듀오 게시판 티어 드롭다운 열림 여부
 * @return {Dispatch<SetStateAction<boolean>>} setIsTierDropDownOpen - 듀오 게시판 티어 드롭다운 열림 여부 변경 함수
 * @return {boolean} isQueueDropDownOpen - 듀오 게시판 큐 드롭다운 열림 여부
 * @return {Dispatch<SetStateAction<boolean>>} setIsQueueDropDownOpen - 듀오 게시판 큐 드롭다운 열림 여부 변경 함수
 * @return {boolean} isLaneDropDownOpen - 듀오 게시판 라인 드롭다운 열림 여부
 * @return {Dispatch<SetStateAction<boolean>>} setIsLaneDropDownOpen - 듀오 게시판 라인 드롭다운 열림 여부 변경 함수
 * @return {boolean} isRiotVerified - 듀오 게시판 라이엇 인증 여부 필터 옵션
 * @return {() => void} isRiotVerifiedHandler - 듀오 게시판 라이엇 인증 여부 필터 옵션 변경 함수
 * @return {Array} postsData - 게시글 데이터 배열
 * @return {(options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<InfiniteData<PostsDataRes, unknown>, Error>>} fetchNextPage - 다음 페이지 데이터를 가져오는 함수
 * @return {boolean} hasNextPage - 다음 페이지 존재 여부
 * @return {boolean} isFetchingNextPage - 다음 페이지 데이터를 가져오는 중 여부
 * @return {boolean} isFetching - 데이터를 가져오는 중 여부
 * @return {() => void} onQueryClearHandler - 쿼리 업데이트 핸들러 함수
 */

export default function useFindDuo() {
  // 듀오 게시판 티어 필터 옵션 상태
  const [tierOption, setTierOption] = useState('ALL');

  // 듀오 게시판 게임 타입 필터 옵션 상태
  const [queueOption, setQueueOption] = useState('SOLO');

  // 듀오 게시판 라인 필터 옵션 상태
  const [laneOption, setLaneOption] = useState('ALL');

  // 듀오 게시판 라이엇 인증 여부 필터 옵션 상태
  const [isRiotVerified, setIsRiotVerified] = useState(false);

  // 듀오 게시판 티어 드롭다운 열림 여부 상태
  const [isTierDropDownOpen, setIsTierDropDownOpen] = useState(false);

  // 듀오 게시판 게임 타입 드롭다운 열림 여부 상태
  const [isQueueDropDownOpen, setIsQueueDropDownOpen] = useState(false);

  // 듀오 게시판 라인 드롭다운 열림 여부 상태
  const [isLaneDropDownOpen, setIsLaneDropDownOpen] = useState(false);

  const queryClient = useQueryClient();

  /** 라이엇 인증 여부 필터 옵션 변경 함수 */
  const isRiotVerifiedHandler = () => {
    setIsRiotVerified((prevVerified) => !prevVerified);
  };

  /** 캐싱된 쿼리를 삭제하는 함수입니다. */
  const onQueryClearHandler = () => {
    // 필터 옵션을 기반으로 저장된 쿼리를 삭제합니다.
    queryClient.invalidateQueries({
      queryKey: [
        'duoPosts',
        laneOption,
        queueOption,
        tierOption,
        isRiotVerified,
      ],
    });
  };

  useEffect(() => {
    // 옵션이 변경된다면 저장된 쿼리를 삭제합니다.
    onQueryClearHandler();
  }, [laneOption, queueOption, tierOption, isRiotVerified]);

  // 필터 옵션을 기반으로 듀오 게시글 데이터를 받아옵니다.
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: [
        'duoPosts',
        laneOption,
        queueOption,
        tierOption,
        isRiotVerified,
      ],
      queryFn: ({ pageParam }) =>
        getFindDuoPosts(
          laneOption,
          queueOption,
          tierOption,
          isRiotVerified,
          pageParam,
        ),
      initialPageParam: 1,
      getNextPageParam: (pageData) =>
        pageData.hasNextPage ? pageData.nextPageNumber : null,
    });

  // 받아온 데이터를 1차원 배열로 변경합니다.
  const postsData = data?.pages.flatMap((page) => page.content);

  return {
    tierOption,
    setTierOption,
    queueOption,
    setQueueOption,
    laneOption,
    setLaneOption,
    isTierDropDownOpen,
    setIsTierDropDownOpen,
    isQueueDropDownOpen,
    setIsQueueDropDownOpen,
    isLaneDropDownOpen,
    setIsLaneDropDownOpen,
    isRiotVerified,
    isRiotVerifiedHandler,
    postsData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    onQueryClearHandler,
  };
}
