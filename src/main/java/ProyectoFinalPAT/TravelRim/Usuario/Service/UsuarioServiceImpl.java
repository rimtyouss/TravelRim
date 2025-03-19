package ProyectoFinalPAT.TravelRim.Usuario.Service;


import ProyectoFinalPAT.TravelRim.Usuario.Repositorio.RoleRepository;
import ProyectoFinalPAT.TravelRim.Usuario.Repositorio.UsuarioRepositorio;
import ProyectoFinalPAT.TravelRim.Usuario.Entidad.Role;
import ProyectoFinalPAT.TravelRim.Usuario.Entidad.Usuario;
import ProyectoFinalPAT.TravelRim.Usuario.Entidad.UsuarioDto;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    @Autowired
    private UsuarioRepositorio userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;

    public UsuarioServiceImpl(UsuarioRepositorio userRepository,
                           RoleRepository roleRepository,
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }


    //necesito un rol ADMIN para que el solo pueda ver los usuarios registrados y procesar las reservas
    @PostConstruct
    public void crearAdmin() {

        Role adminRole = roleRepository.findByName("ROLE_ADMIN");

        Usuario adminUser = userRepository.findByEmail("admin@gmail.com");
        if (adminUser == null) {
            adminUser = new Usuario();
            adminUser.setName("admin");
            adminUser.setEmail("admin@gmail.com");
            adminUser.setPassword(passwordEncoder.encode("admin"));
            adminUser.setRoles(Arrays.asList(adminRole));
            userRepository.save(adminUser);
        }
    }

    @Override
    public void saveUser(UsuarioDto userDto) {
        Usuario user = new Usuario();
        user.setName(userDto.getFirstName() + " " + userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        Role role = roleRepository.findByName("ROLE_ADMIN");
        if(role == null){
            role = checkRoleExist();
        }
        user.setRoles(Arrays.asList(role));
        userRepository.save(user);
    }

    @Override
    public Usuario findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public List<UsuarioDto> findAllUsers() {
        List<Usuario> users = (List<Usuario>) userRepository.findAll();
        return users.stream()
                .map((user) -> mapToUserDto(user))
                .collect(Collectors.toList());
    }

    private UsuarioDto mapToUserDto(Usuario user){
        UsuarioDto userDto = new UsuarioDto();
        String[] str = user.getName().split(" ");
        userDto.setFirstName(str[0]);
        if (str.length > 1) {
            userDto.setLastName(str[1]);
        } else {
            userDto.setLastName("");
        }
        userDto.setEmail(user.getEmail());
        return userDto;
    }


    private Role checkRoleExist(){
        Role role = new Role();
        role.setName("ROLE_ADMIN");
        return roleRepository.save(role);
    }
}