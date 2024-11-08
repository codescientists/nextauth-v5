import mongoose from 'mongoose';
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database connection established: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error in DB connection: ${error.message}`);
        process.exit(1); // Exit with failure
    }
}

export default connectDB;