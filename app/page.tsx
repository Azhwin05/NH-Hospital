import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSlider } from "@/components/HeroSlider";

// FIX #17: reduced to 18 specialties → clean 3×6 grid (no orphan row)
const specialties = [
  { label: "Medical\nGastroenterology", icon: "ph-pulse" },
  { label: "Surgical\nGastroenterology", icon: "ph-scissors" },
  { label: "Hepatology", icon: "ph-pill" },
  { label: "Cardiology", icon: "ph-heartbeat" },
  { label: "Cardiothoracic\nSurgery", icon: "ph-activity" },
  { label: "Liver\nTransplant", icon: "ph-git-merge" },
  { label: "Medical\nOncology", icon: "ph-first-aid-kit" },
  { label: "Surgical\nOncology", icon: "ph-knife" },
  { label: "Neurology", icon: "ph-brain" },
  { label: "Neurosurgery", icon: "ph-lightning" },
  { label: "ENT", icon: "ph-ear" },
  { label: "Orthopaedics", icon: "ph-bone" },
  { label: "Pulmonology", icon: "ph-wind" },
  { label: "Nephrology", icon: "ph-funnel" },
  { label: "Urology", icon: "ph-drop" },
  { label: "Pediatrics", icon: "ph-baby" },
  { label: "Ophthalmology", icon: "ph-eye" },
  { label: "Emergency\nMedicine", icon: "ph-ambulance" },
];

const whyChooseUs = [
  { icon: "ph-bed", stat: "200+ Beds", desc: "Comprehensive inpatient and critical care infrastructure" },
  { icon: "ph-stethoscope", stat: "40+ Specialties", desc: "Advanced medical and surgical expertise under one roof" },
  { icon: "ph-ambulance", stat: "24/7 Emergency Care", desc: "Round-the-clock emergency and intensive care support" },
  // FIX #30: ph-scalpel → ph-hospital for infrastructure context
  { icon: "ph-hospital", stat: "Advanced Surgical Infrastructure", desc: "Modern operation theatres and minimally invasive capabilities" },
  { icon: "ph-microscope", stat: "Advanced Diagnostic Support", desc: "Precision-driven diagnostics for timely and accurate clinical decisions" },
  // FIX #22: ph-arrows-merge → ph-git-merge (valid Phosphor icon)
  { icon: "ph-git-merge", stat: "Integrated Healthcare Systems", desc: "Streamlined clinical coordination and efficient patient care pathways" },
];

