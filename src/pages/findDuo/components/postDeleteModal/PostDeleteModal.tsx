import React from 'react';
import { PostContent } from 'types/post';

type Props = {
  postData: PostContent;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PostDeleteModal({ postData, setIsOpen }: Props) {
  return <div></div>;
}
