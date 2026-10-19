# คำศัพท์ที่ต้องรู้สำหรับสอบ INT161

อ่านคำภาษาอังกฤษแล้วอธิบายเป็นภาษาไทยให้ได้ และบอกให้ได้ว่าคำนั้นอยู่ตรงไหนในวงจร API ไม่จำเป็นต้องท่องคำนิยามยาว ๆ ตัวหนาคือคำที่ควรรู้ก่อนเริ่มทำโจทย์ปฏิบัติ

## ภาพรวมและ HTTP

| ลำดับ | คำ | ความหมายและตัวอย่างที่ต้องนึกออก |
|---:|---|---|
| 1 | **Backend** | โปรแกรมฝั่งให้บริการ ประมวลผลกฎและจัดการข้อมูล |
| 2 | Frontend | ส่วนติดต่อผู้ใช้และเรียกข้อมูลจาก backend |
| 3 | **Client** | ฝ่ายเริ่มส่ง request เช่น browser, mobile app, Postman |
| 4 | Server | ฝ่ายรับ request และส่ง response |
| 5 | **API Application Programming Interface** | ข้อตกลงให้โปรแกรมเรียกใช้งานกันได้ |
| 6 | **Endpoint** | จุดให้บริการที่เรียกด้วย method และเส้นทาง เช่น GET /products |
| 7 | **Resource** | สิ่งที่ API เปิดให้เข้าถึง เช่นสินค้า ลูกค้า การชำระเงิน |
| 8 | Representation | ข้อมูลที่ใช้แทน resource เช่น JSON ของสินค้าหนึ่งชิ้น |
| 9 | API contract | ข้อตกลงเรื่อง path, input, output, field, status และพฤติกรรม |
| 10 | **CRUD** | Create, Read, Update, Delete งานสร้าง อ่าน แก้ ลบข้อมูล |
| 11 | **HTTP Hypertext Transfer Protocol** | protocol สื่อสาร request/response ของเว็บ |
| 12 | **Request** | ข้อความที่ client ส่งไปขอทำงาน |
| 13 | **Response** | ข้อความที่ server ตอบกลับ |
| 14 | **HTTP method หรือ verb** | บอกลักษณะการกระทำ เช่น GET, POST, PUT, DELETE |
| 15 | URI และ URL | URI ระบุ resource; URL เป็น URI ที่ระบุตำแหน่ง/วิธีเข้าถึง เช่น http://localhost:3000/products |
| 16 | Path | ส่วนเส้นทาง เช่น /api/123/products/7 ไม่รวม query string |
| 17 | **Path parameter** | ค่าที่จับจากตำแหน่งใน route เช่น :id -> req.params.id |
| 18 | Query string | ส่วนหลัง ? เช่น page=2&limit=10 |
| 19 | **Query parameter** | คู่ชื่อและค่าใน query เช่น limit=10 -> req.query.limit |
| 20 | **Request body** | ข้อมูลที่ส่งใน body เช่น JSON เพื่อสร้างสินค้า -> req.body |
| 21 | Header | metadata ของ request/response เช่น Content-Type |
| 22 | **Content-Type** | บอกชนิด body ของข้อความนี้ เช่น application/json |
| 23 | Accept | บอกชนิด response ที่ client ยอมรับ/ต้องการ |
| 24 | **HTTP status code** | สถานะจริงของ response เช่น 201, 404; ต่างจากเลขที่ใส่ใน JSON |
| 25 | Payload | เนื้อข้อมูลที่ส่งไปกับข้อความ โดยมากพูดถึง body |
| 26 | **JSON JavaScript Object Notation** | รูปแบบข้อความแลกข้อมูล ไม่ใช่ JS object ในหน่วยความจำ |
| 27 | Serialization | แปลง object เป็นข้อมูลที่จะส่ง/เก็บ เช่น JSON.stringify |
| 28 | Deserialization หรือ parsing | อ่านข้อความกลับเป็นโครงสร้างข้อมูล เช่น JSON.parse |
| 29 | MPA Multi Page Application | เปลี่ยนหน้าโดยขอเอกสาร HTML ใหม่จาก server เป็นหลัก |
| 30 | SPA Single Page Application | หน้าแอปใช้ JavaScript อัปเดต UI และเรียก API รับข้อมูล |

## REST และความหมายของคำขอ

