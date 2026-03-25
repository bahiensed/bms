export const metadata = {
  title: "Política de Privacidade",
}

export default function PrivacyPage() {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-4xl mx-auto">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
        Política de Privacidade
      </h1>

      <p className="text-sm text-muted-foreground mb-6">Última atualização: 25 de março de 2026</p>

      <p className="mb-10">
        Esta Política de Privacidade descreve como o <strong>B2C Boilerplate</strong>
        ("nós", "nosso") coleta, utiliza e protege seus dados pessoais, em conformidade
        com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
      </p>


      <h2 className=" mb-2">I. Dados Coletados</h2>

      <p className=" mb-4">Coletamos os seguintes dados ao criar e usar sua conta:</p>

      <ul className=" mb-4">
        <li><strong>Nome completo</strong> (nome e sobrenome)</li>
        <li><strong>Endereço de e-mail</strong></li>
        <li><strong>Senha</strong> (armazenada exclusivamente em formato hash - nunca em texto puro)</li>
        <li><strong>Data de verificação de e-mail</strong></li>
        <li><strong>Data de criação e atualização da conta</strong></li>
      </ul>

      <p className="mb-10">Não coletamos dados de pagamento, localização, dispositivo ou comportamento de navegação.</p>


      <h2 className=" mb-2">II. Finalidade do Tratamento</h2>

      <p className=" mb-4">Utilizamos seus dados para:</p>

      <ul className=" mb-10">
        <li>Criar e manter sua conta de usuário.</li>
        <li>Autenticar seu acesso ao Serviço.</li>
        <li>Enviar e-mails transacionais (verificação de e-mail, redefinição de senha).</li>
        <li>Garantir a segurança da conta (controle de tentativas de login).</li>
      </ul>


      <h2 className=" mb-2">III. Base Legal (LGPD, art. 7º)</h2>

      <ul className=" mb-10">
        <li><strong>Execução de contrato</strong> (art. 7º, V): os dados são necessários para prestar o Serviço contratado.</li>
        <li><strong>Legítimo interesse</strong> (art. 7º, IX): segurança da conta e prevenção de fraudes.</li>
        <li><strong>Consentimento</strong> (art. 7º, I): para comunicações opcionais, quando aplicável.</li>
      </ul>


      <h2 className=" mb-2">IV. Retenção dos Dados</h2>

      <p className=" mb-10">
        Seus dados são mantidos enquanto sua conta estiver ativa. Ao excluir a conta, todos
        os dados pessoais são permanentemente removidos de nossos sistemas.
        Tokens temporários (verificação de e-mail, redefinição de senha) expiram automaticamente
        após 1 a 24 horas.
      </p>


      <h2 className=" mb-2">V. Compartilhamento de Dados</h2>

      <p className=" mb-4">
        Não vendemos, alugamos nem compartilhamos seus dados pessoais com terceiros, exceto:
      </p>

      <ul className=" mb-10">
        <li><strong>Prestadores de serviço essenciais</strong>: serviço de envio de e-mails
          transacionais (Resend) e banco de dados em nuvem (Neon), vinculados por contrato de
          confidencialidade.</li>
        <li><strong>Obrigação legal</strong>: quando exigido por lei ou ordem judicial.</li>
      </ul>


      <h2 className=" mb-2">VI. Seus Direitos (LGPD, art. 18)</h2>

      <p className=" mb-4">Você tem direito a:</p>

      <ul className=" mb-4">
        <li><strong>Acesso</strong>: consultar os dados que mantemos sobre você.</li>
        <li><strong>Correção</strong>: atualizar nome ou e-mail diretamente no perfil.</li>
        <li><strong>Exclusão</strong>: excluir sua conta e todos os dados associados.</li>
        <li><strong>Portabilidade</strong>: solicitar cópia dos seus dados em formato estruturado.</li>
        <li><strong>Revogação do consentimento</strong>: retirar consentimento a qualquer momento.</li>
        <li><strong>Oposição</strong>: opor-se ao tratamento em caso de descumprimento da LGPD.</li>
      </ul>

      <p className=" mb-10">
        Para exercer estes direitos, entre em contato pelo e-mail indicado na seção abaixo.
        Responderemos em até 15 dias.
      </p>


      <h2 className=" mb-2">VII. Segurança</h2>
      <p className=" mb-10">
        Adotamos medidas técnicas para proteger seus dados: senhas com hash bcrypt,
        comunicação criptografada via HTTPS, tokens de uso único com expiração,
        e controle de tentativas de login.
      </p>


      <h2 className=" mb-2">VIII. Cookies</h2>

      <p className=" mb-4">Utilizamos dois tipos de cookies:</p>

      <ul className=" mb-4">
        <li><strong>Essenciais</strong>: necessários para autenticação e funcionamento do Serviço
          (ex.: cookie de sessão do NextAuth). Não requerem consentimento.</li>
        <li><strong>Opcionais</strong>: analytics ou rastreamento, quando configurados. Requerem
          consentimento explícito.</li>
      </ul>

      <p className=" mb-10">Você pode gerenciar suas preferências de cookies a qualquer momento no banner de consentimento.</p>


      <h2 className=" mb-2">IX. Controlador e Encarregado (DPO)</h2>

      <p className=" mb-4">
        Controlador dos dados: <strong>[NOME DA EMPRESA]</strong>, CNPJ [XX.XXX.XXX/XXXX-XX],
        com sede em [ENDEREÇO COMPLETO].
      </p>

      <p className=" mb-10">
        Encarregado (DPO): [NOME DO ENCARREGADO] -{" "}
        <a href="mailto:privacidade@exemplo.com.br">privacidade@exemplo.com.br</a>
      </p>


      <h2 className=" mb-2">X. Alterações nesta Política</h2>

      <p className=" mb-10">
        Podemos atualizar esta Política periodicamente. Notificaremos por e-mail ou aviso
        no Serviço em caso de alterações relevantes. O uso continuado após as alterações
        indica aceitação da nova versão.
      </p>
    </article>
  )
}
