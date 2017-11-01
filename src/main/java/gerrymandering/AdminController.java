package gerrymandering;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletRequest;
import java.util.Map;

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
    public String login(ServletRequest request){
        return "loginView";
    }
}
