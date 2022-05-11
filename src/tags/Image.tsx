import React from "react";
import { Image } from "@chakra-ui/react";

interface Props {
  src: string;
  alt: string;
  width: string;
  height: string;
  style?: {};
  onMouseEnter?: () => void;
}

const ImageComponent: React.FC<Props> = ({ ...props }) => {
  return <Image {...props} />;
};

export default ImageComponent;
