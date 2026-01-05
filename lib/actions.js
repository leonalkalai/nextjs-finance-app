"use server"; // this is a server safe code and not exposed to client

import { supabaseAdmin } from "@/lib/supabase/admin";
// import { revalidateTag } from 'next/cache'; // revalidate the specific tag
import { revalidatePath } from "next/cache"; // // revalidate the specific path
import { createClient } from "./supabase/server"; // import supabase
import { settingsSchema, transactionSchema } from "./validation"; // import the transaction schema
import { redirect } from "next/navigation"; // import redirect
import { unstable_noStore } from "next/cache";
import { flattenFieldErrors } from "./zod-helpers";

// export async function purgeTransactionListCache() {
//   revalidateTag('transaction-list'); //clear the cache for the specific tag. later also for the account user name
// }

// create transaction action
export async function createTransaction(formData) {
  // using reactHookForm
  // throw error for testing
  // throw new Error('this is a test error message');

  // Zod validation
  // set validated object as formdata and use safeparse for no error thrown from zod if validation fails
  const validated = transactionSchema.safeParse(formData); // formData is an object
  // check if not success then throw error
  if (!validated.success) {
    throw new Error("Invalid data");
  }
  const validatedformData = validated.data;
  // Handle errors and Validate data
  console.log("formData: ", formData);
  console.log("validatedformData: ", validatedformData);
  // const { error } = await createClient() // await supabase client
  const supabase = await createClient(); // create client for supabase
  const { error } = await supabase // await data from client
    .from("transactions") // from transactions table
    // console.log("SUPABASE CLIENT:", supabase);
    // .insert(formData); // insert formData
    .insert(validatedformData); // insert validated zod data

  // check if error and display the error
  if (error) {
    throw new Error("Failed creating the transaction");
  }

  revalidatePath("/dashboard"); // revalidate the dashboard path to get the updated data
}

// fetch transactions
export async function fetchTransactions(range, offset = 0, limit = 10) {
  unstable_noStore();
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    throw new Error("No user session available");
  }

  //console.log('The useris:' , user); // αν είναι null → session δεν υπάρχει
  let { data, error } = await supabase.rpc("fetch_transactions", {
    arg_limit: limit,
    arg_offset: offset,
    arg_range: range,
  });
  if (error) {
    console.error("RPC error:", error);
    throw new Error("Cannot fetch transactions");
  }
  return data;
}

function getStartDate(range) {
  const now = new Date();
  switch (range) {
    case "last24hours":
      return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    case "last7days":
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    case "last30days":
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    case "last12months":
      return new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
    default:
      return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  }
}

// export async function fetchTransactions(range, offset = 0, limit = 10) {
//   const supabase = await createClient();
//   const { data: { user }, error: userError } = await supabase.auth.getUser();
//   if (userError || !user) throw new Error("No logged-in user");

//   const { data, error } = await supabase
//     .from("transactions")
//     .select("*")
//     .eq("user_id", user.id)
//     .gte("created_at", getStartDate(range)) // helper function για startDate
//     .lte("created_at", new Date())
//     .order("created_at", { ascending: false })
//     .range(offset, offset + limit - 1);

//   if (error) throw new Error("Cannot fetch transactions");
//   return data;
// }

// export async function fetchTransactions(range, limit = 10, offset = 0) {
//   const supabase = await createClient();

//   // παίρνουμε τον τρέχοντα user
//   const { data: { user }, error: userError } = await supabase.auth.getUser();

//   if (userError) {
//     console.error("Error fetching user:", userError.message);
//     return [];
//   }

//   if (!user) {
//     console.log("No user logged in (session missing)");
//     return [];
//   }

//   console.log("Logged-in user ID:", user.id);   // <--- εδώ βλέπεις τι επιστρέφει auth.uid()
//   console.log("Logged-in user email:", user.email);

//   // Τρέχουμε την RPC function
//   const { data, error: rpcError } = await supabase.rpc("fetch_transactions", {
//     arg_range: range,
//     arg_limit: limit,
//     arg_offset: offset
//   });

