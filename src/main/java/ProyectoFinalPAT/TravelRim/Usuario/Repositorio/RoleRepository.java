package ProyectoFinalPAT.TravelRim.Usuario.Repositorio;

import ProyectoFinalPAT.TravelRim.Usuario.Entidad.Role;
import org.springframework.data.repository.CrudRepository;

public interface RoleRepository extends CrudRepository<Role, Long> {

    Role findByName(String name);



}