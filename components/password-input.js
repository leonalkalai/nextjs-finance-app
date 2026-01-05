"use client";

import { useState } from "react";
import Input from "@/components/input";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  name = "password",
  placeholder = "Password",
  autoComplete = "current-password",
  required = true,
  id,
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={show ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
      />

      <button
        type="button"
        onClick={() => setShow((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
