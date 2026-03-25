import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationEmail(to: string, token: string): Promise<void> {
  const url = `${process.env.APP_URL}/verify-email?token=${token}`
  await resend.emails.send({
    from: "no-reply@rohling.com.br",
    to,
    subject: "Confirme seu e-mail",
    html: `
      <p>Obrigado por criar sua conta.</p>
      <p>Clique no link abaixo para confirmar seu e-mail (expira em 24h):</p>
      <p><a href="${url}">Confirmar e-mail</a></p>
      <p>Se você não criou esta conta, ignore este e-mail.</p>
    `,
  })
}

export async function sendEmailChangeEmail(to: string, token: string): Promise<void> {
  const url = `${process.env.APP_URL}/verify-email-change?token=${token}`
  await resend.emails.send({
    from: "no-reply@rohling.com.br",
    to,
    subject: "Confirme seu novo e-mail",
    html: `
      <p>Recebemos uma solicitação para alterar o e-mail da sua conta.</p>
      <p>Clique no link abaixo para confirmar o novo endereço (expira em 1h):</p>
      <p><a href="${url}">Confirmar novo e-mail</a></p>
      <p>Se você não solicitou isso, ignore este e-mail.</p>
    `,
  })
}

export async function sendPasswordResetEmail(to: string, token: string): Promise<void> {
  const url = `${process.env.APP_URL}/reset-password?token=${token}`
  await resend.emails.send({
    from: "no-reply@rohling.com.br",
    to,
    subject: "Redefinição de senha",
    html: `
      <p>Recebemos uma solicitação para redefinir sua senha.</p>
      <p>Clique no link abaixo para criar uma nova senha (expira em 1h):</p>
      <p><a href="${url}">Redefinir senha</a></p>
      <p>Se você não solicitou isso, ignore este e-mail.</p>
    `,
  })
}
