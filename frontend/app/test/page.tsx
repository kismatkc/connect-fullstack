"use client";

import useConfirmation from "@/components/confirmation";


export default function Page() {
    const { ConfirmationModel,decision } = useConfirmation();

    return (
        <div>
            <ConfirmationModel
                title="Are you absolutely sure?"
                description="This action cannot be undone. This will permanently delete your
            account and remove your data from our servers."
                options={{
                    cancel: "Cancel",
                    action: "Delete",
                }}
            />
        </div>
    );
}
