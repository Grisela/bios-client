import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

const config = {
  view: {
    breadcrumb: () => {
      interface breadcrumbDataProps {
        text: string;
        link?: string;
        idx: number;
      }
      const breadcrumbData: Array<breadcrumbDataProps> = [
        {
          idx: 0,
          text: "Post",
          link: "/",
        },
        {
          idx: 1,
          text: "View",
        },
      ];
      return breadcrumbData;
    },
  },
};

export default config;
