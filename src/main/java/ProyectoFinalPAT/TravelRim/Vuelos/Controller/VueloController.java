package ProyectoFinalPAT.TravelRim.Vuelos.Controller;


import ProyectoFinalPAT.TravelRim.Vuelos.Entidad.Vuelos;
import ProyectoFinalPAT.TravelRim.Vuelos.Repositorio.VueloRepository;
import ProyectoFinalPAT.TravelRim.Vuelos.Servicios.VueloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
public class VueloController {
    @Autowired
    private VueloService vueloService;

    @Autowired
    VueloRepository repoVuelo;

    //peticiones de busqueda
    @GetMapping("vuelos/buscar_vuelos")
    public List<Vuelos> getAllVuelos(
            @RequestParam(required = false) String origen,
            @RequestParam(required = false) String destino,
            @RequestParam(required = false) LocalDate fechaIda,
            @RequestParam(required = false) LocalDate fechaVuelta,
            @RequestParam(required=false) Double precio)
    {
        return vueloService.findVuelos(origen,destino,fechaIda,fechaVuelta,precio);
    }

    @GetMapping("/listaVuelos")
    public Iterable<Vuelos> listaVuelos() {
        return repoVuelo.findAll();
    }

    @DeleteMapping("/borrarvuelo/{id}")
    public void borrarVuelo(@PathVariable Long id) {
        repoVuelo.deleteById(id);
    }

    @PutMapping("/editarvuelos/{id}")
    public Vuelos actualizarVuelo(@PathVariable Long id, @RequestBody Vuelos vueloActualizado) {
        return vueloService.actualizarVuelo(id,vueloActualizado);
    }

    @PostMapping("/vuelos")
    @ResponseStatus(HttpStatus.CREATED)
    public Vuelos crearVuelo(@RequestBody Vuelos vueloNuevo) {
        return repoVuelo.save(vueloNuevo);
    }

    @GetMapping("vuelos/buscar_por_origen")
    public List<Vuelos> getVuelosByOrigen(@RequestParam String origen) {
        return vueloService.findVuelosByOrigen(origen);
    }

    @GetMapping("vuelos/buscar_por_destino")
    public List<Vuelos> getVuelosByDestino(@RequestParam String destino) {
        return vueloService.findVuelosByDestino(destino);
    }

    @GetMapping("vuelos/buscar_por_fecha_ida")
    public List<Vuelos> getVuelosByFechaIda(@RequestParam LocalDate fechaIda) {
        return vueloService.findVuelosByFechaIda(fechaIda);
    }

    @GetMapping("vuelos/buscar_por_fecha_vuelta")
    public List<Vuelos> getVuelosByFechaVuelta(@RequestParam LocalDate fechaVuelta) {
        return vueloService.findVuelosByFechaVuelta(fechaVuelta);
    }

    @GetMapping("vuelos/buscar_por_precio")
    public List<Vuelos> getVuelosByPrecio(@RequestParam Double precio) {
        return vueloService.findVuelosByPrecio(precio);
    }

    @DeleteMapping("/vuelo/{origen}")
    public void borrarVueloOrigen(@PathVariable String origen)
    {
        repoVuelo.borraPorOrigen(origen);
    }

    @DeleteMapping("/vuelo/{destino}")
    public void borrarVueloDestino(@PathVariable String destino)
    {
        repoVuelo.borraPorDestino(destino);
    }

    @DeleteMapping("/vuelo/{fechaIda}")
    public void borrarVueloFechaIda(@PathVariable LocalDate fechaIda)
    {
        repoVuelo.borraPorFechaIda(fechaIda);
    }

    @DeleteMapping("/vuelo/{fechaVuelta}")
    public void borrarVueloFechaVuelta(@PathVariable LocalDate fechaVuelta)
    {
        repoVuelo.borraPorFechaVuelta(fechaVuelta);
    }
}