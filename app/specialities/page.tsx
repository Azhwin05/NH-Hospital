"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// FIX #7: all icons verified valid in Phosphor Icons web library
const specialities = [
  { name: "Cardiology", icon: "ph ph-heartbeat" },
  { name: "Cardiothoracic Surgery", icon: "ph ph-activity" },
  { name: "Medical Gastroenterology", icon: "ph ph-pulse" },
  { name: "Surgical Gastroenterology", icon: "ph ph-scissors" },
  { name: "Hepatology", icon: "ph ph-pill" },
  { name: "Liver Transplant", icon: "ph ph-git-merge" },
  { name: "Medical Oncology", icon: "ph ph-first-aid-kit" },
  { name: "Surgical Oncology", icon: "ph ph-bandaids" },
  { name: "Neurology", icon: "ph ph-brain" },
  { name: "Radiation Oncology", icon: "ph ph-radioactive" },
  { name: "Neurosurgery", icon: "ph ph-lightning" },
  { name: "ENT", icon: "ph ph-ear" },
  { name: "Orthopedics", icon: "ph ph-bone" },
  { name: "Pediatrics", icon: "ph ph-baby" },
  { name: "Ophthalmology", icon: "ph ph-eye" },
  { name: "Dermatology", icon: "ph ph-drop" },
  { name: "Urology", icon: "ph ph-funnel" },
  { name: "Nephrology", icon: "ph ph-flask" },
  { name: "Pulmonology", icon: "ph ph-wind" },
  { name: "Endocrinology", icon: "ph ph-thermometer" },
  { name: "Rheumatology", icon: "ph ph-hand" },
  { name: "Psychiatry", icon: "ph ph-brain" },
  { name: "Obstetrics & Gynecology", icon: "ph ph-flower-lotus" },
  { name: "General Surgery", icon: "ph ph-first-aid-kit" },
  { name: "Plastic Surgery", icon: "ph ph-smiley" },
  { name: "Vascular Surgery", icon: "ph ph-waves" },
  { name: "Critical Care Medicine", icon: "ph ph-siren" },
  { name: "Emergency Medicine", icon: "ph ph-ambulance" },
  { name: "Anesthesiology", icon: "ph ph-mask" },
  { name: "Radiology & Imaging", icon: "ph ph-scan" },
  { name: "Pathology", icon: "ph ph-test-tube" },
  { name: "Physiotherapy", icon: "ph ph-person" },
  { name: "Nutrition & Dietetics", icon: "ph ph-apple-logo" },
  { name: "Dental Surgery", icon: "ph ph-tooth" },
];

export default function SpecialitiesPage() {
  // FIX #23: add search filter (same as book page, so users can find specialities)
  const [search, setSearch] = useState("");

  const filtered = specialities.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="antialiased text-gray-800 bg-white flex flex-col min-h-screen">
      <Header activePage="specialities" />

      {/* Page Header */}
      <div className="bg-brandBlue text-white py-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative">
          <h1 className="text-3xl font-bold mb-2">Our Specialities</h1>
          {/* FIX #27: breadcrumb always shows page name, not tab state */}
          <div className="text-xs text-blue-200">Home / <span className="text-white">Specialities</span></div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-12 bg-gray-50 flex-1">
        <div className="max-w-480 mx-auto px-4 lg:px-16 2xl:px-24">

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-brandBlue mb-3">30+ Health Domains</h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto leading-relaxed">
              NK Hospital provides comprehensive, world-class care across a vast spectrum of medical and surgical disciplines. Explore our specialized departments below.
            </p>
          </div>

          {/* FIX #23: Search filter */}
          <div className="max-w-xl mx-auto mb-10 relative">
            <i className="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
            <input
              type="text"
              placeholder="Search specialities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 text-sm outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue shadow-sm bg-white placeholder:text-gray-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((s) => (
              <Link
                key={s.name}
                href={`/book?speciality=${encodeURIComponent(s.name)}`}
                className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 hover:border-brandBlue hover:shadow-md transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-brandBlue group-hover:bg-brandBlue group-hover:text-white transition-colors shrink-0">
                  <i className={`${s.icon} text-xl`}></i>
                </div>
                <span className="text-sm font-semibold text-gray-800 group-hover:text-brandBlue transition-colors">{s.name}</span>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 text-3xl">
                <i className="ph ph-magnifying-glass"></i>
              </div>
              <h3 className="text-base font-bold text-gray-700 mb-1">No specialities found</h3>
              <p className="text-xs text-gray-500">Try searching for &apos;Cardio&apos;, &apos;Neuro&apos;, or &apos;Gastro&apos;</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
