import { createClient } from "@/lib/supabase/server";
import SettingsForm from "./components/settings-form";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: {
      // data object
      // data object user property
      user: { user_metadata: defaults }, // user_metadata property of user property and alias it to defaults
    },
  } = await supabase.auth.getUser(); // get user from database
  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Settings</h1>
      {/* pass the user_metadata default options */}
      <SettingsForm defaults={defaults} />
    </>
  );
}
