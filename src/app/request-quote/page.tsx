import {Intro} from '@/components/Shared';
import {InquiryForm} from '@/components/InquiryForm';
import {products} from '@/content/site';
import {emailReady,whatsappUrl} from '@/lib/config';
import {seo} from '@/lib/seo';
export const dynamic='force-dynamic';
export const metadata=seo('Request a Quote','Request a tailored quotation for BSFL protein, BSFL frass or vermicompost. Tell Elma’s about your requirements.','/request-quote');
export default async function Quote({searchParams}:{searchParams:Promise<{product?:string}>}){const query=await searchParams;const p=products.find(p=>p.slug===query.product);const wa=whatsappUrl(p?.name);return <><Intro tag="REQUEST A QUOTE" title="What does your next season need?">Share your requirements. We’ll discuss availability, specifications and a quotation for your application.</Intro><section className="wrap form-layout section"><aside><h2>A little detail.<br/>A better conversation.</h2><p>Include your intended use, approximate quantity and delivery location so we can understand your needs.</p><p className="note">This is an inquiry, not an order. Availability and product suitability will be discussed with you.</p>{wa&&<a className="text-link" href={wa} target="_blank" rel="noopener noreferrer">Prefer WhatsApp? →</a>}</aside><InquiryForm kind="quote" product={p?.slug} ready={emailReady()}/></section></>}
