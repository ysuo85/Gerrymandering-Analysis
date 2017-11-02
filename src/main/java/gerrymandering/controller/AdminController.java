package gerrymandering.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.security.web.authentication.*;

/**
 * Created by yisuo on 10/30/17.
 */
@Controller
public class AdminController {
    @RequestMapping("/")
    public String root() {
        return "redirect:/www/index.html";
    }

    @RequestMapping("/www/")
    public String staticBase() {
        return "redirect:/www/index.html";
    }

    @RequestMapping("/index")
    public String index() {
        return "indexView";
    }

    @RequestMapping("/login")
    public String login(){
        return "adminLogin";
    }

    @RequestMapping("/admin")
    public String admin(){
        return "adminDashBoard";
    }

//    @RequestMapping("/logout")
//    public String logout() {
//        return "redirect:/www/index.html";
//    }
//

}
