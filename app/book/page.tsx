"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM",
  "10:30 AM", "11:00 AM", "11:30 AM",
  "02:00 PM", "02:30 PM", "03:00 PM",
];

const DOCTORS_BY_SPECIALITY: Record<string, string[]> = {
  "Bariatric & Metabolic Surgery": ["Dr. Duvvur Nageshwar Reddy", "Dr. G V Rao", "Dr. Rajesh Kumar"],
  "Biochemistry": ["Dr. Anita Sharma", "Dr. Suresh Gowda"],
  "Blood Bank - Transfusion Medicine": ["Dr. Anita Sharma", "Dr. Rajesh Kumar"],
  "Cardiology": ["Dr. P N Rao", "Dr. Kausik Bhattacharya", "Dr. Rajesh Kumar"],
  "Cardiothoracic Surgery": ["Dr. P N Rao", "Dr. Balachandran Palat"],
  "Critical Care": ["Dr. Balachandran Palat", "Dr. Suresh Gowda"],
  "Dental": ["Dr. Vikram Seth", "Dr. Anita Sharma"],
  "Dermatology": ["Dr. Anita Sharma", "Dr. Vikram Seth"],
  "Dietetics": ["Dr. Anita Sharma", "Dr. Rajesh Kumar"],
  "Emergency Medicine": ["Dr. Balachandran Palat", "Dr. Suresh Gowda"],
  "Endocrinology": ["Dr. P N Rao", "Dr. Anita Sharma"],
  "Endoscopic Anesthesiology": ["Dr. Suresh Gowda", "Dr. Balachandran Palat"],
  "ENT": ["Dr. Vikram Seth", "Dr. Rajesh Kumar"],
  "Geriatric Medicine": ["Dr. P N Rao", "Dr. Anita Sharma"],
  "Medical Gastroenterology": ["Dr. Duvvur Nageshwar Reddy", "Dr. Balachandran Palat", "Dr. P N Rao"],
  "Surgical Gastroenterology": ["Dr. G V Rao", "Dr. Balachandran Palat"],
  "Hepatology": ["Dr. P N Rao", "Dr. Balachandran Palat"],
  "Liver Transplant": ["Dr. Balachandran Palat", "Dr. G V Rao"],
  "Medical Oncology": ["Dr. Vamshi Krishna", "Dr. D. Sridhar"],
  "Surgical Oncology": ["Dr. D. Sridhar", "Dr. Vamshi Krishna"],
  "Neurology": ["Dr. Subodh Raju", "Dr. Vikram Seth"],
  "Radiation Oncology": ["Dr. Kausik Bhattacharya", "Dr. D. Sridhar"],
  "Neurosurgery": ["Dr. Subodh Raju", "Dr. Vikram Seth"],
  "Orthopedics": ["Dr. Rajesh Kumar", "Dr. Vikram Seth"],
  "Pediatrics": ["Dr. Anita Sharma", "Dr. Rajesh Kumar"],
  "Ophthalmology": ["Dr. Vikram Seth", "Dr. Anita Sharma"],
  "Urology": ["Dr. Rajesh Kumar", "Dr. Vikram Seth"],
  "Nephrology": ["Dr. Rajesh Kumar", "Dr. Suresh Gowda"],
  "Pulmonology": ["Dr. Suresh Gowda", "Dr. Rajesh Kumar"],
  "Rheumatology": ["Dr. Anita Sharma", "Dr. Vikram Seth"],
};

// FIX #5: static icon class per speciality — no dynamic Tailwind purging
type SpecialityCard = {
  name: string;
  icon: string;
};

