// import { createClient } from "@supabase/supabase-js"; // import supabase client
// import dotenv from "dotenv"; // import dotenv library
// import { faker } from "@faker-js/faker"; // import faker for development test

// dotenv.config({ path: ".env.local" }); // load the config of specific .env.local file explicitly

// // create supabase client to bypass the security and allow CRUD operations
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL, // supabase url
//   process.env.SUPABASE_SERVICE_ROLE_KEY // supabase role secret key
// );


// // add the preselected categories
// const categories = [
//   "Housing",
//   "Transport",
//   "Health",
//   "Food",
//   "Education",
//   "Other",
// ];

// // async function seedUsers() {
// //   for (let i = 0; i < 5; i++) {
// //     try {
// //       const { error } = await supabase.auth.admin.createUser({
// //         email: faker.internet.email(),
// //         password: 'password',
// //       })
      
// //       if (error) {
// //         throw new Error(error)
// //       }

// //       console.log(`User added`)
// //     } catch (e) {
// //       console.error(`Error adding user`)
// //     }
// //   }
// // }


// async function seedUsers() {
//   for (let i = 0; i < 5; i++) {
//     const email = faker.internet.email();
//     const username = faker.internet.email(); // σωστά με ()
//     const password = 'password';

//     const { data, error } = await supabase.auth.admin.createUser({
//       email,
//       password,
//       email_confirm: true,       // mark email as confirmed
//       user_metadata: { username }
//     });

//     if (error) {
//       console.error('Error adding user:', error.message);
//     } else {
//       console.log('User added:', data.user.email);
//     }
//   }
// }

// // create function to generate and add records to the database
// async function seed() {
//   await seedUsers(); // create random users

//   let transactions = []; // initialize transactions array

//   const { data: { users }, error: listUsersError } = await supabase.auth.admin.listUsers(); // get all users

//   // if no users stop the execution
//   if (listUsersError) {
//     console.error(`Cannot list users, aborting`)
//     return
//   }

//   const userIds = users?.map(user => user.id); // get object with users ids

//   const transactionsLength = 100; // add 100 transactions
//   for (let i = 0; i < transactionsLength; i++) {
//     const created_at = faker.date.past(); // initialize created_at date values from the past 10 times with fakerjs https://fakerjs.dev/api/date.html#past
//     let type,
//       category = null; // initialize type and category

//     const user_id = faker.helpers.arrayElement(userIds); // get a user for every transaction

//     const calcType = Math.random(); // calculate type

//     if (calcType < 0.8) {
//       //expense
//       type = "Expense";
//       category = faker.helpers.arrayElement(
//         // random choose between the categories array elements'
//         categories
//       );
//     } else if (calcType < 0.9) {
//       // income
//       type = "Income";
//     } else {
//       type = faker.helpers.arrayElement([
//         // random choose between the array elements of my choise which are the rest 'Saving', 'Investment'
//         "Saving",
//         "Investment",
//       ]);
//     }

//     // https://fakerjs.dev/api/number.html
//     let amount;
//     switch (type) {
//       case "Income":
//         amount = faker.number.int({
//           min: 15,
//           max: 500,
//         });
//         break;
//       case "Expense":
//         amount = faker.number.int({
//           min: 1,
//           max: 1000,
//         });
//         break;
//       case "Investment":
//       case "Saving":
//         amount = faker.number.int({
//           min: 12,
//           max: 2500,
//         });
//         break;
//     }

//     // push the values to the transactions array
//     transactions.push({
//       created_at,
//       amount,
//       type,
//       description: faker.lorem.sentence(), // randomize description
//       category,
//       user_id
//     });
//   }

//   // insert the data to the database
//   const { error } = await supabase.from("transactions").insert(transactions);

//   // check and display error
//   if (error) {
//     console.error("Error inserting data");
//   } else {
//     // console.log("Data inserted");
//     console.log(`${transactions.length} transactions stored`)
//   }
// }

// seed().catch(console.error); // execute seed function and catch errors


import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";

dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * ⛔ ΒΑΛΕ ΕΔΩ ΤΟ REAL USER ID ΣΟΥ
 */
const REAL_USER_ID = "a4b55913-bd04-4688-abea-848fd776579a";

/**
 * Categories
 */
const categories = [
  "Housing",
  "Transport",
  "Health",
  "Food",
  "Education",
  "Other",
];

/**
 * Create fake users
 */
async function seedUsers(count = 5) {
  console.log("👤 Creating fake users...");

  for (let i = 0; i < count; i++) {
    const email = faker.internet.email();
    const password = "password";

    const { error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        username: faker.internet.username(),
      },
    });

    if (error) {
      console.error("❌ User create error:", error.message);
    } else {
      console.log("✅ User created:", email);
    }
  }
}

/**
 * Get ALL users (pagination fix)
 */
async function getAllUsers() {
  let users = [];
  let page = 1;
  const perPage = 1000;

  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({
      page,
      perPage,
    });

    if (error) throw error;

    users.push(...data.users);

    if (data.users.length < perPage) break;
    page++;
  }

  return users;
}

/**
 * Seed transactions ONLY for fake users
 */
async function seedTransactions() {
  const users = await getAllUsers();

  const fakeUsers = users.filter(
    (u) => u.id !== REAL_USER_ID
  );

  if (fakeUsers.length === 0) {
    console.log("⚠️ No fake users found. Abort.");
    return;
  }

  const userIds = fakeUsers.map((u) => u.id);

  console.log(`💳 Seeding transactions for ${userIds.length} fake users...`);

  const transactions = [];

  const TRANSACTIONS_COUNT = 100;

  for (let i = 0; i < TRANSACTIONS_COUNT; i++) {
    const created_at = faker.date.past();

    let type;
    let category = null;

    const user_id = faker.helpers.arrayElement(userIds);

    const calcType = Math.random();

    if (calcType < 0.8) {
      type = "Expense";
      category = faker.helpers.arrayElement(categories);
    } else if (calcType < 0.9) {
      type = "Income";
    } else {
      type = faker.helpers.arrayElement(["Saving", "Investment"]);
    }

    let amount;

    switch (type) {
      case "Income":
        amount = faker.number.int({ min: 15, max: 500 });
        break;
      case "Expense":
        amount = faker.number.int({ min: 1, max: 1000 });
        break;
      default:
        amount = faker.number.int({ min: 12, max: 2500 });
    }

    transactions.push({
      user_id,
      created_at,
      amount,
      type,
      category,
      description: faker.lorem.sentence(),
    });
  }

  const { error } = await supabase
    .from("transactions")
    .insert(transactions);

  if (error) {
    console.error("❌ Insert error:", error.message);
  } else {
    console.log(`✅ ${transactions.length} transactions inserted`);
  }
}

/**
 * MAIN
 */
async function seed() {
  console.log("🌱 Seeding started...\n");

  await seedUsers(5);
  await seedTransactions();

  console.log("\n🎉 Seeding completed successfully");
}

seed().catch(console.error);

