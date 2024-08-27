import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SiteInstitucional from './pages/Site-institucional/site-institucional';
import { LoginPage } from './pages/Login/loginPage.jsx';
import { CadastroPage } from './pages/Cadastro/cadastroPage.jsx';
import { CadastroParqPage } from './pages/CadastroParq/CadastroParqPage';
import { RelatorioPage } from './pages/Relatorio/RelatorioPage';
import { HomePage } from './pages/Home/homePage';
import { RotinasSemanaisPage } from './pages/RotinasSemanais/RotinasSemanaisPage';
import { TreinoPage } from './pages/Treino/TreinoPage';
import { ExercicioPage } from './pages/Exercicio/ExercicioPage';
import { RefeicaoPage } from './pages/Refeicao/RefeicaoPage';
import { RefeicoesPage } from './pages/Refeicoes/RefeicoesPage';
import { BuscarPersonalPage } from './pages/BuscarPersonal/buscarPersonalPage.jsx';
import { ChatPage } from './pages/Chat/ChatPage';
import { MuralPage } from './pages/Mural/MuralPage';
import { PerfilPage } from './pages/Perfil/perfilPage.jsx';
import { PlanosPage } from './pages/Planos/planosPage.jsx';
import { HomePersonalPage } from './pages/HomePersonal/homePersonalPage.jsx';
import { PerfilPersonalPage } from './pages/PerfilPersonal/perfilPersonalPage.jsx';
import { ChatPersonalPage } from './pages/ChatPersonal/chatPersonalPage.jsx';
import { UserStorage } from './UserContext.jsx';
import { SiteInst } from './pages/Site-institucional/site-paralelo.jsx';

export function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <Routes>
          <Route path="/" element={<SiteInstitucional />} />
          <Route path="/site" element={<SiteInst />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="cadastro" element={<CadastroPage />} />
          <Route path="cadastroParq" element={<CadastroParqPage />} />
          <Route path="relatorio" element={<RelatorioPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="rotinas_semanais" element={<RotinasSemanaisPage />} />
          <Route path="rotinas_semanais" element={<RotinasSemanaisPage />} />
          <Route
            path="rotinas_semanais/diaria/:idRotinaDiaria"
            element={<TreinoPage />}
          />
          <Route
            path="rotinas_semanais/diaria/:idRotinaDiaria/exercicio/:idTreino"
            element={<ExercicioPage />}
          />
          <Route path="refeicoes/:idRefeicao" element={<RefeicaoPage />} />
          <Route path="refeicoes" element={<RefeicoesPage />} />
          <Route path="buscar-personal" element={<BuscarPersonalPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="mural" element={<MuralPage />} />
          <Route path="perfil" element={<PerfilPage />} />
          <Route path="planos" element={<PlanosPage />} />
          <Route path="home-personal" element={<HomePersonalPage />} />
          <Route path="perfil-personal" element={<PerfilPersonalPage />} />
          <Route path="chat-personal" element={<ChatPersonalPage />} />
          <Route path="*" element={<p>nao encontrada</p>} />
        </Routes>
      </UserStorage>
    </BrowserRouter>
  );
}
export default App;
