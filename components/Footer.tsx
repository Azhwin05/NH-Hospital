import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-footerBlue text-white pt-8 pb-4">
      <div className="max-w-[1920px] mx-auto px-4 lg:px-16 2xl:px-24">

        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-5">
          <div>
            {/* FIX #25: singular "NK Hospital" */}
            <h3 className="font-bold text-lg mb-0.5 text-white">NK Hospital</h3>
            <p className="text-[10px] text-gray-400">Multi Super-Specialty Hospital, Kalaburagi</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            {/* FIX #13: consistent phone number matching header */}
            <a href="tel:08042444222" className="bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full text-[10px] font-semibold flex items-center gap-2 border border-white/10 transition-colors">
              <i className="ph-fill ph-ambulance text-red-500 text-sm"></i> Emergency: 080 4244 4222
            </a>
            <Link href="/book" className="bg-brandBlue hover:bg-blue-800 px-4 py-1.5 rounded-full text-[10px] font-semibold transition-colors text-center shadow-sm flex items-center justify-center gap-1.5">
              <i className="ph ph-calendar-plus text-xs"></i> Book Appointment
            </Link>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-5 text-[11px] border-t border-b border-white/5 py-5">
          <div>
            <h4 className="font-semibold text-gray-300 uppercase tracking-wider mb-3 text-[10px]">Patient Care</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/find-doctor" className="hover:text-white transition-colors">Find A Doctor</Link></li>
              <li><Link href="/specialities" className="hover:text-white transition-colors">Our Specialities</Link></li>
              <li><Link href="/book" className="hover:text-white transition-colors">Book Appointment</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Health Packages</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Patient Guidelines</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-300 uppercase tracking-wider mb-3 text-[10px]">Discover</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Blogs &amp; Articles</a></li>
              <li><a href="#" className="hover:text-white transition-colors">News &amp; Media</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Academics &amp; Research</a></li>
              <li><a href="#" className="hover:text-white transition-colors">International Patients</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-300 uppercase tracking-wider mb-3 text-[10px]">Connect</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Our Location</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Feedback &amp; Reviews</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Corporate Tie-ups</a></li>
            </ul>
          </div>
        </div>

        {/* FIX #6: Correct location — Kalaburagi (placeholder until client provides exact address) */}
        <div className="bg-footerBox rounded-lg p-5 mb-5 border border-white/5">
          <h4 className="text-[10px] font-bold uppercase tracking-widest mb-4 border-b border-white/10 pb-1.5 inline-block text-gray-300">Our Location</h4>
          <div className="text-[10px] text-gray-400">
            <div className="font-bold text-gray-200 mb-1.5 flex items-center gap-1.5">
              <i className="ph-fill ph-map-pin text-brandBlue"></i> NK Hospital — Kalaburagi
            </div>
            <p className="leading-relaxed pl-4 text-gray-400">Kalaburagi (Gulbarga), Karnataka, India</p>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-5 pt-4 border-t border-white/10 gap-4">
            <div className="text-[10px] text-gray-400 flex items-center gap-1.5">
              <i className="ph-fill ph-envelope text-sm text-gray-500"></i> info@nkhospital.in
            </div>
            <div className="flex gap-1.5">
              {["ph-facebook-logo", "ph-twitter-logo", "ph-linkedin-logo", "ph-youtube-logo", "ph-instagram-logo"].map((icon) => (
                <a key={icon} href="#" className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center hover:bg-brandBlue transition-colors">
                  <i className={`ph-fill ${icon} text-xs`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Accreditations */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {["NABH", "NABL", "ISO Standards"].map((label) => (
            <div key={label} className="bg-white/5 border border-white/5 rounded-full px-3 py-1 flex items-center gap-1.5 text-[9px] font-semibold text-gray-300">
              <div className="w-4 h-4 rounded-full bg-amber-500/80 flex items-center justify-center">
                <i className="ph-fill ph-clock text-white text-[7px]"></i>
              </div>
              {label} — Working Toward
            </div>
          ))}
        </div>

        {/* Copyright — FIX #25: "NK Hospital" singular */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-[9px] text-gray-500 pt-3">
          <p>&copy; 2026 NK Hospital. All Rights Reserved.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
