package ProyectoFinalPAT.TravelRim.Hotel.Entidad;

import jakarta.persistence.*;

@Entity
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "hotel_name")
    public String hotelName;

    @Column(name = "hotel_city")
    public String hotelCity;

    @Column(name = "hotel_checkin")
    public String hotelCheckin;
    @Column(name = "hotel_checkout")
    public String hotelCheckout;

    @Column(name = "url")
    public String url;

    public String getHotelName() {
        return hotelName;
    }

    public void setHotelName(String hotelName) {
        this.hotelName = hotelName;
    }

    public String getHotelCity() {
        return hotelCity;
    }

    public void setHotelCity(String hotelCity) {
        this.hotelCity = hotelCity;
    }

    public String getHotelCheckin() {
        return hotelCheckin;
    }

    public void setHotelCheckin(String hotelCheckin) {
        this.hotelCheckin = hotelCheckin;
    }

    public String getHotelCheckout() {
        return hotelCheckout;
    }

    public void setHotelCheckout(String hotelCheckout) {
        this.hotelCheckout = hotelCheckout;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }



}