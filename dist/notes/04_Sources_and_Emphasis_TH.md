# หลักฐานจากสไลด์และคำพูดอาจารย์

เอกสารนี้แยกสิ่งที่อาจารย์กล่าว สิ่งที่กำหนดในชุดฝึก และข้อแนะนำในการติว เพื่อไม่ทำให้การจัดลำดับอ่านกลายเป็นการเดาข้อสอบจริง

ตรวจดัชนีข้อความของ transcript G1/G2 ทั้ง 20 ไฟล์เพื่อหาประเด็นและคำย้ำ แล้วอ่านบริบทที่เกี่ยวข้องเทียบ PDF ทั้ง 7 ชุด รวม 144 หน้า พร้อมตรวจภาพแผนผังและโค้ดสำคัญ ไม่ได้นำไฟล์ PPTX ที่เป็นสไลด์ชุดเดียวกันมานับเป็นบทเพิ่ม และไม่ใช้ node_modules เป็นเนื้อหาวิชา

## สิ่งที่อาจารย์เน้นและวิธีนำไปฝึก

ข้อความในเครื่องหมายอ้างอิงต่อไปนี้เก็บตาม transcript เดิม จึงมีการสะกดจากระบบถอดเสียง บทตีความด้านล่างปรับคำเทคนิคให้ตรงสไลด์ ไม่ได้เติม timestamp ของคำพูด เพราะเอกสารส่วนใหญ่รวมคำพูดเป็นย่อหน้ายาวและไม่มีเวลาต่อเนื่องที่เชื่อถือได้

### 1 อาจารย์ระบุชัดว่า uniform interface และ layered system เป็นแกนของวิชา

ที่มา G1 21 ส.ค. จาก INT161_G1_20260821 (1).docx

> อันนี้จะเจาะ uniform กับ layerเป็น 2 เรื่องที่เราบอกว่า จะเป็นแกนของของวิชานี้

นำไปฝึก: อธิบายหลัก REST และแยกหน้าที่โค้ดให้ได้ ไม่ท่องชื่อ constraints อย่างเดียว

### 2 เน้น request/response และการส่งข้อมูลแต่ละตำแหน่ง

ที่มา G2 3 ก.ย. จาก INT161_G2_20260903.docx

> หัวใจสําคัญเนี่ย เราต้องรู้ว่าเอสทีดีโปรโตคอลมันมีรีเควสต์กับเรสปอร์ต อันนี้สําคัญมาก

นำไปฝึก: ฝึกแยก method, path, query, body, headers และผลลัพธ์ใน Postman

### 3 ทบทวนการเรียกจาก app ไป router ไป service ไป repository

ที่มา G1 4 ก.ย. จาก INT161_G1_20260904.docx

> หัวใจสําคัญคือต้องเข้าใจคอนเซปต์ของเลเยอร์เนอะ

นำไปฝึก: วาด flow และบอกเหตุผลว่า HTTP/กฎงาน/SQL อยู่คนละส่วน

### 4 เมื่อใช้ Promise ติดต่อ DB ต้องรับส่งผล async ตลอดเส้นทางให้ถูก

ที่มา G1 28 ส.ค. จาก INT161_G1_20260828.docx

> ตรงนี้ก็ต้องเป็นอะซิ้งอันนี้ก็ต้องเป็นครบว่าตลอดแนว

นำไปฝึก: ไล่จุดที่ต้อง await โดยเฉพาะก่อนอ่านผล query หรือ map DTO

### 5 ให้ฝึก error ตามรูปแบบที่กำหนดและไม่พบข้อมูลต้องตอบอย่างมีความหมาย

ที่มา G1 25 ก.ย. จาก INT161_G1_20260925.docx

> อันนี้เน้นเรื่องการทํา error นะว่าถ้าหาข้อมูลไม่เจอให้ส่ง error แบบนี้

นำไปฝึก: เขียน AppError และ middleware กลาง แล้วทดสอบ 400/404/409/500

### 6 pagination ต้องลดข้อมูลตั้งแต่ query DB ไม่ใช่ยกทั้งตารางมาค่อยแบ่ง

ที่มา G1 2 ต.ค. ภาคต่อ จาก INT161_G1_20261002 (1).docx

> การทําเพจหลักๆก็คือมันไปทําที่ระดับ database

นำไปฝึก: ใช้ LIMIT/OFFSET และ COUNT; อธิบายผลต่อ memory/network

### 7 DTO ใช้ควบคุมข้อมูลที่ส่งออกและแยก API contract จาก entity

ที่มา G1 2 ต.ค. ภาคต่อ จาก INT161_G1_20261002 (1).docx

