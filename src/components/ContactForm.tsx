"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { contactTopics, validateContact, type ContactErrors, type ContactInput } from "@/lib/contact";

type Status = "idle" | "sending" | "sent" | "error";

const initial = {
  name: "",
  company: "",
  email: "",
  phone: "",
  topic: "",
  message: "",
  website: "",
};

export function ContactForm({ defaultTopic = "" }: { defaultTopic?: string }) {
  const [values, setValues] = useState({ ...initial, topic: defaultTopic });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const startedAt = useRef(0);
  const doneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "sent") doneRef.current?.focus();
  }, [status]);

  function update(key: keyof typeof initial, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    const payload: Partial<ContactInput> = { ...values, startedAt: startedAt.current };
    const { errors: found } = validateContact(payload);
    if (Object.keys(found).length) {
      setErrors(found);
      const first = Object.keys(found)[0];
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok: boolean; error?: string; errors?: ContactErrors };
      if (json.ok) {
        setStatus("sent");
        return;
      }
      if (json.errors) setErrors(json.errors);
      setServerError(json.error ?? "ตรวจข้อมูลที่กรอกอีกครั้ง");
      setStatus("error");
    } catch {
      setServerError("เชื่อมต่อไม่ได้ ตรวจอินเทอร์เน็ตแล้วลองส่งอีกครั้ง");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        ref={doneRef}
        tabIndex={-1}
        role="status"
        className="rounded-[22px] bg-andon-soft p-6 outline-none"
      >
        <h2 className="text-[1.3rem] font-semibold text-andon-deep">ส่งข้อความแล้ว</h2>
        <p className="mt-2">
          ขอบคุณครับ ทีมงานจะตอบกลับทางอีเมล <strong>{values.email}</strong>
          {values.phone && <> หรือโทรกลับที่ {values.phone}</>} โดยเร็วที่สุด
        </p>
        <button
          onClick={() => {
            setValues({ ...initial });
            setStatus("idle");
            startedAt.current = Date.now();
          }}
          className="mt-4 text-andon-deep underline underline-offset-4"
        >
          ส่งข้อความอื่น
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative rounded-[22px] bg-tile p-5 sm:p-7">
      <h2 className="text-[1.3rem] font-semibold">ส่งข้อความถึงทีมงาน</h2>
      <p className="mt-1 text-[0.95rem] text-steel">ช่องที่มี * ต้องกรอก</p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Input id="name" label="ชื่อ *" autoComplete="name" value={values.name} error={errors.name} onChange={update} />
        <Input id="company" label="บริษัท" autoComplete="organization" value={values.company} onChange={update} />
        <Input id="email" label="อีเมล *" type="email" autoComplete="email" value={values.email} error={errors.email} onChange={update} />
        <Input id="phone" label="เบอร์โทร" type="tel" autoComplete="tel" value={values.phone} error={errors.phone} onChange={update} />
      </div>

      <label htmlFor="cf-topic" className="mt-4 block text-[0.95rem] font-medium">
        เรื่องที่ติดต่อ
      </label>
      <select
        id="cf-topic"
        value={values.topic}
        onChange={(e) => update("topic", e.target.value)}
        className="mt-1 w-full rounded-xl border border-rule bg-panel px-3 py-2.5"
      >
        <option value="">เลือกเรื่อง</option>
        {contactTopics.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <label htmlFor="cf-message" className="mt-4 block text-[0.95rem] font-medium">
        รายละเอียด *
      </label>
      <textarea
        id="cf-message"
        rows={6}
        value={values.message}
        onChange={(e) => update("message", e.target.value)}
        aria-invalid={Boolean(errors.message)}
        aria-describedby={errors.message ? "cf-message-err" : "cf-message-hint"}
        className={`mt-1 w-full rounded-xl border bg-panel px-3 py-2.5 ${errors.message ? "border-[#b3402c]" : "border-rule"}`}
        placeholder="เช่น อยากทำระบบติดตามออเดอร์สำหรับโรงงาน 50 คน ตอนนี้ใช้ Excel อยู่"
      />
      {errors.message ? (
        <p id="cf-message-err" className="mt-1 text-[0.9rem] text-[#b3402c]">{errors.message}</p>
      ) : (
        <p id="cf-message-hint" className="mt-1 text-[0.85rem] text-steel">
          เล่าว่าตอนนี้ทำงานอย่างไร และอยากให้ระบบช่วยเรื่องอะไร
        </p>
      )}

      {/* Honeypot: hidden from people, bots tend to fill it */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="cf-website">เว็บไซต์</label>
        <input
          id="cf-website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      {serverError && (
        <p role="alert" className="mt-4 rounded-md bg-[#fbe9e5] px-4 py-2.5 text-[0.95rem] text-[#8f2f1f]">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 w-full rounded-full bg-andon px-6 py-3 font-medium text-white hover:bg-andon-deep disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "กำลังส่ง…" : "ส่งข้อความ"}
      </button>
      <p className="mt-3 text-[0.85rem] text-steel">
        เราใช้ข้อมูลนี้เพื่อติดต่อกลับเท่านั้น ตาม
        <Link href="/privacy-policy" className="underline underline-offset-2">นโยบายความเป็นส่วนตัว</Link>
      </p>
    </form>
  );
}

function Input({
  id,
  label,
  value,
  error,
  type = "text",
  autoComplete,
  onChange,
}: {
  id: keyof typeof initial;
  label: string;
  value: string;
  error?: string;
  type?: string;
  autoComplete?: string;
  onChange: (key: keyof typeof initial, value: string) => void;
}) {
  return (
    <div>
      <label htmlFor={`cf-${id}`} className="block text-[0.95rem] font-medium">
        {label}
      </label>
      <input
        id={`cf-${id}`}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `cf-${id}-err` : undefined}
        className={`mt-1 w-full rounded-xl border bg-panel px-3 py-2.5 ${error ? "border-[#b3402c]" : "border-rule"}`}
      />
      {error && (
        <p id={`cf-${id}-err`} className="mt-1 text-[0.9rem] text-[#b3402c]">
          {error}
        </p>
      )}
    </div>
  );
}