| ลำดับ | คำ | ความหมายและตัวอย่างที่ต้องนึกออก |
|---:|---|---|
| 31 | **REST Representational State Transfer** | รูปแบบสถาปัตยกรรมของระบบที่มี constraints ไม่ใช่ protocol |
| 32 | RESTful | ออกแบบสอดคล้องกับแนว REST ไม่ใช่แค่มี URL แล้วส่ง JSON |
| 33 | Client-server constraint | แยกหน้าที่ผู้ใช้บริการกับผู้ให้บริการ |
| 34 | **Stateless** | แต่ละ request มีข้อมูลพอทำงาน ไม่พึ่งบริบท session ของ request ก่อน |
| 35 | Session state | บริบทการใช้งานระหว่าง client/server เช่นการสนทนาต่อเนื่อง |
| 36 | Resource state | สถานะข้อมูล resource เช่นราคาสินค้าใน DB ซึ่งยังเก็บได้ในระบบ stateless |
| 37 | **Uniform interface** | หลักสื่อสารที่สม่ำเสมอ เช่น URI, methods, representations และข้อความที่บอกความหมาย |
| 38 | Self-descriptive message | ข้อความมีข้อมูลให้เข้าใจว่าคืออะไร เช่น method/header/status |
| 39 | Cacheable | response ระบุได้ว่าเก็บใช้ซ้ำภายใต้เงื่อนไขใด |
| 40 | HATEOAS | Hypermedia as the Engine of Application State มีลิงก์ให้ client ติดตามการทำงานต่อ |
| 41 | **Layered system** | ระบบจัดเป็นชั้น client ไม่จำเป็นต้องรู้ตัวกลางทั้งหมด; ในวิชานำไปสอนการแยกหน้าที่โค้ดด้วย |
| 42 | Code on demand | server ส่งโค้ดให้ client ทำงานเพิ่ม เป็น REST constraint ที่เลือกใช้ได้ |
| 43 | API versioning | แยก contract แต่ละรุ่น เช่น /api/v1/products |
| 44 | Safe method | method ที่ไม่ได้ขอเปลี่ยนสถานะข้อมูล เช่น GET |
| 45 | Idempotent | เรียกคำขอเดิมซ้ำแล้วผลที่ตั้งใจต่อสถานะ server เท่ากับครั้งเดียว เช่น DELETE แม้ status แต่ละครั้งต่างกัน |

## Node.js และ JavaScript

| ลำดับ | คำ | ความหมายและตัวอย่างที่ต้องนึกออก |
|---:|---|---|
| 46 | **Node.js** | runtime ให้ JavaScript ทำงานนอก browser ไม่ใช่ภาษา |
| 47 | Runtime | สภาพแวดล้อมและกลไกที่ใช้รันโปรแกรม |
| 48 | V8 | JavaScript engine ที่ Node.js ใช้ มีการแปลแบบ JIT ด้วย |
| 49 | Event loop | กลไกจัดคิวและเรียก callback ไม่ควรถูกงาน CPU หนักยึดนาน |
| 50 | Non-blocking I/O | รอการอ่านเขียน/เครือข่ายโดยไม่ยึด event loop ไว้รอทั้งหมด |
| 51 | Synchronous | ทำงานต่อเนื่องโดยต้องได้ผลของขั้นนั้นก่อนเดินต่อ |
| 52 | Asynchronous | งานอาจเสร็จภายหลังและรับผลผ่าน callback/Promise ฯลฯ |
| 53 | Callback | ฟังก์ชันที่ส่งให้กลไกอื่นเรียก เช่นเมื่อ query เสร็จ |
| 54 | **Promise** | object แทนผลในอนาคต มี pending, fulfilled หรือ rejected |
| 55 | **async และ await** | async ทำให้ฟังก์ชันคืน Promise; await รอผลในฟังก์ชันนั้นโดยไม่หมายถึงหยุด server ทั้งหมด |
| 56 | Module | หน่วยโค้ดที่แยกไฟล์และนำไปใช้ซ้ำได้ |
| 57 | CommonJS หรือ CJS | ระบบโมดูลแบบ require/module.exports |
| 58 | **ES Modules หรือ ESM** | ระบบ import/export; โครงงานฝึกใช้ type: module |
| 59 | Import และ export | นำโค้ดเข้า/ส่งโค้ดออก จับคู่ named/default ให้ถูก |
| 60 | npm | เครื่องมือจัดการ packages/dependencies และเรียก scripts ของ Node |
| 61 | Package | ชุดโค้ดที่นำมาใช้ เช่น express, mysql2 |
| 62 | Dependency | package ที่โครงงานต้องพึ่งเพื่อทำงาน |
| 63 | package.json | ข้อมูลโครงงาน dependency scripts และการตั้ง type ของ modules |
| 64 | node_modules | โฟลเดอร์ dependency ที่ติดตั้งแล้ว อาจารย์ให้ตัดออกก่อนส่ง zip |

## Express และการแยกโค้ด

