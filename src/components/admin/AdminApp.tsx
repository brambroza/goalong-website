"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getBrowserClient } from "@/lib/supabase-browser";
import { LogoMark } from "@/components/Logo";
import { PostList } from "./PostList";
import { PostEditor } from "./PostEditor";
import { MessageList } from "./MessageList";

type View = { name: "posts" } | { name: "edit"; id: string | null } | { name: "messages" };

export function AdminApp() {
  const sb = getBrowserClient();
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [view, setView] = useState<View>({ name: "posts" });

  useEffect(() => {
    if (!sb) return;
    sb.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, [sb]);

  useEffect(() => {
    if (!sb || !session) return;
    let cancelled = false;
    sb.rpc("is_admin").then(({ data }) => {
      if (!cancelled) setIsAdmin(data === true);
    });
    return () => {
      cancelled = true;
    };
  }, [sb, session]);

  const signOut = useCallback(async () => {
    await sb?.auth.signOut();
    setIsAdmin(null);
    setView({ name: "posts" });
  }, [sb]);

  if (!sb) {
    return (
      <Shell>
        <Notice title="ยังไม่ได้เชื่อม Supabase">
          ตั้งค่า <code>NEXT_PUBLIC_SUPABASE_URL</code> และ <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
          ใน Environment Variables แล้ว deploy ใหม่ ดูขั้นตอนใน README
        </Notice>
      </Shell>
    );
  }

  if (checking) return <Shell><p className="text-steel">กำลังตรวจสอบการเข้าสู่ระบบ…</p></Shell>;

  if (!session) return <Shell><LoginForm /></Shell>;

  if (isAdmin === null) return <Shell><p className="text-steel">กำลังตรวจสอบสิทธิ์…</p></Shell>;

  if (!isAdmin) {
    return (
      <Shell email={session.user.email} onSignOut={signOut}>
        <Notice title="บัญชีนี้ยังไม่มีสิทธิ์จัดการเว็บไซต์">
          เพิ่มอีเมล <strong>{session.user.email}</strong> ในตาราง <code>admins</code> ของ Supabase แล้วโหลดหน้านี้ใหม่
        </Notice>
      </Shell>
    );
  }

  return (
    <Shell email={session.user.email} onSignOut={signOut}>
      <nav className="mb-8 flex gap-2 border-b border-rule" aria-label="เมนูผู้ดูแล">
        <Tab active={view.name !== "messages"} onClick={() => setView({ name: "posts" })}>
          บทความ
        </Tab>
        <Tab active={view.name === "messages"} onClick={() => setView({ name: "messages" })}>
          ข้อความติดต่อ
        </Tab>
      </nav>

      {view.name === "posts" && (
        <PostList onEdit={(id) => setView({ name: "edit", id })} onNew={() => setView({ name: "edit", id: null })} />
      )}
      {view.name === "edit" && (
        <PostEditor
          id={view.id}
          session={session}
          onDone={() => setView({ name: "posts" })}
          onCreated={(id) => setView({ name: "edit", id })}
        />
      )}
      {view.name === "messages" && <MessageList />}
    </Shell>
  );
}

function Shell({
  children,
  email,
  onSignOut,
}: {
  children: React.ReactNode;
  email?: string;
  onSignOut?: () => void;
}) {
  return (
    <>
      <header className="border-b border-rule bg-panel">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link href="/" className="inline-flex items-center gap-2.5 font-semibold">
            <LogoMark size={26} />
            GO Along <span className="font-normal text-steel">จัดการเว็บไซต์</span>
          </Link>
          {email && (
            <div className="flex items-center gap-3 text-[0.9rem]">
              <span className="hidden text-steel sm:inline">{email}</span>
              <button onClick={onSignOut} className="rounded-md border border-rule px-3 py-1.5 hover:bg-paper">
                ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      </header>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</div>
    </>
  );
}

function Tab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`-mb-px border-b-2 px-4 py-2.5 font-medium ${
        active ? "border-andon text-ink" : "border-transparent text-steel hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="max-w-xl rounded-[22px] bg-tile p-6">
      <h1 className="text-[1.25rem] font-semibold">{title}</h1>
      <p className="mt-2 text-steel">{children}</p>
    </div>
  );
}

function LoginForm() {
  const sb = getBrowserClient()!;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error } = await sb.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-10 max-w-sm rounded-[22px] bg-tile p-6">
      <h1 className="text-[1.35rem] font-semibold">เข้าสู่ระบบผู้ดูแล</h1>
      <label className="mt-5 block text-[0.95rem] font-medium" htmlFor="email">
        อีเมล
      </label>
      <input
        id="email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-1 w-full rounded-md border border-rule bg-paper px-3 py-2"
      />
      <label className="mt-4 block text-[0.95rem] font-medium" htmlFor="password">
        รหัสผ่าน
      </label>
      <input
        id="password"
        type="password"
        required
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-1 w-full rounded-md border border-rule bg-paper px-3 py-2"
      />
      {error && (
        <p role="alert" className="mt-3 text-[0.95rem] text-[#b3402c]">
          {error}
        </p>
      )}
      <button
        disabled={busy}
        className="mt-5 w-full rounded-md bg-andon px-4 py-2.5 font-medium text-white hover:bg-andon-deep disabled:opacity-60"
      >
        {busy ? "กำลังเข้าสู่ระบบ…" : "เข้าสู่ระบบ"}
      </button>
    </form>
  );
}
