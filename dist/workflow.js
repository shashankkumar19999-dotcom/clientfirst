// Home Locator workflow helpers
export const active=lead=>!['Booked','Lost','Not Interested','Cancelled'].includes(lead?.stage);
export const WORKFLOW={
 Initial:{next:['Contacting','Verified']},
 Contacting:{next:['Qualified','RNR','Not Interested']},
 Qualified:{next:['Site Visit Scheduled','Booked','Lost']},
 Verified:{next:['Site Visit Scheduled','Booked','Lost']},
 'Site Visit Scheduled':{next:['Site Visit Done','Cancelled']},
 'Site Visit Done':{next:['Booked','Lost']},
 Booked:{next:[]},Lost:{next:[]},'Not Interested':{next:[]}
};
export const canTransition=(from,to)=>WORKFLOW[from]?.next?.includes(to)||from===to;
export const normalizePhone=v=>String(v??'').replace(/\D/g,'');
export const openTaskFor=(state,leadId)=>state.tasks.find(t=>t.leadId===leadId&&t.status==='Open');
export const assertFuture=(value,now)=>{if(!value||Date.parse(value)<=Date.parse(now))throw Error('Next follow-up must be in the future.');};
