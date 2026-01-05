"use client";

import { useEffect, useState } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import Label from "@/components/label";
import Select from "@/components/select";
import { categories, types } from "@/lib/constants";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // to use zod with react hook form
import { transactionSchema } from "@/lib/validation"; // import the zod schema
import { useRouter } from "next/navigation"; // import userouter for redirections
import { createTransaction, purgeTransactionListCache, updateTransaction } from "@/lib/actions"; // import purge cache serfver action
import FormError from "@/components/form-error";

export default function TransactionForm({initialData}) { // initialize default form values
  //  use the react hook form useform to get the functions
  const {
    register,
    handleSubmit,
    watch, // use react hook form watch function to watch for changes https://react-hook-form.com/docs/usewatch/watch
    setValue, // set value react hook form https://react-hook-form.com/docs/useform/setvalue
    formState: { errors },
  } = useForm({
    mode: "onTouched", // use ontouched mode that validates on first blur and on every change event
    resolver: zodResolver(transactionSchema), // use the zod schema into the react hook form
    defaultValues: initialData ?? { // set defaultvalues to initial data 
      created_at: new Date().toISOString().split('T')[0] // else set the created_at as new date converted to string, keep the date part and remove the time from it
    }
  });

  const type = watch("type"); // watch when category type form input changes with useForm watch

  const editing = Boolean(initialData); // set editing flag from initial data converted to boolean
  // form submite handler
  // const onSubmitForm = (formdata) => console.log(formdata);

  //  const onSubmitForm = (formdata) => {
  //   console.log(formdata)
  //   console.log(process.env.NEXT_PUBLIC_API_URL)
  //   // NEXT_PUBLIC_ is needed on a client component to get the API_URL value of the .env.local
  //   // API_URL=http://localhost:3100
  //   // NEXT_PUBLIC_API_URL=http://localhost:3100
  // }

  const router = useRouter(); // initiate the router
  const [isSaving, setSaving] = useState(false); // set the save cache data
  const [serverActionError, setServerActionError] = useState(); // set the error state

  const onSubmitForm = async (formdata) => {
    // console.log(formdata)
    // return
    setSaving(true); // set saving to true
    setServerActionError(); // reset error state after submit
    try {
      // using json server
      // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/transactions`, { // use fetch to call API
      //   method: 'POST', // set the method to post
      //   headers: { // set the headers for the type of content to be created
      //     'Content-Type': 'application/json' // json type data
      //   },
      //   body: JSON.stringify({ // send the data inside the request body serializing the data to json string
      //     ...formdata, // use spread operator to set the data
      //     created_at: `${formdata.created_at}T00:00:00` // set the created_at date with date and time
      //   })
      // })
      // await purgeTransactionListCache(); // call the cache purge server action

      if (editing) { // if on editing mode
        await updateTransaction( // call the update server action
          initialData.id, // pass the initial data transaction id
          formdata // pass the form data
        )
      } else { // if on create mode
        // using supabase
        await createTransaction(formdata); // use server action createTransaction and pass the formData array converted to Json
      }
   

      router.push("/dashboard"); // redirect to dashboard page
    } catch (error) {
      setServerActionError(error?.message); // catch error and set error
    } finally {
      // finally run
      setSaving(false);
    }
  };

  return (
    <form
      className="space-y-4"
      // onsubmit form call handlesubmit of useForm and pass the onSubmitForm handler. the onsubmit will be called only when handlesubmit validates the form
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label className="mb-1">Type</Label>
          {/* react hook form use spread operation to register the input type named "type" */}
          {/* <Select {...register("type")}> */}
          <Select {...register("type", {
            // pass the onchange hanlder
            onChange: (e) => {
              if (e.target.value !== "Expense") { // if current select value is not Expense
                setValue("category", ""); // set the category value to empty string 
              }
            }
          })}>
            {types.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </Select>
          {/* add form error select type handler */}
          <FormError error={errors.type?.message} />
        </div>

        <div>
          <Label className="mb-1">Category</Label>
          <Select
            {...register("category")}
            disabled={type !== "Expense"} // disabled category if type is not expense
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </Select>
          {/* add form error select category handler */}
          <FormError error={errors.category?.message} />
        </div>

        <div>
          <Label className="mb-1">Date</Label>
          <Input {  
            ...register("created_at")} 
            // if editing mode then disable this input
            disabled={editing}
          /> 
          {/* {errors.created_at && <p className="mt-1 text-red-500">{errors.created_at.message}</p>} */}
          {/* add form error created_at handler */}
          <FormError error={errors.created_at?.message} />
        </div>

        <div>
          <Label className="mb-1">Amount</Label>
          <Input type="number" {...register("amount")} />
          {/* {errors.amount && <p className="mt-1 text-red-500">{errors.amount.message}</p>} */}
          {/* add form error amount handler */}
          <FormError error={errors.amount?.message} />
        </div>

        <div className="col-span-1 md:col-span-2">
          <Label className="mb-1">Description</Label>
          <Input {...register("description")} />
          {/* {errors.description && <p className="mt-1 text-red-500">{errors.description.message}</p>} */}
          {/* add form error description handler */}
          <FormError error={errors.description?.message} />
        </div>
      </div>

      <div className="flex justify-between items-center">
        {/* display the error using FormError component */}
        <div>{serverActionError && <FormError error={serverActionError} />}</div>
        {/* disable the button if save */}
        <Button type="submit" disabled={isSaving}>
          Save
        </Button>
      </div>
    </form>
  );
}

// react hook form validation

// "use client";

// import Button from "@/components/button";
// import Input from "@/components/input";
// import Label from "@/components/label";
// import Select from "@/components/select";
// import { categories, types } from "@/lib/constants";
// import { useForm } from "react-hook-form";

// export default function TransactionForm() {
//   //  use the react hook form useform to get the functions
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({
//     mode: "onTouched", // use ontouched mode that validates on first blur and on every change event
//   });

//   // form submite handler
//   const onSubmitForm = (formdata) => console.log(formdata);

//   return (
//     <form
//       className="space-y-4"
//       // onsubmit form call handlesubmit of useForm and pass the onSubmitForm handler. the onsubmit will be called only when handlesubmit validates the form
//       onSubmit={handleSubmit(onSubmitForm)}
//     >
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <Label className="mb-1">Type</Label>
//           {/* react hook form use spread operation to register the input type named "type" */}
//           <Select {...register("type")}>
//             {types.map((type) => (
//               <option key={type}>{type}</option>
//             ))}
//           </Select>
//         </div>

//         <div>
//           <Label className="mb-1">Category</Label>
//           <Select {...register("category")}>
//             {categories.map((category) => (
//               <option key={category}>{category}</option>
//             ))}
//           </Select>
//         </div>

//         <div>
//           <Label className="mb-1">Date</Label>
//           <Input
//             {...register("created_at", {
//               required: "The date is required",
//             })}
//           />
//           {errors.created_at && (
//             <p className="mt-1 text-red-500">{errors.created_at.message}</p>
//           )}
//         </div>

//         <div>
//           <Label className="mb-1">Amount</Label>
//           <Input
//             type="number"
//             {...register("amount", {
//               required: "The amount is required", // validate ammount field is required
//               valueAsNumber: true, // validate value is a number
//               min: { value: 1, message: "Amount must be at least 1" }, // validate minimum value is 1 (not 0)
//             })}
//           />
//           {errors.amount && (
//             <p className="mt-1 text-red-500">{errors.amount.message}</p>
//           )}
//         </div>

//         <div className="col-span-1 md:col-span-2">
//           <Label className="mb-1">Description</Label>
//           <Input
//             {...register("description", {
//               required: "The description is required",
//             })}
//           />
//           {errors.description && (
//             <p className="mt-1 text-red-500">{errors.description.message}</p>
//           )}
//         </div>
//       </div>

//       <div className="flex justify-end">
//         <Button type="submit">Save</Button>
//       </div>
//     </form>
//   );
// }
