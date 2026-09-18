import test from 'node:test';
import assert from 'node:assert/strict';
import {active,canTransition,normalizePhone,assertFuture} from '../dist/workflow.js';
test('active excludes closed leads',()=>{assert.equal(active({stage:'Initial'}),true);assert.equal(active({stage:'Booked'}),false);});
test('workflow transitions',()=>{assert.equal(canTransition('Initial','Verified'),true);assert.equal(canTransition('Booked','Initial'),false);});
test('phone normalization',()=>assert.equal(normalizePhone('+91 90000-00123'),'919000000123'));
test('future validation',()=>{assert.throws(()=>assertFuture('2026-09-17T00:00:00Z','2026-09-18T00:00:00Z'),/future/);assert.doesNotThrow(()=>assertFuture('2026-09-19T00:00:00Z','2026-09-18T00:00:00Z'));});
