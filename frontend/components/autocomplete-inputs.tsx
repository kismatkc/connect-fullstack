// // components/AutocompleteInput.js

// "use client";

// import { useState, useEffect } from "react";
// import { useController } from "react-hook-form";

// export const getGeocodeSuggestions = async (query) => {
//   if (!query) return [];
//   try {
//     const response = await geocodingClient
//       .forwardGeocode({
//         query,
//         autocomplete: true,
//         limit: 5,
//       })
//       .send();
//     return response.body.features || [];
//   } catch (error) {
//     console.error("Error fetching geocode:", error);
//     return [];
//   }
// };

// export default function AutocompleteInput({ name, control, placeholder }) {
//   const { field } = useController({ name, control });
//   const [inputValue, setInputValue] = useState(field.value || "");
//   const [suggestions, setSuggestions] = useState([]);

//   // Debounce function to limit API calls
//   const debounce = (func, delay) => {
//     let timeout;
//     return (...args) => {
//       clearTimeout(timeout);
//       timeout = setTimeout(() => func(...args), delay);
//     };
//   };

//   const fetchSuggestions = debounce(async (input) => {
//     if (input.length > 2) {
//       const results = await getGeocodeSuggestions(input);
//       console.log(results);
//       setSuggestions(results);
//     } else {
//       setSuggestions([]);
//     }
//   }, 500);

//   const handleChange = (e) => {
//     const value = e.target.value;
//     setInputValue(value);
//     field.onChange(value);
//     fetchSuggestions(value);
//   };

//   const handleSelect = (place) => {
//     setInputValue(place.place_name);
//     field.onChange(place.place_name);
//     setSuggestions([]);
//   };

//   return (
//     <div style={{ position: "relative" }}>
//       <input
//         {...field}
//         value={inputValue}
//         onChange={handleChange}
//         placeholder={placeholder}
//         autoComplete="off"
//       />
//       {suggestions.length > 0 && (
//         <ul
//           style={{
//             position: "absolute",
//             background: "#fff",
//             zIndex: 1,
//             listStyle: "none",
//             padding: 0,
//             margin: 0,
//             width: "100%",
//             border: "1px solid #ccc",
//           }}
//         >
//           {suggestions.map((suggestion) => (
//             <li
//               key={suggestion.id}
//               onClick={() => handleSelect(suggestion)}
//               style={{ cursor: "pointer", padding: "8px" }}
//             >
//               {suggestion.place_name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

import { getGeocodeSuggestions } from "@/lib/utils";
import { useEffect, useRef, useState, useCallback } from "react";

const autoComplete = ({
    onValueChange,
    value,
}: {
    onValueChange: (value: string) => void;
    value: string;
}) => {
    const [suggestions, setSuggestions] = useState<any>([]);
       const divRef = useRef<HTMLDivElement>(null);
    divRef.timer = 0;
    const fetchSuggestions = useCallback(
        async (input: string) => {
            try {
                const response = await getGeocodeSuggestions(input);
           
                console.log(++divRef.timer)
                if (response.length > 0) {
                    setSuggestions(response);
                }
            } catch (error) {
                console.log(error);
            }
        },
        [value],
    );
    useEffect(() => {
        if (!value) return;
        const geoTImer = setTimeout(() => fetchSuggestions(value), 500);

        return () => clearTimeout(geoTImer);
    }, [value]);
 
    return (
        <div
            className="container-bg-light dark:container-bg-dark shadow-md z-50 max-w-[324px]"
            ref={divRef}
            onClick={(e) => {
                if (divRef.current?.contains(e.target as Node)) {
                    return;
                }
                setSuggestions([]);
            }}
        >
            <ul>
                {suggestions &&
                    suggestions.map((suggestion: any) => (
                        <li
                            className="hover:bg-gray-200 mb-1 p-2"
                            key={suggestion.id}
                            value={suggestion.place_name}
                        >
                            {suggestion.place_name}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default autoComplete;
