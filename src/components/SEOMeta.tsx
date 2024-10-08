import { Helmet } from 'react-helmet-async';

type Props = {
  pageData: {
    title: string;
    pageUrl: string;
    description: string;
  };
};

/**
 * 페이지마다의 Meta태그를 작성해주는 컴포넌트입니다.
 * @property {string} title - 페이지의 제목입니다.
 * @property {string} pageUrl - 페이지의 URL입니다.
 * @property {string} description - 페이지의 설명입니다.
 */

export default function SEOMeta({ pageData }: Props) {
  const { title, pageUrl, description } = pageData;
  // 모든 페이지의 공통 데이터를 선언합니다.
  const keywords =
    '롤, 구해듀오, 듀오, 리그오브레전드, lol, gg, 롤 전적, 롤 듀오, 롤 듀오 찾기, 구해듀오';
  const siteUrl = 'https://www.guhaeduo.com';
  const ogImage = `${process.env.PUBLIC_URL}/images/metaImage.png`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={siteUrl + pageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="naver-site-verification"
        content="cceff99a5be293645f95dce8c8b93083dfced2a0"
      />
      <meta
        name="google-site-verification"
        content="FZsTDbn_-ESpDb78-BKh_QUs4wiGuUOboZfeAiJxWtY"
      />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
