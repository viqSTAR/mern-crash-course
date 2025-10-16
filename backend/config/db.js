import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);  // Assuming MONGO_URI is an environment variable for your MongoDB connection URI
    console.log(`MongoDB Connected: $(conn.connection.host)`); // Replace $(conn.connection.host) with actual host name
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1); // Exit the process with an error status if connection fails
  }

}