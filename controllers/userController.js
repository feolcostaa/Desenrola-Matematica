require('dotenv').config();
const knex = require('knex')({
  client: 'sqlite3',
  connection: { filename: process.env.DATABASE_URL },
  useNullAsDefault: true
});
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// configura o transporter do Nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,            // porta 465 usa SSL/TLS direto
  auth: {
    user: process.env.SMTP_USER,  
    pass: process.env.SMTP_PASS   // aqui a senha de app, não a sua senha normal
  }
});

async function registerUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'E‑mail e senha são obrigatórios' });
  }

  const existing = await knex('users').where({ email }).first();
  if (existing) {
    if (!existing.is_verified) {
      // opcional: gerar novo token e reenviar link aqui
    }
    return res.status(409).json({ error: 'E‑mail já cadastrado' });
  }

  const password_hash = await bcrypt.hash(password, 10);
  const verification_token = crypto.randomBytes(32).toString('hex');

  // INSERÇÃO e ENVIO num bloco try/catch
  try {
    await knex('users').insert({
      email,
      password_hash,
      verification_token,
      is_verified: false
    });

    const verifyLink = `http://localhost:3000/api/auth/verify?token=${verification_token}`;
    await transporter.sendMail({
      from: `"MeuSite" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Confirme seu e‑mail',
      html: `<p>Olá! Clique <a href="${verifyLink}">neste link</a> para ativar sua conta.</p>`
    });

    return res.status(201).json({ message: 'Usuário criado! Verifique seu e‑mail.' });

  } catch (err) {
    // se falhar o envio de e‑mail (ou outro erro), apaga o registro
    await knex('users').where({ email }).del();
    console.error('Erro no registro:', err);
    return res.status(500).json({ error: 'Não foi possível criar o usuário. Tente mais tarde.' });
  }
}


module.exports = { registerUser };
