import React, { useEffect } from "react";
import { TagsInput } from "react-tag-input-component";

type IPropType = {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
  default_value?: string[];
};
const Tags = ({ tags, setTags, default_value }: IPropType) => {
  useEffect(() => {
    if (default_value) {
      setTags(default_value);
    }
  }, [default_value, setTags]);
  return (
    <div className="mb-5 tp-product-tags">
      <TagsInput
        value={tags}
        onChange={setTags}
        name="tags"
        placeHolder="enter tags"
      />
      <em>press enter to add new tag</em>
    </div>
  );
};

export default Tags;
