import type { PortfolioItem } from "@/lib/portfolio";

/**
 * Drawn stand-ins for product screenshots, one per product, built from the
 * product's real content. Swapped for a photo when `image` is set.
 */
export function PortfolioMock({ item }: { item: PortfolioItem }) {
  switch (item.id) {
    case "statusdesk":
      return <StatusDeskMock />;
    case "factory-os":
      return <FactoryOsMock />;
    case "queuebooking":
      return <QueueBookingMock />;
    default:
      return <AppMock />;
  }
}

const INK = "#17221e";
const RULE = "#d8ddd8";
const GREEN = "#40bd5f";

function StatusDeskMock() {
  const bubbles = [
    { me: true, t: "งาน SO-2410-088 ถึงไหนแล้ว" },
    { me: false, t: "QC ผ่านแล้ว 14:20 · รอแพ็ก 2 พาเลท" },
    { me: false, t: "คาดส่ง พรุ่งนี้ 10:00 · อัปเดต 5 นาทีที่แล้ว", warn: false },
    { me: true, t: "PO วัตถุดิบล็อต B ค้างไหม" },
    { me: false, t: "PO-7731 เกินกำหนด 2 วัน · แจ้งจัดซื้อแล้ว", warn: true },
  ];
  return (
    <svg viewBox="0 0 640 400" className="block h-auto w-full" aria-hidden="true">
      <rect width="640" height="400" fill="#0C1A3A" />
      <rect x="40" y="24" width="250" height="352" rx="24" fill="#0f2250" stroke="#2a3f73" />
      <rect x="40" y="24" width="250" height="44" rx="24" fill="#16305f" />
      <circle cx="68" cy="46" r="10" fill={GREEN} />
      <text x="86" y="50" fontSize="12" fill="#fff" fontWeight="600">StatusDesk Bot</text>
      {bubbles.map((b, i) => {
        const y = 84 + i * 54;
        const w = Math.min(190, 40 + b.t.length * 6.2);
        const x = b.me ? 290 - 14 - w : 54;
        return (
          <g key={i} className="pf-bubble" style={{ "--i": i } as React.CSSProperties}>
            <rect x={x} y={y} width={w} height="38" rx="12" fill={b.me ? GREEN : b.warn ? "#e3a018" : "#1b3a7a"} />
            <text x={x + 10} y={y + 23} fontSize="10.5" fill={b.me ? "#0C1A3A" : "#fff"}>{b.t}</text>
          </g>
        );
      })}
      {/* agent graph */}
      {[
        ["จัดซื้อ", 380, 90], ["คลัง", 500, 90], ["QC", 380, 190], ["ผลิต", 500, 190], ["จัดส่ง", 440, 290],
      ].map(([l, x, y], i) => (
        <g key={i} className="pf-node" style={{ "--i": i } as React.CSSProperties}>
          <circle cx={x as number} cy={y as number} r="30" fill="#16305f" stroke={GREEN} strokeWidth="1.5" />
          <text x={x as number} y={(y as number) + 4} textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600">{l}</text>
        </g>
      ))}
      {[[380,90,500,90],[380,90,380,190],[500,90,500,190],[380,190,440,290],[500,190,440,290],[380,190,500,190]].map(([a,b,c,d],i)=>(
        <line key={i} className="pf-edge" x1={a} y1={b} x2={c} y2={d} stroke={GREEN} strokeWidth="1.2" strokeDasharray="100" pathLength={100} opacity="0.6" />
      ))}
      <text x="440" y="356" textAnchor="middle" fontSize="11" fill="#8fa5c9">บอทแต่ละฝ่ายคุยกันเอง แล้วตอบตามสิทธิ์</text>
    </svg>
  );
}

