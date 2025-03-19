package ProyectoFinalPAT.TravelRim.Carrito.Controller;

import ProyectoFinalPAT.TravelRim.Carrito.Entidad.Carrito;
import ProyectoFinalPAT.TravelRim.Carrito.Servicios.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
public class CarritoController {
    @Autowired
    private CarritoService carritoService;

    @PostMapping("/guardar_carrito")
    public ResponseEntity<String> guardarCarrito(@RequestBody Carrito carrito) {
        Carrito carritoGuardado = carritoService.guardarCarrito(carrito);
        if (carritoGuardado != null) {
            return ResponseEntity.ok("Carrito guardado correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar el carrito");
        }

    }

    @GetMapping("/reservas")
    public List<Carrito> reservas() {
        return carritoService.reservas();
    }

}

