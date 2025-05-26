
'use server';
import { db } from '@/lib/firebase/firebase';
import type { BlogPost } from '@/lib/placeholder-data';
import { collection, getDocs, doc, getDoc, setDoc, deleteDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

const BLOG_COLLECTION = 'blogPosts';

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const postsCollection = collection(db, BLOG_COLLECTION);
    const q = query(postsCollection, orderBy('createdAt', 'desc')); // Assuming 'date' field for ordering
    const postsSnapshot = await getDocs(q);
    return postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
  } catch (error) {
    console.error("Error fetching blog posts: ", error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const postDocRef = doc(db, BLOG_COLLECTION, slug); // Slug is used as ID
    const postDoc = await getDoc(postDocRef);
    if (postDoc.exists()) {
      return { id: postDoc.id, ...postDoc.data() } as BlogPost;
    }
    return null;
  } catch (error) {
    console.error("Error fetching blog post: ", error);
    return null;
  }
}

// For blog posts, slug is the ID.
export async function addBlogPost(postData: Omit<BlogPost, 'id' | 'createdAt'>): Promise<{success: boolean, id?: string, error?: string}> {
  if (!postData.slug) return { success: false, error: "Slug is required." };
  try {
    const postDocRef = doc(db, BLOG_COLLECTION, postData.slug);
    await setDoc(postDocRef, {
      ...postData,
      date: new Date(postData.date).toISOString(), // Ensure date is stored consistently
      createdAt: serverTimestamp()
    });
    revalidatePath('/admin/blogs');
    revalidatePath('/blog');
    revalidatePath(`/blog/${postData.slug}`);
    return { success: true, id: postData.slug };
  } catch (error: any) {
    console.error("Error adding blog post: ", error);
    return { success: false, error: error.message };
  }
}

export async function updateBlogPost(slug: string, postData: Partial<Omit<BlogPost, 'id' | 'createdAt'>>): Promise<{success: boolean, error?: string}> {
  try {
    const postDocRef = doc(db, BLOG_COLLECTION, slug);
    const updateData = { ...postData };
    if (postData.date) {
      updateData.date = new Date(postData.date).toISOString();
    }
    await updateDoc(postDocRef, updateData);
    revalidatePath('/admin/blogs');
    revalidatePath(`/admin/blogs/edit/${slug}`);
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    return { success: true };
  } catch (error: any) {
    console.error("Error updating blog post: ", error);
    return { success: false, error: error.message };
  }
}

export async function deleteBlogPost(slug: string): Promise<{success: boolean, error?: string}> {
  try {
    const postDocRef = doc(db, BLOG_COLLECTION, slug);
    await deleteDoc(postDocRef);
    revalidatePath('/admin/blogs');
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`); // To clear the deleted page
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting blog post: ", error);
    return { success: false, error: error.message };
  }
}
