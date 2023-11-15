'use client'
import React from 'react';
import Link from 'next/link';
import styles from '../../styles/product/product_details.css';

const ShoppingCart = () => {
  return (
    <div className={styles.cart-container}>
      {/* Lado Izquierdo */}
      <div className={styles.left-side}>
        {/* Items) */}
      </div>

      {/* Lado Derecho */}
      <div className={styles.right-side}>
        {/* Parte Superior del Lado Derecho) */}
        <div className={styles.upper-right}>
          {/* Order Summary */}
        </div>

        {/* Parte Inferior del Lado Derecho */}
        <div className={styles.lower-right}>
          <Link href="/">
             <button className={styles.cancel-button}>Cancel</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;