'use client';
import { Item } from '../../interfaces/pages/item/item';

export default async function getItemData(id: string): Promise<Item> {
  const response = await fetch(encodeURI(`/database/${id}/index.json`));
  if (!response.ok) throw new Error('Failed to fetch item data');
  return await response.json();
}