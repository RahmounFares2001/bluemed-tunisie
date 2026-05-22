"use client";
import { useState } from "react";
import { Lock } from "lucide-react";
import { Button } from "@/components/bmg/Button";
import { Input } from "@/components/bmg/Input";
import { useAdminStore } from "@/store/adminStore";
import { S } from "@/constants/strings";

export function AdminLoginGate() {
  const login = useAdminStore((s) => s.login);
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(password);
    if (!ok) {
      setError(S.admin.wrongPassword);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPassword("");
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-marble px-4">
      <div className={`w-full max-w-md rounded-3xl border border-border bg-white p-8 shadow-2xl ${shake ? "shake" : ""}`}>
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-primary to-navy text-2xl font-black text-white shadow-[var(--shadow-elegant)]">
            B
          </div>
          <h1 className="mt-4 text-2xl font-black text-navy">{S.admin.loginTitle}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{S.admin.loginDesc}</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-bold text-foreground">{S.admin.password}</label>
            <div className="relative">
              <Lock size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="password"
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                className="pr-10"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="mt-2 text-xs font-bold text-destructive">{error}</p>}
          </div>
          <Button variant="primary" size="lg" type="submit" className="w-full">
            {S.admin.login}
          </Button>
          <p className="text-center text-[11px] text-muted-foreground">للتجربة: كلمة المرور هي <span className="font-mono font-bold text-primary">bmg2024admin</span></p>
        </form>
      </div>
    </div>
  );
}
