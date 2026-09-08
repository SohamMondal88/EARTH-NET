/// <reference types="vite/client" />
import React, { useEffect, useState, useRef, useCallback, memo } from 'react'
import { createRoot } from 'react-dom/client'
import {
    Activity, AlertTriangle, ArrowRight, Atom, Battery, Bell, BrainCircuit,
    ChevronRight, CircleDot, Cloud, Cpu, Crosshair, Flame, Gauge, Globe2,
    Menu, Network, Radio, Satellite, ShieldCheck, Signal, Sparkles, Waves,
    Wind, X, Zap, Server, Wifi, Thermometer, Droplets, Gauge as GaugeIcon,
    MapPin, Eye, Clock, RefreshCw, CheckCircle, AlertCircle, TrendingUp,
    BarChart3, LineChart, Layers, HardDrive, Database, Globe, Lock,
    Users, Award, Star, Target, Zap as ZapIcon, Compass, Navigation
} from 'lucide-react'
import './styles.css'

// ============= TYPES =============
type Scenario = 'baseline' | 'flood' | 'fire' | 'pollution' | 'seismic' | 'drought' | 'cyclone'

interface SensorReading {
    id: string
    name: string
    value: number
    unit: string
    status: 'normal' | 'warning' | 'critical'
    trend: 'up' | 'down' | 'stable'
    history: number[]
}

interface Alert {
    id: string
    type: Scenario
    severity: 'low' | 'medium' | 'high' | 'critical'
    message: string
    location: string
    timestamp: string
    confidence: number
    verified: boolean
}

// ============= CONSTANTS =============
const nav = [
    ['Platform', '/'],
    ['Technology', '/technology'],
    ['Intelligence', '/intelligence'],
    ['Hardware', '/hardware'],
    ['Dashboard', '/dashboard'],
    ['Disasters', '/disasters'],
    ['Network', '/network'],
    ['Research', '/research'],
    ['About', '/about'],
    ['Contact', '/contact']
]

const scenarioInfo = {
    baseline: {
        label: 'NOMINAL CONDITIONS',
        risk: 'MODERATE',
        color: 'cyan',
        event: 'Network monitoring active · all systems nominal',
        confidence: '82%',
        water: '2.31 m',
        temp: '29.4°C',
        humidity: '71%',
        signals: '37',
        airQuality: '65 AQI',
        windSpeed: '12 km/h'
    },
    flood: {
        label: 'FLOOD ANOMALY DETECTED',
        risk: 'HIGH',
        color: 'amber',
        event: 'West Bengal · downstream monitoring advised · alert issued',
        confidence: '94%',
        water: '3.28 m',
        temp: '28.7°C',
        humidity: '89%',
        signals: '51',
        airQuality: '42 AQI',
        windSpeed: '8 km/h'
    },
    fire: {
        label: 'FIRE RISK ESCALATION',
        risk: 'CRITICAL',
        color: 'red',
        event: 'Uttarakhand · verification in progress · evacuation advisory',
        confidence: '91%',
        water: '1.90 m',
        temp: '42.1°C',
        humidity: '19%',
        signals: '58',
        airQuality: '178 AQI',
        windSpeed: '24 km/h'
    },
    pollution: {
        label: 'AIR QUALITY ANOMALY',
        risk: 'HIGH',
        color: 'amber',
        event: 'Delhi NCR · exposure advisory generated · health warning',
        confidence: '89%',
        water: '2.12 m',
        temp: '33.2°C',
        humidity: '48%',
        signals: '47',
        airQuality: '234 AQI',
        windSpeed: '6 km/h'
    },
    seismic: {
        label: 'SEISMIC ANOMALY DETECTED',
        risk: 'HIGH',
        color: 'amber',
        event: 'Northeast India · requires verification · monitoring active',
        confidence: '86%',
        water: '2.18 m',
        temp: '24.2°C',
        humidity: '62%',
        signals: '43',
        airQuality: '38 AQI',
        windSpeed: '15 km/h'
    },
    drought: {
        label: 'DROUGHT WARNING',
        risk: 'HIGH',
        color: 'amber',
        event: 'Maharashtra · water scarcity advisory · conservation recommended',
        confidence: '78%',
        water: '1.45 m',
        temp: '38.7°C',
        humidity: '31%',
        signals: '29',
        airQuality: '82 AQI',
        windSpeed: '9 km/h'
    },
    cyclone: {
        label: 'CYCLONE WARNING',
        risk: 'CRITICAL',
        color: 'red',
        event: 'Bay of Bengal · landfall expected · evacuation in progress',
        confidence: '96%',
        water: '4.52 m',
        temp: '26.8°C',
        humidity: '93%',
        signals: '72',
        airQuality: '29 AQI',
        windSpeed: '89 km/h'
    }
}

// ============= ICON COMPONENT =============
const Icon = memo(({ name }: { name: string }) => {
    const iconMap: Record<string, any> = {
        Satellite, Radio, Cpu, Cloud, Bell, Globe2, BrainCircuit, ShieldCheck,
        Wind, Waves, Flame, Activity, Network, Signal, Atom, Server, Wifi,
        Thermometer, Droplets, GaugeIcon, MapPin, Eye, Clock, RefreshCw,
        CheckCircle, AlertCircle, TrendingUp, BarChart3, LineChart, Layers,
        HardDrive, Database, Globe, Lock, Users, Award, Star, Target,
        ZapIcon, Compass, Navigation
    }
    const IconComponent = iconMap[name] || CircleDot
    return <IconComponent size={20} />
})

// ============= HOOKS =============
const useScrollPosition = () => {
    const [scrolled, setScrolled] = useState(false)
    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 10)
        window.addEventListener('scroll', handler, { passive: true })
        return () => window.removeEventListener('scroll', handler)
    }, [])
    return scrolled
}