export default function Home() {
  return (
    <>
      <Header transparent activePage="home" />

      {/* ── Hero ── */}
      <div className="h-150 lg:h-[75vh] min-h-150 relative flex flex-col justify-end pb-24 px-4 overflow-hidden">
        <HeroSlider />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/20 to-black/80 z-0" />
        <div className="relative z-10 w-full max-w-[100rem] mx-auto text-center px-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-blue-300 mb-4">
            NK Hospital — Kalaburagi
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[3.2rem] font-extrabold text-white mb-4 tracking-tight leading-snug mx-auto max-w-400">
            Advanced Multi Super-Specialty Hospital in Kalaburagi
          </h1>
          <p className="text-sm md:text-base text-blue-100/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Bringing Together the Right Expertise &amp; Infrastructure for Better Care
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-2xl mx-auto">
            <Link href="/book" className="w-full sm:w-auto bg-brandBlue hover:bg-blue-800 text-white px-7 py-3.5 rounded-full text-sm font-bold transition-colors shadow-xl whitespace-nowrap flex items-center justify-center gap-2">
              <i className="ph ph-calendar-plus"></i> Book Appointment
            </Link>
            <a href="tel:1066" className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-7 py-3.5 rounded-full text-sm font-bold transition-colors shadow-xl whitespace-nowrap flex items-center justify-center gap-2">
              <i className="ph ph-ambulance"></i> Emergency Care
            </a>
            <Link href="/find-doctor" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white px-7 py-3.5 rounded-full text-sm font-bold transition-colors whitespace-nowrap flex items-center justify-center gap-2">
              <i className="ph ph-user-circle"></i> Find a Doctor
            </Link>
          </div>
        </div>
      </div>

      {/* ── Our Expertise ── */}
      <section className="py-16 bg-white">
        <div className="max-w-480 mx-auto px-4 lg:px-16 2xl:px-24 text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-brandBlue mb-2">Departments</p>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Expertise</h2>
          <p className="text-sm text-gray-500 mb-3">Expert care across 20+ medical and surgical specialties.</p>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            NK Hospital offers specialized medical and surgical care across a wide range of departments, supported by advanced technology, experienced specialists, and multidisciplinary clinical coordination.
          </p>
          {/* FIX #17: 18 items × 6 cols = 3 clean rows, no orphan */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full mx-auto">
            {specialties.map(({ label, icon }) => (
              <Link
                key={label}
                href="/specialities"
                className="icon-box border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center gap-3 bg-white hover:border-brandBlue hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center text-brandBlue group-hover:bg-brandBlue group-hover:text-white transition-colors shrink-0">
                  <i className={`ph ${icon} text-xl`}></i>
                </div>
                <span className="text-[11px] font-semibold text-brandBlue text-center leading-tight whitespace-pre-line">{label}</span>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/specialities" className="inline-flex items-center gap-2 border border-gray-200 rounded-full px-6 py-2.5 text-xs font-bold text-gray-700 hover:border-brandBlue hover:text-brandBlue transition-colors">
              View All Specialties <i className="ph ph-arrow-right text-gray-400"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ── About / Healthcare Ecosystem ── */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-480 mx-auto px-4 lg:px-16 2xl:px-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* FIX #18: use about-banner.jpg instead of slide1.jpg (different from hero) */}
            <div className="w-full lg:w-1/2 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl aspect-4/3 relative">
                <Image
                  src="/about-banner.jpg"
                  alt="NK Hospital Building — Kalaburagi"
                  fill
                  className="object-cover"
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <p className="text-[11px] font-bold uppercase tracking-widest text-brandBlue mb-3">About NK Hospital</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-1 tracking-tight uppercase">
                Advanced Healthcare Ecosystem
              </h2>
              <p className="text-sm font-semibold text-brandBlue mb-6">Modern Infrastructure. Integrated Care.</p>
              <div className="text-sm text-gray-700 leading-relaxed space-y-4 mb-8">
                <p>NK Hospital combines advanced medical infrastructure, modern clinical systems, and multidisciplinary expertise to deliver comprehensive healthcare across specialties. From critical care and advanced diagnostics to minimally invasive surgical capabilities and emergency response systems, every aspect of our hospital is designed to support precise, efficient, and patient-centered care.</p>
                <p>Our integrated approach enables seamless coordination between departments, helping ensure better outcomes, improved safety, and a higher standard of healthcare delivery for patients across North Karnataka.</p>
              </div>
              <div className="flex flex-wrap gap-3 mb-8">
                {["Advanced Surgical Infrastructure", "Expert Multidisciplinary Team", "Patient-Centric Care"].map((h) => (
                  <div key={h} className="flex items-center gap-2 bg-brandBlue/10 text-brandBlue border border-brandBlue/20 rounded-full px-4 py-2 text-xs font-bold">
                    <i className="ph ph-check-circle text-sm"></i> {h}
                  </div>
                ))}
              </div>
              <Link href="/about" className="inline-flex items-center gap-2 bg-brandBlue hover:bg-blue-800 text-white px-6 py-3 rounded-full text-xs font-bold transition-colors shadow-md">
                Learn More About Us <i className="ph ph-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Emergency & Critical Care ── */}
      <section className="py-20 bg-footerBlue text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative max-w-480 mx-auto px-4 lg:px-16 2xl:px-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-[40%] flex flex-col items-center lg:items-start gap-6">
              <div className="w-24 h-24 rounded-2xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                <i className="ph-fill ph-ambulance text-red-400 text-5xl"></i>
              </div>
              <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                {[
                  { icon: "ph-clock-countdown", label: "Rapid Response" },
                  { icon: "ph-heartbeat", label: "ICU & Critical Care" },
                  { icon: "ph-first-aid-kit", label: "Trauma Management" },
                  { icon: "ph-phone-call", label: "24/7 Helpline" },
                ].map(({ icon, label }) => (
                  <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center gap-2 text-center">
                    <i className={`ph ${icon} text-2xl text-red-400`}></i>
                    <span className="text-[11px] font-bold text-gray-300">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-[60%]">
              <div className="inline-block bg-red-500/20 border border-red-500/30 text-red-300 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                <i className="ph ph-siren mr-1"></i> Emergency Services
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-6 leading-tight">24/7 Emergency &amp; Critical Care Services</h2>
              <div className="text-sm text-gray-300 leading-relaxed space-y-4 mb-8">
                <p>Medical emergencies demand immediate attention, precision, and coordinated care. At NK Hospital, we provide round-the-clock emergency and critical care services supported by experienced clinicians, intensive care facilities, advanced monitoring systems, and rapid response protocols.</p>
                <p>Our emergency care team is equipped to manage trauma, medical emergencies, surgical emergencies, and critical conditions with speed, efficiency, and patient safety at the forefront.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:1066" className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-full text-sm transition-colors shadow-lg">
                  <i className="ph ph-phone-call"></i> Emergency Helpline
                </a>
                <a href="#" className="flex items-center justify-center gap-2 border border-white/20 hover:bg-white/10 text-white font-bold px-7 py-3.5 rounded-full text-sm transition-colors">
                  <i className="ph ph-users"></i> Contact Emergency Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-16 bg-white">
        <div className="max-w-480 mx-auto px-4 lg:px-16 2xl:px-24">
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-brandBlue mb-2">Why NK Hospital</p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Excellence Across Every Aspect of Care</h2>
            <p className="text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed">
              NK Hospital, recognized as one of the leading multi superspecialty hospitals in Kalaburagi, is built to deliver seamless, accessible, and high-quality healthcare experiences across medical and surgical specialties.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map(({ icon, stat, desc }) => (
              <div key={stat} className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex gap-4 hover:border-brandBlue hover:shadow-md transition-all group">
                <div className="w-12 h-12 rounded-xl bg-brandBlue/10 flex items-center justify-center text-brandBlue shrink-0 group-hover:bg-brandBlue group-hover:text-white transition-colors">
                  <i className={`ph ${icon} text-2xl`}></i>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-gray-900 mb-1">{stat}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FIX #14: Closing CTA so page doesn't end abruptly */}
      <section className="py-16 bg-brandBlue text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3 tracking-tight">Ready to Book Your Appointment?</h2>
          <p className="text-sm text-blue-200/90 mb-8 leading-relaxed">
            Get access to expert medical care across 40+ specialties at NK Hospital, Kalaburagi. Our specialists are available 6 days a week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book" className="bg-white text-brandBlue font-bold px-8 py-3.5 rounded-full text-sm hover:bg-blue-50 transition-colors shadow-lg flex items-center justify-center gap-2">
              <i className="ph ph-calendar-plus"></i> Book Appointment
            </Link>
            <Link href="/find-doctor" className="border border-white/40 text-white font-bold px-8 py-3.5 rounded-full text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <i className="ph ph-user-circle"></i> Find a Doctor
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
