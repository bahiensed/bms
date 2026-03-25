export const metadata = {
  title: "Termos de Uso",
}

export default function TermsPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-4xl mx-auto">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Termos de Uso
      </h1>
      
      <p className="text-sm text-muted-foreground mb-6">Última atualização: 25 de março de 2026.</p>


      <h2 className="mb-2">I. Aceitação dos Termos</h2>

      <p className="mb-10">
        Ao acessar ou utilizar o <strong>B2C Boilerplate</strong> ("Serviço"), você concorda com
        estes Termos de Uso. Se não concordar com qualquer parte destes termos, não utilize o
        Serviço.
      </p>


      <h2 className="mb-2">II. Descrição do Serviço</h2>

      <p className="mb-10">
        O Serviço permite que usuários criem contas, acessem funcionalidades protegidas e
        gerenciem seus dados pessoais. O acesso completo exige o cadastro com e-mail verificado.
      </p>


      <h2 className="mb-2">III. Cadastro e Responsabilidades do Usuário</h2>

      <p className="mb-4">Para utilizar o Serviço, você deve:</p>

      <ul className="mb-10">
        <li>Fornecer informações verdadeiras, precisas e completas no cadastro.</li>
        <li>Manter a confidencialidade de sua senha.</li>
        <li>Notificar imediatamente qualquer uso não autorizado de sua conta.</li>
        <li>Ser responsável por todas as atividades realizadas com suas credenciais.</li>
      </ul>


      <h2 className="mb-2">IV. Uso Aceitável</h2>

      <p className="mb-4">Você concorda em não:</p>

      <ul className="mb-10">
        <li>Utilizar o Serviço para fins ilegais ou não autorizados.</li>
        <li>Tentar acessar contas ou sistemas sem autorização.</li>
        <li>Interferir no funcionamento do Serviço.</li>
        <li>Transmitir conteúdo prejudicial, ofensivo ou que viole direitos de terceiros.</li>
      </ul>


      <h2 className="mb-2">V. Encerramento de Conta</h2>

      <p className="mb-4">
        Você pode excluir sua conta a qualquer momento nas configurações de perfil. Após a
        exclusão, seus dados pessoais serão permanentemente removidos, conforme descrito em nossa
        Política de Privacidade.
      </p>

      <p className="mb-10">
        Reservamo-nos o direito de suspender ou encerrar contas que violem estes Termos.
      </p>


      <h2 className="mb-2">VI. Limitação de Responsabilidade</h2>

      <p className="mb-10">
        O Serviço é fornecido "no estado em que se encontra", sem garantias de qualquer natureza.
        Não nos responsabilizamos por interrupções, perdas de dados ou danos indiretos decorrentes
        do uso do Serviço.
      </p>


      <h2 className="mb-2">VII. Alterações nos Termos</h2>

      <p className="mb-10">
        Podemos atualizar estes Termos periodicamente. Notificaremos os usuários sobre mudanças
        relevantes. O uso continuado do Serviço após as alterações constitui aceitação dos novos
        termos.
      </p>

      <h2 className="mb-2">VIII. Foro e Legislação Aplicável</h2>

      <p className="mb-10">
        Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro
        da comarca de [CIDADE/ESTADO] para dirimir quaisquer controvérsias.
      </p>


      <h2 className="mb-2">IX. Contato</h2>

      <p className="mb-10">
        Dúvidas sobre estes Termos podem ser enviadas para:{" "}
        <a href="mailto:termos@bahien.se">termos@bahien.se</a>
      </p>
    </article>
  )
}
