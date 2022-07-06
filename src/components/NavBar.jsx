import NavbarItem from "./NavItem";
import { AuthConsumer } from "../ProvedorAutentificacao";
import AuthService from "../service/AuthService";


export default function Navbar(props) {

  const isUsuarioAutenticado = () => {
    return AuthService.isUsuarioAutenticado();
  }

  const deslogar = () => {
    return AuthService.removerUsuarioAutenticado();
  }


    return (
      <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
        <div className="container">
          <a href="/home" className="navbar-brand">
            <i className="fa fa-bank fa-1x mx-1"></i>
            Minhas Finanças
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav">
              <NavbarItem render={isUsuarioAutenticado()} href="/home" label="Home" />
              <NavbarItem render={isUsuarioAutenticado()} href="/cadastro-usuario" label="Usuario" />
              <NavbarItem render={isUsuarioAutenticado()} href="/consulta-lancamentos" label="Lançamentos" />
              <NavbarItem render={isUsuarioAutenticado()} onClick={deslogar} href="/login" label="Sair" />
            </ul>
          </div>
        </div>
      </div>
    );
  }

// export default () => (
//   <AuthConsumer>
//     { (context) => ( <Navbar isUsuarioAutenticado={context.isAutenticado} deslogar={context.encerrarSessao}/>) }
//   </AuthConsumer>
// )

