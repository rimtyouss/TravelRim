package ProyectoFinalPAT.TravelRim.Usuario.Controller;

import ProyectoFinalPAT.TravelRim.Carrito.Repositorio.CarritoRepository;
import ProyectoFinalPAT.TravelRim.Usuario.Entidad.Usuario;
import ProyectoFinalPAT.TravelRim.Usuario.Entidad.UsuarioDto;
import ProyectoFinalPAT.TravelRim.Usuario.Repositorio.UsuarioRepositorio;
import ProyectoFinalPAT.TravelRim.Usuario.Service.UsuarioServiceImpl;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Controller
public class UsuarioController {



    @Autowired
    private UsuarioServiceImpl usuarioService;

    @Autowired
    private UsuarioRepositorio repoUsuario;

    @Autowired
    private CarritoRepository repoCarrito;

    @GetMapping("/carrito")
    public String Carrito() {
        return "carrito";
    }

    @GetMapping("/editarVuelos")
    public String editarVuelos() {
        return "editarVuelos";
    }


    @GetMapping("/usuario_actual")
    @ResponseBody
    public String getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (principal instanceof UserDetails) {
            return ((UserDetails)principal).getUsername();
        } else {
            return principal.toString();
        }
    }
    @GetMapping("/registro")
    public String registro(Model model){
        UsuarioDto user = new UsuarioDto();
        model.addAttribute("user", user);
        return "registro";
    }

    @GetMapping("/inicio")
    public String inicio(){
        return "inicio";
    }

    @GetMapping("/index")
    public String index() {
        return "index";
    }

    @GetMapping("/vuelos")
    public String vuelo(){
        return "vuelos";
    }
    @GetMapping("/hoteles")
    public String hoteles(){
        return "hoteles";
    }

    @GetMapping("/coche")
    public String coches(){
        return "coche";
    }


    @PostMapping("/registro/save")
    public String registration(@Valid @ModelAttribute("user") UsuarioDto userDto,
                               BindingResult result,
                               Model model){
        Usuario existingUser = usuarioService.findUserByEmail(userDto.getEmail());

        if(existingUser != null && existingUser.getEmail() != null && !existingUser.getEmail().isEmpty()){
            result.rejectValue("email", null,
                    "Ya existe una cuenta con el mismo email");
        }

        if(result.hasErrors()){
            model.addAttribute("user", userDto);
            return "/registro";
        }

        usuarioService.saveUser(userDto);
        return "redirect:/registro?success";
    }



    @GetMapping("/users")
    public String users(Model model){
        List<UsuarioDto> users = usuarioService.findAllUsers();
        model.addAttribute("users", users);
        return "users";
    }





}
