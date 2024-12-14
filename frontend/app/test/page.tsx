"use client";

import useConfirmation from "@/components/test-confirmation";
import { useEffect, useState } from "react";

// export default function Page() {
//   const [value, setvalue] = useState(5);
//   useEffect(() => {
//     setvalue(hello);
//   }, []);
//   function hello(val: number) {
//     console.log(val, "from the setter");
//     return val;
//   }
//   return <>{value}</>;
// }

export default function Page() {
  const { ConfirmationModel } = useConfirmation();

  return (
    <div>
      <ConfirmationModel
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your
            account and remove your data from our servers."
      />
    </div>
  );
}
