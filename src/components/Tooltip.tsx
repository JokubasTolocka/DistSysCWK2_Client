import ReactTooltip from "react-tooltip";
import { useState } from "react";
import { fetchImage } from "./utils";

interface Props {
  text: string;
}

const Tooltip = ({ text }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState("");

  const onHover = async () => {
    setIsLoading(true);
    const imageSrc = await fetchImage(text);
    setImage(imageSrc);
    setIsLoading(false);
  };

  return (
    <>
      <div data-tip data-for={`dataTip-${text}`} onMouseEnter={onHover}>
        {text}
      </div>
      <ReactTooltip
        id={`dataTip-${text}`}
        place="top"
        effect="solid"
        offset={{ top: 40 }}
        className="!bg-black"
      >
        <div className="flex flex-col">
          {text}
          {isLoading && <span>Loading...</span>}
          {image && !isLoading && (
            <img src={image} className="w-20 h-20" alt={text} />
          )}
          {image === undefined && <span>No Image</span>}
        </div>
      </ReactTooltip>
    </>
  );
};

export default Tooltip;
