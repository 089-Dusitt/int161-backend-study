# แบบฝึกติวสอบ INT161 พร้อมเฉลย

คำถามทั้งหมดในไฟล์นี้เป็นแบบฝึกที่จัดทำเพิ่มจากหัวข้อเรียน ไม่ใช่ข้อสอบจริงหรือข้อสอบที่อาจารย์ยืนยันว่าจะออก ใช้คู่กับคู่มือหลักและโจทย์ Week-08 ของอาจารย์

ทำปรนัย 30 ข้อก่อนโดยไม่เปิดเฉลย ใช้เวลา 35 ถึง 45 นาที ข้อละ 1 คะแนน แต่ละข้อมีคำตอบที่ถูกที่สุดเพียงข้อเดียว จากนั้นทำแบบฝึกอ่านโค้ดและเขียน API

## ปรนัย 30 ข้อ

**1 Node.js คืออะไร**

A. ภาษาฐานข้อมูล
B. JavaScript runtime
C. CSS framework
D. HTTP method
E. รูปแบบ JSON

**2 ข้อใดอธิบาย stateless ได้ถูกต้อง**

A. server ห้ามมี database
B. server ห้ามแก้ข้อมูลใด ๆ
C. แต่ละ request มีข้อมูลพอทำงานโดยไม่พึ่ง session context จาก request ก่อน
D. client ห้ามส่ง id
E. ทุก request ต้องใช้ GET

**3 ต้องการอ่านข้อมูลสินค้ารหัส 7 ตามแนว resource ของวิชา ควรใช้ข้อใด**

A. POST /getProduct/7
B. GET /products/7
C. DELETE /products/7
D. GET /createProduct?id=7
E. PUT /findProduct/7

**4 DELETE resource เดิมครั้งแรกได้ 204 ครั้งถัดไปได้ 404 ข้อใดถูกต้องที่สุด**

A. ไม่ idempotent เพราะ status ต่างกัน
B. ต้องให้ทั้งสองครั้งได้ 204 เท่านั้น
C. ต้องสร้างข้อมูลคืนก่อนลบครั้งที่สอง
D. ยังเป็น idempotent ได้ เพราะผลที่ตั้งใจต่อสถานะข้อมูลเหมือนลบครั้งเดียว
E. DELETE ต้องเป็น safe method

**5 route คือ PUT /products/:id และส่ง /products/7?view=full พร้อม JSON body ต้องอ่านข้อมูลอย่างไร**

A. id จาก req.body เสมอ
B. view จาก req.params.view
C. id จาก req.query.id
D. body จาก req.headers.body
E. id จาก req.params.id, view จาก req.query.view, body จาก req.body

**6 โค้ด res.status(201) อย่างเดียวโดยไม่ส่งหรือจบ response มีผลอย่างไร**

A. ส่ง JSON ว่างและจบเองเสมอ
B. ตั้ง status แต่ยังไม่ส่ง response ให้เสร็จ
C. เปลี่ยน request method เป็น POST
D. เพิ่มข้อมูลใน DB อัตโนมัติ
E. ส่ง 204 เสมอ

**7 ข้อใดเป็น JSON ที่ถูกต้อง**

A. {name:'Phone'}
B. {"name":"Phone",}
C. {"name":"Phone","price":100}
D. {"price":undefined}
E. {"getPrice":function(){return 100}}

**8 ควรวาง express.json() ไว้ตำแหน่งใด**

A. ก่อน route ที่อ่าน JSON body
B. หลังส่ง response ของทุก route
C. ใน MySQL เท่านั้น
D. ใน mapper เท่านั้น
E. หลัง error handler เสมอ

**9 งานใดตรงกับ service layer มากที่สุด**

A. เขียน Content-Type header
B. เรียก res.end()
C. ตัด path ด้วย split('/')
D. ใช้กฎว่ายอดชำระต้องมากกว่า 0 และประสาน repository
E. สร้าง HTTP server socket

**10 งานหลักของ repository คือข้อใด**

A. เลือกสีปุ่ม
B. ส่ง HTML ให้ browser เท่านั้น
C. อ่านและเขียนข้อมูลผ่าน SQL/กลไก persistence
D. อ่าน req.params โดยตรงทุกฟังก์ชัน
E. สร้าง error response ของทุก route เองทั้งหมด

