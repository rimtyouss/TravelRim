package ProyectoFinalPAT.TravelRim.Usuario.Repositorio;

import ProyectoFinalPAT.TravelRim.Usuario.Entidad.Usuario;
import org.springframework.data.repository.CrudRepository;

public interface UsuarioRepositorio extends CrudRepository<Usuario, Long> {

    Usuario findByEmail(String email);



}