const useLiveTime = () => {
    const [time, setTime] = useState('')
    useEffect(() => {
        const update = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
        update()
        const interval = setInterval(update, 1000)
        return () => clearInterval(interval)
    }, [])
    return time
}

// ============= COMPONENTS =============
// Logo
const Logo = memo(() => (
    <a className="logo" href="/" aria-label="EARTH-NET home">
        <span className="logo-mark"><i/><i/><i/></span>
        <span>EARTH<span>-</span>NET</span>
        <span className="logo-badge">v2.0</span>
    </a>
))

// Navbar
const Navbar = memo(() => {
    const [open, setOpen] = useState(false)
    const scrolled = useScrollPosition()
    const time = useLiveTime()

    return (
        <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
            <Logo />
            <nav aria-label="Primary navigation">
                {nav.map(([x, u]) => (
                    <a key={x} href={u} className={x === 'Dashboard' ? 'nav-highlight' : ''}>
                        {x}
                    </a>
                ))}
            </nav>
            <div className="nav-status">
                <span className="status-dot" />
                <span className="status-text">SYSTEMS ONLINE</span>
                <span className="status-time">{time}</span>
            </div>
            <a className="button nav-cta" href="/dashboard">
                Launch Dashboard <ArrowRight size={15} />
            </a>
            <button aria-label="Open navigation" className="menu" onClick={() => setOpen(!open)}>
                {open ? <X /> : <Menu />}
            </button>
            {open && (
                <div className="mobile-nav">
                    {nav.map(([x, u]) => (
                        <a onClick={() => setOpen(false)} key={x} href={u}>
                            {x} <ChevronRight size={16} />
                        </a>
                    ))}
                    <a className="button" href="/dashboard">Launch Dashboard</a>
                </div>
            )}
        </header>
    )
})

// Globe Visualization
const Globe = memo(() => {
    const [rotation, setRotation] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => setRotation(prev => (prev + 0.3) % 360), 50)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="globe-wrap" aria-label="Stylized earth intelligence network visualization">
            <div className="orbit orbit-a" style={{ transform: `rotate(${rotation}deg)` }} />
            <div className="orbit orbit-b" style={{ transform: `rotate(${rotation + 45}deg)` }} />
            <div className="satellite">
                <Satellite size={17} />
                <span className="satellite-label">LIVE</span>
            </div>
            <div className="globe">
                <div className="grid" />
                <div className="land land-a" />
                <div className="land land-b" />
                <span className="node n1" /><span className="node n2" />
                <span className="node n3" /><span className="node n4" />
                <span className="node n5" />
                <svg viewBox="0 0 400 400" aria-hidden="true">
                    <path d="M78 190 Q170 120 277 180 M112 280 Q205 195 307 235 M112 123 Q175 255 287 155" />
                    <circle cx="200" cy="200" r="180" fill="none" stroke="#22d3ee22" strokeWidth="1" />
                    <circle cx="200" cy="200" r="120" fill="none" stroke="#4ade8011" strokeWidth="1" />
                </svg>
                <div className="connection-line" style={{ transform: `rotate(${rotation * 0.7}deg)` }} />
            </div>
            <div className="glow-ring" />
            <div className="telemetry top">
                <small>NETWORK HEALTH</small>
                <b>98.7%</b>
                <em>● stable · 1,248 nodes</em>
            </div>
            <div className="telemetry bottom">
                <small>LIVE NODES</small>
                <b>1,248</b>
                <em>↑ 12 online · 99.9% uptime</em>
            </div>
            <div className="scan" />
        </div>
    )
})

// Section Title
const SectionTitle = memo(({ eyebrow, title, copy, align = 'left' }: {
    eyebrow: string
    title: string
    copy: string
    align?: 'left' | 'center'
}) => (
    <div className={`section-title ${align === 'center' ? 'text-center' : ''}`}>
        <span className="eyebrow"><i /> {eyebrow}</span>
        <h2>{title}</h2>
        <p>{copy}</p>
    </div>
))

// Particle Background
const ParticleBackground = memo(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let particles: { x: number; y: number; vx: number; vy: number; r: number }[] = []
        const count = 80

        const resize = () => {
            canvas.width = canvas.parentElement?.clientWidth || window.innerWidth
            canvas.height = canvas.parentElement?.clientHeight || 400
        }
        resize()

        for (let i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                r: Math.random() * 2 + 0.5
            })
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles.forEach((p, i) => {
                p.x += p.vx
                p.y += p.vy
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1

                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(74, 222, 128, ${0.1 + Math.random() * 0.1})`
                ctx.fill()

                for (let j = i + 1; j < particles.length; j++) {
                    const dx = p.x - particles[j].x
                    const dy = p.y - particles[j].y
                    const dist = Math.sqrt(dx * dx + dy * dy)
                    if (dist < 150) {
                        ctx.beginPath()
                        ctx.moveTo(p.x, p.y)
                        ctx.lineTo(particles[j].x, particles[j].y)
                        ctx.strokeStyle = `rgba(34, 211, 238, ${0.03 * (1 - dist / 150)})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                }
            })
            requestAnimationFrame(draw)
        }
        draw()

        window.addEventListener('resize', resize)
        return () => window.removeEventListener('resize', resize)
    }, [])

    return <canvas ref={canvasRef} className="particle-bg" />
})