**11 const [rows] = await db.query('SELECT * FROM products') อ่านค่าใดจากผลลัพธ์ mysql2 Promise API**

A. metadata ของ fields เท่านั้น
B. array ของแถวข้อมูล
C. แถวที่มี id=1 โดยอัตโนมัติ
D. เลขจำนวนแถวเพียงค่าเดียว
E. SQL string เดิม

**12 repo.findAll() เป็น async แต่เขียน const rows = repo.findAll(); rows.map(toDTO); ปัญหาหลักคืออะไร**

A. rows ยังเป็น Promise
B. map ใช้กับ array ไม่ได้
C. async ต้องคืนเลขเท่านั้น
D. SQL ต้องใช้ POST เสมอ
E. Promise เป็น JSON string แล้ว

**13 วิธีใดเหมาะสำหรับค่าที่ user ส่งมาเพื่อค้นหา id**

A. ต่อ id เข้า SQL string โดยตรง
B. รับ SQL ทั้งประโยคจาก query parameter
C. ใช้ eval(id)
D. SELECT ... WHERE id = ? แล้วส่ง [id] ผ่าน API ของ driver
E. เปลี่ยนไปใส่ id ในชื่อตาราง

**14 ตารางใช้ id แบบ auto increment หลัง INSERT สำเร็จ ค่าที่ควรอ่านเพื่อหา record ใหม่คืออะไร**

A. fields.length
B. req.params.id ทุกกรณี
C. offset
D. affectedRows เสมือนเป็น id
E. result.insertId

**15 SKU มี unique constraint เมื่อ INSERT SKU ซ้ำ ควรตอบอะไรตาม Week-08**

A. 200 OK
B. 201 Created
C. 409 Conflict
D. 204 No Content
E. 500 ทุกกรณี

**16 GET /products/99999 ไม่พบสินค้า ตามชุดฝึกควรตอบอะไร**

A. 201 และ data=[]
B. 404 Not Found
C. 204 และ JSON null
D. 200 เสมอเพราะ SQL ทำงานสำเร็จ
E. 500 เพราะไม่พบข้อมูล

**17 signature ของ Express error-handling middleware คือข้อใด**

A. (req, res)
B. (req, res, next)
C. (status, body)
D. (err, req, res, next)
E. (db, rows)

**18 next(err) มีหน้าที่ใด**

A. เปลี่ยน error เป็น 200 อัตโนมัติ
B. ส่งต่อไปเส้นทางจัดการ error โดยข้าม handler ปกติที่เหลือ
C. ลบข้อมูลใน database
D. เรียก middleware ตัวแรกใหม่เสมอ
E. เป็นคำสั่งจบ process เสมอ

**19 ใน Express 5 async route ที่ await service แล้ว service โยน error ข้อใดถูกต้อง**

A. error ต้องถูกกลืนทิ้งเสมอ
B. จำเป็นต้อง restart MySQL ทุกครั้ง
C. Promise rejection/throw ที่เชื่อมกับ handler ถูกส่งเข้า error handling ได้
D. ต้องเปลี่ยนทุกฟังก์ชันเป็น synchronous
E. มีแค่ browser ที่รับ error ได้

**20 page เริ่มที่ 1 ถ้า page=4 และ limit=15 offset เท่าไร**

A. 15
B. 30
C. 60
D. 45
E. 75

**21 total=75 และ limit=10 ต้องมี totalPages เท่าไร**

A. 7
B. 7.5
C. 8
D. 10
E. 75

**22 GET สินค้าเฉพาะ brand_id=2 โดยแบ่งหน้า การ COUNT ควรนับอะไร**

A. สินค้าทุกแบรนด์เสมอ
B. จำนวนสมาชิกของ data ในหน้าปัจจุบันอย่างเดียว
C. จำนวน brands
D. จำนวน query ทั้งหมด
E. สินค้าทั้งหมดที่ brand_id=2 โดยใช้ filter เดียวกับ query รายการ

**23 เหตุผลหลักของ DTO คือข้อใด**

