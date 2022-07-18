import Content from "Layout/Content";
import Details from "components/home/PostDetails";
import config from "components/home/config";

const View = (props: any) => {
  const { breadcrumb } = config.view;

  return (
    <Content breadcrumb={breadcrumb}>
      <Details />
    </Content>
  );
};

export default View;
