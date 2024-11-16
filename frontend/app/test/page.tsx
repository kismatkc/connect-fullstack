// // app/signup/page.js

// "use client";

// import { useForm } from "react-hook-form";
// import AutocompleteInput from "@/components/AutocompleteInput";

// export default function SignUpPage() {
//   const { handleSubmit, control } = useForm();

//   const onSubmit = (data) => {
//     console.log("Form Data:", data);
//     // Handle form submission logic
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <AutocompleteInput
//         name="college"
//         control={control}
//         placeholder="Enter your college"
//       />
//       <AutocompleteInput
//         name="city"
//         control={control}
//         placeholder="Enter your city"
//       />
//       <button type="submit">Sign Up</button>
//     </form>
//   );
// }
