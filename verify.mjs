import fs from 'node:fs/promises';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const dist=path.join(root,'dist');
const context={window:{}};
vm.runInNewContext(await fs.readFile(path.join(dist,'data.js'),'utf8'),context);
vm.runInNewContext(await fs.readFile(path.join(dist,'study-core.js'),'utf8'),context);
const D=context.window.STUDY_DATA,C=context.window.StudyCore;
assert.equal(D.chapters.length,14);
assert.equal(D.terms.length,110);
assert.equal(D.quiz.length,30);
assert.equal(D.focus.length,11);
assert.equal(D.traces.length,5);
assert.equal(D.apiExercises.length,5);
for(const q of D.quiz){assert.equal(q.options.length,5);assert.ok(q.options.some(o=>o.key===q.correct));assert.ok(q.explanation.length>5);}
for(const arr of [D.chapters,D.terms,D.quiz,D.focus])assert.equal(new Set(arr.map(v=>v.id)).size,arr.length);
assert.equal(C.pagination(75,3,10).offset,20);
assert.equal(C.pagination(75,8,10).count,5);
assert.equal(C.pagination(75,9,10).count,0);
assert.equal(C.pagination(0,1,10).totalPages,0);
assert.equal(C.pagination(75,2,100).offset,100);
for(const args of [[-1,1,10],[75,0,10],[75,1,0],[75,1,101],[75,1.5,10],[75,1,NaN]])assert.equal(C.pagination(...args),null);
const invalid=C.safeState({read:[1,1,999,'x'],theme:'bad',size:500,answers:{1:'B',2:'<script>'},revealed:{1:true,2:true}});
assert.equal(JSON.stringify(invalid.read),'[1]');assert.equal(invalid.theme,'light');assert.equal(invalid.answers[2],undefined);assert.equal(invalid.revealed[2],undefined);
const answers={1:D.quiz[0].correct,2:D.quiz[1].correct==='A'?'B':'A'};
const grade=C.grade(D.quiz,answers,{1:true,2:true});
assert.equal(JSON.stringify(grade),JSON.stringify({answered:2,checked:2,correct:1,wrong:1}));
const publicText=await fs.readFile(path.join(dist,'data.js'),'utf8');
assert.doesNotMatch(publicText,/C:[/\\]|sirikanya|file:\/\//i);
for(const c of D.chapters){assert.ok(c.html.length>100);assert.doesNotMatch(c.html,/<script\b/i);}
const index=await fs.readFile(path.join(dist,'index.html'),'utf8');
for(const [,asset] of index.matchAll(/(?:src|href)="([^"#]+)"/g)){
 if(!asset.startsWith('http'))await fs.access(path.join(dist,asset));
}
const archive=path.join(dist,'backend-study-offline.zip');await fs.access(archive);
console.log('Content, links, 30 answer keys, storage validation, quiz grading and pagination boundaries passed.');
