import React, { useContext } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Inicio from "./pages/Inicio";
import AsignarCita from "./pages/AsignarCita";
import Faq from "./pages/Ayuda/Faq";
// import Contactenos, { contactAction } from "./pages/Ayuda/Contactenos";
import Contactenos from "./pages/Ayuda/Contactenos"; // se cambió la anterior linea
import NotFound from "./pages/NotFound";
import RootLayout from "./layouts/RootLayout";
import HelpLayout from "./layouts/HelpLayout";
import PrivateRoute from "./components/PrivateRoute";
import Perfil from "./pages/Perfil";
import CitasAgendadas from "./pages/CitasAgendadas";
import LoginModal from "./components/Login";
import { AuthContext } from "./components/AuthContext";
import ForgotPassword from "./components/ForgotPassword"; // Importar la nueva página
import ResetPassword from "./components/ResetPassword"; // Importar la nueva página

const ShowLoginModal = ({ children }) => {
  const { showLoginModal } = useContext(AuthContext);
  return (
    <>
      {children}
      {showLoginModal && <LoginModal />}
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route
          index
          element={
            <ShowLoginModal>
              <Inicio />
            </ShowLoginModal>
          }
        />
        <Route
          path="AsignarCita"
          element={
            <PrivateRoute>
              <AsignarCita />
            </PrivateRoute>
          }
        />
        <Route path="Ayuda" element={<HelpLayout />}>
          <Route path="faq" element={<Faq />} />
          <Route path="contactenos" element={<Contactenos />} />
        </Route>
        <Route
          path="Perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />
        <Route
          path="CitasAgendadas"
          element={
            <PrivateRoute>
              <CitasAgendadas />
            </PrivateRoute>
          }
        />
        <Route path="forgot-password" element={<ForgotPassword/>} /> {/* Nueva ruta */}
        <Route path="reset-password" element={<ResetPassword/>} /> {/* Nueva ruta */}
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;