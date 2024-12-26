import { useState } from "react";

const ReadMore = ({ description }: { description: string }) => {
  const [showMore, setShowMore] = useState<boolean>(true);
  return (
    <div className="flex flex-col">
      {showMore ? (
        <div className="flex flex-col">
          <span>{description.slice(0, 70)}...</span>
          <button onClick={() => setShowMore(false)} className="self-end">
            Show more
          </button>
        </div>
      ) : (
        <div className="flex flex-col">
          <span>{description}</span>
          <button onClick={() => setShowMore(true)} className="self-end">
            Show less
          </button>
        </div>
      )}
    </div>
  );
};

export default ReadMore;
