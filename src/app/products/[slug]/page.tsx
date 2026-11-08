import Link from 'next/link';
import {notFound} from 'next/navigation';
import {products,type ImageKey} from '@/content/site';
import {Media} from '@/components/Media';
import {CTA} from '@/components/Shared';
import {whatsappUrl} from '@/lib/config';
import {seo} from '@/lib/seo';
export function generateStaticParams(){return products.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=products.find(p=>p.slug===slug);return p?seo(p.name,p.summary,`/products/${slug}`):{};}
export default async function Product({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=products.find(p=>p.slug===slug);if(!p)notFound();const wa=whatsappUrl(p.name);return <><section className="wrap product-detail section"><div><Link className="breadcrumb" href="/products">← All products</Link><div className="eyebrow">{p.category}</div><h1>{p.name}</h1><p className="lead">{p.summary}</p><p>{p.description}</p><div className="actions"><Link className="button" href={`/request-quote?product=${p.slug}`}>Request a Quote →</Link>{wa&&<a className="text-link" href={wa} target="_blank" rel="noopener noreferrer">Ask on WhatsApp →</a>}</div></div><Media image={p.image as ImageKey} priority caption/></section><section className="section tinted"><div className="wrap detail-grid"><div><div className="eyebrow">POTENTIAL APPLICATIONS</div><h2>A conversation<br/>about your needs.</h2><ul className="checks">{p.applications.map(a=><li key={a}>{a}</li>)}</ul></div><div className="spec-box"><h3>Who it’s for</h3><ul>{p.buyers.map(b=><li key={b}>{b}</li>)}</ul><hr/><h3>Technical specifications</h3><p>Available on request. Contact us for verified composition, available formats, packaging and application guidance.</p><p className="note">{p.note}</p></div></div></section><CTA/></>}
