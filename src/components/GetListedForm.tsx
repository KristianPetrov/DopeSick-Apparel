"use client";

import { useMemo, useState } from "react";

type GetListedFormData = {
  organizationName: string;
  organizationType: string;
  website: string;
  contactName: string;
  contactTitle: string;
  contactEmail: string;
  contactPhone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  services: string;
  levelsOfCare: string;
  acceptsInsurance: boolean;
  notes: string;
  agreeToContact: boolean;
};

const initialData: GetListedFormData = {
  organizationName: "",
  organizationType: "",
  website: "",
  contactName: "",
  contactTitle: "",
  contactEmail: "",
  contactPhone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  services: "",
  levelsOfCare: "",
  acceptsInsurance: false,
  notes: "",
  agreeToContact: false,
};

export default function GetListedForm() {
  const [data, setData] = useState<GetListedFormData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof GetListedFormData>(key: K, value: GetListedFormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  const canSubmit = useMemo(() => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contactEmail.trim());
    return (
      !!data.organizationName.trim() &&
      !!data.organizationType.trim() &&
      !!data.contactName.trim() &&
      emailOk &&
      data.agreeToContact
    );
  }, [data]);

  async function onSubmit() {
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/get-listed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch (e) {
      console.error(e);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold tracking-wide">You’re in.</h2>
        <p className="text-sm text-white/75 mt-2">
          Thanks for applying to get listed with DopeSick. We’ll review your info and reach out shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-wide">Get Listed</h2>
        <p className="text-sm text-white/75">
          Detox, rehab, outpatient, and sober livings can apply to be listed. Fields marked * are required.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input label="Organization name" value={data.organizationName} onChange={(v) => update("organizationName", v)} required />
        <Select
          label="Organization type"
          value={data.organizationType}
          onChange={(v) => update("organizationType", v)}
          required
          options={[
            { label: "Detox", value: "detox" },
            { label: "Rehab / Inpatient", value: "rehab" },
            { label: "Outpatient", value: "outpatient" },
            { label: "Sober Living", value: "sober_living" },
            { label: "Other", value: "other" },
          ]}
        />
        <Input label="Website" value={data.website} onChange={(v) => update("website", v)} placeholder="https://..." className="sm:col-span-2" />

        <Input label="Contact name" value={data.contactName} onChange={(v) => update("contactName", v)} required />
        <Input label="Contact title" value={data.contactTitle} onChange={(v) => update("contactTitle", v)} />
        <Input label="Contact email" type="email" value={data.contactEmail} onChange={(v) => update("contactEmail", v)} required />
        <Input label="Contact phone" type="tel" value={data.contactPhone} onChange={(v) => update("contactPhone", v)} />

        <Input label="Address line 1" value={data.address1} onChange={(v) => update("address1", v)} className="sm:col-span-2" />
        <Input label="Address line 2" value={data.address2} onChange={(v) => update("address2", v)} className="sm:col-span-2" />
        <Input label="City" value={data.city} onChange={(v) => update("city", v)} />
        <Input label="State" value={data.state} onChange={(v) => update("state", v)} />
        <Input label="ZIP" value={data.zip} onChange={(v) => update("zip", v)} />

        <Textarea
          label="Services offered"
          value={data.services}
          onChange={(v) => update("services", v)}
          placeholder="Detox, MAT, trauma therapy, dual-diagnosis, etc."
          className="sm:col-span-2"
        />
        <Textarea
          label="Levels of care"
          value={data.levelsOfCare}
          onChange={(v) => update("levelsOfCare", v)}
          placeholder="Residential, PHP, IOP, OP, sober living..."
          className="sm:col-span-2"
        />

        <div className="sm:col-span-2 flex items-center gap-3 pt-1">
          <input
            id="acceptsInsurance"
            type="checkbox"
            checked={data.acceptsInsurance}
            onChange={(e) => update("acceptsInsurance", e.target.checked)}
          />
          <label htmlFor="acceptsInsurance" className="text-sm text-white/90">
            We accept insurance
          </label>
        </div>

        <Textarea
          label="Anything else we should know?"
          value={data.notes}
          onChange={(v) => update("notes", v)}
          placeholder="Capacity, admission criteria, special programs, etc."
          className="sm:col-span-2"
        />

        <div className="sm:col-span-2 pt-2">
          <Checkbox
            label="I agree that DopeSick may contact me about this application. *"
            checked={data.agreeToContact}
            onChange={(v) => update("agreeToContact", v)}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end">
        <button
          type="button"
          disabled={!canSubmit || submitting}
          className="inline-flex h-11 px-6 items-center justify-center rounded-full bg-[var(--accent)] text-black font-semibold disabled:opacity-60"
          onClick={onSubmit}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}

function Input({
  label,
  className,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  className?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className={`flex flex-col gap-1 ${className ?? ""}`}>
      <span className="text-sm text-white/90">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-md bg-black border border-white/20 px-3 outline-none focus:border-[var(--accent)]"
      />
    </label>
  );
}

function Textarea({
  label,
  className,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  className?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className={`flex flex-col gap-1 ${className ?? ""}`}>
      <span className="text-sm text-white/90">{label}</span>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="rounded-md bg-black border border-white/20 px-3 py-2 outline-none focus:border-[var(--accent)]"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm text-white/90">
        {label}
        {required ? " *" : ""}
      </span>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 rounded-md bg-black border border-white/20 px-3 outline-none focus:border-[var(--accent)]"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="select-none">{label}</span>
    </label>
  );
}


