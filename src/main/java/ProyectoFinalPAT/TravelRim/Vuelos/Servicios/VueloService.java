package ProyectoFinalPAT.TravelRim.Vuelos.Servicios;


import ProyectoFinalPAT.TravelRim.Vuelos.Entidad.Vuelos;
import ProyectoFinalPAT.TravelRim.Vuelos.Repositorio.VueloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class VueloService {

    @Autowired
    private VueloRepository repoVuelos;
    

    public Vuelos obtenerVueloPorId(Long vueloId)
    {
        Optional<Vuelos> vuelo = repoVuelos.findById(vueloId);
        return vuelo.get();
    }

    public Vuelos actualizarVuelo(Long id,Vuelos vueloActualizado) {
        Vuelos vueloExistente = repoVuelos.findById(id).orElse(null);
        if (vueloExistente != null) {
            // Actualiza los detalles del vuelo con los valores del vueloActualizado
            vueloExistente.setOrigen(vueloActualizado.getOrigen());
            vueloExistente.setDestino(vueloActualizado.getDestino());
            vueloExistente.setFechaIda(vueloActualizado.getFechaIda());
            vueloExistente.setFechaVuelta(vueloActualizado.getFechaVuelta());
            vueloExistente.setPrecio(vueloActualizado.getPrecio());

            return repoVuelos.save(vueloExistente);
        } else {
            throw new NoSuchElementException("No se encontró el vuelo con el ID: " + id);
        }
    }



//busqueda de vuelos :
    public List<Vuelos> findVuelos(String origen, String destino, LocalDate fechaIda, LocalDate fechaRegreso,Double precio) {
        return repoVuelos.findVuelos(origen, destino, fechaIda, fechaRegreso,precio);
    }

    public List<Vuelos> findVuelosByOrigen(String origen) {
        return repoVuelos.findByOrigen(origen);
    }

    public List<Vuelos> findVuelosByDestino(String destino) {
        return repoVuelos.findByDestino(destino);
    }

    public List<Vuelos> findVuelosByFechaIda(LocalDate fechaIda) {
        return repoVuelos.findByFechaIda(fechaIda);
    }

    public List<Vuelos> findVuelosByFechaVuelta(LocalDate fechaVuelta) {
        return repoVuelos.findByFechaVuelta(fechaVuelta);
    }

    public List<Vuelos> findVuelosByPrecio(Double precio) {
        return repoVuelos.findByPrecio(precio);
    }
}
