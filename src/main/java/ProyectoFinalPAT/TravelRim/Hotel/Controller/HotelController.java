package ProyectoFinalPAT.TravelRim.Hotel.Controller;

import ProyectoFinalPAT.TravelRim.Hotel.Entidad.Hotel;
import ProyectoFinalPAT.TravelRim.Hotel.RepoHotel.RepoHotel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/hoteles")
public class HotelController {

    @Autowired
    RepoHotel hotelRepository;

    @PostMapping("/reservar")
    public ResponseEntity<Hotel> reservarHotel(@RequestBody Hotel hotel) {
        hotelRepository.save(hotel);
        return new ResponseEntity<>(hotel, HttpStatus.CREATED);
    }
}
