// import {z} from "zod"
// import { categories, types } from "./constants"

// export const transactionSchema = z.object({
//   type: z.enum(types), // if types are predefined we use enum to match the predefined types
//   category: z.enum(categories), // if categories are predefined we use enum to match the predefined categories
//   // zod can chain running functions
//   amount: z.coerce. // convert the value to te type required (number)
//     number().min(1, { // check if number
//     message: "Amount must be at least 1" // add custom message
//   }),
//   description: z.string(). // check if string
//   min(1, {  // check if minimum length of string is 1
//     message: "The description is required" // add custom message
//   }),
//   created_at: z.string() // check if string
//   .refine(
//     // Date.parse returns a number miliseconds but created_at is a string to be parsed as date
//     // if Date.parse failed to convert value to number returns a NaN value it cant be parsed as date
//     val => !isNaN(Date.parse(val)),  // check if not NaN meaning if the value is a Number
//     {
//       message: "Date needs to contain a valid date" // add custom message valid date 2025-03-12
//     }
//   )
// })

import { z as zodValidation } from "zod";
import { categories, dateRangeValues, types } from "./constants";

export const settingsSchema = zodValidation.object({
  fullName: zodValidation.string().min(2), // string with minimum length 2 characters
  defaultView: zodValidation.enum(dateRangeValues), // validate date range 
});

export const transactionSchema = zodValidation
  .object({
    type: zodValidation.enum(types), // if types are predefined we use enum to match the predefined types
    // category: zodValidation.enum(categories), // if categories are predefined we use enum to match the predefined categories
    //category: zodValidation.string().optional(), // for optional category
    category: zodValidation.preprocess(
      (val) => (val?.length ? val : undefined),
      zodValidation.string().optional()
    ), // preproccess value and check if value has length return value else if empty string return undefined and pass it as optional string
    // zod can chain running functions
    amount: zodValidation.coerce // convert the value to te type required (number)
      .number()
      .min(1, {
        // check if number
        message: "Amount must be at least 1", // add custom message
      }),
    description: zodValidation
      .string() // check if string
      .optional(), // if we want the description to be optional
    // min(1, {  // check if minimum length of string is 1
    //   message: "The description is required" // add custom message
    // }),
    created_at: zodValidation
      .string() // check if string
      .refine(
        // Date.parse returns a number miliseconds but created_at is a string to be parsed as date
        // if Date.parse failed to convert value to number returns a NaN value it cant be parsed as date
        (val) => !isNaN(Date.parse(val)), // check if not NaN meaning if the value is a Number
        {
          message: "Date needs to contain a valid date", // add custom message valid date 2025-03-12
        }
      ),
  })
  .refine(
    (data) => {
      if (data.type === "Expense") {
        // if selected type is Expense
        return (
          data.category !== undefined && categories.includes(data.category)
        ); // category not undefined and predefined categories include the data object category
      }
      return true; // else return true / true is validated data and false not validated
    },
    // define error settings for path [category]
    {
      path: ["category"],
      message: "Category is required for Expense",
    }
  );