function FactoryOsMock() {
  const machines = [
    [10, 140, false], [70, 140, false], [130, 140, true], [190, 140, false],
    [10, 210, false], [70, 210, false], [130, 210, false], [190, 210, false],
  ] as const;
  return (
    <svg viewBox="0 0 640 400" className="block h-auto w-full" aria-hidden="true">
      <rect width="640" height="400" fill="#F6F7FB" />
      <rect x="0" y="0" width="640" height="40" fill="#fff" stroke={RULE} />
      <rect x="200" y="10" width="240" height="20" rx="6" fill="#eef0f4" />
      <text x="212" y="24" fontSize="10" fill="#56645f">⌘K  แจ้งซ่อมเครื่อง CNC-03 ไฟกระพริบ</text>
      <rect x="0" y="40" width="150" height="360" fill="#fff" stroke={RULE} />
      {["ภาพรวม","จัดซื้อ","คลังสินค้า","ผลิต","ซ่อมบำรุง","บัญชี","HR","CRM"].map((m,i)=>(
        <text key={m} x="16" y={70+i*30} fontSize="11" fill={i===0?"#1d7f54":"#56645f"} fontWeight={i===0?"600":"400"}>{m}</text>
      ))}
      <rect x="170" y="60" width="300" height="220" rx="10" fill="#fff" stroke={RULE} />
      <clipPath id="fos-floor"><rect x="170" y="60" width="300" height="220" rx="10" /></clipPath>
      <text x="186" y="84" fontSize="12" fontWeight="600" fill={INK}>ผังโรงงาน · ไลน์ผลิต 1</text>
      <g transform="translate(190 0)" clipPath="url(#fos-floor)">
        {machines.map(([x,y,bad],i)=>(
          <g key={i} className="pf-machine" style={{ "--i": i } as React.CSSProperties}>
            <polygon points={`${x},${y+20} ${x+30},${y+5} ${x+60},${y+20} ${x+30},${y+35}`} fill={bad?"#f3c0b8":"#dfe7e2"} />
            <polygon points={`${x},${y+20} ${x+30},${y+35} ${x+30},${y+55} ${x},${y+40}`} fill={bad?"#d4513b":"#9fb8aa"} />
            <polygon points={`${x+30},${y+35} ${x+60},${y+20} ${x+60},${y+40} ${x+30},${y+55}`} fill={bad?"#b3402c":"#7fa08f"} />
          </g>
        ))}
      </g>
      <g className="pf-alert">
        <rect x="300" y="112" width="88" height="22" rx="6" fill="#d4513b" />
        <text x="344" y="127" textAnchor="middle" fontSize="10" fill="#fff" fontWeight="600">CNC-03 เสีย</text>
      </g>
      <rect x="490" y="60" width="130" height="100" rx="10" fill="#fff" stroke={RULE} />
      <text x="504" y="82" fontSize="11" fontWeight="600" fill={INK}>รออนุมัติ</text>
      {[0,1,2].map(i=>(<g key={i}><rect x="504" y={94+i*18} width="80" height="8" rx="3" fill="#eef0f4"/><rect x="590" y={92+i*18} width="18" height="12" rx="3" fill={GREEN}/></g>))}
      <rect x="490" y="176" width="130" height="104" rx="10" fill="#fff" stroke={RULE} />
      <text x="504" y="198" fontSize="11" fontWeight="600" fill={INK}>ภ.พ.30 เดือนนี้</text>
      <text x="504" y="232" fontSize="22" fontWeight="600" fill="#1d7f54">฿ 42,180</text>
      <text x="504" y="252" fontSize="9.5" fill="#56645f">ใบกำกับภาษี 128 ฉบับ</text>
      <rect x="170" y="296" width="450" height="84" rx="10" fill="#fff" stroke={RULE} />
      <text x="186" y="318" fontSize="11" fontWeight="600" fill={INK}>บอทเฝ้าระบบ</text>
      {["สต็อกต่ำ: น็อต M8 เหลือ 2 วัน","PM เครื่องฉีด #2 ครบกำหนดพรุ่งนี้","ใบเสนอราคา Q-118 ยังไม่ตอบ 5 วัน"].map((t,i)=>(
        <g key={i} className="pf-bot" style={{ "--i": i } as React.CSSProperties}>
          <circle cx="192" cy={338+i*16} r="3" fill={i===0?"#e3a018":GREEN}/>
          <text x="202" y={342+i*16} fontSize="10" fill="#56645f">{t}</text>
        </g>
      ))}
    </svg>
  );
}