> ไม่มีฟิลที่ไม่จําเป็นจะต้องส่งหลุดไป เช่น ฟิวส์พาสเวิร์ด

นำไปฝึก: เขียน mapper เลือก field และเปลี่ยนชื่อให้ frontend ใช้

### 8 Week-09 เป็นไฟล์ผิดวิชาที่ใส่ปนมา ชุดฝึก INT161 อยู่ Week-08

ที่มา G2 15 ต.ค. จาก INT161_G2_20261015.docx

> วิชามันคล้ายกันของพี่ก็261 อันนี้ของเรา 161 เพราะงั้นของเราจะอยู่ในวีค 8

นำไปฝึก: ใช้ Express/MySQL ชุด Week-08 ซ้อม ไม่ย้ายไปอ่าน Spring Boot จาก Week-09

### 9 อาจารย์ระบุว่า error handling ต้องเตรียมเขียนเอง และ middleware บางอย่างอาจไม่ให้มา

ที่มา G2 15 ต.ค. จาก INT161_G2_20261015.docx

> สิ่งที่ไม่มีแน่ๆคือเออเร่อ แฮนดริ้งเนอะ

นำไปฝึก: ซ้อมสร้าง custom error และ error middleware จากไฟล์เปล่า อย่าพึ่งว่า template จะมีให้ครบ

### 10 ทฤษฎีครอบคลุมเรื่องที่เรียนมา ไม่ได้จำกัดแค่หัวข้อท้ายเทอม

ที่มา G2 15 ต.ค. จาก INT161_G2_20261015.docx

> เป็นช้อยส์ออกทุกเรื่องที่เรียนมา

นำไปฝึก: เก็บ HTTP/Node/REST/layers ไว้ในแผนอ่าน ไม่อ่านเฉพาะ CRUD

### 11 ต้องดู output ด้วยตนเองว่าตรงสเปกก่อนรัน tester

ที่มา G2 15 ต.ค. จาก INT161_G2_20261015.docx

> หัวใจสําคัญคือการอ่านสเปกให้ขาดนะครับ

นำไปฝึก: ทำตาราง method/path/input/status/response ของทุก endpoint ก่อนลงมือ

## รูปแบบและเงื่อนไขสอบที่กล่าวใน G2 วันที่ 15 ตุลาคม

ข้อความส่วนนี้สรุปจากการอธิบายในชั้นเรียน ไม่ใช่ประกาศสอบฉบับล่าสุด ถ้ามีประกาศใหม่ให้ยึดประกาศใหม่

- ทฤษฎีเป็นปรนัย 5 ตัวเลือก ตอบถูกหนึ่งตัว ใช้กระดาษฝน เตรียมดินสอ 2B

- อาจารย์กล่าวถึงทฤษฎีประมาณ 1 ชั่วโมง ต่อด้วยปฏิบัติ 2 ชั่วโมง รวม 3 ชั่วโมง

- ภาคปฏิบัติมีเอกสารสเปกและ template ของแต่ละคน รวม SQL และเครื่องมือทดสอบ ต้องใช้รหัสและข้อมูลของตนให้ตรง

- อธิบายการติดตั้ง package/ดาวน์โหลดเอกสารในช่วงเตรียม 15 นาที แล้วตัดอินเทอร์เน็ต สามารถใช้เอกสาร/โค้ดที่อยู่ในเครื่องหรือกระดาษตามที่อาจารย์อธิบาย ไม่ใช่ใช้ AI ระหว่างซ้อมเงื่อนไขสอบ

- ไม่ให้ติดตั้ง dependency เพิ่มนอกที่จัดให้ หากต้องแก้การติดตั้งขณะสอบต้องแจ้งผู้คุม

- กล่าวถึงการใช้เครื่องคณะและให้ผู้ที่คุ้น Mac ฝึกใช้ Windows การจัดเครื่อง/เวลาจริงต้องตรวจประกาศ

- ไม่มีหลักฐานเพียงพอที่จะสรุปว่าภาคทฤษฎีเปิดเอกสารได้ด้วย จึงไม่เหมารวมจากกติกาภาคปฏิบัติ

- timestamp ของ response ควรเป็นเวลาปัจจุบัน ไม่คัดค่าตัวอย่างแบบคงที่

## ชุด PDF ที่นำมาสรุป

