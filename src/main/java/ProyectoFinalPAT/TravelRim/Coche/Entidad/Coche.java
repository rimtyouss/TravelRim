package ProyectoFinalPAT.TravelRim.Coche.Entidad;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Coche {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long Id;

    @Column(name = "marca")
    public String marca;

    @Column(name = "fechaInicio_Coche")
    public LocalDate fechaInicioCoche;

    @Column(name = "fechaFin_Coche")
    public LocalDate fechaFinCoche;

    @Column(name = "precioCoche_dia")
    public Double precioCocheDia;

    @Column(name = "precioCoche_total")
    public Double precioCocheTotal;




    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }


    public String getMarca() {
        return marca;
    }

    public void setMarca(String marca) {
        this.marca = marca;
    }


    public Double getPrecioCocheDia() {
        return precioCocheDia;
    }

    public void setPrecioCocheDia(Double precioCocheDia) {
        this.precioCocheDia = precioCocheDia;
    }

    public Double getPrecioCocheTotal() {
        return precioCocheTotal;
    }

    public void setPrecioCocheTotal(Double precioCocheTotal) {
        this.precioCocheTotal = precioCocheTotal;
    }



    public LocalDate getFechaInicioCoche() {
        return fechaInicioCoche;
    }

    public void setFechaInicioCoche(LocalDate fechaInicioCoche) {
        this.fechaInicioCoche = fechaInicioCoche;
    }

    public LocalDate getFechaFinCoche() {
        return fechaFinCoche;
    }

    public void setFechaFinCoche(LocalDate fechaFinCoche) {
        this.fechaFinCoche = fechaFinCoche;
    }



}
