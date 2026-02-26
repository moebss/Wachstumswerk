import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, User, Briefcase, ClipboardList, Users,
  Sprout, Leaf, Flower2, TreeDeciduous, ArrowRight, Star, Mail, Phone, MapPin,
  ChevronLeft, ChevronRight
} from 'lucide-react';

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
    className={className}
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

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
  ];

  return (
    <div className="min-h-screen bg-[var(--color-cream)] text-[var(--color-ink)] font-sans selection:bg-[var(--color-brand)] selection:text-white">
      {/* Navigation */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="block">
            <img
              src="logo_transparent.png"
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
                  src="./peggy.jpg"
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
                  icon: <ClipboardList className="w-8 h-8" />,
                  title: "Prüfungsvorbereitung für Auszubildende",
                  desc: "Training & Beratung für Einzelpersonen, Gruppen von Auszubildenden und Unternehmen.",
                  items: ["Inhaltliche Vorbereitung für verschiedene Berufe", "Strukturelle Vorbereitung", "Prüfungsangst abbauen"]
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
                  src="./peggy2.jpg"
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
            </FadeIn>
          </div>

          {/* Logo as section divider */}
          <FadeIn className="mt-20 flex justify-center">
            <img src="logo_transparent.png" alt="Wachstumswerk" className="h-40 md:h-52 w-auto opacity-80" />
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
                    quote: "Dank des Coachings bei Peggy in Vorbereitung auf ein Bewerbungsgespräch bin ich deutlich souveräner und selbstbewusster in dieses Gespräch gegangen. Das Ergebnis: Ich habe die Stelle bekomme! Nachdem ich bereits zahlreiche, teils äußerst negative Erfahrungen mit Bewerbungsgesprächen gesammelt habe, war Peggys innovativer Ansatz der Schlüssel für einen erfolgreichen Ausgang zum lang ersehnten beruflichen Wechsel. Ich kann das Coaching allen empfehlen, die sich beruflich neu orientieren, weiterentwickeln oder festgefahrene Situationen konstruktiv verändern möchten. Vielen Dank für die professionelle und motivierende Unterstützung!",
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
                <form className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100" onSubmit={(e) => e.preventDefault()}>
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
                      Nachricht senden
                    </button>
                  </div>
                </form>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--color-ink)] text-white/80 py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <img
              src="logo_transparent.png"
              alt="Wachstumswerk Logo"
              className="h-16 w-auto object-contain mb-4 mx-auto md:mx-0 brightness-0 invert opacity-90"
            />
            <p className="text-sm">Begleitung für deine persönliche Entwicklung.</p>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Impressum</a>
            <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
          </div>
          <div className="text-sm text-white/50">
            &copy; 2026 Wachstumswerk. Alle Rechte vorbehalten.
          </div>
        </div>
      </footer>
    </div>
  );
}
