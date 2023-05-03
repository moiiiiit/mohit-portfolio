import { getFirestore, doc, getDoc, getDocs, collection } from "firebase/firestore";
import firebase_app from "./clientApp";

const db = getFirestore(firebase_app);

export async function getDocument(collection: string, id: string) {
    let docRef = doc(db, collection, id);

    let result = null;
    let error = null;

    try {
        result = await getDoc(docRef);
    } catch (e) {
        error = e;
    }

    return { result, error };
}

export async function getCollection(collectionName: string): Promise<any> {
    let result = null;
    let error = null;

    try {
        result = await getDocs(collection(db, collectionName));
    } catch (e) {
        error = e;
    }

    return { result, error };
}