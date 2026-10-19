'use strict';
(() => {
  const D = window.STUDY_DATA;
  const C = window.StudyCore;
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const escape = v => String(v).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const key = 'int161-reading-room-v1';
  let stored;
  try { stored = JSON.parse(localStorage.getItem(key) || 'null'); } catch { stored = null; }
  let state = C.safeState(stored);
  let quizWrongOnly = false;
  let toastTimer;
  let currentPage = 'home';
  const lessons = D.chapters.filter(c => c.id <= 13);
  const iconPaths = {
    home: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    lessons: '<path d="M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1m0-15c3-2 6-2 9-1v15c-3-1-6-1-9 1V5z"/>',
    focus: '<path d="m12 3 2.8 5.8 6.4.9-4.6 4.5 1.1 6.4-5.7-3-5.7 3 1.1-6.4-4.6-4.5 6.4-.9z"/>',
    glossary: '<path d="M4 4h13a3 3 0 0 1 3 3v14H6a3 3 0 0 1-3-3V5a1 1 0 0 1 1-1zm0 13h16M8 8h7m-7 4h5"/>',
    quiz: '<rect x="5" y="4" width="15" height="17" rx="2"/><path d="M9 4V2h7v2m-7 7 2 2 4-4m-6 9h7"/>',
    practice: '<path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 20"/>',
    plan: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18m-13 4h2m4 0h2"/>'
  };
  const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.lessons}</svg>`;
  const nav = [['home', 'เริ่มอ่านที่นี่'], ['lessons', 'บทเรียนทั้งหมด', '13'], ['focus', 'อาจารย์เน้นอะไร', '11'], ['glossary', 'คำศัพท์ต้องรู้', '110'], ['quiz', 'ฝึกทำปรนัย', '30'], ['practice', 'ฝึกเขียน API'], ['plan', 'แผนอ่านก่อนสอบ']];
  function persist() { try { localStorage.setItem(key, JSON.stringify(state)); } catch { /* Reading remains available when storage is blocked. */ } }
  function announce(t) { $('#announcer').textContent = t; }
  function toast(t) { const el = $('#toast'); el.textContent = t; el.hidden = false; clearTimeout(toastTimer); toastTimer = setTimeout(() => { el.hidden = true; }, 2300); }
  function updateShell() {
    $('#primary-nav').innerHTML = nav.map(([id, label, count]) => `<a class="nav-link" href="#/${id}" ${id === currentPage || (currentPage === 'lesson' && id === 'lessons') ? 'aria-current="page"' : ''}>${icon(id)}<span>${label}</span>${count ? `<span class="nav-count">${count}</span>` : ''}</a>`).join('');
    $('#progress-count').textContent = `${state.read.length} / 13`;
    $('#reading-progress').value = state.read.length;
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.style.setProperty('--reading-size', `${state.size}px`);
    $('#theme-toggle').textContent = state.theme === 'dark' ? '☀' : '☾';
    $('#theme-toggle').setAttribute('aria-label', state.theme === 'dark' ? 'ใช้โหมดสว่าง' : 'ใช้โหมดกลางคืน');
    $('#theme-toggle').setAttribute('aria-pressed', String(state.theme === 'dark'));
  }
  function pageHead(eyebrow, title, description = '') { return `<header class="page-head"><div class="eyebrow">${eyebrow}</div><h1>${title}</h1>${description ? `<p>${description}</p>` : ''}</header>`; }
  function lessonCard(c) {
    const done = state.read.includes(c.id);
    return `<a class="lesson-card" href="#/lesson/${c.id}"><div class="card-top"><span class="lesson-number">${String(c.id).padStart(2, '0')}</span><span class="time-label">${c.minutes} นาที</span></div><h3>${escape(c.short)}</h3><p>${escape(c.description)}</p><div class="card-footer"><span>${done ? '✓ อ่านแล้ว' : 'เปิดบทเรียน'}</span><span aria-hidden="true">↗</span></div></a>`;
  }
  function home() {
    const next = lessons.find(c => !state.read.includes(c.id)) || lessons[0];
    return `<div class="eyebrow">YOUR QUIET CORNER TO UNDERSTAND BACKEND</div>
      <section class="hero"><div class="hero-content"><div class="eyebrow">INT161 · BASIC BACKEND DEVELOPMENT</div><h1>เข้าใจ Backend<br><span>ทีละเรื่อง ทีละบท</span></h1><p>จากสไลด์และคำอธิบายของอาจารย์ G1 / G2<br>มาเป็นพื้นที่อ่าน ทบทวน และลองทำ ก่อนวันสอบ</p><div class="hero-actions"><a class="button primary" href="#/lesson/${next.id}">${state.read.length ? 'อ่านบทถัดไป' : 'เริ่มอ่านบทแรก'} <span aria-hidden="true">→</span></a><a class="button secondary" href="#/focus">ดูสิ่งที่อาจารย์เน้น</a></div></div>
      <div class="hero-visual"><div class="flow-caption">ONE REQUEST, A WHOLE JOURNEY.</div><div class="flow-steps">${[['router','Router','รับคำขอ'],['service','Service','ใช้กฎระบบ'],['repo','Repository','เข้าถึงข้อมูล']].map(([id,name,th],i)=>`${i ? '<span class="flow-arrow" aria-hidden="true">→</span>' : ''}<button type="button" class="flow-node ${i===0?'active':''}" data-flow="${id}" aria-pressed="${i===0}">${name}<span>${th}</span></button>`).join('')}</div><div id="flow-explanation" class="flow-explanation"><strong>01 · Router / Controller</strong><p>อ่าน method, params, query และ body<br>เรียก Service แล้วตอบ HTTP status + JSON</p></div><div class="flow-return">← response ผ่าน DTO กลับสู่ Client</div></div></section>
      <div class="stats"><div class="stat"><strong>13</strong><span>บทเรียน<br>เชื่อมทุกเรื่องเข้าด้วยกัน</span></div><div class="stat"><strong>110</strong><span>คำศัพท์<br>พร้อมความหมายภาษาไทย</span></div><div class="stat"><strong>30</strong><span>ข้อปรนัย<br>เฉลยพร้อมเหตุผล</span></div><div class="stat"><strong>G1/2</strong><span>คำอธิบายอาจารย์<br>จาก transcript 20 ไฟล์</span></div></div>
      <div class="section-head"><h2>เริ่มจากพื้นฐานที่เชื่อมกัน</h2><a href="#/lessons">ดูครบทั้ง 13 บท <span aria-hidden="true">→</span></a></div><div class="lesson-grid">${lessons.slice(0,6).map(lessonCard).join('')}</div>
      <div class="section-head"><h2>อ่านแล้ว ลองเปลี่ยนเป็นความเข้าใจ</h2></div><div class="grid-two"><section class="bottom-callout"><div><span class="tag">ทบทวนทฤษฎี</span><h3>ตอบได้ เพราะเข้าใจเหตุผล</h3><p>ปรนัย 5 ตัวเลือก พร้อมเฉลยทีละข้อ</p></div><a class="button subtle" href="#/quiz">เริ่มทำข้อสอบ →</a></section><section class="bottom-callout"><div><span class="priority-chip">ฝึกปฏิบัติ</span><h3>ไล่ข้อมูลให้ถึงฐานข้อมูล</h3><p>อ่านโค้ด ฝึก API และทดลอง pagination</p></div><a class="button subtle" href="#/practice">ไปลองเขียน →</a></section></div>
      <div class="section-head"><h2>มีเวลา 2 วัน เริ่มตรงไหนดี</h2><a href="#/plan">เปิดแผนอ่าน →</a></div><div class="notice"><strong>รู้ไว้ก่อนซ้อม:</strong> ใช้โจทย์ <strong>Week-08</strong> เป็นหลัก อาจารย์ระบุว่า Week-09 ใส่มาผิดวิชาเป็นของ INT261 <a href="#/focus">อ่านหลักฐานจาก transcript</a></div>`;
  }
  function lessonsPage() { return `${pageHead('THE COMPLETE READING PATH', 'บทเรียนทั้งหมด', 'อ่านเรียงตั้งแต่ต้น หรือเลือกเรื่องที่ยังไม่มั่นใจ แต่ละบทมีทั้งแนวคิด ตัวอย่าง และจุดที่ควรระวัง')}<div class="lesson-grid">${lessons.map(lessonCard).join('')}</div>`; }
  function lessonPage(id) {
    const c = lessons.find(c => c.id === id);
    if (!c) return empty('ไม่พบบทเรียนนี้', 'กลับไปเลือกบทเรียนที่ต้องการ', '#/lessons');
    state.last = c.id; persist();
    return `<div class="reader-top"><a href="#/lessons" class="back-link">← บทเรียนทั้งหมด</a><div class="reader-tools"><button type="button" data-font="-1" aria-label="ลดขนาดตัวอักษร">A−</button><button type="button" data-font="1" aria-label="เพิ่มขนาดตัวอักษร">A+</button><button type="button" id="focus-mode" aria-pressed="${document.body.classList.contains('focus-mode')}">${document.body.classList.contains('focus-mode') ? 'ออกจากโหมดอ่าน' : 'โหมดอ่าน'}</button><button type="button" id="print-lesson" aria-label="พิมพ์บทเรียนนี้">พิมพ์</button></div></div><div class="reader-layout"><div class="article-shell"><header class="article-heading"><div class="eyebrow">LESSON ${String(c.id).padStart(2,'0')} / 13 · ${c.minutes} MIN READ</div><h1>${escape(c.title)}</h1><p>${escape(c.description)}</p></header><article class="reading-article" id="lesson-content">${c.html}</article><div class="chapter-complete"><div><strong>${state.read.includes(id) ? 'บทนี้อ่านแล้ว' : 'พร้อมไปต่อหรือยัง'}</strong><p>ลองอธิบายสิ่งที่อ่านด้วยคำของตัวเอง แล้วค่อยทำเครื่องหมาย</p></div><button type="button" class="button ${state.read.includes(id)?'secondary':'primary'}" id="complete-lesson" data-id="${id}" aria-pressed="${state.read.includes(id)}">${state.read.includes(id) ? '✓ อ่านแล้ว · ยกเลิกได้' : 'ทำเครื่องหมายว่าอ่านแล้ว'}</button></div><nav class="chapter-navigation" aria-label="บทก่อนหน้าและถัดไป">${id>1?`<a href="#/lesson/${id-1}">← ${escape(lessons[id-2].short)}</a>`:'<span></span>'}${id<13?`<a href="#/lesson/${id+1}">${escape(lessons[id].short)} →</a>`:'<a href="#/quiz">ไปลองทำข้อสอบ →</a>'}</nav></div><aside class="toc" id="toc"><div class="toc-label">ในบทนี้</div></aside></div>`;
  }
  function focusPage() { return `${pageHead('WHAT THE TEACHER EMPHASIZED', 'อาจารย์เน้นอะไร', '11 ประเด็นพร้อมถ้อยคำจาก transcript และวิธีนำไปฝึก แยกจากคำแนะนำในการติวของห้องอ่าน')}<div class="notice">คำพูดในกรอบเก็บตาม transcript เดิม จึงมีคำถอดเสียงคลาดเคลื่อน ให้ดูคำอธิบายและเทียบสไลด์ประกอบ กติกาสอบให้ยึดประกาศล่าสุดของรายวิชา</div><div class="focus-list">${D.focus.map(f=>`<article class="focus-card"><div class="eyebrow">TEACHER'S NOTE ${String(f.id).padStart(2,'0')}</div><h2>${escape(f.title)}</h2><div class="reading-article">${f.html}</div></article>`).join('')}</div>`; }
  function glossaryPage() {
    const categories = [...new Set(D.terms.map(t=>t.category))];
    return `${pageHead('A SMALL DICTIONARY FOR YOUR EXAM', 'คำศัพท์ที่ต้องรู้', 'ไม่ต้องท่องนิยามยาว ๆ ลองอธิบายคำละหนึ่งประโยค แล้วนึกว่าอยู่ตรงไหนในวงจร API')}<div class="filters"><label class="sr-only" for="term-search">ค้นหาคำศัพท์หรือความหมาย</label><input class="field" type="search" id="term-search" placeholder="เช่น middleware, สถานะ, ฐานข้อมูล…"><label class="sr-only" for="term-category">หมวดคำศัพท์</label><select id="term-category" class="field"><option value="">ทุกหมวด</option>${categories.map(c=>`<option>${escape(c)}</option>`).join('')}</select><label class="filter-label" for="essential-only"><input type="checkbox" id="essential-only">เฉพาะคำพื้นฐานสำคัญ</label></div><p class="result-count" id="term-count"></p><div id="term-list" class="term-grid"></div><details><summary>คำที่ transcript ถอดเสียงผิด และคู่คำที่ห้ามสลับ</summary><div class="details-body reading-article">${D.termExtras}</div></details>`;
  }
  function filterTerms() {
    const q=C.normalize($('#term-search').value),category=$('#term-category').value,essential=$('#essential-only').checked;
    const found=D.terms.filter(t=>(!category||t.category===category)&&(!essential||t.essential)&&(!q||C.normalize(t.term+' '+t.meaning).includes(q)));
    $('#term-count').textContent=`พบ ${found.length} จาก 110 คำ`;
    $('#term-list').innerHTML=found.length?found.map(t=>`<article class="term-card" id="term-${t.id}"><div class="term-meta"><span>${String(t.id).padStart(3,'0')} · ${escape(t.category)}</span>${t.essential?'<span class="term-star">● ควรรู้ก่อน</span>':''}</div><h2>${escape(t.term)}</h2><p>${escape(t.meaning)}</p></article>`).join(''):'<div class="empty-state"><h2>ยังไม่พบคำนี้</h2><p>ลองใช้คำสั้นลง หรือเปลี่ยนเป็นทุกหมวด</p></div>';
  }
  function quizPage() {
    const wrong=D.quiz.filter(q=>state.revealed[q.id]&&state.answers[q.id]!==q.correct);
    const questions=quizWrongOnly?wrong:D.quiz;
    if(!questions.length&&quizWrongOnly){quizWrongOnly=false;}
    let q=(quizWrongOnly?wrong:D.quiz).find(q=>q.id===state.question)||(quizWrongOnly?wrong[0]:D.quiz[0]);
    state.question=q.id;persist();
    const selected=state.answers[q.id],revealed=state.revealed[q.id],score=C.grade(D.quiz,state.answers,state.revealed);
    return `${pageHead('LEARN THE REASON, NOT JUST THE ANSWER', 'ฝึกทำปรนัย', 'ข้อสอบฝึก 30 ข้อ ข้อละ 5 ตัวเลือก ไม่ใช่ข้อสอบจริง ลองตอบก่อนเปิดเหตุผล แล้วทวนข้อที่ยังผิด')}<div class="quiz-layout"><section class="quiz-panel" aria-label="คำถามปัจจุบัน"><div class="quiz-headline"><span>${quizWrongOnly?'โหมดทวนข้อผิด · ':''}ข้อ ${q.id} จาก 30</span><span>${revealed?'ตรวจแล้ว':'เลือกคำตอบที่ถูกที่สุด'}</span></div><fieldset><legend>${escape(q.question)}</legend>${q.options.map(o=>`<label class="quiz-option ${revealed&&o.key===q.correct?'correct':''} ${revealed&&o.key===selected&&selected!==q.correct?'wrong':''}" for="choice-${q.id}-${o.key}"><input id="choice-${q.id}-${o.key}" type="radio" name="q-${q.id}" value="${o.key}" ${selected===o.key?'checked':''} ${revealed?'disabled':''}><span class="choice-letter">${o.key}</span><span>${escape(o.text)}</span></label>`).join('')}</fieldset>${revealed?`<div class="quiz-feedback ${selected!==q.correct?'wrong':''}" tabindex="-1" id="quiz-feedback"><strong>${selected===q.correct?'✓ ถูกต้อง':'ยังไม่ถูก'} · คำตอบคือ ${q.correct}</strong>${escape(q.explanation)}</div>`:''}<div class="quiz-controls"><button type="button" class="button secondary" data-question-step="-1">← ข้อก่อน</button>${revealed?'<button type="button" class="button primary" data-question-step="1">ข้อถัดไป →</button>':`<button type="button" class="button primary" id="check-answer" ${selected?'':'disabled'}>ตรวจคำตอบ</button>`}</div></section><aside class="quiz-map"><h2>เลือกข้อที่อยากทำ</h2><div class="question-dots">${D.quiz.map(item=>`<button type="button" class="question-dot ${item.id===q.id?'current':''} ${state.answers[item.id]?'answered':''} ${state.revealed[item.id]&&state.answers[item.id]!==item.correct?'graded-wrong':''}" data-question="${item.id}" aria-label="ข้อ ${item.id}${state.revealed[item.id]?(state.answers[item.id]===item.correct?' ตรวจแล้ว ถูก':' ตรวจแล้ว ผิด'):state.answers[item.id]?' เลือกคำตอบแล้ว':''}" ${item.id===q.id?'aria-current="step"':''}>${item.id}</button>`).join('')}</div><div class="quiz-score"><strong>${score.correct}</strong> / ${score.checked} ข้อที่ตรวจแล้ว</div><progress value="${score.answered}" max="30" aria-label="จำนวนข้อที่เลือกคำตอบแล้ว"></progress><p class="quiz-note">เลือกคำตอบแล้ว ${score.answered}/30 ข้อ<br>คำตอบจะบันทึกไว้ในเบราว์เซอร์นี้</p><button type="button" class="button subtle" id="review-wrong" ${wrong.length||quizWrongOnly?'':'disabled'}>${quizWrongOnly?'กลับไปทุกข้อ':`ทวนข้อผิด (${wrong.length})`}</button><button type="button" class="button secondary" id="reset-quiz">เริ่มทำใหม่</button></aside></div>`;
  }
  function practicePage(tab) {
    const active=['trace','api','lab','simulation'].includes(tab)?tab:'trace';
    let content='';
    if(active==='trace')content=D.traces.map((t,i)=>`<section class="exercise"><div class="eyebrow">READ THE CODE ${i+1} / 5</div><h2>${escape(t.title)}</h2><div class="reading-article">${t.html}</div><details><summary>คิดคำตอบแล้ว ค่อยดูเฉลย</summary><div class="details-body reading-article">${t.answer}</div></details></section>`).join('');
    if(active==='api')content=`<div class="notice">ตัวอย่างแยกตามหน้าที่และยังต้องจัด import / DB config ให้ตรงโครงงาน อ่านโจทย์ก่อนเปิดแนวทำ และใช้ spec Week-08 เป็นหลักเมื่อซ้อมเต็มรอบ</div>`+D.apiExercises.map(t=>`<section class="exercise"><div class="eyebrow">API PRACTICE ${t.id}</div><h2>${escape(t.title)}</h2><div class="reading-article">${t.prompt}</div><details><summary>เปิดแนวทำและตัวอย่างโค้ด</summary><div class="details-body reading-article">${t.html}</div></details></section>`).join('')+`<section class="exercise"><h2>ลองอธิบายปากเปล่าโดยไม่อ่านคำตอบ</h2><div class="reading-article">${D.oralQuestions}</div></section>`;
    if(active==='simulation')content=`<article class="reading-article exercise">${D.simulation}</article>`;
    if(active==='lab')content=`<section class="pagination-lab"><h2>ลองเลื่อนหน้า แล้วดู offset เปลี่ยน</h2><p class="result-count">สมมติเรียงข้อมูลด้วย id ก่อนแบ่งหน้า และ page เริ่มที่ 1</p><div class="lab-fields"><label for="lab-total">จำนวนทั้งหมด (total)<input class="field" type="number" min="0" max="1000000" step="1" id="lab-total" value="75"></label><label for="lab-page">หน้าที่ขอ (page)<input class="field" type="number" min="1" max="1000000" step="1" id="lab-page" value="3"></label><label for="lab-limit">รายการต่อหน้า (limit)<input class="field" type="number" min="1" max="100" step="1" id="lab-limit" value="10"></label></div><p id="lab-error" hidden></p><div class="lab-result" id="lab-result"></div><div class="button-row lab-actions"><button type="button" class="button secondary" id="lab-prev">← หน้าก่อน</button><button type="button" class="button primary" id="lab-next">หน้าถัดไป →</button><a href="#/lesson/9" class="button subtle">อ่านบท Pagination</a></div></section>`;
    return `${pageHead('TURN READING INTO PRACTICE','ฝึกอ่านโค้ดและเขียน API','ฝึกทีละส่วนก่อนจับเวลาเต็มรอบ เปิดเฉลยเมื่อได้ลองคิดหรือลงมือเขียนด้วยตัวเองแล้ว')}<nav class="practice-tabs" aria-label="แบบฝึก">${[['trace','อ่านโค้ด 5 ชุด'],['api','เขียน API'],['lab','ลอง Pagination'],['simulation','ซ้อม 120 นาที']].map(([id,name])=>`<a href="#/practice/${id}" class="${id===active?'active':''}" ${id===active?'aria-current="page"':''}>${name}</a>`).join('')}</nav>${content}`;
  }
  function labUpdate() {
    const raw=['total','page','limit'].map(x=>$('#lab-'+x).value);
    const p=raw.every(v=>v.trim()!=='')?C.pagination(...raw.map(Number)):null;
    $('#lab-error').hidden=!!p;
    $('#lab-error').textContent=p?'':'กรอกจำนวนเต็ม: total ตั้งแต่ 0, page ตั้งแต่ 1 และ limit ระหว่าง 1–100';
    $('#lab-result').hidden=!p;
    $('#lab-prev').disabled=!p||p.page<=1;
    $('#lab-next').disabled=!p||!p.hasNextPage;
    if(!p)return;
    $('#lab-result').innerHTML=`<div class="formula">offset = (${p.page} − 1) × ${p.limit} = ${p.offset}</div><p>ทั้งหมด ${p.total} รายการ · ${p.totalPages} หน้า · หน้านี้ได้ ${p.count} รายการ</p><p>${p.count?`ข้าม ${p.offset} รายการ แล้วอ่านลำดับที่ ${p.offset+1}–${p.offset+p.count}`:'หน้าที่ขอไม่มีข้อมูล จึงได้ data: []'}</p><p>hasNextPage: <strong>${p.hasNextPage}</strong> · hasPrevPage: <strong>${p.hasPrevPage}</strong></p><div class="lab-items" aria-label="ลำดับรายการที่ได้">${Array.from({length:Math.min(p.count,30)},(_,i)=>`<span>#${p.offset+i+1}</span>`).join('')}${p.count>30?'<span>…</span>':''}</div>`;
  }
  function planPage() {
    return `${pageHead('A LITTLE STRUCTURE, A CALMER MIND','แผนอ่านก่อนสอบ','แผนแนะนำสำหรับวันที่ 19–20 ตุลาคม ปรับช่วงเวลาได้ตามเวลาว่าง โดยแบ่งอ่านและฝึกให้ได้ทั้งสองส่วน')}<div class="plan-grid"><section class="plan-card"><div class="eyebrow">DAY 01 · 19 OCTOBER</div><h2>เชื่อมภาพรวมให้เข้าใจ</h2><ol><li><strong>60 นาที</strong> · Backend, HTTP และ REST<br><a href="#/lesson/3">เริ่มที่ Request / Response →</a></li><li><strong>60 นาที</strong> · Layers, Express และ MySQL CRUD</li><li><strong>60 นาที</strong> · เขียน GET by id และ 404 + error middleware</li><li><strong>60 นาที</strong> · Pagination, DTO และทำปรนัยครึ่งแรก</li></ol></section><section class="plan-card"><div class="eyebrow">DAY 02 · 20 OCTOBER</div><h2>ลองทำให้เหมือนวันสอบ</h2><ol><li><strong>120 นาที</strong> · ซ้อม Week-08 จับเวลา ใช้เอกสาร offline</li><li><strong>45 นาที</strong> · แก้เฉพาะจุดที่ติด แยกให้รู้ว่าอยู่ layer ไหน</li><li><strong>45 นาที</strong> · ทำปรนัยที่เหลือ แล้วอธิบายเหตุผล</li><li><strong>30 นาที</strong> · เขียน error handler / pagination จากความจำ</li></ol></section></div><div class="section-head"><h2>ลำดับอ่านและสิ่งที่ต้องเตรียม</h2></div><article class="reading-article exercise">${D.chapters.find(c=>c.id===14).html}</article><div class="bottom-callout"><div><h3>เก็บชุดอ่านไว้ในเครื่อง</h3><p>ดาวน์โหลดแล้วแตก ZIP เปิด index.html ได้โดยไม่ต้องติดตั้ง</p></div><a href="backend-study-offline.zip" download class="button primary">ดาวน์โหลดชุดออฟไลน์ ↓</a></div>`;
  }
  function sourcesPage() { return `${pageHead('CLEAR SOURCES, CLEAR BOUNDARIES','แหล่งอ้างอิงและกติกาสอบ','เนื้อหาจาก PDF 7 ชุด 144 หน้า และ transcript 20 ไฟล์ พร้อมระบุสิ่งที่เป็นคำอธิบายเสริมและข้อจำกัดของหลักฐาน')}<div class="notice">ประกาศสอบล่าสุดของรายวิชาเป็นหลัก โดยเฉพาะเวลา กติกาการใช้เอกสาร และเครื่องที่ใช้สอบ รายละเอียดด้านล่างอ้างจากไฟล์ที่มีและการอธิบายในชั้นเรียน</div><article class="sources-article reading-article">${D.sources}</article>`; }
  function searchPage(query) {
    const q=C.normalize(query);
    const results=q?[
      ...lessons.filter(c=>C.normalize(c.title+' '+c.text).includes(q)).map(c=>({type:'บทเรียน',title:c.short,description:c.description,url:`#/lesson/${c.id}`})),
      ...D.terms.filter(t=>C.normalize(t.term+' '+t.meaning).includes(q)).map(t=>({type:'คำศัพท์',title:t.term,description:t.meaning,url:`#/glossary?term=${encodeURIComponent(t.term)}`})),
      ...D.focus.filter(f=>C.normalize(f.title+' '+f.text).includes(q)).map(f=>({type:'อาจารย์เน้น',title:f.title,description:f.text.replace(/\n/g,' ').slice(0,160),url:'#/focus'}))
    ]:[];
    return `${pageHead('FIND YOUR NEXT LITTLE ANSWER','ค้นหาในห้องอ่าน',q?`พบ ${results.length} รายการสำหรับ “${escape(query)}”`:'พิมพ์เรื่องที่อยากรู้ในช่องค้นหาด้านบน แล้วกด Enter')}<div class="search-results">${results.length?results.map(r=>`<a class="search-result" href="${r.url}"><div class="eyebrow">${r.type}</div><h2>${escape(r.title)} <span aria-hidden="true">↗</span></h2><p>${escape(r.description)}</p></a>`).join(''):q?'<div class="empty-state"><h2>ยังไม่พบเรื่องนี้</h2><p>ลองคำสั้นลง หรือสลับภาษาไทยกับภาษาอังกฤษ เช่น error, DTO, แบ่งหน้า</p></div>':''}</div>`;
  }
  function empty(title, description, url) { return `<div class="empty-state"><h1>${title}</h1><p>${description}</p><a href="${url}" class="button primary">กลับไปเลือกใหม่</a></div>`; }
  function render({ focus=true }={}) {
    $('#toast').hidden=true;clearTimeout(toastTimer);
    const route=(location.hash||'#/home').slice(1),[path,qs='']=route.split('?');
    const [,page='home',part]=path.split('/');
    currentPage=page;
    if(page!=='lesson')document.body.classList.remove('focus-mode');
    const params=new URLSearchParams(qs);
    const views={home,lessons:lessonsPage,lesson:()=>lessonPage(Number(part)),focus:focusPage,glossary:glossaryPage,quiz:quizPage,practice:()=>practicePage(part),plan:planPage,sources:sourcesPage,search:()=>searchPage(params.get('q')||'')};
    $('#main').innerHTML=(views[page]||(()=>empty('ไม่พบหน้านี้','กลับไปเริ่มต้นห้องอ่าน','#/home')))();
    updateShell();
    if(location.protocol==='file:')$$('[download]').forEach(link=>{link.hidden=true;});
    $('#sidebar').classList.remove('menu-open');$('#menu-toggle').setAttribute('aria-expanded','false');
    document.title=($('#main h1')?.textContent||'ห้องอ่าน Backend')+' · INT161';
    if(page==='glossary'){
      $('#term-search').value=params.get('term')||'';
      filterTerms();
      $('#term-search').addEventListener('input',filterTerms);$('#term-category').addEventListener('change',filterTerms);$('#essential-only').addEventListener('change',filterTerms);
    }
    if(page==='lesson'){
      const headings=$$('#lesson-content h2, #lesson-content h3');
      headings.forEach((el,i)=>{el.id='section-'+i;});
      $('#toc').insertAdjacentHTML('beforeend',headings.map((el,i)=>`<a href="#section-${i}" data-scroll="section-${i}">${escape(el.textContent)}</a>`).join(''));
    }
    if(page==='practice'&&$('#lab-total')){['total','page','limit'].forEach(x=>$('#lab-'+x).addEventListener('input',labUpdate));labUpdate();}
    if(page==='quiz')$$('.quiz-option input').forEach(input=>input.addEventListener('change',()=>{
      state.answers[state.question]=input.value;persist();$('#check-answer').disabled=false;
      updateQuizMap();
    }));
    if(focus){window.scrollTo({top:0,behavior:'instant'});$('#main').focus({preventScroll:true});}
  }
  function updateQuizMap(){
    const score=C.grade(D.quiz,state.answers,state.revealed);
    const dot=$(`[data-question="${state.question}"]`);dot?.classList.add('answered');
    const progress=$('.quiz-map progress');if(progress)progress.value=score.answered;
    const note=$('.quiz-note');if(note)note.innerHTML=`เลือกคำตอบแล้ว ${score.answered}/30 ข้อ<br>คำตอบจะบันทึกไว้ในเบราว์เซอร์นี้`;
  }
  function moveQuestion(step){
    const pool=quizWrongOnly?D.quiz.filter(q=>state.revealed[q.id]&&state.answers[q.id]!==q.correct):D.quiz;
    const i=pool.findIndex(q=>q.id===state.question);
    state.question=pool[(i+step+pool.length)%pool.length].id;persist();render();
  }
  $('#search-form').addEventListener('submit',event=>{event.preventDefault();const value=$('#global-search').value.trim();location.hash='/search?q='+encodeURIComponent(value);if(currentPage==='search')render();});
  $('#theme-toggle').addEventListener('click',()=>{state.theme=state.theme==='light'?'dark':'light';persist();updateShell();});
  $('#menu-toggle').addEventListener('click',()=>{const open=$('#sidebar').classList.toggle('menu-open');$('#menu-toggle').setAttribute('aria-expanded',String(open));$('#menu-toggle').setAttribute('aria-label',open?'ปิดเมนู':'เปิดเมนู');});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('#sidebar').classList.remove('menu-open');$('#menu-toggle').setAttribute('aria-expanded','false');}if(e.key==='/'&&!/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)){e.preventDefault();$('#global-search').focus();}});
  $('#reset-dialog').addEventListener('close',()=>{if($('#reset-dialog').returnValue==='reset'){state.answers={};state.revealed={};state.question=1;quizWrongOnly=false;persist();render();toast('เริ่มข้อสอบชุดใหม่แล้ว');}});
  document.addEventListener('click',async event=>{
    const button=event.target.closest('button,a');if(!button)return;
    if(button.dataset.scroll){event.preventDefault();document.getElementById(button.dataset.scroll)?.scrollIntoView({behavior:'auto'});return;}
    if(button.classList.contains('copy-code')){
      const text=button.closest('figure').querySelector('code').textContent;
      try{await navigator.clipboard.writeText(text);toast('คัดลอกโค้ดแล้ว');}catch{const range=document.createRange();range.selectNodeContents(button.closest('figure').querySelector('code'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);toast('เลือกโค้ดให้แล้ว กดคัดลอกได้เลย');}return;
    }
    if(button.dataset.flow){
      const flow={router:['01 · Router / Controller','อ่าน method, params, query และ body แล้วเรียก Service<br>ตอบกลับด้วย HTTP status และ JSON ตามสเปก'],service:['02 · Service / Business Logic','ใช้กฎของระบบ ตรวจเงื่อนไข ประสาน Repository<br>เช่น ตรวจข้อมูลสินค้า แล้วแปลง Entity เป็น DTO'],repo:['03 · Repository / Data Access','ส่ง SQL ไป MySQL และอ่านผล [rows, fields]<br>จัดการ SELECT / INSERT / UPDATE / DELETE']};
      const f=flow[button.dataset.flow];$('#flow-explanation').innerHTML=`<strong>${f[0]}</strong><p>${f[1]}</p>`;$$('[data-flow]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});return;
    }
    if(button.dataset.font){state.size=Math.max(15,Math.min(23,state.size+Number(button.dataset.font)));persist();document.documentElement.style.setProperty('--reading-size',state.size+'px');toast(`ขนาดตัวอักษร ${state.size}`);return;}
    if(button.id==='focus-mode'){const active=document.body.classList.toggle('focus-mode');button.setAttribute('aria-pressed',String(active));button.textContent=active?'ออกจากโหมดอ่าน':'โหมดอ่าน';return;}
    if(button.id==='print-lesson'){window.print();return;}
    if(button.id==='complete-lesson'){
      const id=Number(button.dataset.id),read=state.read.includes(id);
      state.read=read?state.read.filter(v=>v!==id):[...state.read,id];persist();updateShell();button.textContent=read?'ทำเครื่องหมายว่าอ่านแล้ว':'✓ อ่านแล้ว · ยกเลิกได้';button.setAttribute('aria-pressed',String(!read));button.classList.toggle('primary',read);button.classList.toggle('secondary',!read);toast(read?'ยกเลิกเครื่องหมายอ่านแล้ว':'บันทึกว่าอ่านบทนี้แล้ว');return;
    }
    if(button.id==='check-answer'){if(!state.answers[state.question])return;state.revealed[state.question]=true;persist();render({focus:false});$('#quiz-feedback').focus();announce('ตรวจคำตอบแล้ว');return;}
    if(button.dataset.questionStep){moveQuestion(Number(button.dataset.questionStep));return;}
    if(button.dataset.question){state.question=Number(button.dataset.question);quizWrongOnly=false;persist();render();return;}
    if(button.id==='review-wrong'){quizWrongOnly=!quizWrongOnly;render();return;}
    if(button.id==='reset-quiz'){$('#reset-dialog').showModal();return;}
    if(button.id==='lab-prev'||button.id==='lab-next'){$('#lab-page').value=Number($('#lab-page').value)+(button.id==='lab-next'?1:-1);labUpdate();return;}
  });
  window.addEventListener('hashchange',()=>render());
  render({focus:false});
})();
