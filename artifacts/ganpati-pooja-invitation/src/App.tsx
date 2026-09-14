import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react';
import { CalendarDays, Clock3, Home as HomeIcon, MapPin, RotateCcw, Sparkles } from 'lucide-react';
import idolImage from '@assets/ganpati-idol-transparent.png';

type PetalSpec = {
  x: number;
  size: string;
  petal: string;
  duration: string;
  delay: string;
  drift: string;
  r: string;
};

const petalSpecs: PetalSpec[] = [
  { x: 4, size: '10px', petal: '#dbaeb0', duration: '13s', delay: '-2s', drift: '42px', r: '12deg' },
  { x: 11, size: '7px', petal: '#f1d8b0', duration: '18s', delay: '-10s', drift: '-36px', r: '-35deg' },
  { x: 19, size: '8px', petal: '#c98f98', duration: '15s', delay: '-5s', drift: '29px', r: '43deg' },
  { x: 28, size: '6px', petal: '#dfbc70', duration: '20s', delay: '-13s', drift: '-24px', r: '7deg' },
  { x: 37, size: '9px', petal: '#e5bec0', duration: '16s', delay: '-4s', drift: '48px', r: '62deg' },
  { x: 47, size: '6px', petal: '#f3dfb5', duration: '17s', delay: '-9s', drift: '-31px', r: '-18deg' },
  { x: 56, size: '8px', petal: '#d09ba0', duration: '14s', delay: '-8s', drift: '35px', r: '21deg' },
  { x: 65, size: '6px', petal: '#dab363', duration: '21s', delay: '-17s', drift: '-43px', r: '76deg' },
  { x: 74, size: '10px', petal: '#e2b6b8', duration: '16s', delay: '-1s', drift: '26px', r: '-44deg' },
  { x: 84, size: '7px', petal: '#efdbb5', duration: '19s', delay: '-12s', drift: '-34px', r: '28deg' },
  { x: 93, size: '8px', petal: '#c98b91', duration: '15s', delay: '-7s', drift: '41px', r: '49deg' },
];

const sparkleSpecs = [
  [8, 16, '4.2s', '-1.7s'], [24, 58, '5.1s', '-3s'], [78, 21, '4.7s', '-2.4s'],
  [91, 71, '5.9s', '-4.2s'], [16, 84, '6.2s', '-1.2s'], [67, 8, '4.4s', '-3.8s'],
  [52, 43, '5.8s', '-2s'], [34, 27, '6.3s', '-4.7s'],
];

function PetalField({ opening = false }: { opening?: boolean }) {
  return (
    <div className={`petal-field ${opening ? 'opening' : ''}`} aria-hidden="true">
      {petalSpecs.map((spec, index) => (
        <span
          className="petal"
          key={`petal-${index}`}
          style={{
            '--x': spec.x,
            '--size': spec.size,
            '--petal': spec.petal,
            '--duration': spec.duration,
            '--delay': spec.delay,
            '--drift': spec.drift,
            '--r': spec.r,
          } as CSSProperties}
        />
      ))}
      {sparkleSpecs.map(([x, y, duration, delay], index) => (
        <span
          className="sparkle"
          key={`sparkle-${index}`}
          style={{ '--x': x, '--y': y, '--duration': duration, '--delay': delay } as CSSProperties}
        />
      ))}
    </div>
  );
}

function Lotus({ className = '' }: { className?: string }) {
  return (
    <svg className={`lotus ${className}`} viewBox="0 0 100 65" fill="none" aria-hidden="true">
      <path d="M50 58C35 58 20 51 13 39c12 1 23 4 32 12-8-10-12-21-10-31 8 8 14 17 15 29 1-17 5-29 12-39 4 12 2 25-5 38 9-8 19-13 30-14-6 14-20 24-37 24Z" fill="currentColor" opacity=".82" />
      <path d="M50 58c-7-13-7-27 0-43 7 16 7 30 0 43Z" fill="#d89ca1" />
      <path d="M14 39c12 1 26 6 36 19M86 39C73 41 61 48 50 58" stroke="#966c32" strokeWidth="1" />
    </svg>
  );
}

function HangingDiyas() {
  return (
    <div className="hanging-diyas" aria-hidden="true">
      <span className="diya"><i className="diya-flame" /></span>
      <span className="diya"><i className="diya-flame" /></span>
    </div>
  );
}

