import {z} from 'zod';
const text=(min:number,max:number)=>z.string().trim().min(min).max(max);
export const inquirySchema=z.object({kind:z.enum(['contact','quote']),name:text(2,120),company:text(0,160).default(''),email:z.email().max(254),phone:text(0,50).default(''),product:z.enum(['','bsfl-protein','bsfl-frass','vermicompost']).default(''),quantity:text(0,30).default(''),unit:z.enum(['','kg','tonnes','other']).default(''),location:text(0,200).default(''),message:text(10,4000),consent:z.literal(true),website:z.string().max(200).default('')}).superRefine((v,c)=>{if(v.kind==='quote'){for(const key of ['company','phone','product','quantity','unit','location'] as const){if(!v[key])c.addIssue({code:'custom',path:[key],message:'Please complete this field.'});}if(v.quantity&&(!Number.isFinite(Number(v.quantity))||Number(v.quantity)<=0))c.addIssue({code:'custom',path:['quantity'],message:'Enter a quantity greater than zero.'});}});
export class RateLimiter {
 private entries=new Map<string,{count:number;until:number}>();
 constructor(private limit=5,private window=15*60*1000){}
 take(key:string,now=Date.now()) {for(const [k,v] of this.entries)if(v.until<=now)this.entries.delete(k);const old=this.entries.get(key);if(old&&old.count>=this.limit)return false;if(!old&&this.entries.size>=10000)return false;this.entries.set(key,{count:(old?.count??0)+1,until:old?.until??now+this.window});return true;}
}
export const limiter=new RateLimiter();
