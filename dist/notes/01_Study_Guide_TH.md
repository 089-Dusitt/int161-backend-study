# คู่มือติวสอบ INT161 Basic Backend Development

เตรียมสอบกลางภาคทั้งปรนัยและเขียน API ตามประกาศที่ได้รับล่าสุด ใช้เนื้อหาใน PDF สัปดาห์ 1 ถึง 7 ประกอบ transcript G1/G2 และแบบฝึกสอบ Week-08 รายละเอียดอยู่ใน [หลักฐานและสิ่งที่อาจารย์เน้น](#/sources)

สิ่งที่ต้องทำให้ได้คือ **อธิบายการเดินทางของ request ตั้งแต่ client ผ่าน route, service, repository ไปฐานข้อมูล แล้วกลับเป็น DTO และ HTTP response** รวมถึงเส้นทางเมื่อเกิด error ถ้าเข้าใจวงจรนี้ จะเชื่อมเนื้อหาทั้งวิชาเข้าด้วยกันได้

**กติกาที่ประกาศยืนยัน:** ทฤษฎี Close Book 52 ข้อ 50 คะแนน เวลา 1 ชั่วโมง ต้องใช้ดินสอ ส่วนปฏิบัติ 6 ข้อ 1C/3R/1U/1D เน้น CRUD, DTO, Pagination และ Exception Handling รวมโจทย์ 110 คะแนน คะแนนเต็ม 100 เตรียมเอกสารภายใน 15 นาทีก่อนสอบและห้ามใช้อินเทอร์เน็ตระหว่างสอบ รับ/ส่งผ่าน LEB2 รายละเอียดอยู่ใน [ข้อมูลสอบกลางภาค](#/exam)

## อ่านอะไรก่อนเข้าสอบ

| ลำดับ | เรื่อง | ต้องตอบหรือทำได้ |
|---|---|---|
| 1 | HTTP และ REST | เลือก method, path, status และตำแหน่งข้อมูลใน request |
| 2 | Layered architecture | แยก controller, service, repository และไล่การเรียกฟังก์ชัน |
| 3 | Express และ MySQL CRUD | เขียน GET/POST/PUT/DELETE ให้ข้อมูลเปลี่ยนจริง |
| 4 | Error handling | 400/404/409/500, custom error, middleware กลาง |
| 5 | Pagination และ DTO | คำนวณ offset, COUNT, metadata และแปลงชื่อ/เลือกฟิลด์ |
| 6 | Node.js และ JavaScript ที่เกี่ยวข้อง | runtime, modules, async/await, Promise, JSON, destructuring |
| 7 | Filtering และ sorting | เข้าใจ WHERE/ORDER BY และการใช้ร่วมกับ pagination |

ลำดับนี้เป็นคำแนะนำสำหรับการอ่าน ไม่ใช่สัดส่วนคะแนนข้อสอบจริง อาจารย์กล่าวใน G2 วันที่ 15 ต.ค. ว่าทฤษฎีออกเรื่องที่เรียนมา จึงไม่ควรทิ้งบทต้นทั้งหมด

**อย่าใช้ Week-09 Sample exam เป็นขอบเขต INT161** อาจารย์บอกใน G2 วันที่ 15 ต.ค. ว่าใส่มาผิด เป็นของ INT261 เนื้อหา Spring Boot ในโฟลเดอร์นั้นจึงไม่ใช่ชุดซ้อมของวิชานี้ ส่วน JWT และ authentication/authorization มีอยู่ในแผนการเรียนเดือนพฤศจิกายน แต่ยังไม่มีบทสอนแยกในชุด PDF ที่ได้รับ ไม่ต้องย้ายมาเป็นหัวข้อหลักก่อนสอบครั้งนี้เพียงเพราะเห็นชื่อใน course outline เช่นเดียวกับ ORM/Prisma ที่ปรากฏในแผนแต่ไม่มีบทแยกในหลักฐานที่ให้มา

## 1 ภาพรวมเว็บและหน้าที่ของ Backend

**Client** เป็นฝ่ายเริ่มส่ง request เช่น browser, mobile app หรือ Postman ส่วน **server** รับ request และส่ง response กลับ Backend ใช้กฎของระบบและติดต่อฐานข้อมูล ส่วน frontend แสดงผลและรับการกระทำจากผู้ใช้ Client จึงไม่จำเป็นต้องเป็น browser

- **MPA**: เปลี่ยนหน้าแล้วขอ HTML หน้าใหม่จาก server เป็นหลัก
- **SPA**: โหลดส่วนติดต่อผู้ใช้ แล้วเรียก API เพื่อรับข้อมูลมาอัปเดตหน้า มักแลกข้อมูลเป็น JSON
- **API**: ข้อตกลงว่าต้องเรียกอะไร ส่งข้อมูลอย่างไร และจะได้อะไรกลับมา
- **Web service**: บริการที่โปรแกรมอื่นเรียกผ่านเครือข่ายได้ เช่น บริการข้อมูลสินค้า
- **REST**: รูปแบบสถาปัตยกรรม ส่วน **HTTP** เป็น protocol ที่ใช้สื่อสาร
- **SOAP**: รูปแบบบริการที่ใช้ข้อความ XML และมีมาตรฐานที่เกี่ยวข้อง เช่น WSDL
- **Full stack**: ทำได้ทั้ง frontend, backend และงานข้อมูลที่เกี่ยวข้อง

**JSON เป็นข้อความ ไม่ใช่ JavaScript object ในหน่วยความจำ** แต่มีโครงสร้างที่แปลงกลับไปมาได้

```js
const object = { id: 1, name: 'Phone' };
const text = JSON.stringify(object); // object -> JSON string
const again = JSON.parse(text);      // JSON string -> object
```

JSON ใช้เครื่องหมาย `"` ครอบชื่อ property และข้อความ ไม่ใส่ comment หรือ trailing comma ไม่มีค่า `undefined` หรือ function เป็นชนิดข้อมูล JSON ส่วน `null`, boolean, number, string, object, array ใช้ได้

## 2 Node.js และพื้นฐานที่ต้องอ่านโค้ดออก

**JavaScript คือภาษา Node.js คือ runtime และ Express คือ framework** ส่วน npm ใช้จัดการ package/dependency อย่าสลับหน้าที่กัน

Node.js ทำให้รัน JavaScript นอก browser ได้ มี built-in modules เช่น `node:http`, `node:fs`, `node:path`, `node:os`, `node:events`, `node:stream`, `node:crypto` ส่วน `express` และ `mysql2` เป็น package ที่ต้องติดตั้งเพิ่มตามโครงงาน

### การแปลภาษาและการทำงาน

- **Compilation**: แปลโปรแกรมก่อนนำไปรัน เช่นเป็น native executable
- **Interpretation**: ประมวลผลผ่านตัวแปลขณะทำงาน
- **Hybrid/JIT**: ผสมการแปลหลายขั้นและการแปลขณะรัน ตัวอย่าง Java ใช้ bytecode และ VM ส่วน V8 ที่ Node.js ใช้ก็มี JIT

สไลด์อธิบายภาพพื้นฐาน อย่าจำว่า Node แปลทีละบรรทัดอย่างเดียว หรือภาษา compiled ต้องเร็วกว่าในทุกงาน

### Event loop และ async

Node ใช้ event loop จัดการ callback และงาน I/O จำนวนมาก JavaScript ของ event loop หลักทำงานทีละช่วง แต่ระบบยังมี OS และ worker pool ช่วยงานบางประเภท จึงไม่ใช่ว่าทั้งโปรแกรมมีเพียง thread เดียวทุกส่วน

**Non-blocking** หมายถึงไม่ยึด event loop รอ I/O จนทำอย่างอื่นไม่ได้ ส่วน `await` พักฟังก์ชัน async นั้นจน Promise ได้ผล ไม่ได้แช่แข็ง server ทั้งเครื่อง และไม่ได้ทำให้งาน CPU หนักกลายเป็น non-blocking โดยอัตโนมัติ [อธิบายเพิ่มเติมจาก Node.js](https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop)

```js
async function findSubject(id) {
  const [rows] = await pool.query(
    'SELECT * FROM subjects WHERE id = ?', [id]
  );
  return rows[0] ?? null;
}
```

ฟังก์ชัน `async` คืน Promise เสมอ ถ้าต้องเอาข้อมูลมาประมวลผลให้ `await` ก่อน การ `return repo.findAll()` จาก async function ทำได้เมื่อต้องการส่ง Promise ต่อ แต่การเขียน `const rows = repo.findAll(); rows.map(...)` ผิดเพราะ `rows` ยังเป็น Promise และถ้าต้องการดัก rejection ใน `try/catch` ของฟังก์ชันนั้นควร `await` ภายใน `try`

### CommonJS และ ES Modules

| เรื่อง | CommonJS | ES Modules |
|---|---|---|
| นำเข้า | `const x = require('./x')` | `import x from './x.js'` |
| ส่งออก | `module.exports = x` | `export default x` หรือ `export function f(){}` |
| การตั้งค่าในชุดเรียน | พบในตัวอย่างเก่า | `"type": "module"` ใน package.json |

```js
// named export
export function calculateOffset(page, limit) { return (page - 1) * limit; }
// อีกไฟล์: import { calculateOffset } from './pagination.js';

// default export
const settings = { port: 3000 };
export default settings;
// อีกไฟล์: import settings from './settings.js';
```

ESM ของโครงงานนี้ควรใส่นามสกุล `.js` ใน relative import และจับคู่ named/default export ให้ถูก `package.json` บอก dependency และ scripts ส่วน `node_modules` คือ package ที่ติดตั้งแล้ว อาจารย์ให้ตัดออกก่อนส่ง zip

### JavaScript ที่ใช้ตลอดวิชา

| โค้ด | ความหมาย |
|---|---|
| `const { id } = req.params` | ดึง property ชื่อ id จาก object |
| `const [rows] = await db.query(...)` | ดึงสมาชิกตำแหน่ง 0 จาก array ผลลัพธ์ |
| `rows[0]` | แถวแรกของข้อมูล ไม่ใช่ metadata |
| `items.map(toDTO)` | สร้าง array ใหม่จากการแปลงแต่ละรายการ |
| `items.filter(predicate)` | เลือกรายการที่เงื่อนไขเป็นจริง |
| `forEach(...)` | ทำบางอย่างกับแต่ละรายการ ไม่ได้คืน array ของผลลัพธ์เหมือน map |
| `const { password_hash, ...safe } = entity` | แยก field หนึ่งออก แล้วเก็บส่วนที่เหลือ |
| `Number('10')` | แปลงเป็นเลข 10 แต่ยังต้องตรวจช่วงและความเป็นจำนวนเต็ม |
| `parseInt('10abc', 10)` | ได้ 10 จึงใช้ยืนยันว่า input ทั้งหมดถูกต้องไม่ได้ |
| `value ?? defaultValue` | ใช้ค่า default เฉพาะเมื่อ null/undefined |
| `value || defaultValue` | ใช้ default เมื่อ falsy รวม 0, false, '' ด้วย |

## 3 HTTP Request และ Response

ในภาพ HTTP/1.1 request ประกอบด้วย request line ที่มี method และ request target, headers และ body ถ้ามี ส่วน response มี status line, headers และ body ถ้ามี

```http
PUT /api/123/products/7?view=full HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{"name":"Phone Pro","price":25900}
```

| ส่วนข้อมูล | ตัวอย่าง | Express อ่านจาก |
|---|---|---|
| Path parameter | `7` จาก `/products/:id` | `req.params.id` |
| Query parameter | `full` จาก `?view=full` | `req.query.view` |
| Body | object ที่มี name, price | `req.body` หลัง JSON parser |
| Header | ชนิดข้อมูลที่ส่ง | `req.get('Content-Type')` หรือ `req.headers` |
| Method | `PUT` | `req.method` |

path กับ query ใช้คนละหน้าที่ `/products/7` ระบุสินค้าชิ้นหนึ่ง ส่วน `/products?page=2&limit=10` ระบุวิธีเลือกรายการ Query และ path parameters ที่ใช้ในตัวอย่างเป็นข้อความ ต้องตรวจและแปลงก่อนใช้คำนวณ

**Content-Type** บอกชนิด body ของข้อความนั้น ส่วน **Accept** บอกชนิด response ที่ client ต้องการ เช่น request ส่ง JSON ใช้ `Content-Type: application/json` ไม่ใช่ใส่แต่ Accept แล้วคิดว่าตัว body เป็น JSON ถูกชนิดแล้ว

### Method ที่ต้องจำ

| Method | หน้าที่ตามแนวเรียน | ตัวอย่าง |
|---|---|---|
| GET | อ่านข้อมูล | `/products` หรือ `/products/7` |
| POST | สร้าง resource | `/products` พร้อม body |
| PUT | สร้าง/แทนสถานะ resource ที่ URI ตาม HTTP; ในชุดฝึกใช้แก้ไข | `/products/7` พร้อม body |
| PATCH | เปลี่ยนบางส่วน ตามรูปแบบที่ API กำหนด | `/products/7` |
| DELETE | ลบ resource | `/products/7` |

**Safe** คือ method ไม่ได้ร้องขอให้เปลี่ยนสถานะข้อมูล เช่น GET ส่วน **idempotent** คือส่งคำขอเดิมซ้ำแล้วผลที่ตั้งใจให้เกิดกับสถานะ server เทียบเท่าส่งครั้งเดียว เช่น PUT และ DELETE ไม่ได้หมายความว่า response ทุกครั้งต้องเหมือนกัน ลบครั้งแรก 204 ครั้งที่สอง 404 ยังเป็น idempotent ได้ โดยทั่วไป POST ไม่รับประกันคุณสมบัตินี้ [HTTP semantics](https://www.rfc-editor.org/rfc/rfc9110.html)

ข้อควรแยก: tester ฝึก Week-08 ส่ง PUT ที่มีเพียง name, price, stock_quantity จึงคาดหวังการแก้บาง field ในโจทย์นี้ แม้ความหมายมาตรฐาน PUT จะมุ่งแทน representation อย่าออกแบบข้อสอบเองจากความจำ ให้อ่าน body และเงื่อนไขจริง

### Status code

| Code | ความหมายและกรณีที่ควรนึกถึง |
|---|---|
| 200 OK | อ่านสำเร็จหรือแก้ไขสำเร็จตามสเปก |
| 201 Created | สร้างข้อมูลใหม่สำเร็จ |
| 204 No Content | สำเร็จและไม่มี response body เช่นลบใน Week-08 |
| 400 Bad Request | input ไม่ถูกต้อง JSON ผิด หรือขาดข้อมูลที่จำเป็น |
| 401 Unauthorized | ยังไม่มี authentication ที่ใช้ได้ |
| 403 Forbidden | server ปฏิเสธสิทธิ์เข้าถึง; มักยกตัวอย่างล็อกอินแล้วแต่สิทธิ์ไม่ถึง |
| 404 Not Found | ไม่พบ resource ตาม id หรือไม่พบ route |
| 405 Method Not Allowed | resource ไม่รองรับ method นั้น ต้องตั้งการตอบให้ตรงสเปก |
| 409 Conflict | ข้อมูลชนกับสถานะปัจจุบัน เช่น unique SKU ซ้ำ |
| 412 Precondition Failed | เงื่อนไขใน request header ไม่ผ่าน |
| 500 Internal Server Error | ปัญหาภายในที่ไม่คาดคิด |
| 503 Service Unavailable | บริการยังไม่พร้อมใช้งาน |

4xx เป็นกลุ่มปัญหาคำขอ/สิทธิ์ฝั่ง client ส่วน 5xx เป็นปัญหาฝั่ง server ตัวเลขใน JSON เช่น `{"status":404}` **ไม่เปลี่ยน HTTP status จริง** ต้องกำหนดที่ response ด้วย

### เขียนด้วย node:http โดยตรง

```js
import * as http from 'node:http';

const server = http.createServer((req, res) => {
  const u = new URL(req.url, 'http://localhost:3000');
  if (req.method === 'GET' && u.pathname === '/hello') {
    const name = u.searchParams.get('name') ?? 'World';
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ message: `Hello ${name}` }));
  }
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Not found' }));
});
server.listen(3000);
```

`writeHead()` กำหนด status/headers, `write()` เขียน body เป็นส่วน ๆ, `end()` จบ response ถ้าลืมจบ client อาจรอค้าง `IncomingMessage` คือ object ฝั่งรับ request และเป็น readable stream ส่วน `ServerResponse` ใช้สร้าง response `http.Server` ฟัง connection ส่วน `ClientRequest` ใช้ฝั่งส่ง HTTP request

Query ชื่อซ้ำ เช่น `?subject=INT161&subject=INT151` ใช้ `searchParams.getAll('subject')` ส่วน `get()` ได้ตัวแรก Native HTTP อ่าน body ผ่าน event `data` สะสม chunk แล้ว `end` จึง parse JSON ต้องจัดการ JSON ผิดและ event error ด้วย Express ช่วยลดงานส่วนนี้

## 4 REST และการออกแบบ Resource

**Resource** คือสิ่งที่ API ให้เข้าถึง เช่นสินค้า ส่วน **representation** คือข้อมูลที่ใช้แทนมัน เช่น JSON มี id, name, price Resource หนึ่งจึงมี representation หลายรูปแบบได้ และ REST ไม่ได้บังคับว่าต้อง JSON เท่านั้น

### Constraints ทั้งหก

1. **Client-server**: แยกหน้าที่ฝั่งใช้บริการกับฝั่งให้บริการ
2. **Stateless**: request ต้องมีข้อมูลพอให้ประมวลผล ไม่พึ่งบริบท session ที่จำจาก request ก่อนหน้า
3. **Cacheable**: ระบุว่าผลตอบกลับเก็บใช้ซ้ำได้หรือไม่ได้ ภายใต้เงื่อนไขใด
4. **Uniform interface**: ใช้รูปแบบสื่อสารที่มีความหมายและสม่ำเสมอ
5. **Layered system**: client ไม่จำเป็นต้องรู้ว่าติดต่อ server ปลายทางตรง ๆ หรือผ่านตัวกลาง
6. **Code on demand**: ส่งโค้ดให้ client ทำงานเพิ่ม เป็น constraint ที่เลือกใช้ได้

**Stateless ไม่ได้แปลว่า server ห้ามมีฐานข้อมูล** ข้อมูลสินค้าเป็น resource state ที่เก็บได้ สิ่งที่ไม่ควรพึ่งคือ conversation/session context ของ request ก่อนเพื่อทำความเข้าใจ request ปัจจุบัน

### Uniform interface สี่ส่วน

| ส่วน | จำด้วยตัวอย่าง |
|---|---|
| Resource identification | URI ระบุสิ่งที่ต้องการ เช่น `/products/7` |
| Manipulation through representations | ส่ง JSON เพื่อสร้างหรือเปลี่ยนข้อมูลสินค้า |
| Self-descriptive messages | method, status, header และ body ช่วยบอกความหมายของข้อความ |
| HATEOAS | มีลิงก์บอกการกระทำ/ทรัพยากรที่เกี่ยวข้องให้ client ติดตามได้ |

อาจารย์เรียก **uniform interface และ layered system ว่าเป็นแกนของวิชา** ใน G1 วันที่ 21 ส.ค. จึงควรอธิบายได้มากกว่าท่องชื่อ REST ทั้งหก

### การตั้ง URI

```text
GET    /api/123/products       อ่านรายการ
GET    /api/123/products/7     อ่านหนึ่งรายการ
POST   /api/123/products       สร้าง
PUT    /api/123/products/7     แก้ไข
DELETE /api/123/products/7     ลบ
GET    /customers/5/orders     อ่าน sub-collection ของลูกค้าคนที่ 5
```

แนวของวิชาใช้คำนามพหูพจน์และให้ method บอกการกระทำ เช่น `/products` ไม่ตั้ง `/getProducts` และ `/deleteProduct` เป็นคนละรูปแบบ API version เช่น `/api/v1/...` ช่วยให้ดูแล contract คนละรุ่นได้ การเปลี่ยนชื่อ field ที่ frontend ใช้อยู่มีผลกับ client จึงเชื่อมกับเหตุผลที่ต้องมี DTO

## 5 แยก Controller Service Repository

```text
Client/Postman
  -> JSON parser / middleware
  -> Router หรือ Controller     อ่าน HTTP และกำหนด response
  -> Service                   ใช้กฎของระบบและประสานงาน
  -> Repository                ส่ง SQL และอ่านผลฐานข้อมูล
  -> MySQL

ผลปกติย้อนกลับ -> mapper/DTO -> response
เกิด error -> ส่งต่อขึ้นมา -> error middleware -> error response
```

| งาน | อยู่ที่ใดเป็นหลัก |
|---|---|
| อ่าน req.params.id และเลือก HTTP status | Router/Controller |
| กำหนดว่า amount ต้องมากกว่า 0 | Service หรือ validation ที่กำหนดไว้ร่วมกัน |
| ตรวจเงื่อนไขว่าทำธุรกรรมนี้ได้หรือไม่ | Service |
| SELECT/INSERT/UPDATE/DELETE | Repository |
| แปลง brand_id เป็น brandId | Mapper ที่ service/controller เรียกตามโครงสร้าง |
| แปลง MySQL duplicate error เป็น JSON 409 ทั้งระบบ | Error middleware |

หน้าที่อาจมีรายละเอียดต่างกันในแต่ละโครงงาน เช่น repository ตัวอย่างโยน not-found error เองได้ หัวใจคือ **อย่าเอา req/res ไปผูกใน service/repository และอย่าเอา SQL กระจายอยู่ใน route** การแยกช่วยเปลี่ยนฐานข้อมูลโดยลดผลกระทบกับการรับ HTTP ทดสอบแยกส่วน และแบ่งงานได้

REST layered-system constraint พูดถึงชั้นของระบบและตัวกลาง ส่วน controller/service/repository เป็นการจัดโค้ดภายในที่รายวิชาใช้สอน ไม่ได้แปลว่า REST บังคับให้ทุก API ต้องมีโฟลเดอร์สามชื่อนี้

## 6 MySQL และ CRUD

ลำดับทำงานคือ ติดตั้ง driver -> สร้าง connection/pool -> ส่ง SQL -> รอผล -> แปลผล -> ส่งออกตาม API contract

**Connection** คือการเชื่อมต่อหนึ่งช่อง ส่วน **connection pool** จัดชุด connection ไว้ให้ยืมและนำกลับใช้ได้ ลดการสร้าง connection ใหม่ทุก request โครงงานใช้ `mysql2/promise` เพื่อทำงานด้วย async/await

```js
// configs/db-config.js ตัวอย่างตั้งค่าให้ตรงกับเครื่องที่ใช้
import mysql from 'mysql2/promise';
const pool = mysql.createPool({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'mobile_distributor',
  dateStrings: true
});
export default pool;
```

ตัวอย่างนี้รับชื่อผู้ใช้/รหัสผ่านผ่าน environment ของโครงงาน ต้องตั้งค่าให้ครบก่อนรัน หรือปรับตามวิธีที่ผู้สอนกำหนด `dateStrings` ช่วยให้รับวันที่จาก DB เป็น string แล้ว map รูปแบบให้ตรง API ได้ สำหรับสร้างโครงงานฝึกใหม่ต้องมี express/mysql2 ตาม dependency ของงาน ส่วนวันสอบใช้ package ที่จัดให้และกติกาที่อาจารย์ระบุ

```js
const [rows, fields] = await pool.query('SELECT * FROM products');
// rows = array ของแถว, fields = metadata ของคอลัมน์
// ในงานทั่วไปดึงเฉพาะ const [rows] ก็พอ
```

อย่าสับสน `[rows, fields]` กับ `[row1, row2]` ถ้าหา id เดียวและพบหนึ่งแถว `rows` ยังเป็น array แถวที่ต้องการคือ `rows[0]` ถ้าไม่พบจะได้ array ว่าง

### SQL หลัก

```sql
SELECT * FROM products ORDER BY id;
SELECT * FROM products WHERE id = ?;
INSERT INTO products (sku, name, brand_id, category, price,
                      ram_gb, storage_gb, color, stock_quantity, status)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
UPDATE products SET name = ?, price = ?, stock_quantity = ? WHERE id = ?;
DELETE FROM products WHERE id = ?;
SELECT COUNT(*) AS total FROM products;
```

ลำดับค่าใน array ต้องตรงกับ `?` จากซ้ายไปขวา `UPDATE`/`DELETE` ที่ลืม `WHERE` อาจกระทบทั้งตาราง ขณะเขียนข้อสอบให้ตรวจบรรทัดนี้ก่อนทดลอง

### Parameters และ SQL injection

```js
const [rows] = await pool.execute(
  'SELECT * FROM products WHERE id = ?', [id]
);
```

แยก SQL ออกจากค่า input ด้วย placeholder อย่าต่อข้อความ input เข้า SQL เอง ใน mysql2 `execute()` ใช้ prepared statements ส่วน `query(sql, values)` ที่พบในสไลด์เป็นการส่งค่าผ่านการ format/escape ของไลบรารี ไม่ใช่ server-side prepared statement แบบเดียวกันทุกกรณี และ `SET ?` ที่รับ object เป็นรูปแบบเฉพาะของ `query` อย่านำไปสลับใช้กับ `execute` โดยไม่แก้ SQL [mysql2 prepared statements](https://sidorares.github.io/node-mysql2/docs/documentation/prepared-statements)

`?` สำหรับ value ไม่ใช่ช่องใส่ชื่อ table/column หรือ ASC/DESC ตามใจผู้ใช้ การเลือกชื่อคอลัมน์ sort ต้องทำ allowlist

### ผลจากการเขียนข้อมูล

- `insertId`: id ที่ฐานข้อมูลสร้างตอน INSERT ของตาราง auto increment เช่น products.id
- `affectedRows`: จำนวนแถวที่ได้รับผลของคำสั่ง ใช้ประกอบการตรวจว่าลบหรือเขียนสำเร็จ
- การ UPDATE ข้อมูลเดิมซ้ำอาจมีรายละเอียดค่าจำนวนแถวแตกต่างตาม driver/config อย่าฟันธงว่า 0 ต้องแปลว่าไม่พบ id เสมอ ตรวจการมีอยู่ของ resource ให้ชัด
- อย่า `pool.end()` หลังทุก request ของ server เพราะ request ต่อไปยังต้องใช้ pool การปิดหลัง script ทดสอบจบเป็นอีกกรณี

### Key และ constraint

| แบบ | ตัวอย่างจากไฟล์เรียน |
|---|---|
| Primary key | products.id ระบุแถวไม่ซ้ำ |
| Auto increment | id ใหม่ให้ DB สร้าง แล้วอ่าน insertId |
| String key ไม่ auto increment | productlines.productLine ผู้ใช้ส่งค่ามา |
| Composite key | payments ใช้คู่ customerNumber และ checkNumber |
| Foreign key | products.brand_id อ้าง brands.id |
| Unique | SKU ซ้ำไม่ได้ แม้ id จะต่างกัน |

คู่ `(ลูกค้า A, เช็ค X)` กับ `(ลูกค้า B, เช็ค X)` เป็น composite key คนละค่าได้ แต่ห้ามซ้ำทั้งคู่ การตรวจซ้ำก่อนเขียนช่วยให้ข้อความดีขึ้น แต่ยังต้องรับ error จาก unique constraint เพราะคำขอสองอันอาจผ่านการตรวจก่อนเขียนพร้อมกัน

## 7 Express และ Middleware

Express ช่วย routing, อ่านข้อมูล request และสร้าง response บน Node HTTP จึงไม่ต้องเขียน stream parser หรือเทียบ URL ทุกกรณีด้วยตนเอง

```js
import express from 'express';
const app = express();

app.use(express.json());
app.put('/api/123/products/:id', (req, res) => {
  const id = req.params.id;
  const view = req.query.view;
  const input = req.body;
  return res.status(200).json({ id, view, input });
});
app.listen(3000);
```

`express.json()` ต้องอยู่ก่อน route ที่อ่าน JSON body และ request ต้องส่งชนิดข้อมูลที่ parser รองรับ ถ้า req.body ไม่มีค่าให้ตรวจ method, Content-Type, body format และลำดับ middleware

| คำสั่ง | ต้องจำ |
|---|---|
| `app.use(middleware)` | ลงทะเบียน middleware ตามลำดับ |
| `app.use('/products', router)` | mount router ใต้ prefix |
| `router.get('/:id', handler)` | จับคู่ method และ path |
| `res.status(201)` | ตั้ง status อย่างเดียว ยังไม่ส่ง response |
| `res.json(object)` | แปลงและส่ง JSON โดย status เดิมที่ตั้งไว้ หรือ 200 ตามปกติ |
| `res.status(204).end()` | จบ response ไม่มี body |
| `next()` | ส่งต่อการทำงานปกติ |
| `next(err)` | ส่งไปเส้นทางจัดการ error |

Middleware ปกติรับ `(req, res, next)` สามารถ log, parse, validate, auth หรือใส่ข้อมูลเพิ่มใน req เช่น `req.pagination` ถ้าส่ง response แล้วไม่ต้องเรียก next ต่อแบบปกติ และ `res.json()` ไม่ได้หยุด JavaScript ทุกบรรทัดหลังจากนั้นเอง จึงนิยม `return res.json(...)` เมื่อต้องการจบ handler ใน branch นั้น

middleware อาจเป็น application-level, router-level, built-in, third-party และ error-handling CORS เกี่ยวข้องกับการอนุญาตให้ browser เรียกข้าม origin ไม่ใช่กลไกยืนยันตัวตนแทน authentication

## 8 Validation และ Error Handling

**Validation** ตรวจข้อมูล เช่นมี field ที่ต้องการหรือไม่ เป็นเลขและอยู่ในช่วงหรือไม่ ส่วน **business rule** เป็นกฎระบบ เช่นยอดชำระต้องมากกว่า 0 หรือ SKU ต้องไม่ซ้ำ ทั้งสองควรทำให้ API ปฏิเสธข้อมูลผิดอย่างมีความหมาย

Error เป็น object ที่มี `message`, `name`, `stack` และอาจมี `code` เพิ่มจากระบบ การ `throw` หยุดทางเดินปกติของฟังก์ชันและส่ง error ไปให้ผู้เรียกจัดการ ใน async function จะเป็น Promise rejection ถ้าไม่ได้จัดการและหลุดออกนอกกลไก Express อาจทำให้ process ล้มได้

### รูปแบบที่ต้องเขียนเองได้

```js
export class AppError extends Error {
  constructor(message, statusCode, errorCode) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}

// service/repository เมื่อหา resource เดียวไม่พบ
// throw new AppError('Product not found', 404, 'PRODUCT_NOT_FOUND');

export function errorHandler(err, req, res, next) {
  if (res.headersSent) return next(err);
  let status = err.statusCode ?? 500;
  let code = err.errorCode ?? 'INTERNAL_SERVER_ERROR';
  let message = status >= 500 ? 'Internal server error' : err.message;

  if (err.type === 'entity.parse.failed') {
    status = 400; code = 'INVALID_JSON'; message = 'Invalid JSON body';
  } else if (err.code === 'ER_DUP_ENTRY') {
    status = 409; code = 'DUPLICATE_KEY'; message = 'Resource already exists';
  } else if (err.code === 'ER_NO_REFERENCED_ROW_2') {
    status = 400; code = 'FOREIGN_KEY_NOT_FOUND'; message = 'Invalid reference';
  } else if (err.code === 'ER_ROW_IS_REFERENCED_2') {
    status = 409; code = 'RESOURCE_IN_USE'; message = 'Resource is in use';
  }
  return res.status(status).json({
    success: false, error: { code, message },
    timestamp: new Date().toISOString()
  });
}
```

`app.use(errorHandler)` อยู่หลัง routes ต้องคง signature **สี่ตัว** `(err, req, res, next)` แม้ไม่ใช้ next ทุก branch และชื่อ `statusCode`, `errorCode` ที่โยนต้องตรงกับที่อ่าน อย่าสร้าง err.status แต่ไปอ่านเฉพาะ err.statusCode โดยไม่ได้แปลง

โครงงาน Week-08 ระบุ Express 5.x ซึ่งส่ง error จาก async handler/Promise ที่คืนกลับไปให้ error handler ได้อัตโนมัติ เมื่อใช้ `await` หรือคืน Promise ให้ถูก ส่วน callback เช่น `setTimeout` หรือ API แบบ callback ยังต้องส่ง error เข้ากลไกให้ถูก ถ้าจะเขียนแบบชัดเจนก็ใช้ `try { ... await ... } catch (err) { next(err); }` ได้ [Express error handling](https://expressjs.com/en/guide/error-handling.html)

อย่าเข้าใจจากตัวอย่างในห้องว่า throw ทุกแห่งปลอดภัยเอง หรือว่าจำเป็นต้องมี try/catch ซ้ำทุกฟังก์ชันเสมอ เป้าหมายคือ error ต้องเดินทางมาถึง middleware กลาง

### กรณีต้องตอบทันที

| สถานการณ์ | แนวตอบในแบบฝึกที่มี |
|---|---|
| ขอรายการทั้งหมดแต่ไม่มีข้อมูล | 200 พร้อม `data: []` ตาม contract |
| ขอสินค้าหนึ่ง id แต่ไม่พบ | 404 |
| JSON ผิด syntax/required input ไม่ผ่าน | 400 |
| INSERT SKU/PK ซ้ำ | 409 (`ER_DUP_ENTRY`, 1062) |
| FK อ้างแถวที่ไม่มี | 400 ในใบงาน Week-06 (`ER_NO_REFERENCED_ROW_2`, 1452) |
| ลบแถวที่ถูกอ้างและฐานข้อมูล restrict | 409 (`ER_ROW_IS_REFERENCED_2`, 1451) |
| DB/ระบบล้มโดยไม่คาดคิด | 500 พร้อมข้อความที่ไม่เปิดเผย SQL/stack/secret |

ตัว status ของบาง business error เปลี่ยนได้ตามสเปก อย่าคิดว่าทุก API ต้องใช้เหมือนใบงานนี้ทุกกรณี และอย่าส่ง 200 พร้อม `success:false` แทน HTTP error ที่โจทย์กำหนด

## 9 Pagination

การแบ่งหน้าช่วยลดงาน DB, memory, network และขนาดข้อมูลที่ client ต้องจัดการ ควรจำกัดที่ query ฐานข้อมูล ไม่ใช่ SELECT ทั้งตารางแล้วค่อย `.slice()` บน backend เพราะยังดึงข้อมูลทั้งหมดขึ้นมาแล้ว

```text
page       = หน้าที่ขอ เริ่ม 1 ในชุดนี้
limit      = จำนวนรายการต่อหน้า
offset     = (page - 1) * limit
total      = จำนวนรายการทั้งหมดที่เข้าเงื่อนไข
totalPages = Math.ceil(total / limit)
hasNextPage = page * limit < total
hasPrevPage = page > 1
```

ตัวอย่าง total=75, page=3, limit=10 -> offset=20, totalPages=8, มีทั้งหน้าก่อนและหน้าถัดไป query ข้าม 20 แถวและหยิบได้ไม่เกิน 10 แถว หน้า 8 ได้ 5 แถว โดยต้อง ORDER BY ที่แน่นอนก่อน

```js
const [rows] = await db.query(
  'SELECT * FROM products ORDER BY id LIMIT ? OFFSET ?', [limit, offset]
);
const [[{ total }]] = await db.query('SELECT COUNT(*) AS total FROM products');
```

`data.length` คือจำนวนในหน้านั้น ไม่ใช่ total ทั้งหมด `totalPages` ต้องปัดขึ้น ไม่ใช่ปัดลง ถ้ามี filter ให้ COUNT ด้วย WHERE เงื่อนไขเดียวกัน ไม่เช่นนั้น metadata จะนับคนละชุดข้อมูล

### จุดต้องแก้ในตัวอย่างสไลด์และ template

1. ตัวอย่างใช้ `Math.min(pageSize,100)` จำกัด limit แต่คำนวณ offset ด้วย pageSize เดิม ถ้าขอ page=2, limit=1000 จะข้าม 1000 ทั้งที่หยิบ 100 ต้องคูณด้วย **limit หลังตรวจและจำกัดแล้ว**
2. `Math.max(parseInt('abc'),1)` ยังเป็น NaN ต้องตรวจ input ไม่ใช่คิดว่า max/min แก้ค่าผิดได้ทั้งหมด
3. สไลด์ middleware คืน null ถ้าไม่มี page หรือ limit ตัวใดตัวหนึ่ง แต่ใบงานบอก default page=1 ต้องกำหนดพฤติกรรมให้สอดคล้องสเปกจริง
4. ควร ORDER BY ด้วย key ที่แน่นอน เช่น id ถ้าจัดเรียงตาม price ให้เติม id เป็นตัวตัดสินเมื่อราคาเท่ากัน
5. รูป JSON หน้า 7 ใน PDF pagination ระบุ page=2 แต่ hasPreviousPage=false ไม่ตรงกับสูตรทั่วไป ควรเป็น true สำหรับหน้าที่ 2
6. ชื่อ `total`/`totalItems` และ `hasPrevPage`/`hasPreviousPage` ต้องตรง contract ของงานนั้น Week-08 ใช้ total และ hasPrevPage

ตัวอย่างนโยบายฝึกที่เข้มงวดด้าน input ด้านล่างกำหนดค่า default และปฏิเสธข้อมูลผิด นี่เป็นนโยบายฝึกเพิ่มเติม ไม่ใช่ข้อความยืนยันว่าข้อสอบจริงจะใช้กฎนี้ทุกข้อ

```js
export function readPagination(query) {
  const read = (v, fallback) => {
    if (v === undefined) return fallback;
    if (typeof v !== 'string' || !/^[0-9]+$/.test(v)) {
      throw new AppError('Invalid pagination', 400, 'INVALID_PAGINATION');
    }
    const n = Number(v);
    if (!Number.isSafeInteger(n) || n < 1) {
      throw new AppError('Invalid pagination', 400, 'INVALID_PAGINATION');
    }
    return n;
  };
  const page = read(query.page, 1);
  const limit = Math.min(read(query.limit, 10), 100);
  const offset = (page - 1) * limit;
  if (!Number.isSafeInteger(offset)) {
    throw new AppError('Page too large', 400, 'INVALID_PAGINATION');
  }
  return { page, limit, offset };
}
```

total=0 อาจกำหนด totalPages=0 และ data=[] ได้ตาม contract อย่าใช้ `if(total)` เมื่อต้องรักษาค่า 0 เพราะ 0 เป็น falsy ควรตรวจ `total !== undefined` และควรเก็บข้อมูลเป็น `{ items, total }` ภายใน แทนการผูก property เพิ่มบน array โดยไม่ระวัง เพราะ JSON.stringify ของ array ไม่ส่ง property ที่ตั้งชื่ออย่าง totalItems ไปด้วย

**Cursor pagination** ใช้ตำแหน่ง/key ล่าสุดแทนข้ามแถวจำนวนมาก เป็นหัวข้อที่สไลด์ให้รู้จักสำหรับหน้าที่ลึกมาก รอบนี้เน้นสูตร offset และการเขียน LIMIT/OFFSET ก่อน

## 10 DTO และ Mapper

**Entity** สะท้อนข้อมูลในระบบ/ฐานข้อมูล ส่วน **request DTO** กำหนดข้อมูลที่ API รับ และ **response DTO** กำหนดข้อมูลที่ส่งให้ client **Mapper** คือโค้ดที่แปลงจากรูปแบบหนึ่งไปอีกแบบ DTO ไม่ใช่ตัว query DB

ทำ DTO เพื่อเลือกฟิลด์ที่ควรเห็น เปลี่ยนชื่อ field ให้ตรง contract ลดข้อมูล และแยก client ออกจาก schema ฐานข้อมูล เช่นมี password_hash ในตารางก็ไม่ส่งให้ frontend

```js
export function toSummaryDTO(row) {
  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    brandId: row.brand_id,
    category: row.category,
    price: Number(row.price),
    status: row.status
  };
}
```

ตัวอย่างนี้แปลง DECIMAL เป็น number เพื่อสัญญาที่กำหนดให้เป็น JSON number สำหรับช่วงราคาฝึก ไม่ได้หมายความว่าต้องแปลงเงินทุกระบบเป็น Number เสมอ ควรตรวจชนิดที่ mysql2 คืนและข้อกำหนดเรื่อง precision

**Summary DTO** ใน Week-08 มี id, sku, name, brandId (ยอม brand_id ตามใบงาน), category, price, status ส่วน **Detail DTO** เพิ่ม brandName, ramGb, storageGb, color, stockQuantity, releaseDate ตามตัวอย่าง การจะมี brandName ต้อง query JOIN brands หรือดึงข้อมูลที่เกี่ยวข้อง ไม่ได้เกิดจากเปลี่ยนชื่อ brand_id อย่างเดียว

```sql
SELECT p.*, b.name AS brand_name
FROM products p
JOIN brands b ON b.id = p.brand_id
WHERE p.id = ?;
```

เปลี่ยน snake_case -> camelCase เช่น stock_quantity -> stockQuantity อย่างตั้งใจ ในการ POST ของชุดฝึก body ใช้ snake_case หลาย field แต่ response detail ใช้ camelCase จึงอย่าใช้ req.body เป็น DTO response โดยไม่ map

สรุปการไหลที่ใช้บ่อยคือ `rows -> rows.map(toSummaryDTO) -> response.data` ส่วนรายการเดี่ยวคือ `row -> toDetailDTO(row) -> response.data` วันที่ releaseDate ต้องส่งรูปแบบที่โจทย์กำหนด เช่น YYYY-MM-DD ไม่ใส่ timestamp ทั้งก้อนแทนโดยไม่ตรวจ

## 11 Filtering และ Sorting

เรื่องนี้มีในวัตถุประสงค์/ชื่อหัวข้อและบทสนทนาตอนท้าย แต่ชุดโจทย์ Week-08 ที่ให้มาไม่ได้กำหนด endpoint filter/sort แยก ดังนั้นอ่านแนวคิดและ SQL ให้เป็นก่อน ไม่ต้องเดาว่าข้อสอบจะกำหนด query ชื่ออะไร

```text
GET /products?brandId=2&sort=price&order=desc&page=2&limit=10
```

- filter เลือกแถวที่เข้าเงื่อนไข ใช้ WHERE
- sort เรียงแถว ใช้ ORDER BY
- pagination เลือกช่วงแถว ใช้ LIMIT/OFFSET
- COUNT ต้องนับข้อมูลหลัง filter และก่อนจำกัดหน้า

```sql
SELECT * FROM products
WHERE brand_id = ?
ORDER BY price DESC, id ASC
LIMIT ? OFFSET ?;

SELECT COUNT(*) AS total FROM products WHERE brand_id = ?;
```

ถ้าให้ user เลือก sort field ให้แปลงจากค่าที่อนุญาตเท่านั้น เช่น `{price:'price',name:'name',id:'id'}` และ order จำกัด ASC/DESC อย่านำข้อความจาก query มาต่อชื่อคอลัมน์โดยตรง

## 12 ทำโจทย์ปฏิบัติ Week-08 อย่างไร

บทนี้อธิบายชุดซ้อม Week-08 เดิม ไม่ใช่สเปกข้อสอบจริงฉบับใหม่ ประกาศล่าสุดระบุ 6 ข้อ 1C/3R/1U/1D ให้ยึด spec และ template ที่อาจารย์แจกในวันสอบ และใช้คะแนนของ tester ด้านล่างเพื่อฝึกเท่านั้น

ระบบตัวอย่างคือ **Mobile Phone Distributor** ฐานข้อมูล `mobile_distributor` มี brands และ products SQL ระบุ seed แบรนด์ 22 และสินค้า 75 รายการ นี่เป็นข้อมูลชุดซ้อม ไม่ใช่การรับประกันจำนวนข้อมูลข้อสอบจริง

| Endpoint ใต้ `/api/รหัสนักศึกษา` | งาน | ผลหลัก |
|---|---|---|
| GET `/student-info` | ข้อมูลผู้เข้าสอบตามชุดของตน | 200, success/data/timestamp |
| GET `/brands` | รายการแบรนด์ | 200, data เป็น array |
| GET `/brands/:id` | แบรนด์เดียว | 200 หรือ 404 |
| GET `/products?page=1&limit=10` | Summary DTO และ pagination | 200 |
| GET `/products/:id` | Detail DTO | 200 หรือ 404 |
| POST `/products` | บันทึกสินค้า | 201 หรือ 409 เมื่อ SKU ซ้ำ |
| PUT `/products/:id` | แก้สินค้า | 200 หรือ 404 |
| DELETE `/products/:id` | ลบสินค้า | 204 ไม่มี body หรือ 404 |

**อย่าใช้รหัสและ Secret Key ตัวอย่างแทนข้อมูลของตนในวันสอบ** ค่าใน student-info เป็นข้อมูลโจทย์เฉพาะบุคคล ส่วน timestamp ควรสร้างด้วย `new Date().toISOString()` ไม่ hardcode เวลาจากตัวอย่าง อาจารย์เตือนเรื่องนี้ใน G2 วันที่ 15 ต.ค.

### จุดที่ template ปัจจุบันยังต้องปรับ

| จุดในไฟล์ฝึก | เหตุที่ทำงานผิดกับฐานข้อมูลโจทย์ | สิ่งที่ต้องคิดแก้ |
|---|---|---|
| app ใช้ ID เดิมและ mount offices/productlines | ยังเป็น resource ของ classicmodels | ตั้ง ID และ mount brands/products ให้ตรง |
| WHERE productCode = ? | ตารางใหม่ใช้ id | เปลี่ยน query ของ find/update/delete |
| create ใช้ data.productLine เป็น key | key นี้ไม่ได้เป็น id ของสินค้ามือถือ | INSERT แล้วอ่าน insertId; ตรวจซ้ำที่ sku |
| mapper ใช้ productCode/productName/MSRP | field เหล่านี้ไม่มีในตารางใหม่ | map id/name/price และ field ของ mobile schema |
| getObject รับ viewType แต่ไม่ส่งให้ mapper | view ที่ขออาจไม่มีผล | ส่ง argument ให้ครบตามที่ออกแบบ |
| response POST เป็น `{result}` และ PUT ส่ง object ตรง | envelope ไม่สม่ำเสมอกับสเปก | ครอบ success/data/timestamp ให้ตรง |
| pagination ใช้ pageSize เดิมใน offset | offset ผิดเมื่อจำกัด limit | ใช้ limit ที่ตรวจแล้ว |
| package.json ไม่มี start script | `npm start` ตามเอกสารยังใช้ไม่ได้กับไฟล์นี้ | ใช้ `node src/app.js` หรือเพิ่ม `"start":"node src/app.js"` ใน scripts |
| ใบงานยก path `database/init-database.sql` | ในชุดที่มีไฟล์ SQL อยู่ราก Week-08 | เลือก path ที่มีจริง/นำเข้า SQL ผ่านเครื่องมือ DB |

อย่าคิดว่าแค่เปลี่ยนชื่อไฟล์หรือ table จะเสร็จ ต้องดู **schema, key, column, request body และ response** ทั้งหมด Template นี้เป็นจุดเริ่ม ไม่ใช่เฉลยที่ทำครบแล้ว

### ทดสอบตามวงจรข้อมูล

1. เริ่มจากรัน server ให้ได้และเชื่อม DB ได้
2. ทำ student-info และ GET brands ให้ตรงสเปกก่อน
3. ทำ GET by id ทั้ง found/not found
4. ทำ products list + pagination + Summary DTO
5. ทำ Detail DTO และข้อมูล brand ที่ต้อง JOIN
6. POST แล้ว GET id ใหม่ยืนยันว่าบันทึกจริง
7. PUT แล้ว GET ยืนยันค่าที่เปลี่ยน
8. DELETE แล้ว GET ยืนยัน 404 และลองลบซ้ำ
9. ทดลอง SKU ซ้ำ JSON ผิด และ error response
10. ดู output ด้วยตนเองก่อนรัน tester แล้วอ่าน failure ทีละข้อ

เปิด server ค้างไว้หนึ่ง terminal และเปิด terminal อีกอันเรียก tester จากตำแหน่ง Week-08 ที่มี tests:

```text
node tests/test-runner.mjs รหัสชุดซ้อม
```

ถ้า terminal อยู่ใน tests แล้วใช้ `node test-runner.mjs รหัสชุดซ้อม` ไม่ต้องซ้ำ tests อีกชั้น รหัสต้องตรงกับ prefix ใน app tester รับ port เป็น argument ถัดไปได้ โดย default 3000 และไม่ต้องใช้ package เพิ่มเพื่อรัน tester นี้

### คะแนนที่เห็นในตัว tester ฝึก

| หมวด | คะแนนใน test-runner ที่ตรวจดู |
|---|---:|
| Identity | 10 |
| Brands | 10 |
| Products query รวม pagination/summary/detail | 35 |
| Products POST/PUT/DELETE | 30 |
| Standards และ error | 15 |
| รวม | 100 |

คะแนนย่อยในใบงานกับ tester มีบางจุดต่างกัน เช่น DELETE ใบงานเขียน 5 แต่ tester ให้ 10 และใบงานไม่ได้แจกแจงหมวด standards ครบแบบเดียวกัน ตารางนี้จึงเป็น **คะแนนของ tester ฝึกที่มีอยู่** ไม่ใช่การยืนยัน blueprint ข้อสอบจริง

tester ยังยอมรับบางอย่างกว้างกว่าสเปก เช่น DELETE 200 ก็ผ่าน และ duplicate 400 ก็ผ่าน แต่ใบงานขอ 204 และ 409 ตามลำดับ จึงควรทำให้ตรงสเปกเต็ม ไม่แก้โค้ดให้ผ่านเฉพาะสิ่งที่ tester ตรวจ และ tester นี้ไม่ได้พิสูจน์การแบ่ง layer หรือความถูกต้องทุก field ให้ทั้งหมด

## 13 จุดหลอกที่ควรปิดหนังสือแล้วตอบให้ได้

- Node.js ไม่ใช่ภาษา และ Express ไม่ใช่ฐานข้อมูล
- JSON string ไม่ใช่ JS object แต่แปลงกันได้ด้วย parse/stringify
- query, params และ body อ่านคนละที่
- res.status() อย่างเดียวยังไม่ส่ง response
- 204 ไม่มี body; อย่าส่ง JSON success เพิ่ม
- 404 ไม่ใช่ 500 และ duplicate unique key ไม่ควรปล่อย 500
- ใส่เลข status ใน body ไม่ได้ตั้ง HTTP status
- ไม่มีแถวใน collection กับหา resource เดียวไม่พบเป็นคนละกรณี
- Stateless ยังเก็บข้อมูลสินค้าใน DB ได้
- Idempotent ไม่ได้แปลว่า response ต้องเหมือนเดิมทุกครั้ง
- Repository คืน rows ต้องดูว่าเป็น array หรือ object ตามที่ฟังก์ชันตกลง
- async คืน Promise และต้องรอผลก่อนอ่านข้อมูล
- Error middleware มีสี่ argument และอยู่ท้าย routes
- เมื่อเกิด error ภายใน async route ของ Express 5 ต้องให้ Promise เชื่อมกับ handler ด้วย
- Pagination ต้อง COUNT ทั้งชุด ไม่ใช้ data.length ของหน้านั้น
- totalPages ปัดขึ้น; offset ใช้ limit หลังตรวจแล้ว
- DTO ช่วยแยก contract กับ schema ไม่ใช่แค่ลดจำนวน field
- field names และ envelope ต่างกันในแต่ละงาน ต้องอ่านสเปกของงานนั้น

## 14 แผนเตรียมสอบตามรูปแบบจริง

แยกวิธีฝึกสองภาค เพราะทฤษฎี Close Book แต่ปฏิบัติใช้เอกสารที่เตรียมไว้แบบออฟไลน์ได้ ประกาศล่าสุดไม่ได้ระบุวันสอบและเวลาปฏิบัติในข้อความที่ได้รับ จึงไม่ผูกแผนนี้กับวันที่เดิม

| รอบฝึก | สิ่งที่ทำ | เป้าหมาย |
|---|---|---|
| ทฤษฎี 60 นาที | ปิดเอกสาร ตอบคำถาม อธิบายแนวคิด และอ่านโค้ด | ไม่พึ่งการค้นหาเมื่อเข้าภาค Close Book |
| ทบทวนข้อผิด | กลับไปอ่านเฉพาะเรื่องที่ตอบไม่ได้ แล้วปิดสรุปอธิบายใหม่ | เข้าใจเหตุผล ไม่จำเฉพาะตัวเลือก |
| ปฏิบัติ 120 นาทีสำหรับซ้อม | ใช้เอกสาร offline ฝึก 1C/3R/1U/1D | ครบ CRUD, DTO, Pagination, Exception Handling |
| ตรวจหลังซ้อม | ไล่ method/path/body/status/DTO และ error แล้วอ่านกลับจาก DB | ยืนยันข้อมูลเปลี่ยนจริงและ contract ถูก |

120 นาทีเป็นเวลาซ้อมแนะนำ ไม่ใช่การยืนยันเวลาปฏิบัติจากประกาศล่าสุด ทฤษฎีจริงมี 52 ข้อใน 60 นาที เฉลี่ยประมาณ 69 วินาทีต่อข้อ ส่วนแบบฝึก 30 ข้อของเว็บเป็นชุดฝึกเพิ่มเติม

ก่อนสอบทฤษฎีเตรียมดินสอและฝึกปิดเอกสาร ก่อนสอบปฏิบัติเตรียมบัญชี LEB2 และดาวน์โหลด Soft Copy ให้เสร็จในช่วง 15 นาทีตามประกาศ หลังจากนั้นห้ามเชื่อมต่ออินเทอร์เน็ต รับ/ส่ง project ตามขั้นตอนผู้คุมผ่าน LEB2 หากมีคำถามให้ถามใน Channel General ของรายวิชา

คะแนนปฏิบัติรวมโจทย์ 110 แต่คะแนนเต็ม 100 ตามประกาศ ยังไม่ระบุวิธีคิดส่วนเกิน จึงไม่สมมติสูตรปรับคะแนนเอง ไม่อ้างว่าทุกข้อทฤษฎีมีคะแนนเท่ากัน เพราะ 52 ข้อรวม 50 คะแนน

ตรวจ template จริงและ schema ก่อนใช้ตัวอย่าง ZIP int161-exam-kit-main.zip ที่ได้รับเป็นชุดโค้ดและคู่มือสำหรับปรับเข้ากับ teacher template ยังไม่พบ midterm-exam-esm-template.zip ภายใน จึงไม่ถือว่าชุดฝึกคือ template สอบจริงที่ยืนยันแล้ว

ใช้ [คำศัพท์ 110 คำ](#/glossary) และ [แบบฝึกพร้อมเฉลย](#/practice) ตรวจความเข้าใจ รายละเอียดประกาศอยู่ใน [ข้อมูลสอบกลางภาค](#/exam)
