package ProyectoFinalPAT.TravelRim.Vuelos.Entidad;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Vuelos {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long ID;

    @Column(name="origen")
    public String origen;

    @Column(name="destino")
    public String destino;

    @Column(name="fechaIda")
    public LocalDate fechaIda;

    @Column(name="fechaVuelta")
    public LocalDate fechaVuelta;

    @Column(name="precio")
    public Double precio;

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public String getOrigen() {
        return origen;
    }

    public void setOrigen(String origen) {
        this.origen = origen;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public LocalDate getFechaIda() {
        return fechaIda;
    }

    public void setFechaIda(LocalDate fechaIda) {
        this.fechaIda = fechaIda;
    }

    public LocalDate getFechaVuelta() {
        return fechaVuelta;
    }

    public void setFechaVuelta(LocalDate fechaVuelta) {
        this.fechaVuelta = fechaVuelta;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }
}
