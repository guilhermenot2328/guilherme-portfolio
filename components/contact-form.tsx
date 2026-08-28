"use client";

import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";

import { contactEmail } from "@/data/site";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().trim().min(2, "Escreva seu nome (mínimo 2 caracteres)."),
  email: z.string().trim().email("Informe um e-mail válido."),
  message: z.string().trim().min(10, "Conte um pouco mais — mínimo 10 caracteres."),
});

type FormValues = z.infer<typeof schema>;

/**
 * Endpoint opcional. Se `NEXT_PUBLIC_CONTACT_ENDPOINT` estiver definida, o
 * formulário faz POST de JSON para lá; caso contrário cai no `mailto:`.
 */
const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

type Status = { type: "idle" | "success" | "error" | "mailto"; message?: string };

const fieldClass =
  "w-full rounded-xl border border-foreground/12 bg-surface/40 px-4 py-3 text-sm text-foreground outline-none transition-colors duration-200 placeholder:text-muted/60 focus:border-accent/60";

export function ContactForm() {
  const formId = useId();
  const [status, setStatus] = useState<Status>({ type: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (values: FormValues) => {
    setStatus({ type: "idle" });

    if (!endpoint) {
      const subject = encodeURIComponent(`Contato do site — ${values.name}`);
      const body = encodeURIComponent(
        `${values.message}\n\n—\n${values.name}\n${values.email}`,
      );
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
      setStatus({
        type: "mailto",
        message: "Abrindo seu cliente de e-mail com a mensagem pronta.",
      });
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(String(response.status));

      reset();
      setStatus({ type: "success", message: "Mensagem enviada. Respondo em breve." });
    } catch {
      setStatus({
        type: "error",
        message: `Não consegui enviar agora. Escreva direto para ${contactEmail}.`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      <div>
        <label htmlFor={`${formId}-name`} className="mb-2 block text-sm text-muted">
          Nome
        </label>
        <input
          id={`${formId}-name`}
          type="text"
          autoComplete="name"
          placeholder="Como devo te chamar?"
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
          className={cn(fieldClass, errors.name && "border-red-500/60")}
          {...register("name")}
        />
        {errors.name && (
          <p id={`${formId}-name-error`} className="mt-2 text-xs text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${formId}-email`} className="mb-2 block text-sm text-muted">
          E-mail
        </label>
        <input
          id={`${formId}-email`}
          type="email"
          autoComplete="email"
          placeholder="voce@empresa.com"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby={errors.email ? `${formId}-email-error` : undefined}
          className={cn(fieldClass, errors.email && "border-red-500/60")}
          {...register("email")}
        />
        {errors.email && (
          <p id={`${formId}-email-error`} className="mt-2 text-xs text-red-400">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${formId}-message`} className="mb-2 block text-sm text-muted">
          Mensagem
        </label>
        <textarea
          id={`${formId}-message`}
          rows={5}
          placeholder="Qual problema você quer resolver?"
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          className={cn(fieldClass, "resize-y", errors.message && "border-red-500/60")}
          {...register("message")}
        />
        {errors.message && (
          <p id={`${formId}-message-error`} className="mt-2 text-xs text-red-400">
            {errors.message.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-contrast transition-[filter,opacity] duration-200 hover:brightness-110 disabled:opacity-60"
      >
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="size-4" aria-hidden="true" />
        )}
        {isSubmitting ? "Enviando…" : "Enviar mensagem"}
      </button>

      {/* Feedback anunciado por leitores de tela sem roubar o foco. */}
      <p
        role="status"
        aria-live="polite"
        className={cn(
          "min-h-5 text-sm",
          status.type === "error" ? "text-red-400" : "text-muted",
        )}
      >
        {status.message}
      </p>
    </form>
  );
}
