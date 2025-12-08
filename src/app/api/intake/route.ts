import { db } from "@/db/client";
import { intakeSubmissions } from "@/db/schema";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Minimal server-side validation
    if (
      !body ||
      !body.firstName ||
      !body.lastName ||
      !body.dateOfBirth ||
      !body.phone ||
      !body.email ||
      !body.address1 ||
      !body.city ||
      !body.state ||
      !body.zip ||
      !body.emergencyName ||
      !body.emergencyRelationship ||
      !body.emergencyPhone ||
      !body.primarySubstance ||
      !body.frequency ||
      !body.duration ||
      !body.hipaaConsent ||
      !body.contactConsent ||
      !body.agreeToTerms
    ) {
      return new Response("Missing required fields", { status: 400 });
    }

    await db.insert(intakeSubmissions).values({
      firstName: body.firstName,
      lastName: body.lastName,
      dateOfBirth: body.dateOfBirth,
      gender: body.gender || null,
      phone: body.phone,
      email: body.email,
      address1: body.address1,
      address2: body.address2 || null,
      city: body.city,
      state: body.state,
      zip: body.zip,
      emergencyName: body.emergencyName,
      emergencyRelationship: body.emergencyRelationship,
      emergencyPhone: body.emergencyPhone,
      uninsured: !!body.uninsured,
      insuranceProvider: body.insuranceProvider || null,
      memberId: body.memberId || null,
      groupNumber: body.groupNumber || null,
      insuredName: body.insuredName || null,
      primarySubstance: body.primarySubstance,
      otherSubstances: body.otherSubstances || null,
      frequency: body.frequency,
      duration: body.duration,
      lastUseDate: body.lastUseDate || null,
      routeOfUse: body.routeOfUse || null,
      amountPerUse: body.amountPerUse || null,
      currentMedications: body.currentMedications || null,
      allergies: body.allergies || null,
      chronicConditions: body.chronicConditions || null,
      mentalHealthDiagnoses: body.mentalHealthDiagnoses || null,
      suicideRisk: body.suicideRisk || null,
      seizuresHistory: body.seizuresHistory || null,
      pregnancyStatus: body.pregnancyStatus || null,
      priorTreatment: body.priorTreatment || null,
      priorFacilities: body.priorFacilities || null,
      legalIssues: body.legalIssues || null,
      courtMandated: body.courtMandated || null,
      probationOfficer: body.probationOfficer || null,
      detoxNeeded: body.detoxNeeded || null,
      hipaaConsent: !!body.hipaaConsent,
      contactConsent: !!body.contactConsent,
      agreeToTerms: !!body.agreeToTerms,
      submittedAt: body.submittedAt || null,
    });

    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return new Response("Server error", { status: 500 });
  }
}