| ลำดับ | คำ | ความหมายและตัวอย่างที่ต้องนึกออก |
|---:|---|---|
| 65 | Framework | โครงและเครื่องมือที่ช่วยเขียนแอป เช่น Express |
| 66 | **Express.js** | framework บน Node ช่วย routing, middleware และ response |
| 67 | Route | กฎจับคู่ method/path กับ handler |
| 68 | **Router** | กลุ่ม routes ของ resource ใช้ express.Router() และ mount ใต้ prefix |
| 69 | **Controller หรือ presentation layer** | รับ HTTP input เรียก service และกำหนด HTTP response |
| 70 | **Middleware** | ฟังก์ชันระหว่างทางที่รับ req/res/next เช่น JSON parser |
| 71 | **next และ next(err)** | next() ไปทางปกติ; next(err) ไปทาง error handler |
| 72 | **Error-handling middleware** | ฟังก์ชันสี่ argument (err, req, res, next) สำหรับตอบ error กลาง |
| 73 | **Service หรือ business layer** | ใช้กฎระบบและประสาน repository ไม่ควรผูกกับ req/res |
| 74 | Business logic | กฎงาน เช่น amount > 0 และเงื่อนไขก่อนทำรายการ |
| 75 | **Repository หรือ data access layer** | รับผิดชอบอ่าน/เขียนข้อมูลและ SQL |
| 76 | Separation of concerns | แยกส่วนตามหน้าที่เพื่อลดการผูกกันและแก้ไขง่าย |

## DTO และการแปลงข้อมูล

| ลำดับ | คำ | ความหมายและตัวอย่างที่ต้องนึกออก |
|---:|---|---|
| 77 | **Entity** | โครงสร้างข้อมูลในระบบ/ฐานข้อมูล อาจมี field ที่ไม่ควรส่ง client |
| 78 | **DTO Data Transfer Object** | รูปข้อมูลที่กำหนดเพื่อรับส่งผ่าน API/ระหว่างส่วนของระบบ |
| 79 | Request DTO | รูปข้อมูลที่ API ยอมรับจาก client ไม่ใช่รับทุก field ของตารางเสมอ |
| 80 | Response DTO | รูปข้อมูลที่ API ส่งกลับ อาจแยก summary กับ detail |
| 81 | **Mapper** | โค้ดแปลง entity -> DTO เช่น brand_id -> brandId |
| 82 | Destructuring | ดึงค่าจาก object/array เช่น const [rows] และ const {id} |
| 83 | map | สร้าง array ใหม่จากการแปลงสมาชิก เช่น rows.map(toSummaryDTO) |
| 84 | filter | เลือกสมาชิกตามเงื่อนไขของ callback; ต่างจาก map |

## ฐานข้อมูล

| ลำดับ | คำ | ความหมายและตัวอย่างที่ต้องนึกออก |
|---:|---|---|
| 85 | DBMS Database Management System | ระบบจัดการฐานข้อมูล เช่น MySQL |
| 86 | Database driver | ไลบรารีให้โปรแกรมคุย DBMS ได้ เช่น mysql2 |
| 87 | Connection | ช่องการเชื่อมต่อไปฐานข้อมูลหนึ่งช่อง |
| 88 | **Connection pool** | จัดชุด connection ให้ยืมและนำกลับใช้ใหม่ |
| 89 | **SQL Structured Query Language** | ภาษาสั่งงานฐานข้อมูล เช่น SELECT/INSERT/UPDATE/DELETE |
| 90 | **Prepared statement** | เตรียมโครง SQL แล้วส่งค่าผ่าน parameter; mysql2 execute ใช้กลไกนี้ |
| 91 | **SQL injection** | input ถูกนำไปตีความเป็นคำสั่ง SQL; ใช้ parameter แทนการต่อข้อความค่าโดยตรง |
| 92 | **Primary key หรือ PK** | key ระบุแถวไม่ซ้ำ เช่น products.id |
| 93 | **Foreign key หรือ FK** | key อ้างข้อมูลในตารางอื่น เช่น products.brand_id -> brands.id |
| 94 | Unique constraint | ข้อบังคับค่าต้องไม่ซ้ำ เช่น SKU แม้ไม่ใช่ PK |
| 95 | Composite key | key ที่ใช้หลาย field ร่วมกัน เช่น customerNumber + checkNumber |
| 96 | Auto increment | ฐานข้อมูลสร้างเลข key ต่อไปให้ |
| 97 | **insertId** | id ที่ได้หลัง INSERT ของข้อมูล auto increment |
| 98 | **affectedRows** | จำนวนแถวที่ได้รับผลของการเขียนข้อมูล อย่าใช้เดา 404 ของ UPDATE ทุกกรณีโดยไม่เข้าใจ config |

## Pagination และข้อผิดพลาด

