package ProyectoFinalPAT.TravelRim.Coche.Controller;

import ProyectoFinalPAT.TravelRim.Coche.Entidad.Coche;
import ProyectoFinalPAT.TravelRim.Coche.RepoCoche.RepoCoche;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/coche")
public class CocheController {

    @Autowired
    RepoCoche repoCoche;

    @PostMapping("/reservarCoche")
    public ResponseEntity<Coche> reservarCoche(@RequestBody Coche coche) {
        repoCoche.save(coche);
        return new ResponseEntity<>(coche, HttpStatus.CREATED);
    }
}
