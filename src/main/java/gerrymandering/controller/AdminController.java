package gerrymandering.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

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

    @RequestMapping("/login")
    public String login(){
        return "loginView";
    }
}
