import { connect } from 'mongoose';

export const startConnection = async() => {
  try {
    // const db = await connect('mongodb://localhost/recipes-db'); // Mongo instalado manualmente
    const db = await connect('mongodb://mongodb/recipes-db'); // Mongo instalado en Docker
    console.log(db.connection.name)
  } catch (error) {
    console.log(error);
  }
}