package ProyectoFinalPAT.TravelRim.Carrito.Servicios;

import ProyectoFinalPAT.TravelRim.Carrito.Entidad.Carrito;
import ProyectoFinalPAT.TravelRim.Carrito.Repositorio.CarritoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarritoService {
    @Autowired
    private CarritoRepository repoCarrito;

    public Carrito guardarCarrito(Carrito carrito) {
        return repoCarrito.save(carrito);
    }

    public List<Carrito> reservas() {
        return (List<Carrito>) repoCarrito.findAll();
    }

}