A. ใช้แทนฐานข้อมูลทั้งระบบ
B. ควบคุมรูปข้อมูลรับส่งและแยก API contract จากข้อมูลภายใน
C. ทำให้ไม่ต้อง validation
D. ทำให้ทุก field ในตารางต้องส่งไป client
E. ทำให้ HTTP ไม่ต้องมี status

**24 ต้องแปลง row.brand_id เป็น DTO field brandId ควรใช้ข้อใด**

A. { brand_id: 'brandId' }
B. { brandId: 'row.brand_id' }
C. { brandId: row.brand_id }
D. { row: brandId }
E. JSON.parse('brandId')

**25 ขอ page=2, limit=1000 ระบบจำกัด limit เหลือ 100 ต้องคำนวณ offset เท่าไร**

A. 0
B. 100
C. 200
D. 1000
E. 1100

**26 user เลือก sort column ผ่าน query วิธีใดเหมาะสมที่สุด**

A. ต่อข้อความ user เข้า ORDER BY โดยตรง
B. ใช้ ? แทนชื่อคอลัมน์แล้วถือว่าใช้ได้เหมือน value ทุกกรณี
C. เอา field ทุกชื่อใน req.body มาเป็นชื่อคอลัมน์
D. เลือกชื่อคอลัมน์จาก allowlist และจำกัด ASC/DESC
E. ห้ามมี ORDER BY ใน pagination

**27 PK เป็นคู่ (customerNumber, checkNumber) รายการใดซ้ำกัน**

A. (1,'X') กับ (2,'X') เสมอ
B. (1,'X') กับ (1,'Y') เสมอ
C. (1,'X') กับ (1,'X')
D. ทุกแถวที่ amount เท่ากัน
E. ทุกแถวที่มีวันที่เดียวกัน

**28 ข้อใดถูกต้องสำหรับ response 204 ตาม Week-08**

A. ต้องมี JSON success เสมอ
B. ต้องส่ง HTML กลับด้วย
C. เป็น code สำหรับข้อมูลซ้ำ
D. ต้องใส่ data:[]
E. ไม่มี response body ใช้ res.status(204).end() ได้

**29 ย้าย template ไปใช้ตาราง products ของ mobile_distributor แต่ query ยัง WHERE productCode=? ควรทำอะไร**

A. เปลี่ยน GET เป็น POST อย่างเดียว
B. ตรวจ schema แล้วแก้เป็น key ที่ตรง เช่น id รวมถึง mapper และคำสั่งอื่นที่เกี่ยวข้อง
C. เปลี่ยน status เป็น 200 กลบ error
D. hardcode สินค้าทุกตัวใน route
E. ลบ service layer ทิ้งเพื่อให้ SQL ผ่าน

**30 spec ฝึกขอ DELETE 204 แต่ tester ยอมรับ 200 ด้วย ควรเลือกทำอย่างไร**

A. ส่ง 200 เสมอเพราะ tester ยอมรับ
B. ส่ง 500 เพราะเอกสารขัดกัน
C. ทำให้ตรงสเปก 204 และตรวจว่าไม่มี body ไม่อาศัยเพียงความยืดหยุ่นของ tester
D. ไม่ต้องลบจริงถ้า status ผ่าน
E. แก้ tester ให้คะแนนเต็ม

## เฉลยปรนัยพร้อมเหตุผล

