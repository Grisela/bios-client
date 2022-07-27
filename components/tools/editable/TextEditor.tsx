import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { FormControl, FormLabel } from "@chakra-ui/react";
// import DOMPurify from "dompurify";

const TextEditor = (props: {
  label: string;
  content: string;
  setContent: any;
}) => {
  const { label, content, setContent } = props;
  const editor = useRef(null);

  const config = {
    readonly: false,
  };

  // const createMarkupPreview = () => {
  //   const sanitizeHtml = DOMPurify.sanitize(content);
  //   return { __html: sanitizeHtml };
  // };

  return (
    <div>
      <FormLabel>{label}</FormLabel>
      {useMemo(
        () => (
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            onBlur={(newContent) => {
              setContent(newContent);
            }}
            onChange={(newContent) => {}}
          />
        ),
        [content]
      )}

      {/* <div dangerouslySetInnerHTML={createMarkupPreview()} /> */}
    </div>
  );
};

export default TextEditor;
