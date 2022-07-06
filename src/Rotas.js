import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import Login from './view/Login';
import CadastroUsuario from './view/CadastroUsuario';
import Home from './view/Home';
import ConsultaLancamentos from './view/Lancamentos/ConsultaLancamentos';
import CadastroLancamentos from './view/Lancamentos/CadastroLancamentos';
import { AuthConsumer } from './ProvedorAutentificacao';
import AuthService from './service/AuthService';

function RotaAutenticada({ component: Component, ...props }) {
	return (
		<Route
			{...props}
			render={(componentProps) => {
				if (AuthService.isUsuarioAutenticado()) {
					return <Component {...componentProps} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: "/login",
								state: { from: componentProps.location },
							}}
						/>
					);
				}
			}}
		/>
	);
}

export default function Rotas(props) {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/cadastro-usuario" component={CadastroUsuario}/>

        <RotaAutenticada path="/home" component={Home}/>
        <RotaAutenticada path="/consulta-lancamentos" component={ConsultaLancamentos}/>
        <RotaAutenticada path="/cadastro-lancamentos/:id?" component={CadastroLancamentos}/>
      </Switch>
    </BrowserRouter>
  )
}

// export default () => (
//   <AuthConsumer>
//     {(context) => ( <Rotas isUsuarioAutenticado={context.isAutenticado}/> )}
//   </AuthConsumer>
// )
