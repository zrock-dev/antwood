"use client"
import styles from '@/styles/page.module.css'
import { useAuth } from "@/context/AuthContext";
export default function Home() {

  const { openAuthModal } = useAuth();

  return (
    <main className={styles.main}>
      HOME
      <button onClick={openAuthModal}>Login</button>
    </main>
  );
}
