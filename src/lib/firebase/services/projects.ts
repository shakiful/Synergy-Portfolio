
'use server';
import { db } from '@/lib/firebase/firebase';
import type { Project } from '@/lib/placeholder-data';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

const PROJECTS_COLLECTION = 'projects';

export async function getProjects(): Promise<Project[]> {
  try {
    const projectsCollection = collection(db, PROJECTS_COLLECTION);
    const q = query(projectsCollection, orderBy('createdAt', 'desc'));
    const projectsSnapshot = await getDocs(q);
    return projectsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
  } catch (error) {
    console.error("Error fetching projects: ", error);
    return [];
  }
}

export async function getProject(id: string): Promise<Project | null> {
  try {
    const projectDocRef = doc(db, PROJECTS_COLLECTION, id);
    const projectDoc = await getDoc(projectDocRef);
    if (projectDoc.exists()) {
      return { id: projectDoc.id, ...projectDoc.data() } as Project;
    }
    return null;
  } catch (error) {
    console.error("Error fetching project: ", error);
    return null;
  }
}

export async function addProject(projectData: Omit<Project, 'id' | 'createdAt'>): Promise<{success: boolean, id?: string, error?: string}> {
  try {
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
      ...projectData,
      createdAt: serverTimestamp()
    });
    revalidatePath('/admin/projects');
    revalidatePath('/projects');
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error("Error adding project: ", error);
    return { success: false, error: error.message };
  }
}

export async function updateProject(id: string, projectData: Partial<Omit<Project, 'id' | 'createdAt'>>): Promise<{success: boolean, error?: string}> {
  try {
    const projectDocRef = doc(db, PROJECTS_COLLECTION, id);
    await updateDoc(projectDocRef, projectData);
    revalidatePath('/admin/projects');
    revalidatePath(`/admin/projects/edit/${id}`);
    revalidatePath('/projects');
    return { success: true };
  } catch (error: any) {
    console.error("Error updating project: ", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProject(id: string): Promise<{success: boolean, error?: string}> {
  try {
    const projectDocRef = doc(db, PROJECTS_COLLECTION, id);
    await deleteDoc(projectDocRef);
    revalidatePath('/admin/projects');
    revalidatePath('/projects');
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting project: ", error);
    return { success: false, error: error.message };
  }
}
