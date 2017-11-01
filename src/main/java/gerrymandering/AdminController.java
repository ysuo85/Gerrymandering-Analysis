package gerrymandering;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * Created by yisuo on 10/30/17.
 */
@Controller
public class AdminController {
    @RequestMapping("/")
    public String root() {
        return "redirect:/index";
    }

    @RequestMapping("/index")
    public String index() {
        return "indexView";
    }

//    @RequestMapping("/user/index")
//    public String userIndex() {
//        return "index";
//    }

    @RequestMapping("/login")
    public String login(){
        return "loginView";
    }

    @RequestMapping("/login-error")
    public String loginError(Model model) {
        model.addAttribute("loginError", true);
        return "loginView";
    }
}
