"use client";

import { useEffect, useMemo, useState } from "react";

type IntakeFormData = {
  // Step 1: Personal
  firstName: string;
  lastName: string;
  dateOfBirth: string; // yyyy-mm-dd
  gender: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  // Step 2: Emergency
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  // Step 3: Insurance
  uninsured: boolean;
  insuranceProvider: string;
  memberId: string;
  groupNumber: string;
  insuredName: string;
  // Step 4: Substance Use
  primarySubstance: string;
  otherSubstances: string;
  frequency: string;
  duration: string;
  lastUseDate: string;
  routeOfUse: string;
  amountPerUse: string;
  // Step 5: Medical & Mental Health
  currentMedications: string;
  allergies: string;
  chronicConditions: string;
  mentalHealthDiagnoses: string;
  suicideRisk: string; // yes/no/unsure
  seizuresHistory: string; // yes/no/unsure
  pregnancyStatus: string; // n/a/yes/no
  // Step 6: Treatment & Legal
  priorTreatment: string;
  priorFacilities: string;
  legalIssues: string;
  courtMandated: string;
  probationOfficer: string;
  detoxNeeded: string;
  // Step 7: Consent
  hipaaConsent: boolean;
  contactConsent: boolean;
  agreeToTerms: boolean;
};

type IntakeFormProps = {
  onCancel?: () => void;
  onSubmitted?: () => void;
};

const initialData: IntakeFormData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "",
  phone: "",
  email: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  emergencyName: "",
  emergencyRelationship: "",
  emergencyPhone: "",
  uninsured: false,
  insuranceProvider: "",
  memberId: "",
  groupNumber: "",
  insuredName: "",
  primarySubstance: "",
  otherSubstances: "",
  frequency: "",
  duration: "",
  lastUseDate: "",
  routeOfUse: "",
  amountPerUse: "",
  currentMedications: "",
  allergies: "",
  chronicConditions: "",
  mentalHealthDiagnoses: "",
  suicideRisk: "unsure",
  seizuresHistory: "unsure",
  pregnancyStatus: "n/a",
  priorTreatment: "no",
  priorFacilities: "",
  legalIssues: "no",
  courtMandated: "no",
  probationOfficer: "",
  detoxNeeded: "unsure",
  hipaaConsent: false,
  contactConsent: false,
  agreeToTerms: false,
};

