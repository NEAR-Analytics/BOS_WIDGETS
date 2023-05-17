return <div>Hello World</div>;
import java.util.Random;
import java.util.Scanner;

public class GuessTheNumber {
    public static void main(String[] args) {
        Random random = new Random();
        int number = random.nextInt(100) + 1; // Загадываем число от 1 до 100
        int attempts = 0;
        boolean guessed = false;

        System.out.println("Добро пожаловать в игру 'Угадай число'!");

        Scanner scanner = new Scanner(System.in);

        while (!guessed) {
            System.out.print("Введите число: ");
            int guess = scanner.nextInt();
            attempts++;

            if (guess == number) {
                System.out.println("Поздравляю! Вы угадали число " + number + " с " + attempts + " попыток!");
                guessed = true;
            } else if (guess < number) {
                System.out.println("Загаданное число больше!");
            } else {
                System.out.println("Загаданное число меньше!");
            }
        }

        scanner.close();
    }
}
