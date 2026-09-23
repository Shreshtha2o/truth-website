import ParticleJourney from "@/components/ParticleJourney";
import InquirySection from "@/components/InquirySection";
import PhilosophySection from "@/components/PhilosophySection";
import ScripturesSection from "@/components/ScripturesSection";
import AcharyaPrashantSection from "@/components/AcharyaPrashantSection";
import ImpactSection from "@/components/ImpactSection";
import StartLearningSection from "@/components/StartLearningSection";
import LivingPracticeSection from "@/components/LivingPracticeSection";
import ReturnToQuestionSection from "@/components/ReturnToQuestionSection";
import ReligionSection from "@/components/ReligionSection";
import KnowledgeSection from "@/components/KnowledgeSection";
import ReadingRoomSection from "@/components/ReadingRoomSection";
import CinematicLayer from "@/components/CinematicLayer";
import ManifestoSection from "@/components/ManifestoSection";
import SynthesisExperience from "@/components/SynthesisExperience";
import InquiryLab from "@/components/InquiryLab";
import LearningAtlas from "@/components/LearningAtlas";
import WorldMirror from "@/components/WorldMirror";
import QuestionArchive from "@/components/QuestionArchive";
import ReflectionChamber from "@/components/ReflectionChamber";
import ConstellationPath from "@/components/ConstellationPath";
import KnowledgeCascade from "@/components/KnowledgeCascade";
import EvidenceObservatory from "@/components/EvidenceObservatory";
import DecisionObservatory from "@/components/DecisionObservatory";
import AttentionLaboratory from "@/components/AttentionLaboratory";
import LanguageLaboratory from "@/components/LanguageLaboratory";
import DialogueLaboratory from "@/components/DialogueLaboratory";
import SocietyWorldLaboratory from "@/components/SocietyWorldLaboratory";
import TraditionInterpretationSection from "@/components/TraditionInterpretationSection";
import FalseRealLaboratory from "@/components/FalseRealLaboratory";
import PersonalInquiryJourney from "@/components/PersonalInquiryJourney";
import VisualPolish from "@/components/VisualPolish";
import MicroInteractions from "@/components/MicroInteractions";
import PerformanceGuard from "@/components/PerformanceGuard";
import ExperiencePolish from "@/components/ExperiencePolish";
import CinematicComposition from "@/components/CinematicComposition";
import ResponsiveInteractionQA from "@/components/ResponsiveInteractionQA";
import ExperienceHeader from "@/components/ExperienceHeader";
import AccessibilityLayer from "@/components/AccessibilityLayer";
import SiteAtmosphere from "@/components/SiteAtmosphere";
import ClosingExperience from "@/components/ClosingExperience";
import AmbientSoundscape from "@/components/AmbientSoundscape";
import InquiryInteractions from "@/components/InquiryInteractions";
import InquiryModules from "@/components/InquiryModules";
import EvidenceExplorer from "@/components/EvidenceExplorer";
import KnowledgeAtlas from "@/components/KnowledgeAtlas";
import QuestionExplorer from "@/components/QuestionExplorer";
import ResponsiveCinematicGuard from "@/components/ResponsiveCinematicGuard";
import ProductionReadiness from "@/components/ProductionReadiness";
import HeroTrustLayer from "@/components/HeroTrustLayer";

const chapters = [
  {
    id: "self", index: "01", kicker: "SELF-EDUCATION",
    title: <>FIRST,<br /><span>QUESTION</span><br />YOURSELF.</>,
    body: "Before changing the world, examine the one who is looking at it. Self-education begins when borrowed answers are no longer enough.", phase: 0.16,
  },
  {
    id: "acharya", index: "02", kicker: "THE INQUIRY",
    title: <>WHO IS<br />THE <span>“I”?</span></>,
    body: "After Krishna, the journey turns toward seeing itself: an illuminated eye and mirror become a visual metaphor for observation and the question, who am I?", phase: 0.30,
  },
  {
    id: "earth", index: "03", kicker: "FROM SELF TO WORLD",
    title: <>ONE<br /><span>PLANET.</span><br />BILLIONS OF DESIRES.</>,
    body: "The eye dissolves. The same particles reorganise into Earth, widening the question from the observer to the world that is being observed.", phase: 0.46,
  },
  {
    id: "nature", index: "04", kicker: "NATURE",
    title: <>WHAT DO WE<br />CALL <span>PROGRESS?</span></>,
    body: "Earth dissolves into living nature. The question now reaches the idea of progress: what are we changing, and what are we losing?", phase: 0.60,
  },
  {
    id: "universe", index: "05", kicker: "THE VASTNESS",
    title: <>FROM LIFE<br />TO THE <span>UNIVERSE.</span></>,
    body: "Nature disperses into the vastness of the universe, expanding the visual field until the final turn brings the journey back to the mind.", phase: 0.76,
  },
];

