<div align="center">

# EARTH-NET

### Proactive Earth Intelligence Network

A student-built environmental monitoring concept for early, localized awareness of floods, forest fires, pollution, landslides and extreme-weather risk.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-16A34A)

</div>

## Why EARTH-NET

Many disaster-monitoring systems are centralized and may not provide street-, village- or site-level context quickly enough. EARTH-NET explores a distributed approach that combines ground sensors, edge processing, resilient communication and a GIS-style dashboard.

This repository is the **software demonstration** for Team **AETHER-X** and Smart India Hackathon problem statement **SIH26178**.

> **Transparency:** dashboard readings and alerts in this prototype are simulated for demonstration. The repository does not claim to consume live government feeds or to be a certified warning system.

## Prototype capabilities

- Selectable environmental sensor nodes
- Simulated real-time readings and node health
- Localized risk scores and alert severity
- Hazard-focused dashboard views
- Incident context for decision-makers
- Responsive presentation experience
- Clear **Sense → Edge AI → Risk Intelligence → Alert** workflow

## Proposed system architecture

1. **Sense:** field nodes collect water level, smoke/gas, particulate matter, temperature, humidity, vibration, location and soil conditions.
2. **Analyze locally:** TinyML-compatible edge hardware checks readings for abnormal patterns with low latency.
3. **Communicate:** LoRa mesh is the proposed primary field network, with cellular or satellite-assisted backhaul where available.
4. **Fuse intelligence:** cloud services can combine validated ground observations with weather and satellite sources.
5. **Act:** the dashboard presents risk, node health and actionable incident context to authorities and communities.

## Proposed hardware direction

The larger concept considers ESP32-S3 or STM32-class nodes, LoRa SX1276 communication, environmental sensors, GPS, solar power and an IP-rated enclosure. These are design targets for a student prototype, not a claim of completed nationwide deployment.

## Software stack

- React 18
- TypeScript
- Vite
- Lucide React
- Vercel Analytics

## Run locally

```bash
git clone https://github.com/SohamMondal88/EARTH-NET.git
cd EARTH-NET
npm install
npm run dev
```

Useful checks:

```bash
npm run typecheck
npm run build
```

## Team

Built by **AETHER-X**, led by [Soham Mondal](https://github.com/SohamMondal88), as a disaster-management innovation project.

## Responsible use

EARTH-NET is an educational prototype. Real deployments would require calibrated sensors, field validation, secure communications, redundancy, regulatory coordination and integration with official disaster-management processes.

## License

Released under the [MIT License](LICENSE).
