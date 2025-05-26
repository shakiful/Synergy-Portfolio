
'use server';
import { db } from '@/lib/firebase/firebase';
import type { SkillCategory, Skill } from '@/lib/placeholder-data';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, serverTimestamp, arrayUnion, arrayRemove, query, orderBy } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

const SKILL_CATEGORIES_COLLECTION = 'skillCategories';

// --- Skill Categories ---
export async function getSkillCategories(): Promise<SkillCategory[]> {
  try {
    const categoriesCollection = collection(db, SKILL_CATEGORIES_COLLECTION);
    const q = query(categoriesCollection, orderBy('createdAt', 'asc'));
    const categoriesSnapshot = await getDocs(q);
    return categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SkillCategory));
  } catch (error) {
    console.error("Error fetching skill categories: ", error);
    return [];
  }
}

export async function getSkillCategory(id: string): Promise<SkillCategory | null> {
  try {
    const categoryDocRef = doc(db, SKILL_CATEGORIES_COLLECTION, id);
    const categoryDoc = await getDoc(categoryDocRef);
    if (categoryDoc.exists()) {
      return { id: categoryDoc.id, ...categoryDoc.data() } as SkillCategory;
    }
    return null;
  } catch (error) {
    console.error("Error fetching skill category: ", error);
    return null;
  }
}

export async function addSkillCategory(categoryData: Pick<SkillCategory, 'title'>): Promise<{success: boolean, id?: string, error?: string}> {
  try {
    const docRef = await addDoc(collection(db, SKILL_CATEGORIES_COLLECTION), {
      ...categoryData,
      skills: [], // Initialize with empty skills array
      createdAt: serverTimestamp()
    });
    revalidatePath('/admin/skills');
    revalidatePath('/skills');
    return { success: true, id: docRef.id };
  } catch (error: any) {
    console.error("Error adding skill category: ", error);
    return { success: false, error: error.message };
  }
}

export async function updateSkillCategory(id: string, categoryData: Pick<SkillCategory, 'title'>): Promise<{success: boolean, error?: string}> {
  try {
    const categoryDocRef = doc(db, SKILL_CATEGORIES_COLLECTION, id);
    await updateDoc(categoryDocRef, categoryData);
    revalidatePath('/admin/skills');
    revalidatePath(`/admin/skills/categories/edit/${id}`);
    revalidatePath('/skills');
    return { success: true };
  } catch (error: any) {
    console.error("Error updating skill category: ", error);
    return { success: false, error: error.message };
  }
}

export async function deleteSkillCategory(id: string): Promise<{success: boolean, error?: string}> {
  try {
    const categoryDocRef = doc(db, SKILL_CATEGORIES_COLLECTION, id);
    await deleteDoc(categoryDocRef);
    revalidatePath('/admin/skills');
    revalidatePath('/skills');
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting skill category: ", error);
    return { success: false, error: error.message };
  }
}

// --- Skills within a Category ---
// Skills are stored as an array within the category document.
// Each skill in the array should have a unique ID for easier management if needed,
// or be identified by its name if names are unique within a category.
// For simplicity, we'll use a generated ID for skills.

export async function addSkillToCategory(categoryId: string, skillData: Omit<Skill, 'id'>): Promise<{success: boolean, error?: string}> {
  try {
    const categoryDocRef = doc(db, SKILL_CATEGORIES_COLLECTION, categoryId);
    const newSkill: Skill = {
      id: doc(collection(db, '_')).id, // Generate a unique ID for the skill
      ...skillData
    };
    await updateDoc(categoryDocRef, {
      skills: arrayUnion(newSkill)
    });
    revalidatePath('/admin/skills');
    revalidatePath('/skills');
    return { success: true };
  } catch (error: any) {
    console.error("Error adding skill to category: ", error);
    return { success: false, error: error.message };
  }
}

// To update a skill, you'd typically fetch the category, modify the skill in the array, and update the whole array.
// This can be complex. For now, focus on add/delete. Edit can be by deleting and re-adding.

export async function deleteSkillFromCategory(categoryId: string, skillId: string): Promise<{success: boolean, error?: string}> {
  try {
    const categoryDocRef = doc(db, SKILL_CATEGORIES_COLLECTION, categoryId);
    const category = await getSkillCategory(categoryId);
    if (!category) {
      return { success: false, error: 'Category not found' };
    }
    const updatedSkills = category.skills.filter(skill => skill.id !== skillId);
    await updateDoc(categoryDocRef, {
      skills: updatedSkills
    });
    revalidatePath('/admin/skills');
    revalidatePath('/skills');
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting skill from category: ", error);
    return { success: false, error: error.message };
  }
}