| ชุด | จำนวนหน้า | เนื้อหาและหน้าที่ใช้ทวน |
|---|---:|---|
| 2569-01-INT161-Introduction.pdf | 34 | ภาพรวมเว็บ/JSON หน้า 7-20; Node.js/runtime หน้า 21-34 |
| 02-INT161-HttpBasics.pdf | 18 | Node architecture หน้า 4; modules หน้า 5-9; HTTP/URL/query/path หน้า 10-15 |
| 03-INT161-Introduction to REST API.pdf | 16 | REST constraints หน้า 5-8; uniform interface หน้า 9-13; layers หน้า 14-15 |
| 04-INT161-db-conection.pdf | 20 | DB driver/pool/ผล query หน้า 8-13; CRUD และ native HTTP body หน้า 15-20 |
| 05-INT161-Express-Framework.pdf | 17 | Express/routing/middleware หน้า 4-10 และ 14-16; layers หน้า 11-13 |
| 06-INT161-Error Handling.pdf | 16 | Error object/propagation หน้า 4-11; middleware และ status หน้า 12-15 |
| 07-INT161-Pagination and DTO.pdf | 23 | Pagination หน้า 3-8 และ 14-17; DTO หน้า 9-12 และ 18-23 |

## บัญชี transcript ทั้ง 20 ไฟล์

G1 มี 11 ไฟล์ G2 มี 9 ไฟล์ ไฟล์ชื่อคล้ายกันแต่ขนาดเล็กสองไฟล์เป็นภาคต่อที่มีเนื้อหา ไม่ได้ตัดทิ้งว่าเป็นไฟล์ซ้ำ วันเรียนของ G1/G2 ไม่ตรงกัน จึงจับคู่จากเนื้อหาที่พูด ไม่จับคู่จากลำดับวันที่อย่างเดียว

| ไฟล์ | ประเด็นที่พบและใช้เทียบ |
|---|---|
| INT161_G1_20260807 (1).docx | ภาพรวมเว็บ, HTTP, SPA, Node.js และเริ่มสร้าง server |
| INT161_G1_20260814.docx | HTTP module, request/response, URL/query/path และฝึกโปรแกรม |
| INT161_G1_20260821 (1).docx | REST, uniform interface, layers และทดสอบ endpoint |
| INT161_G1_20260821.docx | ภาคต่อสั้นเรื่อง CRUD, validation/framework และการทดสอบ |
| INT161_G1_20260828.docx | เชื่อม DB, pool, query result, parameters และ async/await |
| INT161_G1_20260904.docx | Express, request fields, routing/middleware และ layers |
| INT161_G1_20260918.docx | ใช้ template สร้าง CRUD, schema/key และทดสอบ country |
| INT161_G1_20260925.docx | Exception/error handling, custom error, middleware และใบงาน |
| INT161_G1_20261002 (1).docx | ภาคต่อสรุป pagination ที่ DB, DTO และ filter |
| INT161_G1_20261002.docx | Pagination, offset, mapper, DTO และ response envelope |
| INT161_G1_20261009.docx | ต้นไฟล์ซ้อมสอบ/spec เฉพาะบุคคล; หลายช่วงหลังถอดเสียงไม่ชัด ไม่ใช้ข้อความเหล่านั้นเดาขอบเขต |
| INT161_G2_20260806.docx | ภาพรวมเว็บ, client/server, Node.js, รูปแบบการเรียน/การสอบ |
| INT161_G2_20260813.docx | HTTP module, method/url/query/path และการฝึกเขียน |
| INT161_G2_20260820.docx | REST, uniform interface, layers และเริ่ม CRUD |
| INT161_G2_20260827.docx | MySQL driver/connection/pool, Promise API, parameters และ CRUD |
| INT161_G2_20260903.docx | Express, middleware, HTTP request/response และ layers |
| INT161_G2_20260924.docx | ใช้ template สร้าง CRUD และทดสอบแยกส่วน |
| INT161_G2_20261001.docx | Exception/error handling, error middleware และใบงาน |
| INT161_G2_20261008.docx | Pagination, offset/limit, DTO/mapper และ response |
| INT161_G2_20261015.docx | ซ้อมสอบ, Week-09 ผิดวิชา, กติกา/เวลา, identity, template และอ่าน spec |

## โจทย์และโค้ดประกอบที่ตรวจดู

- exam-spec-67130500001.md และชุด 00002/00003/00004: ใช้เทียบ method/path/body/DTO/status/envelope ไม่ใช่ใช้ข้อมูลผู้เข้าสอบตัวอย่างแทนข้อมูลจริง

- test-runner.mjs: อ่านเงื่อนไขที่ tester ตรวจและคะแนนในชุดซ้อม ไม่ได้รัน tester นี้กับฐานข้อมูลของผู้ใช้