const SPECIALITIES: SpecialityCard[] = [
  { name: "Bariatric & Metabolic Surgery", icon: "ph ph-scales" },
  { name: "Biochemistry", icon: "ph ph-flask" },
  { name: "Blood Bank - Transfusion Medicine", icon: "ph ph-drop" },
  { name: "Cardiology", icon: "ph ph-heartbeat" },
  { name: "Cardiothoracic Surgery", icon: "ph ph-activity" },
  { name: "Critical Care", icon: "ph ph-first-aid-kit" },
  { name: "Dental", icon: "ph ph-tooth" },
  { name: "Dermatology", icon: "ph ph-sparkle" },
  { name: "Dietetics", icon: "ph ph-leaf" },
  { name: "Emergency Medicine", icon: "ph ph-ambulance" },
  { name: "Endocrinology", icon: "ph ph-thermometer" },
  { name: "Endoscopic Anesthesiology", icon: "ph ph-syringe" },
  { name: "ENT", icon: "ph ph-ear" },
  { name: "Geriatric Medicine", icon: "ph ph-users" },
  { name: "Medical Gastroenterology", icon: "ph ph-pulse" },
  { name: "Surgical Gastroenterology", icon: "ph ph-scissors" },
  { name: "Hepatology", icon: "ph ph-pill" },
  { name: "Liver Transplant", icon: "ph ph-git-merge" },
  { name: "Medical Oncology", icon: "ph ph-first-aid-kit" },
  { name: "Surgical Oncology", icon: "ph ph-bandaids" },
  { name: "Neurology", icon: "ph ph-brain" },
  { name: "Radiation Oncology", icon: "ph ph-radioactive" },
  { name: "Neurosurgery", icon: "ph ph-lightning" },
  { name: "Orthopedics", icon: "ph ph-bone" },
  { name: "Pediatrics", icon: "ph ph-smiley" },
  { name: "Ophthalmology", icon: "ph ph-eye" },
  { name: "Urology", icon: "ph ph-funnel" },
  { name: "Nephrology", icon: "ph ph-flask" },
  { name: "Pulmonology", icon: "ph ph-wind" },
  { name: "Rheumatology", icon: "ph ph-hand" },
];

type ModalState = {
  open: boolean;
  speciality: string;
  icon: string;
};

type FormState = {
  doctor: string;
  date: string;
  timeSlot: string;
  name: string;
  mobile: string;
};

