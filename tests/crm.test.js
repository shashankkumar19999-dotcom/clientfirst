import test from 'node:test';
import assert from 'node:assert/strict';
import {seedCRM,applyCRM,parseCSV} from '../dist/crm.js';
const now='2026-09-18T08:00:00Z';
test('seed creates leads and open tasks',()=>{const s=seedCRM(now);assert.ok(s.leads.length>0);assert.ok(s.tasks.length>0);});
test('create lead and reject duplicate phone',()=>{let s=seedCRM(now);const r=applyCRM(s,{type:'createLead',data:{name:'New',phone:'9998887777',source:'Manual'}},now);assert.equal(r.state.leads.at(-1).name,'New');assert.throws(()=>applyCRM(r.state,{type:'createLead',data:{name:'Dup',phone:'999-888-7777'}},now),/already exists/);});
test('call schedules follow-up',()=>{const s=seedCRM(now);const l=s.leads[0];const r=applyCRM(s,{type:'call',leadId:l.id,data:{outcome:'Connected',notes:'Answered',next:'2026-09-19T08:00:00Z'}},now);assert.equal(r.state.leads[0].stage,'Qualified');assert.equal(r.state.tasks.filter(t=>t.leadId===l.id&&t.status==='Open').length,1);});
test('RNR keeps lead active',()=>{const s=seedCRM(now);const l=s.leads[0];const r=applyCRM(s,{type:'call',leadId:l.id,data:{outcome:'RNR',notes:'No answer',next:'2026-09-19T08:00:00Z'}},now);assert.equal(r.state.leads[0].stage,'Contacting');});
test('CSV parser returns rows',()=>assert.deepEqual(parseCSV('name,phone\nA,1'),[['name','phone'],['A','1']]));
