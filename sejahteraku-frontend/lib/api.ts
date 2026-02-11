// src/lib/api.ts
export const askAI = async (question: string) => {
  let token = typeof window !== 'undefined' ? localStorage.getItem('token') : null; 

  if (!token) {
    const resLogin = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        // PAKAI EMAIL ID 1 YANG PASSWORDNYA MENTAH DI PRISMA STUDIO
        email: "muhammad@sejahteraku.com", 
        password: "password123" 
      })
    });

    if (!resLogin.ok) throw new Error("Gagal login otomatis. Cek database!");
    
    const dataLogin = await resLogin.json();
    token = dataLogin.access_token;
    localStorage.setItem('token', token!);
  }

  const res = await fetch('http://localhost:3000/ai-consultant/ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    },
    body: JSON.stringify({ question })
  });

  if (res.status === 401) {
    localStorage.removeItem('token');
    throw new Error("Sesi Unauthorized. Kirim pesan sekali lagi.");
  }
  
  const data = await res.json();
  return data.response;
};