function QueueBookingMock() {
  return (
    <svg viewBox="0 0 640 400" className="block h-auto w-full" aria-hidden="true">
      <rect width="640" height="400" fill="#0b0f16" />
      {/* signage */}
      <rect x="40" y="40" width="330" height="200" rx="12" fill="#121826" stroke="#273045" />
      <text x="60" y="70" fontSize="12" fill="#8fa59a">กำลังเรียกคิว</text>
      <text x="205" y="170" textAnchor="middle" fontSize="84" fontWeight="700" fill="#fff" className="pf-queue-no">A-042</text>
      <text x="205" y="212" textAnchor="middle" fontSize="14" fill={GREEN}>ช่อง 2 · ตัดผมชาย</text>
      <rect x="40" y="260" width="330" height="110" rx="12" fill="#121826" stroke="#273045" />
      <text x="60" y="286" fontSize="11" fill="#8fa59a">Queue Board · วันนี้</text>
      {[["A-043","รอ"],["A-044","รอ"],["A-045","มัดจำแล้ว"],["A-046","รอ"]].map(([n,s],i)=>(
        <g key={n} className="pf-row" style={{ "--i": i } as React.CSSProperties}>
          <rect x={60+i*78} y="300" width="68" height="50" rx="8" fill="#1a2335" />
          <text x={94+i*78} y="322" textAnchor="middle" fontSize="13" fontWeight="600" fill="#fff">{n}</text>
          <text x={94+i*78} y="340" textAnchor="middle" fontSize="9.5" fill={s==="รอ"?"#8fa59a":GREEN}>{s}</text>
        </g>
      ))}
      {/* phone */}
      <rect x="410" y="30" width="190" height="340" rx="26" fill="#fff" stroke="#273045" />
      <rect x="410" y="30" width="190" height="48" rx="26" fill="#06c755" />
      <rect x="410" y="60" width="190" height="18" fill="#06c755" />
      <text x="505" y="60" textAnchor="middle" fontSize="12" fill="#fff" fontWeight="600">ร้าน Barber & Co.</text>
      {[
        ["จองคิวตัดผม พรุ่งนี้ 14:00", true],
        ["ได้เลยครับ คิว A-042 ช่าง Tee", false],
        ["มัดจำ 100 บาท สแกน QR นี้", false],
        ["ชำระแล้ว ✓ ส่งใบเสร็จให้แล้ว", false],
        ["เตือน: อีก 30 นาทีถึงคิวของคุณ", false],
      ].map(([t, me], i) => {
        const y = 96 + i * 46;
        const w = 150;
        const x = me ? 600 - 12 - w : 422;
        return (
          <g key={i} className="pf-bubble" style={{ "--i": i } as React.CSSProperties}>
            <rect x={x} y={y} width={w} height="34" rx="12" fill={me ? "#9be89b" : "#f0f2f5"} />
            <text x={x + 10} y={y + 21} fontSize="9.5" fill={INK}>{t as string}</text>
          </g>
        );
      })}
      <rect x="455" y="326" width="100" height="30" rx="8" fill="#06c755" className="pf-cta" />
      <text x="505" y="345" textAnchor="middle" fontSize="11" fill="#fff" fontWeight="600">จองคิว</text>
    </svg>
  );
}

function AppMock() {
  const steps = ["AI สร้างแอป", "Security audit", "Integrate ERP / LINE", "Deploy + Care"];
  return (
    <svg viewBox="0 0 640 400" className="block h-auto w-full" aria-hidden="true">
      <rect width="640" height="400" fill="#eaf5ee" />
      <rect x="40" y="50" width="560" height="300" rx="14" fill="#fff" stroke={RULE} />
      <text x="320" y="96" textAnchor="middle" fontSize="20" fontWeight="600" fill={INK}>AI builds the system.</text>
      <text x="320" y="124" textAnchor="middle" fontSize="20" fontWeight="600" fill="#1d7f54">We make it work for real.</text>
      {steps.map((s, i) => (
        <g key={s} className="pf-step" style={{ "--i": i } as React.CSSProperties}>
          <rect x={70 + i * 132} y="180" width="120" height="70" rx="10" fill={i === 0 ? "#f6f7f4" : "#e3f1e9"} stroke={i === 0 ? RULE : GREEN} />
          <text x={130 + i * 132} y="210" textAnchor="middle" fontSize="11" fontWeight="600" fill={INK}>{s}</text>
          <text x={130 + i * 132} y="230" textAnchor="middle" fontSize="9.5" fill="#56645f">{i === 0 ? "Cursor · Lovable · Bolt" : "GO Along"}</text>
          {i < steps.length - 1 && <text x={196 + i * 132} y="220" fontSize="16" fill={GREEN}>→</text>}
        </g>
      ))}
      {["ตรวจช่องโหว่ 23 รายการ → แก้แล้ว", "backup ทดสอบกู้คืนสำเร็จ", "uptime 30 วัน 99.98%"].map((t, i) => (
        <g key={t} className="pf-bot" style={{ "--i": i } as React.CSSProperties}>
          <circle cx="90" cy={290 + i * 18} r="4" fill={GREEN} />
          <text x="102" y={294 + i * 18} fontSize="11" fill="#56645f">{t}</text>
        </g>
      ))}
    </svg>
  );
}
