package gerrymandering.service;

/**
 * Created by yisuo on 11/9/17.
 */
public interface EmailService {
    public void sendInvite(String email);

    public void sendNotification(String email, String notification);
}