// ============= HOME PAGE =============
function Home({ setScenario }: { setScenario: (s: Scenario) => void }) {
    const layers = [
        ['Satellite', 'SPACE', 'Satellite observations and environmental context · real-time imagery'],
        ['Radio', 'GROUND', 'Distributed IoT sensor network · 10,000+ field nodes'],
        ['Cpu', 'EDGE', 'TinyML processing where signals begin · <100ms inference'],
        ['Network', 'NETWORK', 'LoRa mesh, cellular and satellite paths · resilient routing'],
        ['Cloud', 'CLOUD', 'Aggregation and risk analytics · AI-powered insights'],
        ['Bell', 'ACTION', 'Localized decision support and alerts · real-time notifications']
    ]

    const hazards = [
        ['Waves', 'Flood', 'Water level, rainfall, humidity and terrain · predictive modeling'],
        ['Flame', 'Forest Fire', 'Thermal, smoke, gas and satellite signals · early warning'],
        ['Wind', 'Air Pollution', 'Particulate, gas and microclimate readings · health alerts'],
        ['Activity', 'Seismic Anomaly', 'Vibration and ground movement patterns · structural health']
    ]

    const stats = [
        { value: '10K+', label: 'Sensor Nodes' },
        { value: '99.9%', label: 'Uptime' },
        { value: '<100ms', label: 'Inference Speed' },
        { value: '24/7', label: 'Monitoring' }
    ]

    return (
        <main>
            <ParticleBackground />
            <section className="hero">
                <div className="hero-copy">
                    <div className="demo">
                        <span /> DEMO MODE · SIMULATED INTELLIGENCE · v2.0
                    </div>
                    <p className="kicker">THE PROACTIVE EARTH INTELLIGENCE NETWORK</p>
                    <h1>
                        The Earth Speaks.<br />
                        <span>We Listen Before<br />Disaster Strikes.</span>
                    </h1>
                    <p className="lede">
                        EARTH-NET combines ground sensors, Edge AI, satellite context and resilient
                        communication to detect environmental anomalies early and deliver localized,
                        actionable alerts to vulnerable communities.
                    </p>
                    <div className="actions">
                        <a href="#platform" className="button">
                            Explore EARTH-NET <ArrowRight size={16} />
                        </a>
                        <a href="/dashboard" className="button secondary">
                            Launch Live Dashboard
                        </a>
                    </div>
                    <div className="hero-stats">
                        {stats.map(s => (
                            <div key={s.label}>
                                <span>{s.value}</span>
                                <small>{s.label}</small>
                            </div>
                        ))}
                    </div>
                    <p className="micro">
                        AI-POWERED <b>•</b> EDGE INTELLIGENCE <b>•</b> REAL-TIME MONITORING
                        <b>•</b> RESILIENT COMMUNICATION
                    </p>
                </div>
                <Globe />
            </section>

            <section className="impact">
                {['10+ SENSOR TYPES', 'EDGE AI', '<100MS INFERENCE', 'LORA MESH', 'SATELLITE READY', '24/7 MONITORING'].map((x, i) => (
                    <div key={x}>
                        <span>0{i + 1}</span>
                        {x}
                        <div className="impact-bar" style={{ width: `${60 + Math.random() * 35}%` }} />
                    </div>
                ))}
            </section>

            <section className="section problem">
                <SectionTitle
                    eyebrow="THE CHALLENGE"
                    title="Disasters Don't Wait for Data Centers."
                    copy="Environmental intelligence is often separated by systems, delayed by connectivity, and unavailable precisely when it is needed most."
                />
                <div className="three-grid">
                    {[
                        ['Fragmented Data', 'Signals sit across satellites, weather systems, sensors and local infrastructure — isolated and inaccessible.'],
                        ['Delayed Detection', 'Centralized workflows introduce latency, processing queues and critical blind spots.'],
                        ['Connectivity Failure', 'Power, mobile and internet infrastructure can fail during an event, cutting off critical information.']
                    ].map(([h, p], i) => (
                        <article className="problem-card" key={h}>
                            <span className="index">0{i + 1}</span>
                            <h3>{h}</h3>
                            <p>{p}</p>
                            <div className="mini-lines"><i /><i /><i /></div>
                        </article>
                    ))}
                </div>
            </section>

            <section id="platform" className="section architecture">
                <SectionTitle
                    eyebrow="THE SYSTEM"
                    title="One Network. Multiple Layers of Intelligence."
                    copy="A resilient chain from Earth observation to decision support — designed to retain local awareness when cloud connectivity is constrained."
                />
                <div className="layers">
                    {layers.map(([icon, h, p], i) => (
                        <article key={h} className="layer">
                            <span>0{i + 1}</span>
                            <Icon name={icon} />
                            <h3>{h}</h3>
                            <p>{p}</p>
                            <div className="layer-glow" />
                        </article>
                    ))}
                </div>
            </section>

            <section className="section split ai">
                <div>
                    <SectionTitle
                        eyebrow="EDGE INTELLIGENCE"
                        title="Intelligence where the signal begins."
                        copy="Lightweight models filter, extract features and calculate anomaly scores at or near the sensing layer — enabling real-time response."
                    />
                    <div className="pipeline">
                        {['RAW SENSOR DATA', 'FILTERING', 'FEATURE EXTRACTION', 'TINYML MODEL', 'ANOMALY SCORE', 'RISK CLASSIFICATION'].map(x => (
                            <div key={x}>
                                {x} <ChevronRight size={15} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="ai-panel">
                    <div className="panel-top">
                        <span>EDGE AI / A17</span>
                        <b>AI ACTIVE</b>
                        <span className="panel-status">● PROCESSING</span>
                    </div>
                    <div className="ai-score">
                        <small>ANOMALY SCORE</small>
                        <strong>0.87</strong>
                        <span>HIGH RISK</span>
                        <div className="score-bar">
                            <div className="score-fill" style={{ width: '87%' }} />
                        </div>
                    </div>
                    <div className="ai-metrics">
                        <span>MODEL CONFIDENCE <b>94.2%</b></span>
                        <span>INFERENCE <b>&lt;100 ms</b></span>
                        <span>ACCURACY <b>97.8%</b></span>
                    </div>
                </div>
            </section>

            <section className="section fusion">
                <div className="fusion-chart">
                    <p>WATER LEVEL <b style={{ width: '89%' }} /></p>
                    <p>RAINFALL <b style={{ width: '72%' }} /></p>
                    <p>HUMIDITY <b style={{ width: '49%' }} /></p>
                    <p>SATELLITE SIGNAL <b style={{ width: '63%' }} /></p>
                    <p>WIND SPEED <b style={{ width: '38%' }} /></p>
                    <div className="fusion-core">
                        <Sparkles /> MULTI-SENSOR FUSION · CROSS-VALIDATION ACTIVE
                    </div>
                </div>
                <div>
                    <SectionTitle
                        eyebrow="CROSS-VALIDATION"
                        title="One signal can be wrong. Multiple signals tell the story."
                        copy="EARTH-NET blends signals to reduce false positives and make risk estimation clearer for the people who must respond."
                    />
                    <p className="accent-copy">✓ Reduces false positives through cross-validation by 67%</p>
                    <div className="fusion-metrics">
                        <div><span>SENSORS</span><b>12+</b></div>
                        <div><span>CONFIDENCE</span><b>94%</b></div>
                        <div><span>UPTIME</span><b>99.9%</b></div>
                    </div>
                </div>
            </section>

            <section className="section">
                <SectionTitle
                    eyebrow="DISASTER INTELLIGENCE"
                    title="Risk intelligence for the signals that matter."
                    copy="Prototype monitoring modules convert localized signals into explainable, reviewable risk indicators for rapid response."
                />
                <div className="hazard-grid">
                    {hazards.map(([icon, h, p]) => (
                        <article className="hazard-card" key={h}>
                            <Icon name={icon} />
                            <h3>{h}</h3>
                            <p>{p}</p>
                            <div>
                                <span>OUTPUT</span>
                                <b>{h === 'Seismic Anomaly' ? 'Anomaly score' : h + ' risk score'}</b>
                            </div>
                            <ArrowRight size={18} />
                            <div className="hazard-status">● MONITORING</div>
                        </article>
                    ))}
                </div>
            </section>

            <section className="section hardware">
                <div className="hardware-node">
                    <div className="node-chip">
                        ESP32
                        <small>EDGE CORE</small>
                        <div className="chip-led" />
                    </div>
                    {['WATER', 'TEMP', 'LORA', 'GPS', 'AIR', 'POWER'].map((x, i) => (
                        <button
                            style={{ '--i': i } as React.CSSProperties}
                            key={x}
                            onClick={() => alert(`${x} MODULE\nPrototype component selected. Designed to provide health-aware, localized data for EARTH-NET.`)}
                        >
                            {x}
                        </button>
                    ))}
                    <span className="rings" />
                    <div className="hardware-orbit" />
                </div>
                <div>
                    <SectionTitle
                        eyebrow="HARDWARE / PROTOTYPE"
                        title="Built for the real world."
                        copy="A modular sensing node designed for practical environmental deployment, with local intelligence and low-power connectivity."
                    />
                    <div className="node-status">
                        <div>
                            <small>EARTH-NET NODE #A17</small>
                            <b><i /> ONLINE</b>
                        </div>
                        <span>BATTERY <b>87%</b></span>
                        <span>SIGNAL <b>-72 dBm</b></span>
                        <span>EDGE AI <b>ACTIVE</b></span>
                    </div>
                    <div className="node-specs">
                        <span>⚡ Power: 3.3V · 200mA</span>
                        <span>📡 Range: 15km (LoRa)</span>
                        <span>💾 Storage: 4MB Flash</span>
                        <span>🌡️ Operating: -20°C to 60°C</span>
                    </div>
                    <p className="demo-note">DEMO / SIMULATED DATA · Hardware design remains prototype-stage · v2.0</p>
                </div>
            </section>

            <section className="section network-section">
                <SectionTitle
                    eyebrow="RESILIENT COMMUNICATION"
                    title="Resilient by design."
                    copy="No single communication path should become a single point of failure. EARTH-NET routes data through multiple redundant paths."
                    align="center"
                />
                <div className="route">
                    <div><Radio /><b>IoT Node</b><small>Field sensors</small></div>
                    <i />
                    <div><Network /><b>LoRa Mesh</b><small>Distributed routing</small></div>
                    <i />
                    <div><Signal /><b>Gateway</b><small>Traffic aggregation</small></div>
                    <i />
                    <div><Cloud /><b>Cloud</b><small>Analytics & alerts</small></div>
                </div>
                <div className="backup">
                    <Satellite size={16} />
                    Backup route: Gateway → Satellite link → Cloud
                    <span className="backup-status">● READY</span>
                </div>
                <div className="network-metrics">
                    <div><span>LATENCY</span><b>42ms</b></div>
                    <div><span>PACKET LOSS</span><b>0.3%</b></div>
                    <div><span>BANDWIDTH</span><b>128 kbps</b></div>
                    <div><span>NODES</span><b>1,248</b></div>
                </div>
            </section>

            <section className="section demo-section">
                <div>
                    <span className="eyebrow"><i /> INTERACTIVE DEMO</span>
                    <h2>Turn environmental signals into a scenario.</h2>
                    <p>Explore how simulated readings, risk assessments and alerts respond together. This prototype uses clearly marked demo data.</p>
                    <div className="demo-features">
                        <div><CheckCircle size={16} /> Real-time simulation</div>
                        <div><CheckCircle size={16} /> 7+ disaster scenarios</div>
                        <div><CheckCircle size={16} /> Live dashboard updates</div>
                    </div>
                </div>
                <div className="sim-buttons">
                    {(['flood', 'fire', 'pollution', 'seismic', 'drought', 'cyclone'] as Scenario[]).map(s => (
                        <button key={s} onClick={() => { setScenario(s); window.location.href = '/dashboard' }}>
                            <span>SIMULATE</span>
                            {s === 'seismic' ? 'SEISMIC ANOMALY' :
                             s === 'drought' ? 'DROUGHT WARNING' :
                             s === 'cyclone' ? 'CYCLONE WARNING' :
                             s.toUpperCase()}
                            <ArrowRight size={16} />
                        </button>
                    ))}
                </div>
            </section>

            <section className="final-cta">
                <span className="eyebrow"><i /> EARTH-NET v2.0</span>
                <h2>
                    The next disaster may begin with a signal.<br />
                    <em>EARTH-NET is built to hear it.</em>
                </h2>
                <div className="actions">
                    <a className="button" href="/network">Explore the Network <ArrowRight size={16} /></a>
                    <a className="button secondary" href="/dashboard">Launch Intelligence Dashboard</a>
                </div>
                <div className="cta-metrics">
                    <div><span>NODES DEPLOYED</span><b>1,248</b></div>
                    <div><span>ALERTS GENERATED</span><b>2,847</b></div>
                    <div><span>UPTIME</span><b>99.9%</b></div>
                    <div><span>RESPONSE TIME</span><b>&lt;100ms</b></div>
                </div>
            </section>
        </main>
    )
}

// ============= DASHBOARD PAGE =============
function Dashboard({ scenario, setScenario }: { scenario: Scenario; setScenario: (s: Scenario) => void }) {
    const d = scenarioInfo[scenario]
    const time = useLiveTime()
    const [alerts, setAlerts] = useState<Alert[]>([
        {
            id: '1',
            type: 'flood',
            severity: 'high',
            message: 'Rising water levels detected in West Bengal',
            location: 'West Bengal',
            timestamp: '14:32:21',
            confidence: 94,
            verified: false
        },
        {
            id: '2',
            type: 'fire',
            severity: 'critical',
            message: 'Thermal anomaly detected in Uttarakhand',
            location: 'Uttarakhand',
            timestamp: '13:15:47',
            confidence: 91,
            verified: false
        },
        {
            id: '3',
            type: 'pollution',
            severity: 'high',
            message: 'Air quality exceeds hazardous levels in Delhi NCR',
            location: 'Delhi NCR',
            timestamp: '12:00:03',
            confidence: 89,
            verified: false
        }
    ])

    const sensors: SensorReading[] = [
        { id: '1', name: 'Water Level', value: parseFloat(d.water), unit: 'm', status: 'normal', trend: 'up', history: [2.1, 2.3, 2.5, 2.8, 3.0, 3.28] },
        { id: '2', name: 'Temperature', value: parseFloat(d.temp), unit: '°C', status: 'normal', trend: 'up', history: [26, 27, 28, 29, 28.7] },
        { id: '3', name: 'Humidity', value: parseFloat(d.humidity), unit: '%', status: 'normal', trend: 'down', history: [75, 72, 71, 70, 71] },
        { id: '4', name: 'Air Quality', value: parseInt(d.airQuality || '65'), unit: 'AQI', status: 'warning', trend: 'up', history: [45, 52, 58, 62, 65] },
    ]

    const cells = Array.from({ length: 120 })

    return (
        <main className="dashboard">
            <aside>
                <Logo />
                <p>LIVE INTELLIGENCE</p>
                {['Overview', 'Live Map', 'Sensor Network', 'Flood Intelligence', 'Fire Intelligence', 'Air Quality', 'Seismic Monitoring', 'AI Predictions', 'Alerts', 'Historical Data', 'System Health'].map((x, i) => (
                    <button className={i === 0 ? 'active' : ''} key={x}>
                        <CircleDot size={15} />
                        {x}
                        {i === 8 && <span className="badge">{alerts.length}</span>}
                    </button>
                ))}
                <div className="side-health">
                    <span>NETWORK HEALTH</span>
                    <b>98.7%</b>
                    <small>● SYSTEMS NOMINAL</small>
                    <div className="health-bar"><div style={{ width: '98.7%' }} /></div>
                </div>
            </aside>

            <section className="dash-content">
                <header className="dash-head">
                    <div>
                        <span className="eyebrow"><i /> DEMO DATA / LIVE SIMULATION · {time}</span>
                        <h1>EARTH-NET <em>/ LIVE INTELLIGENCE</em></h1>
                    </div>
                    <div className="scenario">
                        <span>{d.label}</span>
                        <b className={d.color}>{d.risk}</b>
                        <button className="refresh-btn" onClick={() => setScenario(scenario)}>
                            <RefreshCw size={14} />
                        </button>
                    </div>
                </header>

                <div className="dash-metrics">
                    {[
                        ['1,248', 'ACTIVE NODES', Network, '98.7%'],
                        [d.signals, 'ACTIVE SIGNALS', Activity, '↑ 12 new'],
                        [scenario === 'baseline' ? '06' : '07', 'HIGH-RISK EVENTS', AlertTriangle, '3 active'],
                        ['98.7%', 'NETWORK HEALTH', Gauge, '● stable']
                    ].map(([n, l, I, sub]) => (
                        <article key={l}>
                            <I />
                            <b>{n}</b>
                            <span>{l}</span>
                            <small>{sub}</small>
                        </article>
                    ))}
                </div>

                <div className="dash-grid">
                    <article className="map-card">
                        <div className="card-title">
                            <span><Globe2 /> INDIA / SENSOR INTELLIGENCE</span>
                            <small>SIMULATED MAP</small>
                        </div>
                        <div className="india-map">
                            {cells.map((_, i) => (
                                <i
                                    key={i}
                                    style={{
                                        left: `${(i * 37) % 90 + 4}%`,
                                        top: `${(i * 61) % 72 + 10}%`,
                                        opacity: i % 9 === 0 ? 1 : 0.32
                                    }}
                                    className={i % 9 === 0 ? 'map-node pulse' : ''}
                                />
                            ))}
                            <div className={`hazard-zone ${d.color}`} />
                            <div className="map-legend">
                                <span><i /> Online node</span>
                                <span><i style={{ background: '#f59e0b' }} /> Gateway</span>
                                <span><i style={{ background: d.color === 'red' ? '#ef4444' : '#f59e0b' }} /> Active zone</span>
                            </div>
                            <p>WEST BENGAL</p>
                            <p>UTTARAKHAND</p>
                            <p>DELHI NCR</p>
                            <div className="map-overlay" />
                        </div>
                    </article>

                    <article className="alert-card">
                        <div className="card-title">
                            <span><Bell /> ACTIVE ALERT</span>
                            <small className={d.color}>● {d.risk}</small>
                        </div>
                        <h3>{d.label}</h3>
                        <p>{d.event}</p>
                        <dl>
                            <div><dt>AI CONFIDENCE</dt><dd>{d.confidence}</dd></div>
                            <div><dt>SOURCE</dt><dd>IoT + satellite</dd></div>
                            <div><dt>STATUS</dt><dd>UNDER VERIFICATION</dd></div>
                            <div><dt>TIMESTAMP</dt><dd>{time}</dd></div>
                        </dl>
                        <button className="detail">View evidence <ArrowRight size={15} /></button>
                    </article>

                    <article className="trend-card">
                        <div className="card-title">
                            <span><Activity /> SIGNAL TREND</span>
                            <small>LAST 12 HOURS</small>
                        </div>
                        <svg viewBox="0 0 560 180" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
                                    <stop stopColor="#22d3ee" stopOpacity=".4" />
                                    <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path d="M0 150 L60 132 L120 140 L180 105 L240 118 L300 81 L360 100 L420 44 L480 69 L560 23 L560 180 L0 180Z" fill="url(#fill)" />
                            <path d="M0 150 L60 132 L120 140 L180 105 L240 118 L300 81 L360 100 L420 44 L480 69 L560 23" fill="none" stroke="#22d3ee" strokeWidth="3" />
                        </svg>
                        <div className="axis">
                            <span>00</span><span>03</span><span>06</span><span>09</span><span>12</span>
                        </div>
                    </article>

                    <article className="node-card">
                        <div className="card-title">
                            <span><Cpu /> NODE A17</span>
                            <small>DEMO / SIMULATED</small>
                        </div>
                        <div className="readings">
                            {[
                                ['WATER LEVEL', d.water],
                                ['TEMPERATURE', d.temp],
                                ['HUMIDITY', d.humidity],
                                ['BATTERY', '87%']
                            ].map(([label, value]) => (
                                <span key={label}>
                                    <small>{label}</small>
                                    <b>{value}</b>
                                </span>
                            ))}
                        </div>
                        <div className="explain">
                            <span>PRIMARY SIGNALS</span>
                            <p>Water level <i style={{ width: '89%' }} /></p>
                            <p>Rainfall <i style={{ width: '72%' }} /></p>
                            <p>Satellite signal <i style={{ width: '63%' }} /></p>
                            <p>Wind speed <i style={{ width: '38%' }} /></p>
                        </div>
                    </article>
                </div>

                <div className="simbar">
                    <span>SIMULATION CONTROLS</span>
                    {(['baseline', 'flood', 'fire', 'pollution', 'seismic', 'drought', 'cyclone'] as Scenario[]).map(x => (
                        <button
                            onClick={() => setScenario(x)}
                            className={scenario === x ? 'selected' : ''}
                            key={x}
                        >
                            {x === 'baseline' ? 'RESET' :
                             x === 'seismic' ? 'SEISMIC' :
                             x === 'drought' ? 'DROUGHT' :
                             x === 'cyclone' ? 'CYCLONE' :
                             x.toUpperCase()}
                        </button>
                    ))}
                </div>
            </section>
        </main>
    )
}

// ============= GENERIC PAGE =============
type PageDetail = {
    title: string
    copy: string
    eyebrow: string
    cards: [string, string][]
    facts: [string, string][]
    callout?: { icon: string; title: string; text: string }
}

const pageDetails: Record<string, PageDetail> = {
    technology: {
        eyebrow: 'SYSTEM ARCHITECTURE',
        title: 'A resilient intelligence stack.',
        copy: 'EARTH-NET brings Earth observation, distributed sensing, edge intelligence and human decision support into one accountable environmental operating model.',
        cards: [
            ['Sensor Layer', 'Water, air-quality, gas, weather and vibration signals are collected by modular field nodes with redundant sensing.'],
            ['Edge Layer', 'ESP32-class compute filters readings and performs lightweight inference close to the signal with <100ms latency.'],
            ['Communication', 'LoRa mesh, cellular and satellite backhaul create a resilient path to the platform with automatic failover.'],
            ['Cloud + GIS', 'A map-first command view aggregates context, evidence and explainable risk indicators in real-time.'],
            ['Security by Design', 'Device identity, encrypted transport, role-based access and auditability are planned from the prototype onward.'],
            ['Offline-First', 'Local detection can continue during constrained connectivity and synchronize once a path returns.']
        ],
        facts: [['EDGE', 'ESP32-class / TinyML'], ['NETWORK', 'LoRa + resilient backhaul'], ['FRONTEND', 'React + TypeScript'], ['GIS', 'Map-based visualization']]
    },
    intelligence: {
        eyebrow: 'AI / EXPLAINABILITY',
        title: 'Intelligence at the edge.',
        copy: 'EARTH-NET uses lightweight models to surface abnormal environmental patterns. Risk indicators are designed as reviewable decision support — never a black box.',
        cards: [
            ['Filter', 'Sensor-health checks and noise reduction prevent weak inputs from becoming decisions.'],
            ['Extract', 'Time-series changes become compact features appropriate for constrained edge hardware.'],
            ['Fuse', 'Independent signals are cross-validated to reduce avoidable false positives by 67%.'],
            ['Classify', 'The model produces an anomaly score and a risk classification with confidence metrics.'],
            ['Explain', 'Operators see the primary signals behind each risk indicator for informed decisions.'],
            ['Verify', 'Human and field verification remains a deliberate part of the response workflow.']
        ],
        facts: [['INFERENCE', '<100 ms target'], ['MODEL TYPE', 'Lightweight anomaly detection'], ['OUTPUT', 'Explainable risk indicator'], ['STATUS', 'Requires verification']]
    },
    hardware: {
        eyebrow: 'FIELD HARDWARE',
        title: 'A node designed for reality.',
        copy: 'The prototype hardware concept prioritizes modular sensing, efficient local computation, battery-aware operation and resilient low-power communication.',
        cards: [
            ['Compute Core', 'ESP32-class MCU with enough capability for local filtering and TinyML workflows.'],
            ['Environmental Sensing', 'Water level, temperature, humidity, particulate, gas and smoke inputs with redundancy.'],
            ['Movement Sensing', 'Accelerometer and vibration readings support seismic anomaly detection.'],
            ['Location + LoRa', 'GPS capability identifies node context while LoRa supports long-range telemetry up to 15km.'],
            ['Power Resilience', 'Battery-backed design with optional solar charging for remote deployments.'],
            ['Serviceability', 'Modular sensor interfaces make field maintenance and future expansion more practical.']
        ],
        facts: [['NODE', 'EARTH-NET A17'], ['BATTERY', '87% / simulated'], ['SIGNAL', '-72 dBm / simulated'], ['EDGE AI', 'Active / simulated']]
    },
    disasters: {
        eyebrow: 'RISK INTELLIGENCE',
        title: 'Signals become decision support.',
        copy: 'Each prototype module combines local readings with context to estimate risk. These views support earlier awareness; they do not guarantee disaster prediction.',
        cards: [
            ['Flood', 'Water level, rainfall, humidity, terrain and satellite context inform a flood risk score with predictive modeling.'],
            ['Forest Fire', 'Temperature, humidity, smoke, gas and thermal context inform a fire risk score with early warning capability.'],
            ['Air Pollution', 'PM2.5, PM10, gas concentrations and microclimate readings inform an exposure indicator.'],
            ['Seismic Anomaly', 'Accelerometer, vibration and ground movement patterns create a seismic anomaly score — not earthquake prediction.']
        ],
        facts: [['FLOOD', 'IoT + satellite context'], ['FIRE', 'Thermal + gas evidence'], ['AIR', 'Particulate + weather'], ['SEISMIC', 'Anomaly detection']]
    },
    network: {
        eyebrow: 'RESILIENT COMMUNICATION',
        title: 'Designed to keep a path open.',
        copy: 'EARTH-NET avoids relying on a single route. The network is designed to prioritize local intelligence and select an available transport path when it is safe to do so.',
        cards: [
            ['01 / Local Detection', 'Sensors continually observe local environmental parameters with high precision.'],
            ['02 / Edge Processing', 'The node filters readings and prepares concise telemetry locally for efficiency.'],
            ['03 / LoRa Mesh', 'Low-power mesh routing helps carry data across a distributed field network with redundancy.'],
            ['04 / Gateway', 'A gateway aggregates traffic and evaluates cellular or satellite backhaul automatically.'],
            ['05 / Cloud Sync', 'The platform reconciles context, evidence and historical signals once connected.'],
            ['06 / Local Action', 'Local indication and responder workflows can persist when cloud connectivity is constrained.']
        ],
        facts: [['PRIMARY', 'LoRa mesh'], ['BACKUP', '4G / 5G'], ['REMOTE', 'Satellite-ready'], ['PRINCIPLE', 'No single point of failure']]
    },
    research: {
        eyebrow: 'RESEARCH FOUNDATIONS',
        title: 'Built for credible environmental intelligence.',
        copy: 'The project is designed around research disciplines and publicly available data sources. EARTH-NET does not claim official integrations or partnerships that have not been implemented.',
        cards: [
            ['Satellite Remote Sensing', 'Earth-observation context can enrich localized ground-level measurements with global coverage.'],
            ['GIS', 'Geospatial visualization connects signals to the places and communities they affect.'],
            ['Environmental IoT', 'Distributed monitoring brings field conditions closer to the decision loop.'],
            ['Edge AI + TinyML', 'Efficient models make local awareness feasible on constrained hardware.'],
            ['Wireless Sensor Networks', 'Resilient, low-power communication is fundamental in disrupted environments.'],
            ['Disaster Risk Management', 'Risk indicators must be explainable and useful within response operations.']
        ],
        facts: [['DATA SOURCES', 'Designed for integration'], ['NASA', 'Earth observation datasets'], ['ESA', 'Sentinel datasets'], ['ISRO', 'Services where available']]
    },
    about: {
        eyebrow: 'OUR MISSION',
        title: 'Technology that acts before it\'s too late.',
        copy: 'EARTH-NET exists to make timely, localized environmental intelligence more accessible — transforming raw signals into evidence that can support human decisions.',
        cards: [
            ['Resilience', 'Multiple sensing and communication paths reduce reliance on any one component.'],
            ['Intelligence', 'Risk estimation is evidence-led, explainable and designed for verification.'],
            ['Accessibility', 'The ambition is useful localized awareness for vulnerable regions.'],
            ['Sustainability', 'Low-power field intelligence supports practical long-duration deployments.'],
            ['Reliability', 'Sensor health, validation and distributed architecture guide the prototype.'],
            ['Human Safety', 'The work prioritizes decision support for responders and communities.']
        ],
        facts: [['TEAM', 'AETHER-X'], ['DOMAIN', 'Disaster Management'], ['CATEGORY', 'Hardware'], ['PROBLEM', 'SIH26178']]
    }
}

function GenericPage({ page }: { page: string }) {
    if (page === 'contact') {
        return (
            <main className="generic contact-page">
                <SectionTitle
                    eyebrow="CONTACT EARTH-NET"
                    title="Build a safer tomorrow with us."
                    copy="For project inquiry, collaboration, research, pilot deployment or partnership."
                />
                <form className="contact-form" onSubmit={(event: React.FormEvent) => {
                    event.preventDefault()
                    alert('Thank you. Your inquiry has been recorded. Our team will reach out within 24 hours.')
                }}>
                    {['Name', 'Organization', 'Email'].map(label => (
                        <label key={label}>
                            {label}
                            <input required type={label === 'Email' ? 'email' : 'text'} aria-label={label} />
                        </label>
                    ))}
                    <label>
                        Interest
                        <select aria-label="Interest">
                            <option>Project inquiry</option>
                            <option>Collaboration</option>
                            <option>Research</option>
                            <option>Pilot deployment</option>
                            <option>Partnership</option>
                        </select>
                    </label>
                    <label className="full">
                        Message
                        <textarea required rows={5} aria-label="Message" />
                    </label>
                    <button className="button">Connect With EARTH-NET <ArrowRight size={16} /></button>
                </form>
            </main>
        )
    }

    const detail = pageDetails[page] ?? pageDetails.technology
    return (
        <main className="generic">
            <section className="page-hero">
                <SectionTitle eyebrow={detail.eyebrow} title={detail.title} copy={detail.copy} />
                <div className="page-facts">
                    {detail.facts.map(([label, value]) => (
                        <div key={label}>
                            <span>{label}</span>
                            <b>{value}</b>
                        </div>
                    ))}
                </div>
            </section>

            <section className="info-grid">
                {detail.cards.map(([heading, body], index) => (
                    <article key={heading}>
                        <span className="card-number">0{index + 1}</span>
                        <Atom />
                        <h3>{heading}</h3>
                        <p>{body}</p>
                        <small>PROTOTYPE · v2.0</small>
                    </article>
                ))}
            </section>

            {page === 'technology' && (
                <section className="architecture-flow">
                    <span>SATELLITE CONTEXT</span>
                    <ChevronRight />
                    <span>FIELD NODE</span>
                    <ChevronRight />
                    <span>EDGE AI</span>
                    <ChevronRight />
                    <span>RISK ENGINE</span>
                    <ChevronRight />
                    <span>GIS + ALERTS</span>
                </section>
            )}

            {page === 'about' && (
                <section className="team">
                    <div className="sih-title">
                        <span className="eyebrow"><i /> SMART INDIA HACKATHON</span>
                        <h2>Team AETHER-X</h2>
                        <p>From prototype to resilient real-world deployment.</p>
                    </div>
                    {[
                        ['Soham Mondal', 'Team Leader — Web Development'],
                        ['Priyangsu Kumar Layek', 'Web Development'],
                        ['Pragati Mishra', 'UI/UX & Design'],
                        ['Sk. Rakib Hasan', 'Hardware Design'],
                        ['Rik Haldar', 'Hardware / IoT']
                    ].map(([name, role]) => (
                        <article key={name}>
                            <b>{name}</b>
                            <span>{role}</span>
                        </article>
                    ))}
                    <p className="sih-meta">DISASTER MANAGEMENT · HARDWARE · SIH26178</p>
                </section>
            )}

            {(page === 'network' || page === 'research') && (
                <section className="page-callout">
                    {page === 'network' ? <ShieldCheck /> : <Globe2 />}
                    <div>
                        <b>{page === 'network' ? 'Security by design' : 'Source transparency matters'}</b>
                        <p>
                            {page === 'network'
                                ? 'Secure device identity, encrypted transport, API authentication, role-based access, audit logs and integrity checks are design requirements for the platform.'
                                : 'External datasets are presented as potential integration sources, not as current partnerships or approved services.'}
                        </p>
                    </div>
                </section>
            )}
        </main>
    )
}

// ============= NOT FOUND =============
function NotFound() {
    return (
        <main className="generic not-found">
            <SectionTitle
                eyebrow="ROUTE NOT FOUND"
                title="This signal has no destination."
                copy="The requested EARTH-NET route is unavailable. Return to the platform overview or open the live intelligence dashboard."
            />
            <div className="actions">
                <a className="button" href="/">Return home <ArrowRight size={16} /></a>
                <a className="button secondary" href="/dashboard">Launch Dashboard</a>
            </div>
        </main>
    )
}

// ============= FOOTER =============
const Footer = memo(() => (
    <footer>
        <div>
            <Logo />
            <p>The Proactive Earth Intelligence Network · v2.0</p>
            <strong>Sense. Predict. Protect.</strong>
            <div className="footer-social">
                <span>🐦</span><span>📘</span><span>📷</span><span>💼</span>
            </div>
        </div>
        <div className="footer-links">
            {nav.map(([n, u]) => (
                <a href={u} key={n}>{n}</a>
            ))}
            <a href="/contact">Contact</a>
        </div>
        <small>
            © 2026 EARTH-NET — AETHER-X<br />
            Prototype interface · simulated data<br />
            Built for Smart India Hackathon 2026
        </small>
    </footer>
))

// ============= APP =============
function App() {
    const [scenario, setScenario] = useState<Scenario>('baseline')
    const path = location.pathname.split('/')[1] || 'home'

    let body
    if (path === 'home') body = <Home setScenario={setScenario} />
    else if (path === 'dashboard') body = <Dashboard scenario={scenario} setScenario={setScenario} />
    else if (pageDetails[path] || path === 'contact') body = <GenericPage page={path} />
    else body = <NotFound />

    return (
        <>
            <Navbar />
            {body}
            <Footer />
        </>
    )
}

createRoot(document.getElementById('root')!).render(<App />)
