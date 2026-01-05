"use client";
// import Alert from "@/components/alert";
import AlertError from "@/components/alert-error"
import AlertSuccess from "@/components/alert-success"
import Input from "@/components/input";
// import SubmitButton from "@/components/submit-button";
import Button from "@/components/button";
import { uploadAvatar } from "@/lib/actions";
import { Loader } from "lucide-react";
// import { Ban, Check } from "lucide-react";
// import { useFormState } from "react-dom";
import { useActionState } from "react";

// set form initial state
const initialState = {
  message: "",
  error: false,
};

// no need for the form to be a seperate client component because the page isn't fetching any data
// so no need for function to be async and will render fast
export default function Page() {
  // const [state, formAction] = useFormState(uploadAvatar, initialState); // use uploadAvatar action
  //useActionState
  const [state, formAction, isPending] = useActionState(
    uploadAvatar,
    initialState
  );
  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Avatar</h1>
      <form
        className="space-y-4"
        // action={uploadAvatar} // use the uploadAvatar action
        action={formAction} // use form action
      >
        {/* alert error if error exists */}
        {/* {state?.error && (
          <Alert
            icon={<Ban className="text-red-700 dark:text-red-300 w-6 h-6" />}
            title={
              <span className="text-red-700 dark:text-red-300">Error</span>
            }
          >
            <span className="text-red-700 dark:text-red-300">
              {state?.message}
            </span>
          </Alert>
        )} */}
        {state?.error && <AlertError>{state?.message}</AlertError>}
        {/* alert success if error is false and there is no message */}
        {/* {!state?.error && state?.message.length > 0 && (
          <Alert
            icon={
              <Check className="text-green-700 dark:text-green-300 w-6 h-6" />
            }
            title={
              <span className="text-green-700 dark:text-green-300">
                Success
              </span>
            }
          >
            <span className="text-green-700 dark:text-green-300">
              {state?.message}
            </span>
          </Alert>
        )} */}
        {!state?.error && state?.message.length > 0 && (
          <AlertSuccess>{state?.message}</AlertSuccess>
        )}
        <Input type="file" name="file" id="file" />
        {/* <SubmitButton>Upload Avatar</SubmitButton> with useFormState */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <Loader className="animate-spin w-4 h-4" />
              Uploading...
            </>
          ) : (
            "Upload Avatar"
          )}
        </Button>
      </form>
    </>
  );
}