| ลำดับ | คำ | ความหมายและตัวอย่างที่ต้องนึกออก |
|---:|---|---|
| 99 | **Pagination** | แบ่งข้อมูลเป็นหน้าเพื่อลดปริมาณต่อ request |
| 100 | **Offset** | จำนวนแถวที่ข้าม สูตร (page - 1) * limit สำหรับ page เริ่ม 1 |
| 101 | **Limit หรือ page size** | จำนวนรายการสูงสุดต่อหน้า ไม่ใช่จำนวนทั้งหมด |
| 102 | Total และ totalPages | จำนวนทั้งหมดที่เข้าเงื่อนไข และจำนวนหน้า Math.ceil(total/limit) |
| 103 | COUNT(*) | SQL นับแถว; ถ้ามี filter ต้องนับเงื่อนไขเดียวกัน |
| 104 | ORDER BY | SQL เรียงข้อมูล ควรเรียงแน่นอนก่อนแบ่งหน้า |
| 105 | WHERE | SQL เลือกแถวตามเงื่อนไข สำคัญมากใน UPDATE/DELETE |
| 106 | **Validation** | ตรวจ input เช่นชนิดข้อมูล field ที่ต้องมี และค่าที่อนุญาต |
| 107 | Exception หรือ error | เหตุผิดปกติที่ขัดทางเดินปกติของโปรแกรม มักแทนด้วย Error object |
| 108 | **throw** | โยน error ออกจากทางเดินปกติ ให้ผู้เรียก/กลไกจัดการรับต่อ |
| 109 | **try/catch** | พยายามทำโค้ดใน try และรับ error ที่มาถึงด้วย catch |
| 110 | Stack trace | ร่องรอยจุดเรียก/จุดเกิด error ใช้ debug ภายใน ไม่ส่งให้ client โดยไม่ควบคุม |

## คำที่ transcript อาจถอดเสียงผิด

| ที่อาจอ่านเจอ | คำที่ควรเชื่อมให้ออก |
|---|---|
| เรส, เรซ, เรสฟูล, เรดเอพีไอ | REST / RESTful API ให้ดูบริบท |
| เพจจีเนชั่น, เพจเจเนชั่น, เพจอินเนชั่น | Pagination |
| ไฟล์วัน, ฟายหว่าน | findOne ไม่ใช่ชื่อไฟล์วันหนึ่ง |
| ไฟล์ออล, ฟายออล | findAll |
| รีโพล, รีโพ | Repository หรือ repo |
| เออเร่อ, เออเรอร์ | Error |
| เอ็กเซปชั่น, แอคเซปชั่น | Exception |
| แอพเพลส, เอ็กเพรส | Express |
| อะซิง, อะเวท, เอเวท | async / await |
| พรีแพรสเตทเมนต์, พรีเพด | Prepared statement |
| มิดเดิลแวร์, มิดเดิ้ลแวร์ | Middleware |

ตารางนี้ช่วยอ่าน transcript ไม่ได้ยืนยันว่าคำผิดทุกตำแหน่งหมายถึงคำในแถวเดียวกันเสมอ ต้องเทียบกับโค้ด/สไลด์ โดยเฉพาะชื่อฟังก์ชันและตัวเลข

## คู่คำที่ห้ามสลับ

- **JSON / object**: รูปข้อความสำหรับแลกข้อมูล / โครงข้อมูลในหน่วยความจำ
- **params / query / body**: ค่าจาก path / ค่าหลัง ? / ข้อมูลใน body
- **Node / Express / MySQL**: runtime / framework / DBMS
- **Controller / service / repository**: HTTP / กฎระบบ / เข้าถึงข้อมูล
- **Entity / DTO / mapper**: ข้อมูลภายใน / ข้อมูลรับส่ง / ตัวแปลง
- **page / limit / offset / total**: หน้า / ขนาดหน้า / จำนวนข้าม / จำนวนรวม
- **400 / 404 / 409 / 500**: input ผิด / ไม่พบ / ชนข้อมูลเดิม / ระบบผิดพลาด
- **401 / 403**: authentication ใช้ไม่ได้ / ปฏิเสธสิทธิ์
- **next() / next(err)**: เดินทางปกติ / เดินเส้นทาง error
- **insertId / affectedRows**: key ใหม่ / จำนวนแถวที่กระทบ
- **Content-Type / Accept**: body ที่ส่งเป็นอะไร / อยากรับ response เป็นอะไร
- **Safe / idempotent**: ไม่ขอเปลี่ยนข้อมูล / ทำซ้ำแล้วผลต่อสถานะเทียบเท่าครั้งเดียว

วิธีทวนเร็ว: ปิดคอลัมน์ขวาแล้วอธิบายคำละหนึ่งประโยค จากนั้นยกตัวอย่างด้วย API สินค้า ถ้าอธิบายไม่ได้ให้กลับไปอ่านบทนั้นในคู่มือหลักแทนการอ่านทั้งเล่มซ้ำ
