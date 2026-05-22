"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { VideoPlayer } from "@/components/VideoPlayer";

type Tab = "overview" | "history" | "chairman";

const coreValues = [
  { icon: "ph-heart", title: "Compassion", desc: "Care delivered with empathy and respect for every patient." },
  { icon: "ph-scales", title: "Integrity", desc: "Ethical, transparent, and accountable in all our practices." },
  { icon: "ph-medal", title: "Clinical Excellence", desc: "Committed to high-quality, evidence-based medical care." },
  { icon: "ph-user-circle", title: "Patient First", desc: "Prioritizing patient safety, comfort, and well-being at every step." },
  { icon: "ph-lightbulb", title: "Innovation", desc: "Leveraging advanced technology to improve care and outcomes." },
  { icon: "ph-handshake", title: "Collaboration", desc: "Coordinated, multidisciplinary approach across specialties." },
];

const milestones = [
  { icon: "ph-users-three", title: "Thousands of Patients Served", desc: "Through outpatient consultations, inpatient care, emergency treatment, and specialized healthcare services." },
  { icon: "ph-knife", title: "Advanced Laparoscopic Surgery", desc: "Minimally invasive procedures enabling faster recovery, reduced hospital stay, and improved patient outcomes." },
  // FIX #10: ph-cell-signal-full replaced with contextually correct icon
  { icon: "ph-microscope", title: "Specialized GI Oncology Services", desc: "Expert evaluation, surgical management, and multidisciplinary care for gastrointestinal cancers." },
  { icon: "ph-first-aid-kit", title: "Expertise in HPB Surgeries", desc: "Advanced treatment for liver, pancreas, gallbladder, and biliary tract diseases." },
];

const highlights = [
  { icon: "ph-bed", label: "200+ Beds" },
  { icon: "ph-stethoscope", label: "40+ Specialties" },
  { icon: "ph-ambulance", label: "24/7 Emergency Care" },
  { icon: "ph-hospital", label: "Advanced Surgical Infrastructure" },
  { icon: "ph-users", label: "Expert Multidisciplinary Team" },
  { icon: "ph-heart", label: "Patient-Centric Care" },
];

const leadership = [
  {
    name: "Dr. Arif Raza Ahmed",
    designation: "Founder & Chairman",
    experience: "Clinical Practice & Healthcare Entrepreneurship",
    // FIX #15: capped tags to prevent overflow
    tags: ["Strategic Healthcare", "Patient-Centered Care", "Healthcare Innovation", "Clinical Operations"],
    bio: "Dr. Arif leads NK Hospital with a vision to build a modern, ethical, and patient-focused healthcare institution for North Karnataka. His focus lies in integrating advanced healthcare infrastructure, specialist-driven care, and operational excellence.",
  },
  {
    name: "Dr. Amera Neelam",
    designation: "Managing Director",
    experience: "Healthcare Management",
    tags: ["Medical Quality Standards", "Multidisciplinary Coordination", "Hospital Operations"],
    bio: "Dr. Amera contributes to strengthening hospital systems, medical coordination, and quality-driven patient care across departments, supporting the hospital's commitment toward ethical practice and patient safety.",
  },
  {
    name: "Dr. Numan",
    designation: "Executive Director",
    experience: "Healthcare Operations & Administration",
    // FIX #15: reduced from 8 tags to 4 to prevent card height overflow
    tags: ["Hospital Strategy", "Operational Leadership", "Clinical Coordination", "Service Delivery"],
    bio: "Dr. Numan drives the hospital's operational excellence, strategic expansion, and clinical coordination. His focus lies in strengthening systems and building a patient-centric institution aligned with global healthcare standards.",
  },
];

