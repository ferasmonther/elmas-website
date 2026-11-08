import type {MetadataRoute} from 'next';
import {siteUrl} from '@/lib/config';
import {products} from '@/content/site';
export default function sitemap():MetadataRoute.Sitemap {const base=siteUrl();if(!base)return [];return ['/','/products',...products.map(p=>`/products/${p.slug}`),'/about','/sustainability','/contact','/request-quote','/privacy'].map(path=>({url:base+path}));}
