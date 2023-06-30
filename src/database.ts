import { connect } from 'mongoose';

let urlConnect = '';

if (process.env.LOCAL_ENV === 'local') urlConnect = 'mongodb://localhost:27017/recipes-db'; // Mongo instalado manualmente
if (process.env.LOCAL_ENV === 'docker') urlConnect = 'mongodb://mongodb/recipes-db'; // Mongo instalado en Docker

export const startConnection = async() => {
  try {
    const db = await connect(urlConnect);
    console.log(db.connection.name)
  } catch (error) {
    console.log(error);
  }
}