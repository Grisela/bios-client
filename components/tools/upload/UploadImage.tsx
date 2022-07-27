import React from "react";
import { Box, Image } from "@chakra-ui/react";

interface uploadImageProps {
  onUpload: any;
  uploadRef: any;
  imageUrl: string;
}

const UploadImage = ({ onUpload, uploadRef, imageUrl }: uploadImageProps) => {
  return (
    <div className="upload">
      <input type="file" onChange={onUpload} ref={uploadRef} />
      <Box mt={5} w={"7vw"} minW={100}>
        {imageUrl && <Image src={imageUrl} alt="alternative" />}
      </Box>
    </div>
  );
};

export default UploadImage;
