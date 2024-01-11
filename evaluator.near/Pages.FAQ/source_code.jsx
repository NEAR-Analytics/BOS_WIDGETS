const faqs = [
  { question: "Whats the cost of the program ?", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, cupiditate nesciunt placeat consequuntur sed quam animi aliquam autem est, nisi non! Expedita maxime veritatis soluta, mollitia dignissimos unde labore quam." },
  { question: "Do I have to be a developer to finish this program ?", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum incidunt hic alias reiciendis autem, distinctio praesentium, et qui eveniet odit sunt? Consequatur ipsum perferendis exercitationem eius nostrum numquam suscipit debitis!" },
  { question: "What is the time commitment ?", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum incidunt hic alias reiciendis autem, distinctio praesentium, et qui eveniet odit sunt? Consequatur ipsum perferendis exercitationem eius nostrum numquam suscipit debitis!" },
  { question: "Whats at the end of the program ?", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum incidunt hic alias reiciendis autem, distinctio praesentium, et qui eveniet odit sunt? Consequatur ipsum perferendis exercitationem eius nostrum numquam suscipit debitis!" },
  { question: "Can I get a job after this program ?", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum incidunt hic alias reiciendis autem, distinctio praesentium, et qui eveniet odit sunt? Consequatur ipsum perferendis exercitationem eius nostrum numquam suscipit debitis!" },
  { question: "Where can I get help if I get stuck ?", answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum incidunt hic alias reiciendis autem, distinctio praesentium, et qui eveniet odit sunt? Consequatur ipsum perferendis exercitationem eius nostrum numquam suscipit debitis!" },
];

return <>
  <h1 class="font-bold text-6xl">Frequently Asked Questions</h1>
  <div class="mt-2">
    <ul class="text-lg">
      {faqs.map(({ question, answer }) => {
        return (
          <li class="py-2">
            <h3 class="font-bold text-xl">{question}</h3>
            <p class="mt-1">{answer}</p>
          </li>
        )
      })}
    </ul>
  </div>
</>;