export default function Home() {
  return (
    <>
      <AccessibilityLayer />
      <main id="main-content" className="experience" tabIndex={-1}>
        {/* Frozen visual engine: intentionally unchanged. */}
        <ParticleJourney />
        <HeroTrustLayer />

        {/* Site-wide experience infrastructure. */}
        <PerformanceGuard />
        <ResponsiveInteractionQA />
        <ResponsiveCinematicGuard />
        <ProductionReadiness />
        <CinematicComposition />
        <CinematicLayer />
        <VisualPolish />
        <MicroInteractions />
        <ExperiencePolish />
        <InquiryInteractions />
        <SiteAtmosphere />
        <AmbientSoundscape />
        <ExperienceHeader />

        <section id="top" className="hero chapter hero-chapter">
          <div className="hero-content">
            <p className="eyebrow"><i /> 00 / THE BEGINNING</p>
            <h1>
              <span className="thin">YOU WERE TAUGHT</span>
              <span className="heavy">HOW TO <em className="accent-violet">LIVE.</em></span>
              <span className="thin indent">BUT WERE YOU</span>
              <span className="heavy">TAUGHT <em className="accent-orange">WHY?</em></span>
            </h1>
            <p className="hero-copy">A visual journey from conditioning to inquiry — from the fragments of what we think we know toward a clearer examination of ourselves.</p>
            <a className="round-cta" href="#chapters">BEGIN THE JOURNEY <span>↓</span></a>
          </div>
          <div className="hero-side-word">QUESTION</div>
        </section>

        <div id="chapters" className="chapter-stack">
          {chapters.map((chapter) => (
            <section key={chapter.id} id={chapter.id} className={`chapter story-chapter chapter-${chapter.id}`} data-phase={chapter.phase}>
              <div className="chapter-meta"><span>{chapter.index}</span><span>{chapter.kicker}</span></div>
              <div className="chapter-content">
                <h2>{chapter.title}</h2>
                <div className="chapter-right"><p>{chapter.body}</p><span className="phase-mark">SCROLL TO TRANSFORM <b>↘</b></span></div>
              </div>
            </section>
          ))}
        </div>

        {/* Core intellectual journey. */}
        <InquirySection />
        <PhilosophySection />
        <ScripturesSection />
        <AcharyaPrashantSection />
        <ImpactSection />
        <StartLearningSection />
        <LivingPracticeSection />
        <ReturnToQuestionSection />
        <ReligionSection />
        <KnowledgeSection />
        <ReadingRoomSection />

        {/* Active inquiry: question → evidence → map. */}
        <QuestionExplorer />
        <InquiryModules />
        <EvidenceExplorer />
        <KnowledgeAtlas />

        {/* Deep-learning and reflection experiences. */}
        <ManifestoSection />
        <SynthesisExperience />
        <InquiryLab />
        <LearningAtlas />
        <WorldMirror />
        <QuestionArchive />
        <ReflectionChamber />
        <ConstellationPath />
        <KnowledgeCascade />
        <EvidenceObservatory />
        <DecisionObservatory />
        <AttentionLaboratory />
        <LanguageLaboratory />
        <DialogueLaboratory />
        <SocietyWorldLaboratory />
        <TraditionInterpretationSection />
        <FalseRealLaboratory />
        <PersonalInquiryJourney />

        <section className="chapter finale">
          <p className="eyebrow"><i /> THE END IS ANOTHER BEGINNING</p>
          <h2>FIRST,<br /><span>QUESTION.</span><br />THEN, SEE.</h2>
          <p>When the noise falls away, inquiry remains.</p>
          <a className="round-cta" href="#top">RETURN TO THE BEGINNING <span>↑</span></a>
        </section>

        <ClosingExperience />
        <footer className="site-footer"><span>TRUTH · SELF-KNOWLEDGE · INQUIRY</span><span>2026</span></footer>
      </main>
    </>
  );
}
