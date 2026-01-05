"use client";
import AlertError from "@/components/alert-error";
import AlertSuccess from "@/components/alert-success";
import Button from "@/components/button";
import DateRangeSelect from "@/components/date-range-select";
import Input from "@/components/input";
import Label from "@/components/label";
import { Loader } from "lucide-react";
// import SubmitButton from "@/components/submit-button";
import { updateSettings } from "@/lib/actions";
// import { useFormState } from "react-dom";
import { useActionState } from "react";
import FormError from "@/components/form-error";
const initialState = {
  message: "",
  error: false,
  errors: {}, // object of errors
};

export default function SettingsForm({ defaults }) {
  console.log("defaults:", defaults);
  // const [state, formAction] = useFormState(updateSettings, initialState);
  const [state, formAction, isPending] = useActionState(
    updateSettings,
    initialState
  );
  console.log("SettingsForm state:", state);
  return (
    <form className="space-y-4" action={formAction}>
      {/* alert error and success */}
      {state?.error && <AlertError>{state?.message}</AlertError>}
      {!state?.error && state?.message?.length > 0 && (
        <AlertSuccess>{state?.message}</AlertSuccess>
      )}

      {/* input fullname */}
      <Label htmlFor="fullName">User full name</Label>
      <Input
        type="text"
        name="fullName"
        id="fullName"
        placeholder="User full name"
        defaultValue={defaults?.fullName}
      />

      {/* show errors if fullName is not Validated by Zod */}
      {state?.errors["fullName"]?.map((error) => (
        <FormError key={`fullName-${error}`} error={error} />
      ))}

      {/* input date range */}
      <Label htmlFor="defaultView">Default transactions view</Label>
      <DateRangeSelect
        name="defaultView"
        id="defaultView"
        defaultValue={defaults?.defaultView}
      />

      {/* show errors if defaultView is not Validated by Zod */}
      {state?.errors["defaultView"]?.map((error) => (
        <FormError key={`defaultView-${error}`} error={error} />
      ))}

      {/* <SubmitButton>Update Settings</SubmitButton> */}
      {/* <SubmitButton isPending={isPending}>Update Settings</SubmitButton> */}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2"
      >
        {isPending ? (
          <>
            <Loader className="animate-spin w-4 h-4" />
            Updating...
          </>
        ) : (
          "Update Settings"
        )}
      </Button>
    </form>
  );
}