export default function IntakeForm({ onCancel, onSubmitted }: IntakeFormProps) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<IntakeFormData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const totalSteps = 7;

  function update<K extends keyof IntakeFormData>(key: K, value: IntakeFormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function next() {
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  }
  function prev() {
    setStep((s) => Math.max(s - 1, 0));
  }

  const canAdvance = useMemo(() => {
    // Basic required fields per step (client-side guard only)
    switch (step) {
      case 0:
        return !!data.firstName && !!data.lastName && !!data.dateOfBirth && !!data.phone && !!data.email && !!data.address1 && !!data.city && !!data.state && !!data.zip;
      case 1:
        return !!data.emergencyName && !!data.emergencyRelationship && !!data.emergencyPhone;
      case 2:
        return data.uninsured || !!data.insuranceProvider;
      case 3:
        return !!data.primarySubstance && !!data.frequency && !!data.duration;
      case 4:
        return true;
      case 5:
        return true;
      case 6:
        return data.hipaaConsent && data.contactConsent && data.agreeToTerms;
      default:
        return true;
    }
  }, [step, data]);

  async function onSubmit() {
    if (!canAdvance) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
      if (onSubmitted) onSubmitted();
    } catch (e) {
      console.error(e);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  // Keyboard: ESC to cancel
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && onCancel) onCancel();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onCancel]);

  if (submitted) {
    return (
      <div className="p-4 sm:p-6">
        <h2 className="text-xl font-semibold">Thank you</h2>
        <p className="text-sm text-black/80 mt-2">Your intake was submitted. A coordinator will contact you shortly.</p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            className="inline-flex h-11 px-4 items-center justify-center bg-[var(--accent)] text-black border border-black"
            onClick={onCancel}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="px-4 sm:px-6 pt-4">
        <h2 className="text-2xl font-semibold">Recovery Intake</h2>
        <p className="text-black/70 text-sm mt-1">Answer a few questions to get started. It takes ~5-8 minutes.</p>
        <div className="mt-4 h-2 w-full bg-black/10 overflow-hidden">
          <div
            className="h-full bg-[var(--accent)] transition-all"
            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
          />
        </div>
        <p className="text-xs text-black/60 mt-1">Step {step + 1} of {totalSteps}</p>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {step === 0 && (
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="First name" value={data.firstName} onChange={(v) => update("firstName", v)} required />
            <Input label="Last name" value={data.lastName} onChange={(v) => update("lastName", v)} required />
            <Input label="Date of birth" type="date" value={data.dateOfBirth} onChange={(v) => update("dateOfBirth", v)} required />
            <Select label="Gender" value={data.gender} onChange={(v) => update("gender", v)} options={["Male", "Female", "Non-binary", "Prefer not to say"]} />
            <Input label="Phone" type="tel" value={data.phone} onChange={(v) => update("phone", v)} required />
            <Input label="Email" type="email" value={data.email} onChange={(v) => update("email", v)} required />
            <Input label="Address line 1" className="sm:col-span-2" value={data.address1} onChange={(v) => update("address1", v)} required />
            <Input label="Address line 2" className="sm:col-span-2" value={data.address2} onChange={(v) => update("address2", v)} />
            <Input label="City" value={data.city} onChange={(v) => update("city", v)} required />
            <Input label="State" value={data.state} onChange={(v) => update("state", v)} required />
            <Input label="ZIP" value={data.zip} onChange={(v) => update("zip", v)} required />
          </section>
        )}

        {step === 1 && (
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Emergency contact name" value={data.emergencyName} onChange={(v) => update("emergencyName", v)} required />
            <Input label="Relationship" value={data.emergencyRelationship} onChange={(v) => update("emergencyRelationship", v)} required />
            <Input label="Phone" type="tel" value={data.emergencyPhone} onChange={(v) => update("emergencyPhone", v)} required />
          </section>
        )}

        {step === 2 && (
          <section className="space-y-4">
            <div className="flex items-center gap-3">
              <input id="uninsured" type="checkbox" checked={data.uninsured} onChange={(e) => update("uninsured", e.target.checked)} />
              <label htmlFor="uninsured" className="text-sm">I don’t have insurance</label>
            </div>
            {!data.uninsured && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Insurance provider" value={data.insuranceProvider} onChange={(v) => update("insuranceProvider", v)} required />
                <Input label="Member ID" value={data.memberId} onChange={(v) => update("memberId", v)} />
                <Input label="Group number" value={data.groupNumber} onChange={(v) => update("groupNumber", v)} />
                <Input label="Primary insured name" value={data.insuredName} onChange={(v) => update("insuredName", v)} />
              </div>
            )}
          </section>
        )}

        {step === 3 && (
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="Primary substance" value={data.primarySubstance} onChange={(v) => update("primarySubstance", v)} options={["Alcohol", "Opioids", "Stimulants", "Benzodiazepines", "Marijuana", "Other"]} required />
            <Input label="Other substances (optional)" value={data.otherSubstances} onChange={(v) => update("otherSubstances", v)} />
            <Select label="Frequency of use" value={data.frequency} onChange={(v) => update("frequency", v)} options={["Daily", "Weekly", "Monthly", "Occasional"]} required />
            <Input label="Duration of use (e.g. 2 years)" value={data.duration} onChange={(v) => update("duration", v)} required />
            <Input label="Last use date" type="date" value={data.lastUseDate} onChange={(v) => update("lastUseDate", v)} />
            <Input label="Route of use (e.g. oral, IV)" value={data.routeOfUse} onChange={(v) => update("routeOfUse", v)} />
            <Input label="Typical amount per use" value={data.amountPerUse} onChange={(v) => update("amountPerUse", v)} />
          </section>
        )}

        {step === 4 && (
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Textarea label="Current medications" value={data.currentMedications} onChange={(v) => update("currentMedications", v)} />
            <Textarea label="Allergies" value={data.allergies} onChange={(v) => update("allergies", v)} />
            <Textarea label="Chronic conditions" value={data.chronicConditions} onChange={(v) => update("chronicConditions", v)} />
            <Textarea label="Mental health diagnoses" value={data.mentalHealthDiagnoses} onChange={(v) => update("mentalHealthDiagnoses", v)} />
            <Select label="Suicide risk" value={data.suicideRisk} onChange={(v) => update("suicideRisk", v)} options={["unsure", "no", "yes"]} />
            <Select label="Seizure history" value={data.seizuresHistory} onChange={(v) => update("seizuresHistory", v)} options={["unsure", "no", "yes"]} />
            <Select label="Pregnancy status" value={data.pregnancyStatus} onChange={(v) => update("pregnancyStatus", v)} options={["n/a", "no", "yes"]} />
          </section>
        )}

        {step === 5 && (
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="Prior treatment" value={data.priorTreatment} onChange={(v) => update("priorTreatment", v)} options={["no", "yes"]} />
            <Textarea label="Prior facilities / dates / outcomes" className="sm:col-span-2" value={data.priorFacilities} onChange={(v) => update("priorFacilities", v)} />
            <Select label="Legal issues" value={data.legalIssues} onChange={(v) => update("legalIssues", v)} options={["no", "yes"]} />
            <Select label="Court mandated" value={data.courtMandated} onChange={(v) => update("courtMandated", v)} options={["no", "yes"]} />
            <Input label="Probation officer (if any)" value={data.probationOfficer} onChange={(v) => update("probationOfficer", v)} />
            <Select label="Detox needed" value={data.detoxNeeded} onChange={(v) => update("detoxNeeded", v)} options={["unsure", "no", "yes"]} />
          </section>
        )}

        {step === 6 && (
          <section className="space-y-3">
            <Checkbox label="I authorize sharing my health information for treatment (HIPAA)." checked={data.hipaaConsent} onChange={(v) => update("hipaaConsent", v)} />
            <Checkbox label="You may contact me by phone/text/email about my care." checked={data.contactConsent} onChange={(v) => update("contactConsent", v)} />
            <Checkbox label="I agree to the terms of service and privacy policy." checked={data.agreeToTerms} onChange={(v) => update("agreeToTerms", v)} />
          </section>
        )}
      </div>

      <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex items-center justify-between gap-3">
        <button
          type="button"
          className="inline-flex h-11 px-4 items-center justify-center border border-black/30 text-black hover:bg-black/10"
          onClick={step === 0 ? onCancel : prev}
        >
          {step === 0 ? "Cancel" : "Back"}
        </button>

        {step < totalSteps - 1 ? (
          <button
            type="button"
            disabled={!canAdvance}
            className="inline-flex h-11 px-4 items-center justify-center bg-[var(--accent)] text-black disabled:opacity-60 border border-black"
            onClick={next}
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            disabled={!canAdvance || submitting}
            className="inline-flex h-11 px-4 items-center justify-center bg-[var(--accent)] text-black disabled:opacity-60 border border-black"
            onClick={onSubmit}
          >
            {submitting ? "Submitting..." : "Submit Intake"}
          </button>
        )}
      </div>
    </div>
  );
}

function Input({ label, className, value, onChange, type = "text", required }: { label: string; className?: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean; }) {
  return (
    <label className={`flex flex-col gap-1 ${className ?? ""}`}>
      <span className="text-sm text-black/90">{label}{required ? " *" : ""}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 bg-white border border-black/20 px-3 outline-none focus:border-[var(--accent)]"
      />
    </label>
  );
}

function Textarea({ label, className, value, onChange }: { label: string; className?: string; value: string; onChange: (v: string) => void; }) {
  return (
    <label className={`flex flex-col gap-1 ${className ?? ""}`}>
      <span className="text-sm text-black/90">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="bg-white border border-black/20 px-3 py-2 outline-none focus:border-[var(--accent)]"
      />
    </label>
  );
}

function Select({ label, value, onChange, options, required }: { label: string; value: string; onChange: (v: string) => void; options: string[]; required?: boolean; }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm text-black/90">{label}{required ? " *" : ""}</span>
      <select
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 bg-white border border-black/20 px-3 outline-none focus:border-[var(--accent)]"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt.toLowerCase()}>{opt}</option>
        ))}
      </select>
    </label>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void; }) {
  return (
    <label className="flex items-start gap-3 text-sm">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="select-none">{label}</span>
    </label>
  );
}