| ข้อ | ตอบ | เหตุผลและจุดหลอก |
|---:|:---:|---|
| 1 | B | Node คือ runtime; JavaScript คือภาษา Express คือ framework |
| 2 | C | stateless เป็นเรื่องบริบทของ request ไม่ใช่ห้ามเก็บ resource ใน DB |
| 3 | B | GET อ่าน resource และ URI ใช้คำนามตามแนวของวิชา |
| 4 | D | idempotence พิจารณาผลต่อสถานะ server ไม่บังคับ response เหมือนเดิม |
| 5 | E | แยกตำแหน่งข้อมูลให้ถูก path/query/body |
| 6 | B | status() ตั้งค่า ต้องตามด้วยการส่งหรือจบ response |
| 7 | C | JSON ต้อง double quote ไม่มี trailing comma/undefined/function |
| 8 | A | parser ต้องทำงานก่อนจึงจะอ่าน req.body ที่ parse แล้วได้ |
| 9 | D | กฎระบบอยู่ service; HTTP อยู่ controller |
| 10 | C | repository ดูแลการเข้าถึงข้อมูล ไม่ควรผูกกับ req/res |
| 11 | B | ผล SELECT เป็น [rows, fields]; rows ยังเป็น array |
| 12 | A | ต้อง await ก่อนนำ array ผลลัพธ์มา map |
| 13 | D | แยกค่าจากโครงคำสั่ง; ถ้า execute ใช้ prepared statements ของ mysql2 |
| 14 | E | insertId คือ key ใหม่ affectedRows เป็นจำนวนแถว |
| 15 | C | conflict กับ unique SKU; ข้อสอบฝึกขอ 409 |
| 16 | B | ไม่พบ resource เดียวใช้ 404 ต่างจาก collection ว่างที่อาจส่ง 200/[] |
| 17 | D | error middleware ต้องมีสี่ argument และอยู่หลัง routes |
| 18 | B | ส่ง error ไปยัง error handler ปกติไม่ต้องเดิน handler ที่เหลือต่อ |
| 19 | C | เป็นพฤติกรรม Express 5 เมื่อ Promise เชื่อมกับ handler; callback ที่อยู่นอกสายต้องจัดการอีกแบบ |
| 20 | D | (4-1)*15 = 45 |
| 21 | C | ceil(75/10)=8 หน้าสุดท้ายมี 5 แถว |
| 22 | E | data และ total ต้องอ้างข้อมูลหลัง filter ชุดเดียวกัน |
| 23 | B | DTO กำหนด contract และช่วยหลีกเลี่ยงการส่ง field ภายในที่ไม่จำเป็น |
| 24 | C | brandId คือชื่อ output และ row.brand_id คือค่า input |
| 25 | B | ใช้ limit หลังจำกัดแล้ว: (2-1)*100=100 |
| 26 | D | ชื่อ identifier ไม่ใช่ value parameter แบบทั่วไป ต้องเลือกจากรายการที่เชื่อถือได้ |
| 27 | C | composite key ซ้ำเมื่อค่าทุกส่วนในคู่ซ้ำกัน |
| 28 | E | 204 ไม่มี body ไม่ส่ง JSON เพิ่ม |
| 29 | B | ชื่อ table เหมือนเดิมไม่ได้แปลว่า schema/key เหมือนเดิม |
| 30 | C | tester ไม่ได้ตรวจ contract ครบทุกด้าน ต้องทำตามสเปก |

24-30 คะแนน: ไปซ้อมปฏิบัติเต็มรอบได้ แต่ทบทวนเหตุผลข้อที่พลาด 18-23 คะแนน: ทวนบทที่ผิดแล้วทำใหม่ ต่ำกว่า 18: เริ่มจาก HTTP/layers ก่อน ตัวเลขนี้เป็นเกณฑ์ฝึกของคู่มือ ไม่ใช่คะแนนผ่านรายวิชา

## อ่านโค้ด 5 ชุด

### ชุด 1 ลำดับ async

```js
async function work() {
  console.log('B');
  await Promise.resolve();
  console.log('D');
}
console.log('A');
work();
console.log('C');
```

ตอบลำดับที่พิมพ์ และอธิบายว่า await หยุดส่วนใด

### ชุด 2 rows และ row

```js
const result = [[{ id: 7, name: 'Phone' }], ['metadata']];
const [rows] = result;
console.log(Array.isArray(rows));
console.log(rows.id);
console.log(rows[0].id);
```

พิมพ์อะไรบ้าง ทำไม rows.id ไม่ใช่ 7

### ชุด 3 map กับ forEach

```js
const rows = [{ id: 1 }, { id: 2 }];
const a = rows.map(row => ({ productId: row.id }));
const b = rows.forEach(row => ({ productId: row.id }));
console.log(a);
console.log(b);
```

ถ้าต้องการ response DTO เป็น array ควรส่งตัวไหน

### ชุด 4 total บน array

```js
const rows = [{ id: 1 }];
rows.totalItems = 75;
console.log(rows.totalItems);
console.log(JSON.stringify(rows));
```

ทำไมข้อมูล total จึงไม่อยู่ใน JSON และควรสร้าง envelope อย่างไร

