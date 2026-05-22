'use client';
import dynamic from 'next/dynamic';
const CategoryPage = dynamic(() => import('@/app/components/CategoryPage'), { ssr: false });
export default function DisplaysPage() { return <CategoryPage category="displays" />; }