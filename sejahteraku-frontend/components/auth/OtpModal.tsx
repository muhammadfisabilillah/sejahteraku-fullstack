"use client";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

interface OtpModalProps {
  email: string;
  isOpen: boolean;
  onSuccess?: () => void; // Tambahin ini biar bisa nutup modal bapaknya
}

export default function OtpModal({ email, isOpen, onSuccess }: OtpModalProps) {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) inputRefs.current[0]?.focus();
  }, [isOpen]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    setError("");
    try {
      const code = otp.join("");
      await axios.post("http://localhost:3000/auth/verify-otp", {
        email,
        code,
      });
      
      // REVISI: Gak pake router.push lagi biar gak 404
      alert("Verifikasi Berhasil! Silakan masuk dengan akun anda.");
      
      // Refresh halaman atau panggil fungsi sukses
      window.location.reload(); 
    } catch (err: any) {
      setError(err.response?.data?.message || "Kode OTP salah atau expired");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <div className="bg-[#1a1a1a] border border-stone-800 p-12 rounded-[40px] max-w-md w-full text-center shadow-2xl">
        <h2 className="text-4xl font-black italic tracking-tighter text-white mb-2">VERIFIKASI</h2>
        <p className="text-stone-500 text-[11px] uppercase tracking-widest mb-10">
          KODE DIKIRIM KE: <br />
          <span className="text-amber-500 font-bold">{email}</span>
        </p>

        <div className="flex justify-center gap-2 mb-8">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              ref={(el) => (inputRefs.current[index] = el)}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-16 text-2xl font-black text-center bg-[#0f0f0f] border border-stone-800 rounded-xl text-white focus:border-amber-500 outline-none transition-all"
            />
          ))}
        </div>

        {error && <p className="text-red-500 text-[10px] font-bold uppercase mb-6 tracking-widest">{error}</p>}

        <button
          onClick={handleVerify}
          disabled={loading || otp.includes("")}
          className="w-full bg-amber-500 hover:bg-amber-400 disabled:bg-stone-800 text-black font-black py-5 rounded-xl transition-all uppercase tracking-widest text-xs"
        >
          {loading ? "PROCESSING..." : "KONFIRMASI KODE"}
        </button>
      </div>
    </div>
  );
}