### ชุด 5 ส่ง response ซ้ำ

```js
router.get('/:id', async (req, res) => {
  const row = await repo.findOne(req.params.id);
  if (!row) res.status(404).json({ message: 'Not found' });
  res.json(row);
});
```

สมมติ findOne คืน null เมื่อไม่พบ มีข้อผิดพลาดอะไรและควรแก้ตรงไหน

### เฉลยอ่านโค้ด

1. **A B C D**: work เริ่มทำทันทีจนถึง await แล้วพักฟังก์ชันนั้น โปรแกรมด้านนอกจึงพิมพ์ C ก่อนกลับมาพิมพ์ D
2. **true, undefined, 7**: rows เป็น array แถวแรกจึงต้องเข้าด้วย rows[0]
3. **a เป็น [{productId:1},{productId:2}] ส่วน b เป็น undefined**: forEach ไม่คืน array ของค่าจาก callback
4. **75 และ [{"id":1}]**: JSON serialization ของ array ไม่ส่ง named property ที่เพิ่มเอง ควรตอบเช่น `{data:rows,pagination:{total:75}}`
5. branch not-found ส่งไปแล้วแต่ยังเดินไป res.json อีกครั้ง ให้ `return res.status(404).json(...)` หรือโยน AppError แล้วให้ middleware ตอบ การส่ง response ไม่หยุดโค้ดที่เหลือเอง

## เขียน API แบบฝึกสั้นพร้อมแนวเฉลย

### แบบฝึก A อ่านสินค้าและจัดการ 404

ให้เขียน GET `/api/รหัสนักศึกษา/products/:id` โดย controller อ่าน id, service เรียก repository และเมื่อไม่พบให้โยน error 404 ไปยัง middleware กลาง รูป success ต้องเป็น `{success:true,data:...,timestamp:...}`

แนวเฉลยด้านล่างใช้ `db` ที่ตั้งเป็น mysql2 Promise pool แล้ว และใช้ AppError จากคู่มือหลัก แต่ละ block เป็นเนื้อหาของคนละไฟล์หรือส่วนของไฟล์ ไม่ใช่ให้นำทุก block มาต่อเป็นไฟล์เดียวโดยไม่จัด import

```js
// repository: ไม่รับ req/res
export async function findById(id) {
  const [rows] = await db.query(
    'SELECT * FROM products WHERE id = ?', [id]
  );
  return rows[0] ?? null;
}
```

```js
// service: repo และ AppError ต้อง import ให้ตรงโครงงาน
export async function getProduct(id) {
  const row = await repo.findById(id);
  if (!row) {
    throw new AppError('Product not found', 404, 'PRODUCT_NOT_FOUND');
  }
  return toSummaryDTO(row); // ถ้าโจทย์ขอ detail ให้เปลี่ยนเป็น detail mapper
}
```

```js
// route: Express 5 จะรับ rejection จาก async handler นี้
router.get('/:id', async (req, res) => {
  const data = await service.getProduct(req.params.id);
  return res.status(200).json({
    success: true, data, timestamp: new Date().toISOString()
  });
});
```

จุดตรวจ: found=200, ไม่พบ=404, ไม่มี SQL ใน route, ไม่มี res ใน repo, envelope ถูก รูปแบบนี้สอนการเดินทางของข้อมูล; ยังต้องเพิ่ม validation ของ id และ Detail DTO ให้ตรงโจทย์จริง

### แบบฝึก B Pagination

สมมติใช้ readPagination จากคู่มือ และเลือกนโยบายฝึก default page=1, limit=10, สูงสุด 100 ให้เขียน repository คืน `{items,total}` และ response ที่มี metadata

```js
export async function findPage({ limit, offset }) {
  const [items] = await db.query(
    'SELECT * FROM products ORDER BY id LIMIT ? OFFSET ?', [limit, offset]
  );
  const [[{ total }]] = await db.query(
    'SELECT COUNT(*) AS total FROM products'
  );
  return { items, total: Number(total) };
}
```

```js
// ใน service
export async function getProducts(pagination) {
  const { items, total } = await repo.findPage(pagination);
  return { items: items.map(toSummaryDTO), total };
}
```

