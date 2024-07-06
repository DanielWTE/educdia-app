// const faqs = [
//   {
//     question: "Wie wird der Kurs abgehalten?",
//     answer:
//       "Du benötigst einen Nutzeraccount, um auf den Kurs zugreifen zu können. Der Kurs besteht aus 17 Themenbereichen und 192 Fragen. Du kannst die Fragen beantworten und erhältst sofort Feedback, ob die Antwort richtig oder falsch ist. Du kannst den Kurs jederzeit unterbrechen und später fortsetzen.",
//   },
//   {
//     question: "Wie lange dauert der Kurs?",
//     answer:
//       "Das hängt von dir ab. Du kannst den Kurs in deinem eigenen Tempo absolvieren. Es gibt keine zeitliche Begrenzung. Du kannst den Kurs jederzeit unterbrechen und später fortsetzen.",
//   },
//   {
//     question: "Wie kann ich mich registrieren?",
//     answer:
//       "Klicke auf den Button 'Registrieren' und folge den Anweisungen. Du kannst dich mit deinem Google Account oder mit GitHub registrieren.",
//   },
//   {
//     question: "Wie werden die Fragen gestellt?",
//     answer:
//       "Du hast 2 Möglichkeiten: Du kannst alle Fragen in einem Themenbereich beantworten oder du kannst dir zufällige Fragen aus allen Themenbereichen stellen lassen.",
//   },
//   {
//     question: "Was passiert, wenn ich den Kurs abgeschlossen habe?",
//     answer:
//       "Wenn du alle Fragen beantwortet hast, erhältst du eine Auswertung, die dir zeigt, wie viele Fragen du richtig beantwortet hast. Du kannst den Kurs beliebig oft wiederholen.",
//   },
//   {
//     question: "Was kostet der Kurs?",
//     answer:
//       "Der Kurs ist kostenlos. Du benötigst lediglich einen Nutzeraccount, um auf den Kurs zugreifen zu können.",
//   },
// ];

const faqs = [
  {
    question: "Was ist Educdia?",
    answer:
      "Bei Educdia handelt es sich um eine Plattform, die dir Zugriff auf verschiedene Online Kurse bietet, die du kostenlos absolvieren kannst.",
  },
  {
    question: "Wie kann ich mich registrieren?",
    answer:
      "Klicke auf den Button 'Registrieren' und folge den Anweisungen. Du kannst dich mit deinem Google Account oder mit GitHub registrieren.",
  },
  {
    question: "Was kosten die Kurse?",
    answer:
      "Die Kurse sind kostenlos. Du benötigst lediglich einen Nutzeraccount, um auf die Kurse zugreifen zu können.",
  },
];

export default function FaqComponent() {
  return (
    <div className="bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:pt-32 lg:px-8 lg:py-40">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
              Häufig gestellte Fragen
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600">
              Hier findest du Antworten auf die am häufigsten gestellten Fragen.
            </p>
          </div>
          <div className="mt-10 lg:col-span-7 lg:mt-0">
            <dl className="space-y-10">
              {faqs.map((faq: any) => (
                <div key={faq.question}>
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    {faq.question}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
