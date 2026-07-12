import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";


const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("BlueCrown");


export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: { 
    enabled: true, 
  }, 
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "supporter", 
      },
      credit: {
        type: "number", // সংখ্যা সেভ করার জন্য টাইপ number
        required: false,
        defaultValue: 0,
        input: true, // ফ্রন্টএন্ড থেকে ইনপুট নেওয়ার জন্য
      },
        //  plan:{
        //         default: "seeker_free"
        //     }
    },
  },
});