```js
// ใน route
router.get('/', async (req, res) => {
  const p = readPagination(req.query);
  const { items, total } = await service.getProducts(p);
  return res.json({
    success: true,
    data: items,
    pagination: {
      total,
      page: p.page,
      limit: p.limit,
      totalPages: Math.ceil(total / p.limit),
      hasNextPage: p.page * p.limit < total,
      hasPrevPage: p.page > 1
    },
    timestamp: new Date().toISOString()
  });
});
```

ตรวจ page=1/2/หน้าสุดท้าย/เกินหน้าสุดท้าย รวมทั้ง limit=0, page=abc, limit=1000 ตามนโยบายที่เลือก เรื่อง totalPages ตอน total=0 ให้ใช้ contract ที่ตกลงไว้ ส่วนชุดฝึกนี้ใช้ ceil(0/limit)=0

### แบบฝึก C POST และ auto increment

ให้เพิ่มสินค้าใหม่ด้วย body ของ Week-08 ห้ามเอาทุก property ที่ client ส่งไปเขียน DB โดยไม่เลือก field ใช้ column ที่ตารางต้องการ แล้วนำ insertId ไปอ่านสินค้าที่สร้าง

```js
// repository ส่วนสร้าง; findById คือฟังก์ชันด้านบน
export async function createProduct(input) {
  const sql = `INSERT INTO products
    (sku, name, brand_id, category, price, ram_gb, storage_gb,
     color, stock_quantity, status, release_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    input.sku, input.name, input.brand_id, input.category,
    input.price, input.ram_gb, input.storage_gb, input.color,
    input.stock_quantity ?? 0, input.status ?? 'AVAILABLE',
    input.release_date ?? null
  ];
  const [result] = await db.query(sql, values);
  return findById(result.insertId);
}
```

ก่อนเรียก repository ให้ service ตรวจ required fields/ชนิด/ค่าที่อนุญาตตามสเปก เช่น name ไม่ว่าง price ใช้ได้ และ brand มีจริง จากนั้นให้ middleware แปลง ER_DUP_ENTRY -> 409 และส่ง success เป็น 201 ไม่รับ input.id มา override key โดยพลการ อย่าใช้ productLine เป็น key ของตารางใหม่นี้

โจทย์ต่อ: เขียน route POST เอง และอธิบายว่า error จาก db.query เดินไปไหน ถ้า Express 5 handler ใช้ await service.createProduct(...) อย่างถูกต้อง

### แบบฝึก D PUT และ DELETE

เติมการตรวจ found ให้ PUT ของชุดฝึกรองรับ body แก้เฉพาะ field ที่ส่งมาโดยใช้ allowlist และ validation ก่อนเขียน อย่าต่อชื่อคอลัมน์จาก user โดยตรง แนว SQL เมื่อโจทย์ส่งสาม field ดังตัวอย่าง tester:

```sql
UPDATE products
SET name = ?, price = ?, stock_quantity = ?
WHERE id = ?;
```

ถ้า body ขาดบาง field ต้องตัดสินตาม contract ไม่ส่ง undefined ลง SQL โดยไม่ตั้งใจ ถ้าโจทย์รับหลายรูปแบบต้องเลือกเฉพาะ field ที่อนุญาต แล้วอ่านข้อมูลหลังแก้กลับเป็น DTO

DELETE ใช้ `DELETE FROM products WHERE id = ?` แล้วดู affectedRows ถ้า 0 ให้ 404 ถ้าลบได้ให้ route ตอบ `return res.status(204).end()` จากนั้นทดสอบ GET id เดิมแล้วต้อง 404

โจทย์ต่อ: เขียนทั้งสอง endpoint และทดลองกรณี id ไม่มีจริงก่อนส่งงาน รวมทั้งอธิบายว่าทำไมใช้ affectedRows เป็น id ของรายการใหม่ไม่ได้

### แบบฝึก E Error middleware จากความจำ

ปิดคู่มือแล้วเขียน AppError และ errorHandler ให้มีคุณสมบัติต่อไปนี้:

1. รับ error ด้วย signature สี่ argument
2. อ่าน statusCode/errorCode ที่ custom error กำหนด
3. แปลง duplicate SKU เป็น 409
4. แปลง FK ผิด/ถูกใช้งานตามใบงานเป็น 400/409
5. ปัญหาไม่คาดคิดเป็น 500 ไม่เปิดเผย raw SQL/stack
6. error response มี success:false, error.code/error.message และ timestamp
7. mount หลัง routes และ malformed JSON ไปเป็น 400

เทียบเฉลยบท 8 ของคู่มือหลังทำ ไม่ใช่คัดลอกตั้งแต่ต้น ถ้ายังจำไม่ได้ ให้เริ่มจำสามสิ่งก่อน: **สี่ argument, status จริง, อยู่หลัง routes**

## ซ้อมเต็มรอบ 120 นาทีด้วย Week-08

ใช้ SQL, template, exam-spec ของชุดใดชุดหนึ่ง และ tester ที่อยู่ในโฟลเดอร์ Week-08 อย่านำ Week-09 มารวม โจทย์มีข้อมูลตัวอย่างผู้เข้าสอบให้เลือก ให้เลือกทั้งรหัสใน spec, prefix และ argument tester ตรงกัน

| นาที | เป้าหมาย |
|---|---|
| 0-15 | อ่าน spec ให้ครบ เปิดโครงงานถูกชั้น เชื่อม DB รันแอป ตั้ง ID/port |
| 15-30 | student-info + brands list/by-id + 404 |
| 30-55 | products list, DTO, LIMIT/OFFSET และ COUNT |
| 55-70 | product detail + JOIN brand + 404 |
| 70-95 | POST, PUT, DELETE และอ่านกลับยืนยันข้อมูล |
| 95-110 | duplicate/error/envelope และรัน tester |
| 110-120 | แก้ข้อผิดสำคัญ ตรวจไฟล์และซ้อม zip ไม่ใส่ node_modules |

นี่เป็นการแบ่งเวลาฝึกที่แนะนำ ให้เปลี่ยนตามความถนัดและคำสั่งจริง ถ้าสะดุดเริ่มต้นนานให้ตั้งเป้าทำ endpoint ง่ายให้รันได้ก่อน แล้วค่อยต่อส่วนอื่น ไม่ใช้เวลาทั้งหมดกับ error เดียวโดยยังไม่ได้ดูว่าเกิดที่ layer ไหน

### แบบบันทึกหลังซ้อม

| สิ่งที่ติด | สิ่งที่ต้องแยกตรวจ |
|---|---|
| เรียก API ไม่ได้ทั้งหมด | แอปรันหรือไม่ port/base prefix ถูกหรือไม่ |
| SELECT ไม่ผ่าน | DB config, schema, table, column, SQL error |
| output เป็น array/object ผิดชั้น | ผล mysql2 [rows,fields], rows[0], mapper และ envelope |
| req.body ไม่มี | method, Content-Type, JSON syntax, parser order |
| ข้อมูลไม่กลับมาทัน | async/await และ Promise ที่คืน |
| 404 กลายเป็น 500 | AppError properties และ error handler |
| list มีข้อมูลแต่ metadata ผิด | COUNT, limit หลังตรวจ, offset, field names |
| เพิ่มได้แต่ detail DTO ไม่ครบ | mapper, JOIN และชนิด/รูปแบบวันที่ |

## ปิดท้ายด้วยคำถามปากเปล่า

ลองอธิบายโดยไม่อ่านคำตอบ:

1. ถ้า frontend ส่งสินค้ามาใหม่ ตั้งแต่ request จนได้ 201 ข้อมูลผ่านไฟล์ใดบ้าง
2. ถ้าส่ง SKU ซ้ำ error เกิดจากอะไร แล้วแปลงเป็น response ที่ใด
3. ถ้าขอ page=3&limit=10 ทำไม offset ไม่ใช่ 30
4. ทำไม service ไม่ควรเรียก res.json()
5. ทำไมเปลี่ยนชื่อคอลัมน์ใน DB แล้วมี DTO จึงลดผลกระทบกับ frontend ได้

ถ้าตอบทั้งห้าข้อนี้พร้อมเขียนโค้ดประกอบได้ แสดงว่าเริ่มเชื่อมเนื้อหาแต่ละบทเป็นระบบเดียวกันแล้ว
