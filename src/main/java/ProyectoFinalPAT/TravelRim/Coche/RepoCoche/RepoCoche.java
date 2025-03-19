package ProyectoFinalPAT.TravelRim.Coche.RepoCoche;

import ProyectoFinalPAT.TravelRim.Coche.Entidad.Coche;
import ProyectoFinalPAT.TravelRim.Hotel.Entidad.Hotel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RepoCoche extends CrudRepository<Coche,Long> {
}

