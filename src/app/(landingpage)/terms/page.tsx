export const metadata = {
  title: "Termos de Uso — B2C Boilerplate",
}

export default function TermsPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-2xl mx-auto py-8">
      <h1>Termos de Uso</h1>
      <p className="text-sm text-muted-foreground">Última atualização: [DATA]</p>

      <h2>1. Aceitação dos Termos</h2>
      <p>
        Ao acessar ou utilizar o <strong>B2C Boilerplate</strong> ("Serviço"), você concorda com
        estes Termos de Uso. Se não concordar com qualquer parte destes termos, não utilize o
        Serviço.
      </p>

      <h2>2. Descrição do Serviço</h2>
      <p>
        O Serviço permite que usuários criem contas, acessem funcionalidades protegidas e
        gerenciem seus dados pessoais. O acesso completo exige o cadastro com e-mail verificado.
      </p>

      <h2>3. Cadastro e Responsabilidades do Usuário</h2>
      <p>Para utilizar o Serviço, você deve:</p>
      <ul>
        <li>Fornecer informações verdadeiras, precisas e completas no cadastro.</li>
        <li>Manter a confidencialidade de sua senha.</li>
        <li>Notificar imediatamente qualquer uso não autorizado de sua conta.</li>
        <li>Ser responsável por todas as atividades realizadas com suas credenciais.</li>
      </ul>

      <h2>4. Uso Aceitável</h2>
      <p>Você concorda em não:</p>
      <ul>
        <li>Utilizar o Serviço para fins ilegais ou não autorizados.</li>
        <li>Tentar acessar contas ou sistemas sem autorização.</li>
        <li>Interferir no funcionamento do Serviço.</li>
        <li>Transmitir conteúdo prejudicial, ofensivo ou que viole direitos de terceiros.</li>
      </ul>

      <h2>5. Encerramento de Conta</h2>
      <p>
        Você pode excluir sua conta a qualquer momento nas configurações de perfil. Após a
        exclusão, seus dados pessoais serão permanentemente removidos, conforme descrito em nossa
        Política de Privacidade.
      </p>
      <p>
        Reservamo-nos o direito de suspender ou encerrar contas que violem estes Termos.
      </p>

      <h2>6. Limitação de Responsabilidade</h2>
      <p>
        O Serviço é fornecido "no estado em que se encontra", sem garantias de qualquer natureza.
        Não nos responsabilizamos por interrupções, perdas de dados ou danos indiretos decorrentes
        do uso do Serviço.
      </p>

      <h2>7. Alterações nos Termos</h2>
      <p>
        Podemos atualizar estes Termos periodicamente. Notificaremos os usuários sobre mudanças
        relevantes. O uso continuado do Serviço após as alterações constitui aceitação dos novos
        termos.
      </p>

      <h2>8. Foro e Legislação Aplicável</h2>
      <p>
        Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro
        da comarca de [CIDADE/ESTADO] para dirimir quaisquer controvérsias.
      </p>

      <h2>9. Contato</h2>
      <p>
        Dúvidas sobre estes Termos podem ser enviadas para:{" "}
        <a href="mailto:contato@exemplo.com.br">contato@exemplo.com.br</a>
      </p>
    </article>
  )
}
