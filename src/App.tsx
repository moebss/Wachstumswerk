import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, User, Briefcase, ClipboardList, Users, 
  Sprout, Leaf, Flower2, TreeDeciduous, ArrowRight, Star, Mail, Phone, MapPin
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
          {/* Subtle Logo Watermark */}
          <div className="absolute top-10 -right-20 w-96 h-96 opacity-5 pointer-events-none">
             <img src="logo_transparent.png" alt="" className="w-full h-full object-contain" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
            <FadeIn>
              <h1 className="text-5xl md:text-7xl font-serif leading-[1.1] mb-6 text-balance">
                Innere Führung stärken.<br />
                <span className="italic text-[var(--color-brand)]">Klarheit gewinnen.</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg leading-relaxed">
                Du spürst, dass es Zeit für Veränderung ist – aber der Weg dorthin fühlt sich unklar an? Gemeinsam finden wir heraus, was dich wirklich antreibt und wie du mit mehr Leichtigkeit und Selbstvertrauen deinen Weg gehst.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#kontakt" className="bg-[var(--color-brand)] text-white px-8 py-4 rounded-full text-center font-medium hover:bg-[var(--color-brand-light)] transition-colors">
                  Kostenloses Erstgespräch
                </a>
                <a href="#angebot" className="border border-[var(--color-brand)] text-[var(--color-brand)] px-8 py-4 rounded-full text-center font-medium hover:bg-[var(--color-brand)] hover:text-white transition-colors">
                  Mehr erfahren
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.2} className="relative">
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative">
                <img 
                  src="https://picsum.photos/seed/peggy/800/1000?blur=2" 
                  alt="Portrait Peggy" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
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
                  items: ["Standortbestimmung & Zielklärung", "Emotionale Blockaden lösen", "Neue Handlungsmuster entwickeln"]
                },
                {
                  icon: <Briefcase className="w-8 h-8" />,
                  title: "Business Coaching",
                  desc: "Für Führungskräfte und Unternehmer:innen, die bewusst führen wollen.",
                  items: ["Leadership-Entwicklung", "Entscheidungsfindung", "Work-Life-Integration"]
                },
                {
                  icon: <ClipboardList className="w-8 h-8" />,
                  title: "Tools & Assessments",
                  desc: "Fundierte Diagnostik für tiefere Selbsterkenntnis.",
                  items: ["Persönlichkeitsanalysen", "Werte- und Motivationsprofile", "Stärken-Schwächen-Analyse"]
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Workshops",
                  desc: "Gruppensettings für Teams und Unternehmen.",
                  items: ["Teamdynamik verbessern", "Kommunikationstraining", "Resilienz stärken"]
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
                  src="https://picsum.photos/seed/peggy2/600/800" 
                  alt="Peggy" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </FadeIn>
            <FadeIn className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Über mich</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Als Coach begleite ich Menschen dabei, ihre innere Stärke wiederzuentdecken und mutig ihren eigenen Weg zu gehen. Meine Arbeitsweise ist geprägt von Empathie, Klarheit und einer Prise Leichtigkeit.
                </p>
                <p>
                  In meiner langjährigen Erfahrung habe ich gelernt, dass wahres Wachstum oft dort beginnt, wo wir uns trauen, genau hinzusehen.
                </p>
              </div>
              <div className="mt-10">
                <img src="logo_transparent.png" alt="Wachstumswerk" className="h-20 w-auto opacity-90" />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Arbeitsweise Section */}
        <section id="arbeitsweise" className="py-24 bg-[var(--color-brand)] text-white px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Meine Arbeitsweise</h2>
              <p className="text-white/80 text-lg">Fundiert, individuell und auf Augenhöhe.</p>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
              {[
                {
                  num: "01",
                  title: "Systemischer Ansatz",
                  desc: "Ich betrachte dich nicht isoliert, sondern in deinem gesamten Lebenskontext. Zusammenhänge verstehen hilft, nachhaltige Lösungen zu finden."
                },
                {
                  num: "02",
                  title: "Emotionsorientierte Arbeit",
                  desc: "Emotionen sind der Schlüssel zu echten Veränderungen. Wir arbeiten mit dem, was dich bewegt – nicht nur mit dem, was du denkst."
                },
                {
                  num: "03",
                  title: "Diagnostische Tools",
                  desc: "Wissenschaftlich fundierte Assessments geben dir wertvolle Einblicke in deine Persönlichkeit, Werte und Potenziale."
                },
                {
                  num: "04",
                  title: "Ressourcenorientierung",
                  desc: "Wir bauen auf deinen Stärken auf. Du bringst alles mit, was du für deinen Weg brauchst – ich helfe dir, es zu entdecken."
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

        {/* Prozess Section */}
        <section className="py-24 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <FadeIn className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Dein Weg zum Wachstum</h2>
              <p className="text-gray-600 text-lg">Ein strukturierter Prozess für nachhaltige Veränderung.</p>
            </FadeIn>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Connecting line for desktop */}
              <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gray-200"></div>
              
              {[
                { icon: <Sprout className="w-6 h-6" />, title: "Erstgespräch", desc: "Wir lernen uns unverbindlich kennen und klären dein Anliegen." },
                { icon: <Leaf className="w-6 h-6" />, title: "Analyse", desc: "Wir identifizieren Blockaden und Ressourcen in deiner aktuellen Situation." },
                { icon: <TreeDeciduous className="w-6 h-6" />, title: "Begleitung", desc: "In regelmäßigen Sessions arbeiten wir gezielt an deinen Zielen." },
                { icon: <Flower2 className="w-6 h-6" />, title: "Transfer", desc: "Du integrierst das Gelernte nachhaltig in deinen Alltag." }
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
              <p className="text-gray-600 text-lg">Was Klient:innen über die Zusammenarbeit sagen.</p>
            </FadeIn>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Die Zusammenarbeit hat mir geholfen, endlich Klarheit zu gewinnen. Die ruhige, wertschätzende Art hat einen sicheren Raum geschaffen, in dem ich mich öffnen konnte.",
                  name: "Sarah M.",
                  role: "Führungskraft",
                  initials: "SM"
                },
                {
                  quote: "Ich kam mit einem diffusen Gefühl der Unzufriedenheit – und ging mit einem klaren Plan und neuer Energie. Die richtigen Fragen zur richtigen Zeit.",
                  name: "Michael K.",
                  role: "Unternehmer",
                  initials: "MK"
                },
                {
                  quote: "Professionell, empathisch und unglaublich effektiv. Die Coaching-Sessions waren ein echter Wendepunkt für mich.",
                  name: "Julia T.",
                  role: "Marketing Managerin",
                  initials: "JT"
                }
              ].map((testimonial, idx) => (
                <FadeIn key={idx} delay={idx * 0.1} className="bg-white p-8 rounded-3xl shadow-sm flex flex-col h-full">
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
              ))}
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
