import { ComponentProps } from "react";

type Props = {
  category: string;
  fileList: Array<{
    title: string;
    filename: string;
    published: string;
  }>;
} & ComponentProps<"div">;
const CategoryCard = (props: Props) => {
  return <div>CategoryCard</div>;
};

export default CategoryCard;
