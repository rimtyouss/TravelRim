package ProyectoFinalPAT.TravelRim.Carrito.Entidad;

import jakarta.persistence.*;

@Entity
public class Carrito {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email_usuario")
    private String emailUsuario;

    @Column(name = "coche_reservado")
    private String cocheReservado;

    @Column(name = "vuelo_reservado")
    private String vueloReservado;

    @Column(name = "hotel_reservado")
    private String hotelReservado;

    @Column(name = "precio_total")
    private Long precioTotal;


    public Long getId() {

        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmailUsuario() {
        return emailUsuario;
    }

    public void setEmailUsuario(String emailUsuario) {
        this.emailUsuario = emailUsuario;
    }

    public String getCocheReservado() {
        return cocheReservado;
    }

    public void setCocheReservado(String cocheReservado) {
        this.cocheReservado = cocheReservado;
    }

    public String getVueloReservado() {
        return vueloReservado;
    }

    public void setVueloReservado(String vueloReservado) {
        this.vueloReservado = vueloReservado;
    }

    public String getHotelReservado() {
        return hotelReservado;
    }

    public void setHotelReservado(String hotelReservado) {
        this.hotelReservado = hotelReservado;
    }

    public Long getPrecioTotal() {
        return precioTotal;
    }

    public void setPrecioTotal(Long precioTotal) {
        this.precioTotal = precioTotal;
    }
}
























/*
package ProyectoFinalPAT.TravelRim.Carrito.Entidad;

import ProyectoFinalPAT.TravelRim.Coche.Entidad.Coche;
import ProyectoFinalPAT.TravelRim.Hotel.Entidad.Hotel;
import ProyectoFinalPAT.TravelRim.Usuario.Entidad.Usuario;
import ProyectoFinalPAT.TravelRim.Vuelos.Entidad.Vuelos;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Carrito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long Id;
    @OneToOne
    @JoinColumn(name = "USUARIO_EMAIL")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "vuelo_id")
    private Vuelos vuelo;

    @ManyToMany
    @JoinTable(
            name = "carrito_vuelos",
            joinColumns = @JoinColumn(name = "carrito_id"),
            inverseJoinColumns = @JoinColumn(name = "vuelo_id")
    )
    private List<Vuelos> vuelos = new ArrayList<>();

    public List<Vuelos> getVuelos() {
        return vuelos;
    }

    public void setVuelos(List<Vuelos> vuelos) {
        this.vuelos = vuelos;
    }

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    @ManyToMany
    @JoinTable(
            name = "carrito_hoteles",
            joinColumns = @JoinColumn(name = "carrito_id"),
            inverseJoinColumns = @JoinColumn(name = "hotel_id")
    )
    private List<Hotel>  hoteles = new ArrayList<>();


    @ManyToOne
    @JoinColumn(name = "coche_id")
    private Coche coche;

    public Vuelos getVuelo() {
        return vuelo;
    }

    public List<Hotel> getHoteles() {
        return hoteles;
    }

    public void setHoteles(List<Hotel> hoteles) {
        this.hoteles = hoteles;
    }

    public void setVuelo(Vuelos vuelo) {
        this.vuelo = vuelo;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public Coche getCoche() {
        return coche;
    }

    public void setCoche(Coche coche) {
        this.coche = coche;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

}
 */
