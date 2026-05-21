'use client';
import dynamic from 'next/dynamic';
const CategoryPage = dynamic(() => import('@/app/components/CategoryPage'), { ssr: false });
export default function AccessoriesPage() { return <CategoryPage category="accessories" />; }