export default function AboutPage() {
  const [tab, setTab] = useState<Tab>("overview");

  const tabLabels: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "history", label: "History" },
    { key: "chairman", label: "Chairman's Message" },
  ];

  return (
    // FIX #1: removed hardcoded duplicate top bar — Header handles it
    <>
      <Header activePage="about" />

      {/* Page Hero */}
      <div className="bg-brandBlue text-white py-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div className="relative px-4">
          {/* FIX #16: constrained heading width so it doesn't break into 3 lines */}
          <h1 className="text-2xl md:text-3xl font-extrabold mb-2 leading-snug tracking-tight max-w-2xl mx-auto">
            Bringing Together the Right Expertise and Infrastructure for Better Care
          </h1>
          <p className="text-xs text-blue-200">
            {/* FIX #27: breadcrumb always shows "About Us" regardless of active tab */}
            Home / <span className="text-white font-semibold">About Us</span>
          </p>
        </div>
      </div>

      {/* FIX #19: sticky top-18 positions tab bar just below sticky header */}
      <div className="bg-white border-b border-gray-200 shadow-sm sticky top-18 z-40">
        <div className="max-w-480 mx-auto flex justify-start gap-8 px-4 lg:px-16 2xl:px-24">
          {tabLabels.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`py-4 text-sm font-medium transition-colors whitespace-nowrap ${tab === key ? "text-brandBlue border-b-2 border-brandBlue font-bold" : "text-gray-500 hover:text-brandBlue"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <main className="pb-0 bg-white">

        {/* ── Overview Tab ── */}
        {tab === "overview" && (
          <div className="tab-content w-full">
            <div className="max-w-480 mx-auto px-4 lg:px-16 2xl:px-24 py-16">

              {/* Vision & Mission */}
              <div className="text-center mb-12">
                <p className="text-[11px] font-bold uppercase tracking-widest text-brandBlue mb-2">Our Foundation</p>
                <h2 className="text-3xl font-bold text-gray-900">Vision &amp; Mission</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                <div className="bg-blue-50/60 border border-gray-200 rounded-2xl p-8 flex flex-col shadow-sm hover:shadow-md hover:border-brandBlue/30 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-brandBlue/10 flex items-center justify-center text-brandBlue mb-6">
                    <i className="ph-fill ph-eye text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Our Vision</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-5">What we aspire to be</p>
                  <p className="text-sm text-gray-700 leading-relaxed">To become a trusted healthcare institution through clinical excellence, innovation, advanced technology, compassionate care, and leadership in accessible, patient-centered healthcare delivery.</p>
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-8 flex flex-col shadow-sm hover:shadow-md hover:border-brandBlue/30 transition-all">
                  <div className="w-12 h-12 rounded-xl bg-brandBlue/10 flex items-center justify-center text-brandBlue mb-6">
                    <i className="ph-fill ph-rocket-launch text-2xl"></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">Our Mission</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-5">How we achieve it</p>
                  <p className="text-sm text-gray-700 leading-relaxed">To provide safe, high-quality healthcare through skilled professionals, ethical practices, modern technology, patient-focused systems, and continuous commitment to excellence, accessibility, and community well-being.</p>
                </div>
              </div>

              {/* Core Values */}
              <div className="mb-20">
                <div className="text-center mb-10">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-brandBlue mb-2">What We Stand For</p>
                  <h2 className="text-3xl font-bold text-gray-900">Values That Drive Us</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coreValues.map(({ icon, title, desc }) => (
                    <div key={title} className="bg-white border border-gray-200 rounded-2xl p-6 flex gap-4 hover:shadow-md hover:border-brandBlue/30 transition-all">
                      <div className="w-10 h-10 rounded-xl bg-brandBlue/10 flex items-center justify-center text-brandBlue shrink-0">
                        <i className={`ph ${icon} text-xl`}></i>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 mb-1">{title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Accreditations */}
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
                <div className="text-center mb-8">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-brandBlue mb-2">Quality Standards</p>
                  <h2 className="text-2xl font-bold text-gray-900">Accreditations &amp; Certifications</h2>
                  <p className="text-sm text-gray-500 mt-3 max-w-2xl mx-auto leading-relaxed">Our systems are being developed in alignment with nationally and internationally recognized healthcare standards to ensure safe, ethical, and evidence-based patient care.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                  {[
                    { icon: "ph-seal-check", label: "NABH", full: "National Accreditation Board for Hospitals & Healthcare Providers", desc: "Patient safety, quality care standards, infection control, clinical protocols, and continuous quality improvement." },
                    { icon: "ph-flask", label: "NABL", full: "National Accreditation Board for Testing and Calibration Laboratories", desc: "Ensuring accuracy, reliability, and quality assurance in laboratory diagnostics and reporting systems." },
                    { icon: "ph-certificate", label: "ISO Standards", full: "ISO Standards (where applicable)", desc: "Standardized operational systems, process efficiency, documentation practices, and continuous organizational improvement." },
                  ].map(({ icon, label, full, desc }) => (
                    <div key={label} className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-brandBlue">
                          <i className={`ph ${icon} text-xl`}></i>
                        </div>
                        <div>
                          <div className="font-bold text-sm text-gray-900">{label}</div>
                          <div className="text-[9px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full inline-block mt-0.5">Working Toward</div>
                        </div>
                      </div>
                      <p className="text-[10px] font-semibold text-gray-400">{full}</p>
                      <p className="text-[11px] text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── History Tab ── */}
        {tab === "history" && (
          <div className="tab-content w-full">
            <div className="max-w-480 mx-auto px-4 lg:px-16 2xl:px-24 py-16">
              <div className="mb-14 max-w-4xl">
                <p className="text-[11px] font-bold uppercase tracking-widest text-brandBlue mb-3">Who We Are</p>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Excellence in Advanced Healthcare</h2>
                <div className="text-[15px] text-gray-700 leading-relaxed space-y-5 font-medium">
                  <p>Our hospital was founded with a clear purpose: to bring high-quality, patient-centered healthcare to North Karnataka while bridging the gap between skilled medical professionals and advanced infrastructure.</p>
                  <p>The vision has always been to create a collaborative environment where doctors are empowered with the right tools, systems, and support to deliver their best clinical outcomes. By combining experienced specialists with modern facilities, we aim to ensure that patients receive care that is both clinically sound and compassionate.</p>
                  <p>We offer a wide range of specialties, including Gastroenterology, general medicine, critical care, nephrology, orthopedics, and emergency services, allowing us to address diverse healthcare needs under one roof. Our approach emphasizes timely diagnosis, efficient treatment pathways, and continuity of care.</p>
                  <p>Committed to accessibility and dependability, we strive to make quality healthcare available to people across the region without delays or uncertainty. With a strong focus on North Karnataka, our goal is not just to treat illness, but to build a trusted healthcare institution that communities can rely on consistently, transparently, and with excellence.</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-14">
                {highlights.map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-2 bg-blue-50 border border-blue-100 text-brandBlue rounded-full px-4 py-2 text-xs font-bold">
                    <i className={`ph ${icon} text-sm`}></i> {label}
                  </div>
                ))}
              </div>

              <div>
                <div className="text-center mb-10">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-brandBlue mb-2">Milestones &amp; Achievements</p>
                  <h2 className="text-3xl font-bold text-gray-900">Our Journey</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {milestones.map(({ icon, title, desc }) => (
                    <div key={title} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col hover:shadow-md hover:border-brandBlue/30 transition-all group">
                      <div className="w-12 h-12 rounded-xl bg-brandBlue/10 text-brandBlue flex items-center justify-center mb-4 group-hover:bg-brandBlue group-hover:text-white transition-colors">
                        <i className={`ph ${icon} text-2xl`}></i>
                      </div>
                      <h3 className="font-bold text-sm text-gray-900 mb-2 leading-snug">{title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Chairman's Message Tab ── */}
        {tab === "chairman" && (
          <div className="tab-content w-full">
            <div className="max-w-480 mx-auto px-4 lg:px-16 2xl:px-24 py-16">

              {/* Chairman Message */}
              <div className="mb-20">
                <p className="text-[11px] font-bold uppercase tracking-widest text-brandBlue mb-3">Leadership</p>
                <h2 className="text-3xl font-bold text-gray-900 mb-10">A Message from the Chairman</h2>
                <div className="flex flex-col lg:flex-row gap-12">
                  <div className="lg:w-65 shrink-0">
                    <div className="w-full h-75 rounded-2xl bg-gray-100 border border-gray-200 flex flex-col items-center justify-center mb-5">
                      <i className="ph ph-user-circle text-7xl text-gray-300 mb-2"></i>
                      <span className="text-xs text-gray-400 font-medium">Photo Coming Soon</span>
                    </div>
                    <h3 className="text-xl font-bold text-brandBlue mb-0.5">Dr. Arif Raza Ahmed</h3>
                    <p className="text-xs text-gray-500 mb-1">Founder &amp; Chairman</p>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-teal-600">NK Hospital, Kalaburagi</p>
                  </div>
                  <div className="flex-1">
                    <div className="text-[15px] text-gray-700 leading-relaxed space-y-5 font-medium">
                      <p>NK Hospital was established with a vision to create a healthcare institution that combines medical excellence, ethical practice, and compassionate patient care under one roof.</p>
                      <p>We established this hospital with a purpose to bridge the gap between advanced healthcare facilities and the growing needs of the people of North Karnataka.</p>
                      <p>We believe that exceptional healthcare is achieved when experienced doctors, skilled nursing teams, modern technology, and evidence-based systems work together seamlessly. From emergency and critical care services to specialized medical and surgical departments, every element of NK Hospital has been designed to deliver safe, reliable, and patient-focused care with the highest standards of quality and accountability.</p>
                      <p>We strongly believe that timely access to the right treatment can transform lives. Our focus is not only on treating illness, but also on creating a healthcare environment where patients and families feel supported, respected, and confident in the care they receive.</p>
                      <p>Healthcare today is evolving rapidly, and institutions must continuously adapt through innovation, research-oriented thinking, digital integration, and strong clinical systems. At NK Hospital, we are committed to building an ecosystem where patient safety, timely treatment, affordability, and clinical excellence remain at the center of every decision.</p>
                      <p>Our journey has only begun. In the years ahead, NK Hospital aims to emerge as a leading healthcare destination in the region by expanding specialized services, strengthening medical expertise, and adopting advanced technologies that improve outcomes and patient experience.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leadership Team — FIX #15: capped tags, consistent card heights */}
              <div>
                <div className="text-center mb-10">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-brandBlue mb-2">Board of Directors</p>
                  <h2 className="text-3xl font-bold text-gray-900">Our Leadership Team</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {leadership.map(({ name, designation, experience, tags, bio }) => (
                    <div key={name} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md hover:border-brandBlue/30 transition-all flex flex-col">
                      <div className="w-14 h-14 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center mb-4">
                        <i className="ph ph-user-circle text-4xl text-gray-300"></i>
                      </div>
                      <h3 className="font-bold text-base text-brandBlue mb-0.5">{name}</h3>
                      <p className="text-xs font-bold text-gray-700 mb-0.5">{designation}</p>
                      <p className="text-[10px] text-gray-400 mb-3">{experience}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {tags.map((tag) => (
                          <span key={tag} className="text-[9px] font-semibold bg-blue-50 text-brandBlue px-2 py-0.5 rounded-full border border-blue-100">{tag}</span>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed mt-auto">{bio}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video — always visible */}
        <div className="bg-gray-50 border-t border-gray-100 py-16">
          <div className="max-w-480 mx-auto px-4 lg:px-16 2xl:px-24">
            <div className="text-center mb-10">
              <div className="inline-block bg-brandBlue/10 text-brandBlue text-[11px] font-bold uppercase tracking-widest px-5 py-2 rounded-full mb-4">
                <i className="ph ph-video-camera mr-1"></i> Hospital Tour
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Experience NK Hospital</h2>
              <p className="text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed">Take a virtual tour through our facilities, advanced operation theatres, and patient-centric care environment.</p>
            </div>
            <VideoPlayer />
          </div>
        </div>

        {/* CTA */}
        <div className="bg-brandBlue text-white py-16 text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-3 tracking-tight">Experience Quality Healthcare You Can Trust</h2>
            <p className="text-sm text-blue-200/90 mb-8 leading-relaxed">Get access to expert medical care and advanced treatment facilities at NK Hospital. Schedule a consultation with our specialists today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book" className="bg-white text-brandBlue font-bold px-8 py-3.5 rounded-full text-sm hover:bg-blue-50 transition-colors shadow-lg flex items-center justify-center gap-2">
                <i className="ph ph-calendar-plus"></i> Book Appointment
              </Link>
              <a href="tel:08042444222" className="border border-white/40 text-white font-bold px-8 py-3.5 rounded-full text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <i className="ph ph-phone"></i> Call Now
              </a>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
