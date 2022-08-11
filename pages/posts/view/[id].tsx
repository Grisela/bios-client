import Content from "Layout/Content";
import Details from "components/posts/PostDetails";
import config from "components/posts/config";

const View = () => {
  const { breadcrumb } = config.view;

  return (
    <Content breadcrumb={breadcrumb}>
      <Details />
    </Content>
  );
};

export default View;
