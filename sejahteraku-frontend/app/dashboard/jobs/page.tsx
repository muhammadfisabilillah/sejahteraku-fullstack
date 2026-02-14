'use client';

import { useEffect, useState } from 'react';
import { 
  Briefcase, MapPin, DollarSign, Search, 
  ChevronRight, Building2, Verified, Loader2 
} from 'lucide-react';

export default function JobBoardPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:3000/jobs');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Gagal mengambil loker:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="p-8 md:p-12 animate-in fade-in duration-1000">
      {/* HEADER */}
      <div className="mb-12 flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 text-amber-500 font-bold tracking-[0.3em] uppercase text-[10px] mb-4">
            <Briefcase size={14} /> Career Opportunities
          </div>
          <h1 className="text-5xl font-display font-bold tracking-tighter text-white">
            Job <span className="italic text-stone-600">Board.</span>
          </h1>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="animate-spin text-amber-500" size={40} />
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-500">Scanning Market...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="group bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-white/[0.05] hover:border-amber-500/30 transition-all duration-500">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-stone-900 rounded-2xl flex items-center justify-center text-amber-500 border border-white/5 group-hover:scale-110 transition-transform">
                  <Building2 size={32} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">
                      {job.position}
                    </h3>
                    {job.company?.isVerified && <Verified size={16} className="text-blue-400" />}
                  </div>
                  <div className="flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-widest text-stone-500">
                    <span className="flex items-center gap-1.5"><Building2 size={12} /> {job.company?.name}</span>
                    <span className="flex items-center gap-1.5"><MapPin size={12} /> {job.location || 'Remote'}</span>
                    <span className="flex items-center gap-1.5 text-amber-500/80"><DollarSign size={12} /> {job.salaryRange || 'Competitive'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button className="px-8 py-3 bg-white/5 hover:bg-amber-500 hover:text-black rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}   