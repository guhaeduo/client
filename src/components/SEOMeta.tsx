import { Helmet } from 'react-helmet-async';

type Props = {
  pageData: {
    title: string;
    pageUrl: string;
    description: string;
  };
};

export default function SEOMeta({ pageData }: Props) {
  const { title, pageUrl, description } = pageData;
  const keywords = '구해듀오에서 함께 게임을 플레이할 소환사를 모집하세요.';
  const siteUrl = 'https://www.guhaeduo.com';
  const ogImage = siteUrl + '/images/metaLogo.png';

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
        name="twitter:image"
        content={process.env.PUBLIC_URL + 'images/metaImage.png'}
      />
    </Helmet>
  );
}
