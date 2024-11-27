import { getGeocodeSuggestions } from "@/lib/utils";
import { useEffect, useRef, useState, useCallback } from "react";

const autoComplete = ({
  onValueChange,
  value,
}: {
  onValueChange: (value: string) => void;
  value: string;
}) => {
  const [showSuggestions, setShowUggestions] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<any>([]);

  const divRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useCallback(
    async (input: string) => {
      try {
        if (!input) return;
        const response = await getGeocodeSuggestions(input);

        if (response.length > 0) {
          setSuggestions(response);
          if (!isSelected) {
            setShowUggestions(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    [value],
  );
  useEffect(() => {
    setIsSelected(false);
    const handleOutsideClick = (e: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(e.target as Node)) {
        setShowUggestions(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    const geoTImer = setTimeout(() => fetchSuggestions(value), 500);

    return () => {
      clearTimeout(geoTImer);

      document.removeEventListener("click", handleOutsideClick);
    };
  }, [value]);

  return (
    <div
      className="container-bg-light dark:container-bg-dark shadow-md z-50 max-w-[324px]"
      ref={divRef}
      onClick={(e) => {
        if (divRef.current?.contains(e.target as Node)) {
          const targetElement = e.target as HTMLLIElement;

          if (targetElement.tagName === "LI") {
            onValueChange(targetElement.dataset.placeName as unknown as string);
            setShowUggestions(false);
            setIsSelected(true);
          }
        }
      }}
    >
      <ul>
        {showSuggestions &&
          suggestions.map((suggestion: any) => (
            <li
              className="hover:bg-gray-200 mb-1 p-2"
              key={suggestion.id}
              data-place-name={suggestion.place_name}
            >
              {suggestion.place_name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default autoComplete;
