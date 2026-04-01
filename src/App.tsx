import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, User, Briefcase, ClipboardList, Users,
  Sprout, Leaf, Flower2, TreeDeciduous, ArrowRight, Star, Mail, Phone, MapPin,
  ChevronLeft, ChevronRight, Linkedin, MessageCircle
} from 'lucide-react';

import logo from './assets/logo_transparent.png';
import peggy from './assets/peggy_new.png';
import peggy2 from './assets/peggy2.jpg';


const FadeIn = ({ children, delay = 0, className = "", ...props }: { children: React.ReactNode, delay?: number, className?: string } & React.HTMLAttributes<HTMLDivElement>) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 24 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position
      } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position
      } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position
      } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.04,
  }));
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="var(--color-brand)"
            strokeWidth={path.width}
            strokeOpacity={0.1 + path.id * 0.025}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.4, 0.8, 0.4],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 22 + path.id * 0.4,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex w-full justify-between items-center text-left focus:outline-none group gap-4"
      >
        <span className="text-xl font-serif text-gray-900 group-hover:text-[var(--color-brand)] transition-colors pr-4">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }} className="text-[var(--color-brand)] shrink-0">
          <ChevronRight size={24} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-gray-600 leading-relaxed text-lg">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showImpressum, setShowImpressum] = useState(false);
  const [showDatenschutz, setShowDatenschutz] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value || '';
    const topic = (form.querySelector('input[name="topic"]:checked') as HTMLInputElement)?.value || '';
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value || '';
    const subject = encodeURIComponent(`Anfrage: ${topic} – ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\nThema: ${topic}\n\nNachricht:\n${message}`);
    window.location.href = `mailto:hallo@peggy-coaching.de?subject=${subject}&body=${body}`;
    setFormStatus('sent');
    setTimeout(() => setFormStatus('idle'), 5000);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Angebot', href: '#angebot' },
    { name: 'Über mich', href: '#ueber-mich' },
    { name: 'Arbeitsweise', href: '#arbeitsweise' },
    { name: 'Prüfungsvorbereitung', href: '#pruefungsvorbereitung' },
    { name: 'Prozess', href: '#prozess' },
    { name: 'Stimmen', href: '#stimmen' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-cream)] text-[var(--color-ink)] font-sans selection:bg-[var(--color-brand)] selection:text-white">
      {/* Navigation */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="block">
            <img
              src={logo}
              alt="Wachstumswerk Logo"
              className={`w-auto object-contain origin-left transition-all duration-300 ${isScrolled ? 'h-12 md:h-14' : 'h-16 md:h-20'}`}
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium hover:text-[var(--color-brand)] transition-colors">
                {link.name}
              </a>
            ))}
            <a href="#kontakt" className="bg-[var(--color-brand)] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[var(--color-brand-light)] transition-colors">
              Erstgespräch
            </a>
          </nav>

          <button className="md:hidden text-[var(--color-ink)]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-xl font-serif">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="border-b border-gray-100 pb-4"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#kontakt"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[var(--color-brand)] text-white text-center px-6 py-4 rounded-full text-base font-sans font-medium mt-4"
              >
                Erstgespräch vereinbaren
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 md:pt-48 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0 z-0">
            <FloatingPaths position={1} />
            <FloatingPaths position={-1} />
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
            <FadeIn>
              <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-6 text-balance">
                Innere Führung stärken.<br />
                <span className="italic text-[var(--color-brand)]">Klarheit gewinnen.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
                Als freiberufliche Trainerin und Coach unterstütze ich Einzelpersonen, Teams und Auszubildende dabei, ihre Ziele klar zu definieren und Herausforderungen souverän zu meistern – mit praxisnahen Methoden, individueller Begleitung und einer wertschätzenden Haltung.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#kontakt" className="bg-[var(--color-brand)] text-white px-8 py-4 rounded-full text-center font-medium hover:bg-[var(--color-brand-light)] transition-colors">
                  Kostenloses Erstgespräch
                </a>
                <a href="#angebot" className="border border-[var(--color-brand)] bg-white text-[var(--color-brand)] px-8 py-4 rounded-full text-center font-medium hover:bg-[var(--color-brand)] hover:text-white transition-colors">
                  Mehr erfahren
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="relative">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative">
                <img
                  src={peggy}
                  alt="Portrait Peggy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[var(--color-sand)] rounded-full -z-10 blur-2xl opacity-60"></div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-[var(--color-brand)] rounded-full -z-10 blur-3xl opacity-20"></div>
            </FadeIn>
          </div>
        </section>

        {/* Angebot Section */}
        <section id="angebot" className="py-24 bg-white px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Mein Angebot</h2>
              <p className="text-gray-600 text-lg">Individuelle Begleitung für deine persönliche und berufliche Entwicklung.</p>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: <ClipboardList className="w-8 h-8" />,
                  title: "Prüfungsvorbereitung für Auszubildende",
                  desc: "Training & Beratung für Einzelpersonen, Gruppen von Auszubildenden und Unternehmen.",
                  items: ["Inhaltliche Vorbereitung für verschiedene Berufe", "Strukturelle Vorbereitung", "Prüfungsangst abbauen"]
                },
                {
                  icon: <User className="w-8 h-8" />,
                  title: "Einzelcoaching",
                  desc: "Persönliche 1:1-Begleitung für tiefgreifende Veränderungsprozesse.",
                  items: ["Standortbestimmung & Zielklärung", "Systeme, Methoden & Tools", "Neue Handlungsmuster entwickeln"]
                },
                {
                  icon: <Briefcase className="w-8 h-8" />,
                  title: "Business Coaching",
                  desc: "Für Führungskräfte und Unternehmer:innen, die bewusst führen wollen.",
                  items: ["Leadership-Entwicklung", "Entscheidungsfindung", "Work-Life-Integration"]
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Workshops",
                  desc: "Gruppensettings für Teams und Unternehmen.",
                  items: ["Teamdynamik verbessern", "Kommunikationstraining", "Selbstführung stärken"]
                }
              ].map((service, idx) => (
                <FadeIn key={idx} delay={idx * 0.1} className="bg-[var(--color-cream)] p-10 rounded-[2rem] hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[var(--color-brand)] mb-6 shadow-sm">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-serif mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.desc}</p>
                  <ul className="space-y-3">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm font-medium text-gray-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)] mt-2 shrink-0"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Über Mich Section */}
        <section id="ueber-mich" className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn className="order-2 md:order-1 relative">
              <div className="aspect-[3/4] rounded-full overflow-hidden max-w-md mx-auto relative">
                <img
                  src={peggy2}
                  alt="Peggy"
                  className="w-full h-full object-cover"
                />
              </div>
            </FadeIn>
            <FadeIn className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Über mich</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Meine berufliche Heimat ist die Hotellerie, meine Basis die klassische HR-Arbeit. 25 Jahre lang habe ich Auszubildende in gastgewerblichen Berufen vom ersten Tag bis zur Prüfung begleitet – und dabei erlebt, welchen Unterschied gezielte Begleitung und gute Prüfungsvorbereitung machen.
                </p>
                <p>
                  Im Mai 2025 habe ich meine Ausbildung als systemische Coach beim Ineko Institut in Köln abgeschlossen. Als Trainerin und Coach arbeite ich mit Menschen, die sich weiterentwickeln möchten – beruflich, persönlich oder in herausfordernden Lern- und Prüfungssituationen. Dabei ist mir besonders wichtig, einen Raum zu schaffen, in dem Vertrauen, Offenheit und echtes Verstehen möglich sind.
                </p>
                <p>
                  Seit 22 Jahren bin ich als ehrenamtliche IHK-Prüferin tätig und leite einen Prüfungsausschuss für Hotelfachleute in Köln. Trainings zur Prüfungsvorbereitung gebe ich seit 20 Jahren. Diesen Erfahrungsschatz möchte ich nutzen, um Auszubildende in verschiedenen Berufen zu unterstützen und Unternehmen zu helfen, eine wirkungsvolle Prüfungsvorbereitung zu etablieren.
                </p>
              </div>
              <a
                href="https://www.linkedin.com/company/wachstumswerk-coaching-i-training-i-pr%C3%BCfungsvorbereitung-f%C3%BCr-auszubildende/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 mt-8 bg-[#0A66C2] text-white px-6 py-3 rounded-full font-medium hover:bg-[#004182] transition-colors shadow-md hover:shadow-lg"
              >
                <Linkedin size={20} />
                Auf LinkedIn folgen
              </a>
            </FadeIn>
          </div>

          {/* Logo as section divider */}
          <FadeIn className="mt-20 flex justify-center">
            <img src={logo} alt="Wachstumswerk" className="h-40 md:h-52 w-auto opacity-80" />
          </FadeIn>
        </section>

        {/* Arbeitsweise Section */}
        <section id="arbeitsweise" className="py-24 bg-[var(--color-brand)] text-white px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Meine Arbeitsweise in der Prüfungsvorbereitung</h2>
              <p className="text-white/80 text-lg">Fundiert, individuell und auf Augenhöhe.</p>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
              {[
                {
                  num: "01",
                  title: "Strukturelle Vorbereitung",
                  desc: "Punkteverteilung und Aufbau einer schriftlichen IHK-Prüfung zu verstehen, baut eventuelle Ängste ab."
                },
                {
                  num: "02",
                  title: "Individuelles Lernen",
                  desc: "Ich hole dich da ab, wo du stehst und stelle mich auf deinen Lernstand ein."
                },
                {
                  num: "03",
                  title: "Prüferfahrung",
                  desc: "Meine jahrelange Erfahrung als Prüferin bei der IHK trägt dazu bei, dass ich die Schwerpunkte der schriftlichen Prüfung genau kenne."
                },
                {
                  num: "04",
                  title: "Nachhaltiges Lernen",
                  desc: "Lernen lebt von Wiederholung und Übung. Zwischen den Terminen biete ich eine individuelle Begleitung an."
                }
              ].map((method, idx) => (
                <FadeIn key={idx} delay={idx * 0.1} className="flex gap-6">
                  <div className="font-serif text-5xl md:text-6xl text-white/20 italic leading-none shrink-0">
                    {method.num}
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif mb-3">{method.title}</h3>
                    <p className="text-white/80 leading-relaxed">{method.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn className="mt-16 text-center">
              <a href="#kontakt" className="inline-block bg-white text-[var(--color-brand)] px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg">
                Jetzt Erstgespräch vereinbaren
              </a>
            </FadeIn>
          </div>
        </section>

        {/* Prüfungsvorbereitung Section */}
        <section id="pruefungsvorbereitung" className="py-24 px-6 md:px-12 bg-[var(--color-cream)]">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <FadeIn>
                <h2 className="text-4xl md:text-5xl font-serif mb-6">Prüfungsvorbereitung</h2>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    In der Prüfungsvorbereitung für Auszubildende erlebe ich immer wieder, wie viel Potenzial freigesetzt wird, wenn Wissen verständlich vermittelt, Strukturen klar werden und Selbstvertrauen wachsen darf. Mein Ziel ist es, nicht nur auf Prüfungen vorzubereiten, sondern Menschen zu stärken – fachlich und persönlich.
                  </p>
                  <p>
                    Auch in der Prüfungsvorbereitung arbeite ich wertschätzend, strukturiert und lösungsorientiert. Mit einem klaren Blick für individuelle Bedürfnisse und der Überzeugung, dass Entwicklung dann gelingt, wenn man sich gesehen und ernst genommen fühlt.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="bg-white p-10 rounded-[2rem] shadow-sm space-y-6">
                  {[
                    { label: "Verständliche Wissensvermittlung", desc: "Komplexe Inhalte einfach und nachvollziehbar aufbereitet" },
                    { label: "Klare Strukturen", desc: "Lernpläne und Prüfungsaufbau verständlich machen" },
                    { label: "Selbstvertrauen stärken", desc: "Prüfungsangst abbauen und innere Sicherheit aufbauen" },
                    { label: "Individuelle Begleitung", desc: "Auf persönliche Stärken und Schwerpunkte eingehen" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[var(--color-cream)] flex items-center justify-center text-[var(--color-brand)] shrink-0 mt-0.5">
                        <ClipboardList size={20} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-500 mt-0.5">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                  <a href="#kontakt" className="block text-center bg-[var(--color-brand)] text-white px-8 py-4 rounded-full font-medium hover:bg-[var(--color-brand-light)] transition-colors mt-4">
                    Jetzt Prüfungsvorbereitung anfragen
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Prozess Section */}
        <section id="prozess" className="py-24 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Dein Weg zu einer erfolgreichen schriftlichen Prüfung</h2>
              <p className="text-gray-600 text-lg">Strukturiertes & nachhaltiges Lernen.</p>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Connecting line for desktop */}
              <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gray-200"></div>

              {[
                { icon: <Sprout className="w-6 h-6" />, title: "Erstgespräch", desc: "Wir lernen uns unverbindlich kennen und klären dein Anliegen." },
                { icon: <Leaf className="w-6 h-6" />, title: "Kick-off", desc: "Tipps & Tricks zur Bewältigung einer IHK Prüfung." },
                { icon: <TreeDeciduous className="w-6 h-6" />, title: "Vorbereitungssessions", desc: "2–6 Termine zur Vorbereitung, Einzelcoaching bei Bedarf." },
                { icon: <Flower2 className="w-6 h-6" />, title: "Begleitung", desc: "Zwischen den Terminen biete ich Begleitung mit Materialien und Korrekturen an." }
              ].map((step, idx) => (
                <FadeIn key={idx} delay={idx * 0.1} className="relative z-10 text-center">
                  <div className="w-24 h-24 mx-auto bg-[var(--color-cream)] rounded-full flex items-center justify-center text-[var(--color-brand)] mb-6 shadow-sm border-4 border-white">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-serif mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="stimmen" className="py-24 px-6 md:px-12 bg-[var(--color-cream)]">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Stimmen</h2>
              <p className="text-gray-600 text-lg">Was Coachees über die Zusammenarbeit sagen.</p>
            </FadeIn>

            <div className="relative group">
              <button
                onClick={() => document.getElementById('testimonial-carousel')?.scrollBy({ left: -420, behavior: 'smooth' })}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[var(--color-brand)] z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>

              <div
                id="testimonial-carousel"
                className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar scroll-smooth w-full px-4"
              >
                {[
                  {
                    quote: "Dank des Coachings bei Peggy bin ich deutlich souveräner in mein Bewerbungsgespräch gegangen – und habe die Stelle bekommen! Peggys innovativer Ansatz war der Schlüssel für meinen lang ersehnten beruflichen Wechsel. Klare Empfehlung für alle, die sich beruflich neu orientieren möchten.",
                    name: "Rike",
                    role: "Coachee",
                    initials: "R"
                  },
                  {
                    quote: "Mit Peggys Prüfungsvorbereitung war es wirklich ein Kinderspiel, die Prüfung gut zu absolvieren. Sie hat sich individuell mit allen befasst und ist auf die Schwerpunkte der einzelnen super eingegangen. Danke nochmal dafür !",
                    name: "Pascal",
                    role: "Auszubildender",
                    initials: "P"
                  },
                  {
                    quote: "Das Coaching bei Dir war für mich unglaublich wertvoll. Ich habe mich von Anfang an sehr gesehen und sicher gefühlt. Besonders hilfreich war Deine ruhige, klare Art, die mir neue Perspektiven eröffnet hat.",
                    name: "Melanie",
                    role: "Coachee",
                    initials: "M"
                  },
                  {
                    quote: "Sehr professionelles und zielorientiertes Coaching. Klare Struktur, praxisnahe Impulse und sofort umsetzbare Strategien. Peggy hat mir sehr geholfen, durch gezielte Fragen genau das aus mir rauszuholen, um meinen Fokus zu schärfen. Klare Empfehlung.",
                    name: "Sabine",
                    role: "Coachee",
                    initials: "S"
                  }
                ].map((testimonial, idx) => (
                  <div key={idx} className="w-[85vw] md:w-[400px] shrink-0 snap-center">
                    <FadeIn delay={0} className="bg-white p-8 rounded-3xl shadow-sm flex flex-col h-full mx-auto">
                      <div className="flex gap-1 text-yellow-400 mb-6">
                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                      </div>
                      <p className="text-gray-700 italic mb-8 flex-grow">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[var(--color-sand)] flex items-center justify-center font-serif font-medium text-[var(--color-brand)]">
                          {testimonial.initials}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-500">{testimonial.role}</div>
                        </div>
                      </div>
                    </FadeIn>
                  </div>
                ))}
              </div>

              <button
                onClick={() => document.getElementById('testimonial-carousel')?.scrollBy({ left: 420, behavior: 'smooth' })}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[var(--color-brand)] z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </section>

        {/* Kontakt Section */}
        <section id="kontakt" className="py-24 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16">
              <FadeIn>
                <h2 className="text-4xl md:text-5xl font-serif mb-6">Lass uns sprechen</h2>
                <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                  Der erste Schritt ist oft der schwerste – aber auch der wichtigste. In einem kostenlosen Erstgespräch lernen wir uns kennen und schauen, ob wir zusammenpassen.
                </p>

                <div className="space-y-6 mb-12">
                  <div className="flex items-center gap-4 text-gray-700">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-cream)] flex items-center justify-center text-[var(--color-brand)] shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-0.5">E-Mail</div>
                      <a href="mailto:hallo@peggy-coaching.de" className="font-medium hover:text-[var(--color-brand)] transition-colors">hallo@peggy-coaching.de</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-700">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-cream)] flex items-center justify-center text-[var(--color-brand)] shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-0.5">Telefon</div>
                      <a href="tel:+4922112345678" className="font-medium hover:text-[var(--color-brand)] transition-colors">+49 221 123 456 78</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-gray-700">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-cream)] flex items-center justify-center text-[var(--color-brand)] shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-0.5">Standort</div>
                      <span className="font-medium">Köln & Online</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--color-cream)] p-8 rounded-3xl">
                  <h3 className="font-serif text-xl mb-4">So läuft das Erstgespräch ab:</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <ArrowRight size={18} className="text-[var(--color-brand)] mt-1 shrink-0" />
                      <span>15-20 Minuten kostenlos & unverbindlich</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight size={18} className="text-[var(--color-brand)] mt-1 shrink-0" />
                      <span>Wir sprechen über dein Anliegen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight size={18} className="text-[var(--color-brand)] mt-1 shrink-0" />
                      <span>Du erfährst, wie ich arbeite</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight size={18} className="text-[var(--color-brand)] mt-1 shrink-0" />
                      <span>Gemeinsam entscheiden wir über das weitere Vorgehen</span>
                    </li>
                  </ul>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <form className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100" onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/20 outline-none transition-all"
                        placeholder="Dein Name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">E-Mail</label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/20 outline-none transition-all"
                        placeholder="deine@email.de"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Wobei kann ich dich unterstützen?</label>
                      <div className="grid grid-cols-2 gap-3">
                        {['Innere Führung', 'Karriere', 'Klarheit finden', 'Anderes Thema'].map((topic) => (
                          <label key={topic} className="relative cursor-pointer">
                            <input type="radio" name="topic" value={topic} className="peer sr-only" defaultChecked={topic === 'Innere Führung'} />
                            <div className="px-4 py-3 rounded-xl border border-gray-200 text-center text-sm font-medium text-gray-600 peer-checked:border-[var(--color-brand)] peer-checked:bg-[var(--color-brand)]/5 peer-checked:text-[var(--color-brand)] transition-all hover:bg-gray-50">
                              {topic}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Deine Nachricht (optional)</label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:border-[var(--color-brand)] focus:ring-2 focus:ring-[var(--color-brand)]/20 outline-none transition-all resize-none"
                        placeholder="Erzähl mir kurz, worum es geht..."
                      ></textarea>
                    </div>

                    <button type="submit" className="w-full bg-[var(--color-brand)] text-white py-4 rounded-2xl font-medium hover:bg-[var(--color-brand-light)] transition-colors mt-4">
                      {formStatus === 'sent' ? '✓ E-Mail-Programm geöffnet!' : 'Nachricht senden'}
                    </button>
                    {formStatus === 'sent' && (
                      <p className="text-sm text-center text-[var(--color-brand)] mt-3">Bitte sende die vorbereitete E-Mail in deinem E-Mail-Programm ab.</p>
                    )}
                  </div>
                </form>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 px-6 md:px-12 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Häufige Fragen</h2>
              <p className="text-gray-600 text-lg">Alles was du vor deinem ersten Termin wissen solltest.</p>
            </FadeIn>
            
            <div className="space-y-2">
              {[
                {
                  q: "Wie läuft das kostenlose Erstgespräch ab?",
                  a: "Das etwa 15 bis 20-minütige Erstgespräch findet telefonisch oder per Video-Call statt. Wir lernen uns unverbindlich kennen, besprechen dein Anliegen und schauen gemeinsam, ob wir thematisch und persönlich zusammenpassen."
                },
                {
                  q: "Finden die Termine online oder vor Ort statt?",
                  a: "Ich biete sowohl Online-Termine über gängige Videoplattformen als auch persönliche Termine (z.B. in der Region Köln) an. Für Unternehmen und Gruppen komme ich auch gerne für Workshops direkt zu euch Inhouse."
                },
                {
                  q: "Wie lange dauert eine Prüfungsvorbereitung im Schnitt?",
                  a: "Das hängt stark vom individuellen Lernstand ab. Erfahrungsgemäß reichen meist 2 bis 6 gezielte Termine aus, um die nötige Struktur aufzubauen, fachliche Lücken zu schließen und Sicherheit sowie Selbstvertrauen für die Prüfung zu gewinnen."
                },
                {
                  q: "Übernimmt der Arbeitgeber die Kosten für das Coaching?",
                  a: "Einige Arbeitgeber übernehmen die Kosten für die Weiterentwicklung und besonders für die Prüfungsvorbereitung ihrer Mitarbeitenden oder Auszubildenden. Es lohnt sich meistens, diesbezüglich direkt beim Arbeitgeber nachzufragen! Gerne erstelle ich ein passendes Angebot für euer Unternehmen."
                },
                {
                  q: "Muss ich mich auf unser erstes Coaching vorbereiten?",
                  a: "Nein, eine spezielle Vorbereitung ist für den Start nicht nötig. Komm einfach unvoreingenommen mit deinem Thema und deiner Bereitschaft. Im Erstgespräch klären wir alles Weitere."
                }
              ].map((faq, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <FAQItem question={faq.q} answer={faq.a} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--color-ink)] text-white/80 pt-20 pb-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            {/* Brand */}
            <div className="space-y-6">
              <img
                src={logo}
                alt="Wachstumswerk Logo"
                className="h-16 w-auto object-contain brightness-0 invert opacity-90"
              />
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Innere Führung stärken, Klarheit gewinnen. Individuelle Begleitung für Einzelpersonen, Auszubildende und Teams.
              </p>
              <a href="https://www.linkedin.com/company/wachstumswerk-coaching-i-training-i-pr%C3%BCfungsvorbereitung-f%C3%BCr-auszubildende/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>

            {/* Kontakt */}
            <div>
              <h3 className="text-white font-medium mb-6">Kontakt</h3>
              <ul className="space-y-4 text-sm text-white/60">
                <li>
                  <a href="mailto:hallo@peggy-coaching.de" className="hover:text-white transition-colors">hallo@peggy-coaching.de</a>
                </li>
                <li>
                  <a href="tel:+4922112345678" className="hover:text-white transition-colors">+49 221 123 456 78</a>
                </li>
                <li>
                  Raum Köln/Bonn & Online
                </li>
              </ul>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-white font-medium mb-6">Navigation</h3>
              <ul className="space-y-4 text-sm text-white/60">
                <li><a href="#angebot" className="hover:text-white transition-colors">Angebot</a></li>
                <li><a href="#ueber-mich" className="hover:text-white transition-colors">Über mich</a></li>
                <li><a href="#pruefungsvorbereitung" className="hover:text-white transition-colors">Prüfungsvorbereitung</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Häufige Fragen</a></li>
              </ul>
            </div>

            {/* Rechtliches */}
            <div>
              <h3 className="text-white font-medium mb-6">Rechtliches</h3>
              <ul className="space-y-4 text-sm text-white/60">
                <li><button onClick={() => setShowImpressum(true)} className="hover:text-white transition-colors">Impressum</button></li>
                <li><button onClick={() => setShowDatenschutz(true)} className="hover:text-white transition-colors">Datenschutz</button></li>
              </ul>
            </div>
          </div>

          {/* Sub-Footer */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-white/40">
              &copy; 2026 Wachstumswerk. Alle Rechte vorbehalten.
            </div>
            <a href="https://rheindorf.digital" target="_blank" rel="noopener noreferrer" className="badge-rheindorf">
              <span className="badge-rheindorf__inner">
                <span className="badge-rheindorf__text">
                  <span className="badge-rheindorf__eyebrow">Made by</span>
                  <span className="badge-rheindorf__name">rheindorf<span>.digital</span></span>
                </span>
              </span>
              <span className="badge-rheindorf__tip" />
            </a>
          </div>
        </div>
      </footer>

      {/* Impressum Modal */}
      <AnimatePresence>
        {showImpressum && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowImpressum(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 md:p-12 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowImpressum(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
              <h2 className="text-3xl font-serif mb-8">Impressum</h2>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Angaben gemäß § 5 TMG</h3>
                  <p>Alexander Rheindorf<br />Pankratiusstraße 31<br />50129 Bergheim</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Kontakt</h3>
                  <p>E-Mail: <a href="mailto:alexander.rheindorf@aachen-blockchain.de" className="text-[var(--color-brand)] hover:underline">alexander.rheindorf@aachen-blockchain.de</a></p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
                  <p>Alexander Rheindorf<br />Pankratiusstraße 31<br />50129 Bergheim</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Haftungsausschluss</h3>
                  <h4 className="font-medium text-gray-800 mb-1">Haftung für Inhalte</h4>
                  <p className="text-sm">Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen.</p>
                  <h4 className="font-medium text-gray-800 mb-1 mt-4">Haftung für Links</h4>
                  <p className="text-sm">Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Urheberrecht</h3>
                  <p className="text-sm">Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Datenschutz Modal */}
      <AnimatePresence>
        {showDatenschutz && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowDatenschutz(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 md:p-12 relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDatenschutz(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X size={20} />
              </button>
              <h2 className="text-3xl font-serif mb-8">Datenschutzerklärung</h2>
              <div className="space-y-6 text-gray-700 leading-relaxed text-sm">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-base">1. Datenschutz auf einen Blick</h3>
                  <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-base">2. Allgemeine Hinweise und Pflichtinformationen</h3>
                  <h4 className="font-medium text-gray-800 mb-1">Datenschutz</h4>
                  <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
                  <h4 className="font-medium text-gray-800 mb-1 mt-4">Verantwortliche Stelle</h4>
                  <p>Alexander Rheindorf<br />Pankratiusstraße 31<br />50129 Bergheim<br />E-Mail: <a href="mailto:alexander.rheindorf@aachen-blockchain.de" className="text-[var(--color-brand)] hover:underline">alexander.rheindorf@aachen-blockchain.de</a></p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-base">3. Datenerfassung auf dieser Website</h3>
                  <h4 className="font-medium text-gray-800 mb-1">Kontaktformular</h4>
                  <p>Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
                  <h4 className="font-medium text-gray-800 mb-1 mt-4">Server-Log-Dateien</h4>
                  <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-base">4. Hosting</h3>
                  <p>Diese Website wird bei GitHub Pages gehostet. Details entnehmen Sie der Datenschutzerklärung von GitHub: <a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer" className="text-[var(--color-brand)] hover:underline">GitHub Datenschutzerklärung</a>.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-base">5. Ihre Rechte</h3>
                  <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (Mobile only since desktop has sticky nav) */}
      <AnimatePresence>
        {isScrolled && (
          <motion.a
            href="#kontakt"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-[var(--color-brand)] text-white p-4 rounded-full shadow-xl hover:bg-[var(--color-brand-light)] hover:shadow-2xl transition-all focus:outline-none md:hidden group"
            aria-label="Zum Kontaktformular"
          >
            <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