function Opening({ onOpen }: { onOpen: () => void }) {
  useEffect(() => {
    const timer = window.setTimeout(onOpen, 6200);
    return () => window.clearTimeout(timer);
  }, [onOpen]);

  return (
    <main className="invitation-stage opening-stage" data-testid="opening-stage">
      <PetalField opening />
      <div className="paper opening-paper">
        <div className="paper-content">
          <HangingDiyas />
          <p className="opening-brow" data-testid="text-opening-brow">॥ श्री गणेशाय नमः ॥</p>
          <div className="opening-top-rule" />
          <div className="opening-arch">
            <img className="opening-idol" src={idolImage} alt="Lord Ganesha seated in a traditional shrine" />
            <Lotus className="opening-lotus opening-lotus-left" />
            <Lotus className="opening-lotus opening-lotus-right" />
          </div>
          <h1 className="opening-title" data-testid="text-opening-title">गणपती बाप्पा मोरया</h1>
          <p className="opening-subtitle">A family invitation in celebration</p>
          <button type="button" className="open-button" onClick={onOpen} data-testid="button-open-invitation">
            <Sparkles aria-hidden="true" />
            Open invitation
          </button>
        </div>
      </div>
    </main>
  );
}

function Detail({ icon, label, main, sub, testId }: {
  icon: ReactNode;
  label: string;
  main: string;
  sub?: string;
  testId: string;
}) {
  return (
    <div className="detail" data-testid={`detail-${testId}`}>
      <span className="detail-icon">{icon}</span>
      <span className="detail-label">{label}</span>
      <span className="detail-main" data-testid={`text-${testId}-main`}>{main}</span>
      {sub && <span className="detail-sub" data-testid={`text-${testId}-sub`}>{sub}</span>}
    </div>
  );
}

function Invitation() {
  const [replayKey, setReplayKey] = useState(0);
  const replay = () => {
    setReplayKey((value) => value + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="invitation-stage" key={replayKey} data-testid="invitation-stage">
      <PetalField />
      <div className="paper">
        <span className="side-garland side-garland-left" aria-hidden="true" />
        <span className="side-garland side-garland-right" aria-hidden="true" />
        <div className="outer-ornament ornament-left" aria-hidden="true"><Lotus /></div>
        <div className="outer-ornament ornament-right" aria-hidden="true"><Lotus /></div>
        <div className="bottom-bloom bottom-bloom-left" aria-hidden="true"><Lotus /></div>
        <div className="bottom-bloom bottom-bloom-right" aria-hidden="true"><Lotus /></div>
        <div className="paper-content">
          <HangingDiyas />
          <p className="main-brow" data-testid="text-sacred-line">॥ श्री गणेशाय नमः ॥</p>
          <section className="shrine" aria-label="Ganpati shrine">
            <span className="halo" aria-hidden="true" />
            <span className="shrine-glint glint-one" aria-hidden="true" />
            <span className="shrine-glint glint-two" aria-hidden="true" />
            <span className="shrine-glint glint-three" aria-hidden="true" />
            <img className="idol" src={idolImage} alt="Lord Ganesha" data-testid="img-ganpati-idol" />
            <div className="lotus-row" aria-hidden="true">
              <Lotus />
              <Lotus className="lotus-right" />
            </div>
          </section>
          <section className="welcome-section">
            <h1 className="welcome" data-testid="text-welcome">Welcome</h1>
            <div className="flourish" aria-hidden="true"><Sparkles /></div>
            <p className="to" data-testid="text-to">TO</p>
            <p className="names" data-testid="text-names">Himani &amp; Nakul’s</p>
            <p className="pooja" data-testid="text-pooja">Ganpati Pooja</p>
            <p className="message" data-testid="text-invitation-message">
              With the blessings of Lord Ganesha, we cordially invite you and your family to join us for the auspicious Ganpati Pooja. Your presence will make our celebration even more special.
            </p>
            <div className="details" data-testid="invitation-details">
              <Detail icon={<CalendarDays aria-hidden="true" />} label="Date" main="14/09/2026" sub="Tuesday" testId="date" />
              <Detail icon={<Clock3 aria-hidden="true" />} label="Time" main="12:00 PM" sub="Noon" testId="time" />
              <Detail icon={<MapPin aria-hidden="true" />} label="Venue" main="Our Home" sub="" testId="venue" />
            </div>
            <p className="regards">With warm regards,</p>
            <p className="signature" data-testid="text-signature">Himani &amp; Nakul</p>
            <div className="signature-rule" aria-hidden="true"><span>❧</span></div>
            <div className="home-detail"><HomeIcon aria-hidden="true" /> A celebration at home</div>
          </section>
        </div>
      </div>
      <button type="button" className="replay-button" onClick={replay} data-testid="button-replay-invitation">
        <RotateCcw aria-hidden="true" />
        Replay
      </button>
    </main>
  );
}

function App() {
  const [opened, setOpened] = useState(() => new URLSearchParams(window.location.search).get('open') === '1');
  const openInvitation = () => setOpened(true);
  const view = useMemo(() => (opened ? <Invitation /> : <Opening onOpen={openInvitation} />), [opened]);
  return view;
}

export default App;
