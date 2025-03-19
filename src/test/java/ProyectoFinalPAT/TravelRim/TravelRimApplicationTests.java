package ProyectoFinalPAT.TravelRim;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.junit.jupiter.api.Assertions;

import java.util.List;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@AutoConfigureTestDatabase
class TravelRimApplicationTests {

	private final TestRestTemplate restTemplate = new TestRestTemplate("admin@gmail.com", "admin");

	@Test
	public void buscarVueloPorDestino()
	{
	}
}
