package gerrymandering.controller;

import gerrymandering.model.Authorities;
import gerrymandering.model.User;
import gerrymandering.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.common.util.RandomValueStringGenerator;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.context.request.WebRequest;
import org.springframework.ui.Model;

import javax.servlet.http.HttpServletRequest;

@Controller
public class RegistrationController {

    @Autowired
    private PasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthoritiesService authoritiesService;

//    @Autowired
//    private EmailServiceImpl emailService;

    private RandomValueStringGenerator keyGenerator = new RandomValueStringGenerator();


    @RequestMapping(value = "/registration", method = RequestMethod.GET)
    public String showRegistrationForm(WebRequest request, Model model) {
        return "registration";
    }

    @RequestMapping(value = "/registrationSent", method = RequestMethod.GET)
    public String showRegistrationSet(WebRequest request, Model model) {
        return "registrationSent";
    }

    @RequestMapping(value = "/registrationSent", method = RequestMethod.POST)
    public String handleRegisterRedirect(ModelMap model){
        return "index";
    }

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public String handleRegisterRequest(ModelMap model,HttpServletRequest request,
                                        @RequestParam String username,
                                        @RequestParam String password,
                                        @RequestParam String passwordConfirm) {

        System.out.println(username);
        System.out.println(password);
        System.out.println(passwordConfirm);

        User userExists = userService.findByUsername(username);
        System.out.println(userExists);
        if(userExists == null){
            if(password.equals(passwordConfirm)){
                User user = new User();
                user.setUsername(username);
                user.setPassword(bCryptPasswordEncoder.encode(password));
                user.setEnabled(false);

                keyGenerator.setLength(40);
                user.setActivationKey(keyGenerator.generate());

                System.out.println("SAVING user to DB");
                userService.saveUser(user);

                Authorities authorities = new Authorities();
                authorities.setUserName(username);
                authorities.setRole("ROLE_ADVANCE");
                System.out.println("SAVING authorities to DB");
                authoritiesService.saveAuthorities(authorities);

                //sendEmail(user);

                return "registrationSent";
            }
        }

        return "registration";

    }

    public boolean sendEmail(User user){

        try{
            String subject = "Gerrymandering Analysis Registration Confirmation";
            String emailBody = "Click this link to activate your account";
            String link = "";

            SimpleMailMessage emailToSend = new SimpleMailMessage();
            emailToSend.setTo(user.getUsername());
            emailToSend.setSubject(subject);
            emailToSend.setText(emailBody + link);
            emailToSend.setFrom("registration@gerrymandering.com");

            //emailService.sendEmail(emailToSend);

        }catch (MailException ex){
            System.err.println(ex.getMessage());;
            return false;
        }

        return true;
    }

}
