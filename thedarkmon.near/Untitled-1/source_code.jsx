return <div>Hello World</div>;
import java.util.Scanner;
import java.util.Random;
ublic class RockPaperScissors {
    public static void main(String[] args) {
        String[] options = { "камень", "ножницы", "бумага" };
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();

        System.out.println("Добро пожаловать в игру 'Камень, ножницы, бумага'!");

        while (true) {
            // Пользователь делает выбор
            System.out.print("Выберите: камень, ножницы или бумага (для выхода введите 'выход'): ");
            String playerChoice = scanner.nextLine().toLowerCase();

            if (playerChoice.equals("выход")) {
                break;
            }

            if (!playerChoice.equals("камень") && !playerChoice.equals("ножницы") && !playerChoice.equals("бумага")) {
                System.out.println("Неверный выбор! Попробуйте еще раз.");
                continue;
            }

            // Компьютер делает выбор
            int computerChoiceIndex = random.nextInt(3);
            String computerChoice = options[computerChoiceIndex];

            System.out.println("Ваш выбор: " + playerChoice);
            System.out.println("Выбор компьютера: " + computerChoice);

            // Определение победителя
            if (playerChoice.equals(computerChoice)) {
                System.out.println("Ничья!");
            } else if ((playerChoice.equals("камень") && computerChoice.equals("ножницы")) ||
                    (playerChoice.equals("ножницы") && computerChoice.equals("бумага")) ||
                    (playerChoice.equals("бумага") && computerChoice.equals("камень"))) {
                System.out.println("Вы победили!");
            } else {
                System.out.println("Компьютер победил!");
            }

            System.out.println();
        }

        scanner.close();
    }
}
