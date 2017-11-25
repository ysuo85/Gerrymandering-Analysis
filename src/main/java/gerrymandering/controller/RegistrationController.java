package gerrymandering.controller;
import gerrymandering.model.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.WebRequest;
import org.springframework.ui.Model;

@Controller
public class RegistrationController {
    @RequestMapping(value = "/registration", method = RequestMethod.GET)
    public String showRegistrationForm(WebRequest request, Model model) {
        return "registration";
    }

    @RequestMapping(value = "/registrationSent", method = RequestMethod.GET)
    public String showRegistrationSet(WebRequest request, Model model) {
        return "registrationSent";
    }

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public String handleRegisterRequest(ModelMap model,
                                        @RequestParam String username,
                                        @RequestParam String password,
                                        @RequestParam String passwordConfirm) {
        User user = new User();
        
        System.out.println(username);
        System.out.println(password);
        System.out.println(passwordConfirm);
        return "registrationSent";
    }
}
