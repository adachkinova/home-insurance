package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailSenderService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String toEmail, String subject, String code, String firstName) {

        MimeMessage message = mailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom("homeSafe@gmail.com");
            helper.setTo(toEmail);
            helper.setSubject(subject);

            String htmlContent = "<html><body>"
                    + "<h2 style='color: #333;'>Здравейте, " + firstName + "!</h2>"
                    + "<p style='font-size: 16px;'>Вашият код за достъп до системата е:</p>"
                    + "<div style='background-color: #f2f2f2; padding: 10px; font-size: 20px; font-weight: bold; color: #4CAF50;'>"  // Зелено за кода
                    + code
                    + "</div>"
                    + "<p style='font-size: 16px;'>Моля, използвайте този код, за да завършите процеса на влизане в нашата система. Ако не сте извършили заявка, просто игнорирайте този имейл.</p>"
                    + "<br>"
                    + "<p style='font-size: 14px;'>Поздрави,</p>"
                    + "<p style='font-size: 14px;'>Екипът на HomeSafe</p>"
                    + "</body></html>";

            helper.setText(htmlContent, true);

            mailSender.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}

