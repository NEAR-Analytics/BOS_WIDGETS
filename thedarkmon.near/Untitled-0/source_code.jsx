return <div>Hello World</div>;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
public class TwoButtonsExample {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Пример двух кнопок");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(new FlowLayout());

        // Создание первой кнопки
        JButton button1 = new JButton("Кнопка 1");
        button1.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                JOptionPane.showMessageDialog(null, "Вы нажали кнопку 1!");
            }
        });
        frame.add(button1);

        // Создание второй кнопки
        JButton button2 = new JButton("Кнопка 2");
        button2.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                JOptionPane.showMessageDialog(null, "Вы нажали кнопку 2!");
            }
        });
        frame.add(button2);

        frame.pack();
        frame.setVisible(true);
    }
}