//   if (rpcError) {
//     console.error("RPC error:", rpcError.message);
//     return [];
//   }

//   console.log("Transactions returned:", data.length);
//   return data;
// }

// delete transaction
export async function deleteTransaction(id) {
  const supabase = await createClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id); // check if the id is the transaction id to be deleted
  if (error) throw new Error(`Could not delete the transaction ${id}`);
  revalidatePath("/dashboard");
}

// update transaction
export async function updateTransaction(id, formData) {
  const validated = transactionSchema.safeParse(formData);
  if (!validated.success) {
    throw new Error("Invalid data");
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("transactions")
    .update(formData)
    .eq("id", id); // check if the id is the transaction id to be updated

  if (error) {
    throw new Error("Failed creating the transaction");
  }

  revalidatePath("/dashboard");
}

// login action

// export async function login(formData) {
//   console.log(formData);
// }

const sleep = (ms) => new Promise((r) => setTimeout(r, ms)); // for test purposes

// use  useFormStatus instead of useActionState
// export async function login(formData) {
//   await sleep(2000); // simulate loading
//   console.log(formData);
// }

// use useformData
// export async function login(prevState, formData) {
//   if ("koundouras@gmail.com" === formData.get("email")) {
//     return {
//       message: "successfull login",
//     };
//   }
//   return {
//     error: true,
//     message: "Wrong email!",
//   };
// }

// use useformData with supabase email one time password
export async function login(prevState, formData) {
  const supabase = await createClient(); // create supabase client
  const email = formData.get("email"); // get the formData email value
  const { error } = await supabase.auth.signInWithOtp({
    // signin with OTP
    email, // use email
    options: {
      shouldCreateUser: true, // create user
    },
  });

  // if error return error and message
  if (error) {
    return {
      error: true,
      message: "Authentication Error!",
    };
  }
  return {
    message: `We have sended Email to ${email}`,
  };
}

// use useActionState instead of useFormStatus
// export async function login(prevState, formData) {
//   await sleep(2000);

//   console.log(formData);
//   console.log("email:", formData.get("email"));

//   return { success: true };
// }

// signout server action
export async function signOut() {
  const supabase = await createClient(); // create supabase client
  const { error } = await supabase.auth.signOut(); // wait for signout
  redirect("/login"); // redirect to login page
}

// sign up server action
// Signup with email/password and username
export async function signup(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");

  // Check if user exists (server-side, secure)
  const { data: users, error: listError } =
    await supabaseAdmin.auth.admin.listUsers({
      filter: `email=eq.${email}`,
      limit: 1,
    });

  if (listError) {
    return { error: true, message: listError.message };
  }

  if (users.length > 0) {
    return {
      error: true,
      message: "This email is already registered. Try signing in.",
    };
  }

  // Create user
  const { data, error: createError } =
    await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { username },
      email_confirm: true, // ή false αν θέλεις να χρειάζεται verify
    });

  if (createError) {
    return { error: true, message: createError.message };
  }

  return { error: false, message: "Account created. You can now sign in." };
}

// login with password server action
export async function loginWithPassword(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  console.log("Login attempt for email:", email);

  // First, lookup the user via Supabase Admin
  const { data, error: adminError } = await supabaseAdmin.auth.admin.listUsers({
    filter: `email=eq.${email}`,
    limit: 1,
  });

  if (adminError) {
    console.log("Admin lookup error:", adminError);
    return { error: true, message: "Server error, try again later" };
  }

  console.log("User lookup result:", data);

  const matchingUser = data.users.find((u) => u.email === email);

  if (!matchingUser) {
    console.log("User does NOT exist in database");
    return { error: true, message: "User does not exist in database" };
  }

  console.log("User exists, attempting sign in...");
  const supabase = await createClient();

  const { error: loginError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (loginError) {
    console.log("Login failed:", loginError.message);
    return { error: true, message: "Wrong password" };
  }

  console.log("Login successful for:", email);
  redirect("/dashboard");
}

// forgot password server action
export async function forgotPassword(prevState, formData) {
  const email = formData.get("email");
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  });

  if (error) {
    return { error: true, message: error.message };
  }

  return {
    error: false,
    message: "If this email exists, a reset link was sent.",
  };
}

