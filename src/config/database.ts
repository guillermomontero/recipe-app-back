import { connect } from 'mongoose';

let urlConnect = '';

if (process.env.LOCAL_ENV === 'local') urlConnect = process.env.MONGO_URL || ''; // Mongo instalado manualmente
if (process.env.LOCAL_ENV === 'docker') urlConnect = process.env.MONGO_URL_DOCKER || ''; // Mongo instalado en Docker

export const startConnection = async() => {
  try {
    const db = await connect(urlConnect);
    console.log(db.connection.name)
  } catch (error) {
    console.log(error);
  }
}