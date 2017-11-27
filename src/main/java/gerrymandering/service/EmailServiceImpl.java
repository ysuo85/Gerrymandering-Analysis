package gerrymandering.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@Service("mailService")
public class EmailServiceImpl
{
    @Autowired
    private MailSender mailSender;

    public void sendEmail(SimpleMailMessage message)
    {
        mailSender.send(message);
    }
    public void sendInvite(String email){

    }

    public void sendNotification(String email, String notification){

    }
}
