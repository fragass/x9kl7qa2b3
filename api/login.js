// pages/api/login.js (Next.js)
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Método não permitido" });
  }

  const { user, pass } = req.body || {};

  // Opcional: normalizar usuário
  const inputUser = (user || "").trim();
  const envUser = (process.env.USERNAME || "");
  const envPass = (process.env.PASSWORD || "");

  if (inputUser === envUser && pass === envPass) {
    return res.status(200).json({ success: true });
  }
  return res.status(401).json({ success: false });
}