import { db } from "../../config/firebaseConfig";
import { Firestore, DocumentReference, QuerySnapshot, DocumentSnapshot, Transaction } from "firebase-admin/firestore";

export const createDocument = async <T>(
  collectionName: string,
  data: Partial<T>,
  id?: string
): Promise<string> => {
  try {
    let docRef: FirebaseFirestore.DocumentReference;

    if (id) {
      docRef = db.collection(collectionName).doc(id);
      await docRef.set(data);
    } else {
      docRef = await db.collection(collectionName).add(data);
    }

    return docRef.id;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(
      `Failed to create document in ${collectionName}: ${errorMessage}`
    );
  }
};

/**
 * Retrieves all documents from a specified Firestore collection.
 */
export const getDocuments = async <T>(
  collectionName: string
): Promise<FirebaseFirestore.QuerySnapshot<T>> => {
  try {
    return (await db
      .collection(collectionName)
      .get()) as FirebaseFirestore.QuerySnapshot<T>;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(
      `Failed to fetch documents from ${collectionName}: ${errorMessage}`
    );
  }
};

/**
 * Retrieves a document by its ID.
 */
export const getDocumentById = async <T>(
  collectionName: string,
  id: string
): Promise<FirebaseFirestore.DocumentSnapshot<T> | null> => {
  try {
    const doc = (await db
      .collection(collectionName)
      .doc(id)
      .get()) as FirebaseFirestore.DocumentSnapshot<T>;
    return doc?.exists ? doc : null;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(
      `Failed to fetch document ${id} from ${collectionName}: ${errorMessage}`
    );
  }
};

/**
 * Updates an existing document in Firestore.
 */
export const updateDocument = async <T>(
  collectionName: string,
  id: string,
  data: Partial<T>
): Promise<void> => {
  try {
    await db.collection(collectionName).doc(id).update(data);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(
      `Failed to update document ${id} in ${collectionName}: ${errorMessage}`
    );
  }
};

/**
 * Deletes a document from a Firestore collection.
 */
export const deleteDocument = async (
  collectionName: string,
  id: string,
  transaction?: FirebaseFirestore.Transaction
): Promise<void> => {
  try {
    const docRef = db.collection(collectionName).doc(id);
    if (transaction) {
      transaction.delete(docRef);
    } else {
      await docRef.delete();
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(
      `Failed to delete document ${id} from ${collectionName}: ${errorMessage}`
    );
  }
};
