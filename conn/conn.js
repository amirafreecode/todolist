const mongoose = require ("mongoose");
const conn = async () =>{
    try {
        await mongoose.connect("mongodb+srv://user:Di1DvCW5ZxK3XxPN@cluster0.xlphxda.mongodb.net/")
                    console.log("✅ Connected to MongoDB")
    } catch (error) {
      console.log("❌ MongoDB connection failed:", error.message);
    }
};
module.exports = conn;