- init-database.sql: schema brands/products, PK/FK/unique และ seed ของชุดฝึก ไม่ได้รัน SQL นี้

- express_crud_exception_assignment.md: ข้อกำหนด static student prefix, error shape และโจทย์ string/composite key

- โค้ดต้นแบบ app.js และไฟล์ routes/services/repositories/mappers/middlewares ที่เกี่ยวข้อง รวม package.json: ใช้ชี้ตำแหน่งที่ยังอ้าง classicmodels/productCode/productLine และจุดที่ต้องปรับให้เข้ากับ schema ใหม่

- exam_spec_th.md: ตรวจเพื่อยืนยันลักษณะไฟล์ที่ปนมาแล้วกันออกจากเนื้อหาติว INT161 ตามคำอาจารย์ ไม่ได้นำ Spring Boot/Java ของไฟล์นี้เป็นเนื้อหาสอบ

## จุดที่เอกสารแต่ละชุดไม่ควรถูกนำมาปนกัน

| จุด | หลักฐาน | วิธีใช้ในการอ่าน |
|---|---|---|
| รูป success/error | ใบงาน Week-06 ใช้ status:success/error แต่ Week-08 ใช้ success:true/false | เขียนตามสเปกของงานนั้น ไม่ท่อง JSON แบบเดียวใช้ทุกงาน |
| DELETE success | ใบงาน Week-06 บางข้อขอ 200 พร้อมข้อความ แต่ Week-08 products ขอ 204 ไม่มี body | ไม่เหมารวม DELETE ต้องตอบเลขเดียวทุก API |
| PUT | คำอธิบาย HTTP เป็นการแทนสถานะ resource แต่ tester Week-08 ส่งบาง field | แยกมาตรฐานกับ contract เฉพาะโจทย์ |
| คะแนนย่อย | ใบงานกับ tester แจกคะแนนบางหัวข้อไม่เหมือนกัน | คะแนนในคู่มือระบุชัดว่าเป็นของ tester ฝึก |
| Template | มี field/key ของ classicmodels แต่ SQL ข้อสอบซ้อมเป็น mobile_distributor | ตรวจ schema จริงก่อนใช้โค้ดเดิม |
| Outline | มี ORM/Prisma/JWT ตามแผน แต่บท/วันที่เรียนจริงในชุดนี้ไม่ตรงทั้งหมด | สรุปบทจากสไลด์และคำบรรยายที่มี ไม่สร้างบทใหม่จากชื่อในแผน |

## คำอธิบายเสริมที่ใช้ตรวจความแม่นยำทางเทคนิค

เนื้อหาเสริมเหล่านี้ช่วยแก้การเหมารวม ไม่ใช่หลักฐานว่าข้อสอบจะออกเพิ่ม

- [Express official error handling](https://expressjs.com/en/guide/error-handling.html): async Promise ที่เชื่อมกับ handler ใน Express 5 ส่ง rejection เข้า error handling; callback นอกสายต้องส่ง error ให้ถูก และ handler กลางมีสี่ argument

- [Node.js official event loop guidance](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop): แยก event loop กับงาน I/O/worker pool และหลีกเลี่ยง CPU work ที่ block

- [mysql2 prepared statements](https://sidorares.github.io/node-mysql2/docs/documentation/prepared-statements): ความหมายของ execute และ prepared statements

- [RFC 9110 HTTP semantics](https://www.rfc-editor.org/rfc/rfc9110.html): method, safe/idempotent, PUT และ response/status

ตรวจแหล่งอ้างอิงออนไลน์วันที่ 19 ตุลาคม 2026 โดยใช้เอกสารทางการ การจัดอันดับหัวข้อ แผนสองวัน คำศัพท์ และแบบฝึกที่แต่งเพิ่ม เป็นการออกแบบการติวของคู่มือนี้ ไม่ได้อ้างว่าเป็นข้อสอบที่รั่วหรือได้รับการยืนยัน

## ข้อจำกัดของหลักฐาน

transcript มีคำเทคนิคและข้อความบางช่วงผิดเพี้ยนมาก จึงไม่ยึดเสียงถอดคำเดียวตัดสินชนิด API/ตัวเลข/กติกา ใช้บริบทที่ชัดและเทียบข้ามกลุ่ม/สไลด์/โค้ด ไม่มี G1 วันที่ 16 ต.ค. หรือ G2 วันที่ 17 ก.ย. อยู่ในโฟลเดอร์ที่พบ จึงไม่เติมเนื้อหาของวันเหล่านั้นขึ้นเอง ประกาศสอบฉบับล่าสุดบน Teams ไม่ได้อยู่ในไฟล์ที่ได้รับ


