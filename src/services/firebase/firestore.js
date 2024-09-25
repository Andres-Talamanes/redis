// src/firestore.js
import { db } from './firebase'; // Importa db configurado desde firebase.js
import { collection, addDoc } from 'firebase/firestore'; 

export async function insert(dash) {
  try {
    const response = await addDoc(collection(db, 'dashboard'), dash);
    console.log('Documento agregado con ID:', response.id);
    return response;
  } catch (error) {
    console.error('Error al agregar el documento:', error);
    throw error;
  }
}
