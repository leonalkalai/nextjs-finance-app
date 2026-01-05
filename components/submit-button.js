import Button from "./button";
import { useFormStatus } from "react-dom"; // import useFormStatus hook
import { Loader } from "lucide-react";

export default function SubmitButton(props) {
  const { pending } = useFormStatus(); // get pending state using useFormStatus hook
  return (
    <Button
      {...props}
      className={`${props.className} flex items-center justify-center space-x-1`}
      disabled={pending}
    >
      {pending && <Loader className="animate-spin w-4 h-4" />}
      <span>{props.children}</span>
    </Button>
  );
}
