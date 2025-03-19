package ProyectoFinalPAT.TravelRim.Hotel.RepoHotel;

import ProyectoFinalPAT.TravelRim.Hotel.Entidad.Hotel;
import ProyectoFinalPAT.TravelRim.Vuelos.Entidad.Vuelos;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepoHotel extends CrudRepository<Hotel,Long> {

    Hotel findById(long id);

}

