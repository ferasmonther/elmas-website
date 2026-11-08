import Image from 'next/image';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { images, type ImageKey } from '@/content/site';
export function Media({image,className='',priority=false,caption=false}:{image:ImageKey;className?:string;priority?:boolean;caption?:boolean}) {
 const item=images[image]; const present=existsSync(join(process.cwd(),'public/assets/photos',item.file));
 return <figure className={`media ${className}`}>
 {present?<Image src={`/assets/photos/${item.file}`} alt={item.alt} fill sizes="(max-width: 760px) 100vw, 60vw" priority={priority}/>:<div className="awaiting"><span>ELMA’S · LEBANON</span><p>Company photography</p><small>Image file awaiting import</small></div>}
 {caption&&present&&<figcaption>{item.caption}</figcaption>}
 </figure>;
}