// change password server action

export async function changePassword(prevState, formData) {
  const password = formData.get("password");
  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: true, message: error.message };
  }

  return { error: false, message: "Password updated successfully" };
}

// upload user avatar server action
export async function uploadAvatar(prevState, formData) {
  // pass prevState to use the useFormState hook
  const supabase = await createClient();
  const file = formData.get("file"); // get the file input from the form
  const fileExt = file.name.split(".").pop(); // get the file extension
  const fileName = `${Math.random()}.${fileExt}`; // get a random file name + the extension

  const { error } = await supabase.storage
    .from("avatars") // from avatars bucket
    .upload(fileName, file); // upload the file with the filename
  if (error) {
    // get error if fail
    // throw new Error("Error uploading avatar");
    return {
      error: true,
      message: "Error uploading avatar",
    };
  }

  // Removing the old file
  const { data: userData, userError } = await supabase.auth.getUser(); // get user
  if (userError) {
    return {
      error: true,
      message: "Something went wrong, try again", // if can't get user show error
    };
  }

  const avatar = userData.user.user_metadata.avatar; // get user avatar
  if (avatar) {
    // if avatar is not null or undefined
    const { error } = await supabase.storage.from("avatars").remove([avatar]); // remove avatar to replace it with the new one

    if (error) {
      return {
        error: true,
        message: "Something went wrong, try again", // remove avatar to replace it with the new one
      };
    }
  }

  // update user metatada
  const { error: dataUpdateError } = await supabase.auth.updateUser({
    data: {
      avatar: fileName,
    },
  });
  // if error inform the user
  if (dataUpdateError) {
    //throw new Error("Error associating the avatar with the user");
    return {
      error: true,
      message: "Error associating the avatar with the user",
    };
  }

  // if there is no error and everything ok
  return {
    message: "Updated the user avatar",
  };
}

// update settings server action
export async function updateSettings(prevState, formData) {
  // pass the formdata that is an object of type FormData using React form. This is not a simple object https://developer.mozilla.org/en-US/docs/Web/API/FormData
  const validatedSettings = settingsSchema.safeParse({
    fullName: formData.get("fullName"), // explicitly use get() to get the fullName
    defaultView: formData.get("defaultView"), // explicitly use get() to get the defaultView
  });

  // If any form fields are invalid, return early

  // this methods are deprecated
  // if (!validatedSettings.success) {
  //   console.log(validatedSettings.error.flatten().fieldErrors)
  //   return {
  //     errors: validatedSettings.error.flatten().fieldErrors, // deprecated
  //     // errors: validatedSettings.error.format(), // deprecated
  //     // errors: validatedSettings.treeifyError() // deprecated
  //   }
  // }

  // use flattenFieldErrors zod helper function
  if (!validatedSettings.success) {
    const errors = flattenFieldErrors(validatedSettings.error);
    console.log(errors);

    return {
      errors: errors,
    };
  }

  const supabase = await createClient(); // create supabase client
  const { error } = await supabase.auth.updateUser({
    // update user metadata after pass authorization
    data: {
      // fullName: formData.get("fullName"), // get the form fullname input value
      // defaultView: formData.get("defaultView"), // get the form defaultView input value
      fullName: validatedSettings.data.fullName, // use the validated zod settings fullName
      defaultView: validatedSettings.data.defaultView, // use the validated zod settings defaultView
    },
  });

  // if error show fail update setting
  if (error) {
    return {
      error: true,
      message: "Failed updating setting",
      errors:{}
    };
  }

  // if no error then show the user settings are updated
  return {
    message: "Updated user settings",
    errors:{}
  };
}
