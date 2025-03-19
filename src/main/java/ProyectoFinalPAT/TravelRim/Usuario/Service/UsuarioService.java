package ProyectoFinalPAT.TravelRim.Usuario.Service;



import ProyectoFinalPAT.TravelRim.Usuario.Entidad.Usuario;
import ProyectoFinalPAT.TravelRim.Usuario.Entidad.UsuarioDto;

import java.util.List;

public interface UsuarioService {
    void saveUser(UsuarioDto userDto);

    Usuario findUserByEmail(String email);

    List<UsuarioDto> findAllUsers();



}