'use client';
import React, { use } from 'react';

export default function OrdersPage({ dataPromise }) {
  const data = use(dataPromise);
  console.log(data);

  return <div></div>;
}
