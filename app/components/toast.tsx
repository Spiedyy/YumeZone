import { addToast, Button } from "@heroui/react";

export default function Toast() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        key={"success"}
        color={"success"}
        variant={"flat"}
        onPress={() =>
          addToast({
            title: "Toast title",
            description: "Toast displayed successfully",
            color: "success",
            timeout: 3000,
          })
        }
        >
        {"Success"}
      </Button>
    </div>
  );
}