function BookPageContent() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<ModalState>({ open: false, speciality: "", icon: "" });
  const [form, setForm] = useState<FormState>({ doctor: "", date: "", timeSlot: "", name: "", mobile: "" });
  const [submitted, setSubmitted] = useState(false);
  // FIX #11: inline error state instead of alert()
  const [timeSlotError, setTimeSlotError] = useState(false);
  // FIX #21: booking reference number
  const [bookingRef, setBookingRef] = useState("");

  const getTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  };

  const openModal = useCallback((s: SpecialityCard) => {
    const doctors = DOCTORS_BY_SPECIALITY[s.name] ?? ["Dr. Rajesh Kumar", "Dr. Anita Sharma"];
    setForm({ doctor: doctors[0], date: getTomorrow(), timeSlot: "", name: "", mobile: "" });
    setSubmitted(false);
    setTimeSlotError(false);
    setModal({ open: true, speciality: s.name, icon: s.icon });
  }, []);

  const closeModal = () => {
    setModal((m) => ({ ...m, open: false }));
    setSubmitted(false);
    setTimeSlotError(false);
  };

  useEffect(() => {
    const spec = searchParams.get("speciality");
    if (!spec) return;
    const match = SPECIALITIES.find((s) => s.name.toLowerCase() === spec.toLowerCase());
    if (match) openModal(match);
  }, [searchParams, openModal]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!form.timeSlot) {
      // FIX #11: set inline error, no alert()
      setTimeSlotError(true);
      return;
    }
    // FIX #21: generate booking reference
    const ref = "NK-" + Math.random().toString(36).substring(2, 8).toUpperCase();
    setBookingRef(ref);
    setSubmitted(true);
  };

  const filtered = SPECIALITIES.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  const doctors = DOCTORS_BY_SPECIALITY[modal.speciality] ?? ["Dr. Rajesh Kumar", "Dr. Anita Sharma"];

  const formatDate = (iso: string) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div className="antialiased bg-slate-50 text-gray-800 flex flex-col min-h-screen">
      <Header activePage="book" />

      {/* Hero Band */}
      <div className="bg-linear-to-r from-blue-900 to-indigo-900 text-white py-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">Book Appointment</h1>
          <p className="text-xs md:text-sm text-blue-200/90 font-medium">Book appointments with our expert doctors across 40+ specialities</p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 py-3">
        <div className="max-w-480 mx-auto px-4 lg:px-16 2xl:px-24 flex items-center text-xs font-semibold text-gray-500">
          <a href="/" className="flex items-center gap-1.5 hover:text-brandBlue text-gray-400">
            <i className="ph ph-house text-sm"></i> Home
          </a>
          <span className="mx-2 text-gray-300">/</span>
          <span className="text-brandBlue">Book Appointment</span>
        </div>
      </div>

      {/* Search + Grid */}
      <div className="max-w-480 mx-auto px-4 lg:px-16 2xl:px-24 pt-10 pb-6 w-full flex-1">
        <div className="max-w-3xl mx-auto relative mb-8">
          <i className="ph ph-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
          <input
            type="text"
            placeholder="Search by specialities"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-5 py-4 rounded-full border border-gray-200 text-sm outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue transition-all shadow-sm bg-white placeholder:text-gray-400 text-gray-800"
          />
        </div>

        <div className="flex items-center gap-2 mb-6 border-b border-gray-200 pb-3">
          <div className="w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center text-brandBlue">
            <i className="ph ph-activity text-sm"></i>
          </div>
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Search by Specialities</h2>
        </div>

        {/* FIX #5: all icon containers use static brandBlue — no dynamic Tailwind class purging */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
          {filtered.map((s) => (
            <button
              key={s.name}
              onClick={() => openModal(s)}
              className="speciality-card bg-white border border-gray-100 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:border-brandBlue cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full bg-blue-50 text-brandBlue flex items-center justify-center mb-3 transition-colors group-hover:bg-brandBlue group-hover:text-white">
                <i className={`${s.icon} text-2xl`}></i>
              </div>
              <span className="text-xs font-semibold text-gray-700 tracking-tight leading-snug group-hover:text-brandBlue">
                {s.name}
              </span>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 text-3xl">
              <i className="ph ph-magnifying-glass"></i>
            </div>
            <h3 className="text-base font-bold text-gray-700 mb-1">No specialities found</h3>
            <p className="text-xs text-gray-500">Try searching for &apos;Cardio&apos;, &apos;Onco&apos;, &apos;Gastro&apos;</p>
          </div>
        )}
      </div>

      {/* ── Booking Modal ── */}
      {modal.open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative flex flex-col max-h-[90vh]">
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
            >
              <i className="ph ph-x text-lg"></i>
            </button>

            <div className="flex items-center gap-4 border-b border-gray-100 pb-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-brandBlue flex items-center justify-center shrink-0">
                <i className={`${modal.icon} text-xl`}></i>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 leading-tight">Book {modal.speciality} Appointment</h3>
                <p className="text-[10px] text-gray-500 font-medium">Select a doctor &amp; date to proceed</p>
              </div>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto pr-1">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">Select Doctor</label>
                  <select
                    required
                    value={form.doctor}
                    onChange={(e) => setForm((f) => ({ ...f, doctor: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue text-xs bg-white text-gray-800"
                  >
                    {doctors.map((d) => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">Preferred Date</label>
                  <input
                    type="date"
                    required
                    min={getTomorrow()}
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue text-xs text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">Select Time Slot</label>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => { setForm((f) => ({ ...f, timeSlot: slot })); setTimeSlotError(false); }}
                        className={`text-[11px] py-2 rounded-lg font-semibold transition-colors border ${
                          form.timeSlot === slot
                            ? "border-brandBlue bg-brandBlue text-white"
                            : "border-gray-200 hover:border-brandBlue hover:text-brandBlue bg-white text-gray-700"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                  {/* FIX #11: inline error — no alert() */}
                  {timeSlotError && (
                    <p className="text-red-500 text-[11px] font-semibold mt-2 flex items-center gap-1">
                      <i className="ph ph-warning-circle"></i> Please select a time slot to continue.
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">Patient Name</label>
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue text-xs text-gray-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1.5">Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      value={form.mobile}
                      onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value }))}
                      className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue text-xs text-gray-800"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full bg-brandBlue hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl text-xs transition-colors shadow-lg mt-2">
                  Request Appointment
                </button>
              </form>
            ) : (
              /* FIX #21: success state with booking reference number */
              <div className="text-center py-6 px-4 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4">
                  <i className="ph-fill ph-check-circle text-4xl"></i>
                </div>
                <h3 className="text-lg font-extrabold text-gray-900 mb-1">Request Submitted!</h3>
                <div className="bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 mb-4 text-center">
                  <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Booking Reference</p>
                  <p className="text-lg font-black text-brandBlue tracking-widest">{bookingRef}</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed mb-5 max-w-xs">
                  Thank you, <strong>{form.name}</strong>! Your appointment for <strong>{modal.speciality}</strong> with <strong>{form.doctor}</strong> on <strong>{formatDate(form.date)}</strong> at <strong>{form.timeSlot}</strong> has been received. We will call you on <strong>{form.mobile}</strong> to confirm.
                </p>
                <button
                  onClick={closeModal}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-2.5 rounded-xl text-xs transition-colors"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense>
      <BookPageContent />
    </Suspense>
  );
}
