export interface Testimonial {
  name: string;
  location: string;
  initial: string;
  color: string;
  text: string;
}

export const testimonials: Record<"en" | "uk", Testimonial[]> = {
  en: [
    {
      name: "Sarah M.",
      location: "New York",
      initial: "S",
      color: "bg-sun text-[#1E1044]",
      text: "I used to spend 20 minutes making up stories before bed. Now I just type a theme and it's done in seconds. My daughter thinks I'm a genius.",
    },
    {
      name: "James G.",
      location: "London",
      initial: "J",
      color: "bg-white/20 text-white",
      text: "We tried it as a joke during a long flight. Liam was so into his dragon story that he didn't even notice we'd landed.",
    },
    {
      name: "Rachel T.",
      location: "Toronto",
      initial: "R",
      color: "bg-white/20 text-white",
      text: "My twins each get their own story with their own name. No more arguing about whose turn it is — absolute game changer.",
    },
  ],
  uk: [
    {
      name: "Оксана М.",
      location: "Київ",
      initial: "О",
      color: "bg-sun text-[#1E1044]",
      text: "Донька відмовлялась лягати спати без казки. Тепер просто вводжу її ім'я і тему — і вона щаслива. Економить мені пів години щовечора.",
    },
    {
      name: "Тарас Г.",
      location: "Львів",
      initial: "Т",
      color: "bg-white/20 text-white",
      text: "Спробував під час поїздки до бабусі — син так захопився казкою про себе, що не питав «коли вже приїдемо» жодного разу.",
    },
    {
      name: "Катерина В.",
      location: "Харків",
      initial: "К",
      color: "bg-white/20 text-white",
      text: "У нас троє дітей. Раніше вигадувала казки сама і кожен хотів головним героєм себе. Тепер кожен отримує свою — і всі задоволені.",
    },
  ],
};
