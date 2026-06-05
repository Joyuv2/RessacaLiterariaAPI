import Link from 'next/link';
import { useRouter } from 'next/router';

export default function BarraLateral({ usuario, aoSair }) {
  const router = useRouter();
  const abaAtual = router.query.aba || 'perfil';

  const itens = [
    { nome: 'Minhas Informações', aba: 'perfil' },
    { nome: 'Alterar senha', aba: 'senha' },
    { nome: 'Notificações', aba: 'notificacoes' },
    { nome: 'Privacidade', aba: 'privacidade' },
  ];

  return (
    <aside>
      <h3>Meu perfil</h3>
      <div>
        <strong>{usuario?.nome}</strong>
        <br />
        {usuario?.email}
      </div>
      <nav>
        {itens.map((item) => (
          <Link key={item.aba} href={`/dashboard?aba=${item.aba}`}>
            {item.nome}
          </Link>
        ))}
      </nav>
      <button onClick={aoSair}>Sair da Conta</button>
    </aside>
  );
}
