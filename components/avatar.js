import { createClient } from "@/lib/supabase/server";
import { CircleUser } from "lucide-react";
import Image from "next/image";

export default async function Avatar({ width = 32, height = 32 }) {
  const supabase = await createClient(); // create client
  const {
    data: { user },
  } = await supabase.auth.getUser(); // get user
  const { data: imageData, error } = await supabase.storage
    .from("avatars")
    .createSignedUrl(user.user_metadata?.avatar, 60 * 5); // use signed url for the private bucket to get public link for 5 minutes

  // if error use the icon instead of avatar
  if (error) {
    return <CircleUser className="w-6 h-6" />;
  }

  return (
    <Image
      src={imageData.signedUrl} // set the supabase domain to get image
      width={width}
      height={height}
      alt="User avatar"
      className="rounded-full"
    />
  );
}
