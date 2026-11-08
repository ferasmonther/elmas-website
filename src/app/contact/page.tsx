import Link from 'next/link';
import {Intro} from '@/components/Shared';
import {InquiryForm} from '@/components/InquiryForm';
import {emailReady,whatsappUrl,publicEmail} from '@/lib/config';
import {seo} from '@/lib/seo';
export const dynamic='force-dynamic';
export const metadata=seo('Contact','Contact Elma’s in Lebanon to discuss insect protein, organic fertilizers and agricultural product inquiries.','/contact');
export default function Contact(){const email=publicEmail(),wa=whatsappUrl();return <><Intro tag="CONTACT" title="Good things start with a conversation.">Questions about our products, availability or an agricultural application? Tell us what you have in mind.</Intro><section className="wrap form-layout section"><aside><div className="eyebrow">FIND US</div><h2>Rooted in Lebanon.</h2><p>For product-specific requirements, our quote form helps us understand your needs.</p><Link className="text-link" href="/request-quote">Request a Quote →</Link><hr/>{email&&<p><a href={`mailto:${email}`}>{email}</a></p>}{wa&&<p><a className="text-link" href={wa} target="_blank" rel="noopener noreferrer">Chat on WhatsApp →</a></p>}{!email&&!wa&&<p>Direct contact details will be added here when confirmed.</p>}</aside><InquiryForm kind="contact" ready={emailReady()}/></section></>}
