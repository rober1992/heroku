import mongoose from 'mongoose';

export async function dbConnection() {
    try {
        const URLhost = "mongodb://localhost:27017/coderhouse";
        let connection = await mongoose.connect(URLhost);
        console.log('Base de datos conectada');
    }   catch (error) {
		console.log(error);
    }
}