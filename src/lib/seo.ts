import type { Metadata } from 'next';
import { siteUrl } from './config';
export function seo(title:string, description:string, path:string): Metadata {
 const url=siteUrl();
 return {title,description,alternates:url?{canonical:url+path}:undefined,openGraph:{title:`${title} | Elma’s`,description,type:'website',locale:'en_US',...(url?{url:url+path}:{})},twitter:{card:'summary_large_image',title,description}};
}
