import GetListedForm from "@/components/GetListedForm";

export default function GetListedPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 md:px-10 py-12">
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-wide">Get Listed with DopeSick</h1>
        <p className="text-white/75 leading-relaxed">
          If you run a detox, rehab, outpatient program, or sober living, apply to be listed with DopeSick so we can connect
          people in recovery with trusted options.
        </p>
      </div>

      <div className="mt-8">
        <GetListedForm />
      </div>
    </main>
  );
}


