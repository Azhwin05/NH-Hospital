"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const doctors = [
  { name: "Dr. Duvvur Nageshwar Reddy", speciality: "Medical Gastroenterology", experience: "20+ years", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop" },
  { name: "Dr. G V Rao", speciality: "Surgical Gastroenterology", experience: "36+ years", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200&auto=format&fit=crop" },
  { name: "Dr. P N Rao", speciality: "Hepatology", experience: "26+ years", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop" },
  { name: "Dr. Balachandran Palat", speciality: "Liver Transplant & Hepatobiliary Surgery", experience: "20+ years", img: "https://images.unsplash.com/photo-1594824436951-7f1262d082d3?q=80&w=200&auto=format&fit=crop" },
  { name: "Dr. Shaik Afshan Jabeen", speciality: "Neurology", experience: "20+ years", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop" },
  { name: "Dr. D. Sridhar", speciality: "Surgical Oncology", experience: "9+ years", img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop" },
  { name: "Dr. Kausik Bhattacharya", speciality: "Radiation Oncology", experience: "26+ years", img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200&auto=format&fit=crop" },
  { name: "Dr. Vamshi Krishna", speciality: "Medical Oncology", experience: "13+ years", img: "https://images.unsplash.com/photo-1594824436951-7f1262d082d3?q=80&w=200&auto=format&fit=crop" },
  { name: "Dr. Subodh Raju", speciality: "Neurosurgery", experience: "28+ years", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop" },
];

export default function FindDoctorPage() {
  const [search, setSearch] = useState("");

  const filtered = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.speciality.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="antialiased text-gray-800 bg-gray-50 flex flex-col min-h-screen">
      <Header activePage="find-doctor" />

      {/* Page Header */}
      <div className="bg-white pt-10 pb-6 border-b border-gray-100">
        <div className="max-w-480 mx-auto px-4 lg:px-16 2xl:px-24">
          <p className="text-[11px] font-bold uppercase tracking-widest text-brandBlue mb-1">NK Hospital — Kalaburagi</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Find a Doctor</h1>
          <p className="text-sm text-gray-500 mb-6">Search by name or speciality</p>

          {/* FIX #4: removed fake dropdowns — clean search-only bar */}
          <div className="relative max-w-xl">
            <i className="ph ph-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
            <input
              type="text"
              placeholder="Search doctor or speciality..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-full border border-gray-200 text-sm outline-none focus:border-brandBlue focus:ring-1 focus:ring-brandBlue shadow-sm bg-white placeholder:text-gray-400"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <i className="ph ph-x text-sm"></i>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Doctor Grid */}
      <main className="py-10 flex-1">
        <div className="max-w-480 mx-auto px-4 lg:px-16 2xl:px-24">

          {filtered.length > 0 && (
            <p className="text-xs text-gray-400 mb-6 font-medium">
              Showing {filtered.length} doctor{filtered.length !== 1 ? "s" : ""}
              {search ? ` for "${search}"` : ""}
            </p>
          )}

          {/* FIX #12: 3-column grid → 9 doctors = perfect 3×3, no orphan */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((doc) => (
              <div
                key={doc.name}
                className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col"
              >
                <div className="flex gap-4 mb-5">
                  <Image
                    src={doc.img}
                    alt={doc.name}
                    width={80}
                    height={88}
                    className="w-20 h-22 object-cover rounded-xl bg-gray-100 shrink-0"
                    unoptimized
                  />
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm text-brandBlue mb-0.5 leading-tight">{doc.name}</h3>
                    <p className="text-[11px] text-blue-600 font-semibold mb-2 leading-snug">{doc.speciality}</p>
                    <div className="flex flex-col gap-1 text-[10px] text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <i className="ph ph-map-pin text-gray-400 text-xs"></i> NK Hospital, Kalaburagi
                      </span>
                      <span className="flex items-center gap-1.5">
                        <i className="ph ph-clock text-gray-400 text-xs"></i> {doc.experience} experience
                      </span>
                    </div>
                  </div>
                </div>

                {/* FIX #20: single unified CTA — no confusing Book vs Request split */}
                <Link
                  href="/book"
                  className="mt-auto w-full py-2.5 rounded-lg bg-brandBlue text-white text-[11px] font-bold text-center hover:bg-blue-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <i className="ph ph-calendar-plus text-sm"></i> Book Appointment
                </Link>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 text-3xl">
                <i className="ph ph-magnifying-glass"></i>
              </div>
              <h3 className="text-base font-bold text-gray-700 mb-1">No doctors found</h3>
              <p className="text-xs text-gray-500">Try a different name or speciality</p>
              <button onClick={() => setSearch("")} className="mt-4 text-xs text-brandBlue font-semibold hover:underline">
                Clear search
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
