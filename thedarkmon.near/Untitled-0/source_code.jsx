return <div>Hello World</div>;
import java.util.Timer;
import java.util.TimerTask;
public class AlarmClock {
    public static void main(String[] args) {
        Timer timer = new Timer();
        int seconds = 10; // Время до срабатывания будильника (в секундах)

        System.out.println("Будильник установлен на через " + seconds + " секунд.");

        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                System.out.println("Сработал будильник! Проснитесь!");
                // Здесь можно добавить нужные действия, выполняемые при срабатывании будильника
            }
        }, seconds * 1000); // Переводим время в миллисекунды

        // Пауза для предотвращения завершения программы
        try {
            Thread.sleep((seconds + 1) * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        timer.cancel(); // Отменяем таймер после срабатывания будильника
    }
}
