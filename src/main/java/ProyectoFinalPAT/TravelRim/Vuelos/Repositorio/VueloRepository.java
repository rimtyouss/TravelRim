package ProyectoFinalPAT.TravelRim.Vuelos.Repositorio;

import ProyectoFinalPAT.TravelRim.Vuelos.Entidad.Vuelos;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface VueloRepository extends CrudRepository<Vuelos, Long> {


    @Transactional
    @Query("SELECT v FROM Vuelos v WHERE " +
            "(:origen IS NULL OR v.origen = :origen) AND " +
            "(:destino IS NULL OR v.destino = :destino) AND " +
            "(:fechaIda IS NULL OR v.fechaIda = :fechaIda) AND " +
            "(:fechaVuelta IS NULL OR v.fechaVuelta = :fechaVuelta) AND "+
            "(:precio IS NULL OR v.precio = :precio)")
    List<Vuelos> findVuelos(@Param("origen") String origen,
                                    @Param("destino") String destino,
                                    @Param("fechaIda") LocalDate fechaIda,
                                    @Param("fechaVuelta") LocalDate fechaVuelta,
                                    @Param("precio") Double precio);

    List<Vuelos> findByOrigen(String origen);
    List<Vuelos> findByDestino(String destino);
    List<Vuelos> findByFechaIda(LocalDate fechaIda);

    List<Vuelos> findByFechaVuelta(LocalDate fechaVuelta);
    List<Vuelos> findByPrecio(Double precio);

    Vuelos findById(long id);


    @Transactional
    @Modifying
    @Query("DELETE FROM Vuelos c WHERE c.origen = :origen")
    void borraPorOrigen(String origen);

    @Transactional
    @Modifying
    @Query("DELETE FROM Vuelos c WHERE c.destino = :destino")
    void borraPorDestino(String destino);

    @Transactional
    @Modifying
    @Query("DELETE FROM Vuelos c WHERE c.fechaIda = :fechaIda")
    void borraPorFechaIda(LocalDate fechaIda);

    @Transactional
    @Modifying
    @Query("DELETE FROM Vuelos c WHERE c.fechaVuelta = :fechaVuelta")
    void borraPorFechaVuelta(LocalDate fechaVuelta);






}
