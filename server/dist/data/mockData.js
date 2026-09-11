export const careerOverview = {
    worldChampionships: 7,
    grandPrixEntries: 356,
    raceWins: 105,
    polePositions: 104,
    podiums: 201,
    careerPoints: 4829.5,
    fastestLaps: 67,
    winPercentage: 29.5,
    polePercentage: 29.2
};
export const careerEras = [
    {
        id: 'ferrari',
        name: 'The Maranello Chapter',
        team: 'Scuderia Ferrari HP',
        years: '2025 – Present',
        primaryColor: '#FF1801',
        carModel: 'Ferrari SF-25',
        engine: '066/12 1.6L V6 Turbo Hybrid',
        championshipWins: [],
        description: 'The monumental union between the most decorated driver in Formula 1 history and motorsport’s most legendary team. The pursuit of an unprecedented 8th crown in iconic scarlet red.',
        highlights: [
            'Joined Scuderia Ferrari in multi-year marquee partnership',
            'First laps at Fiorano in front of thousands of Tifosi',
            'Targeting the definitive record 8th Drivers Championship'
        ]
    },
    {
        id: 'mercedes',
        name: 'The Silver Dynasty',
        team: 'Mercedes-AMG PETRONAS F1 Team',
        years: '2013 – 2024',
        primaryColor: '#00D2BE',
        carModel: 'Mercedes-AMG F1 W11 EQ Performance',
        engine: 'Mercedes M11 EQ 1.6L V6 Turbo Hybrid',
        championshipWins: [2014, 2015, 2017, 2018, 2019, 2020],
        description: 'The most dominant partnership in modern motorsport. Six World Drivers Championships, eight consecutive Constructors titles, and shattering every victory and pole record in existence.',
        highlights: [
            '6x World Drivers Championships (2014, 2015, 2017, 2018, 2019, 2020)',
            'Record-breaking 84 Grand Prix wins with a single constructor',
            'Record 9 Silverstone British GP victories',
            'W11 created the fastest lap in F1 history (Monza 2020, 264.362 km/h avg)'
        ]
    },
    {
        id: 'mclaren',
        name: 'The Breakthrough Era',
        team: 'Vodafone McLaren Mercedes',
        years: '2007 – 2012',
        primaryColor: '#FF8000',
        carModel: 'McLaren MP4-23',
        engine: 'Mercedes-Benz FO 108V 2.4L V8',
        championshipWins: [2008],
        description: 'Exploding onto the world stage with nine consecutive podiums as a rookie in 2007, followed by the heart-stopping 2008 World Championship triumph in the rain at Interlagos.',
        highlights: [
            '2008 World Drivers Champion (youngest champion at the time)',
            'Podium in first 9 career F1 races (all-time rookie record)',
            'First career victory: Canadian Grand Prix 2007',
            'Iconic rain masterclass: Silverstone 2008 winning by 68 seconds'
        ]
    }
];
export const championshipTrophies = [
    {
        year: 2020,
        team: 'Mercedes-AMG PETRONAS',
        car: 'W11 EQ Performance',
        points: 347,
        wins: 11,
        poles: 10,
        rival: 'Valtteri Bottas / Max Verstappen',
        decidingRace: 'Turkish Grand Prix (Istanbul Park)',
        quote: 'To all the kids out there who dream the impossible: you can do it too man. Never give up on yourself.'
    },
    {
        year: 2019,
        team: 'Mercedes-AMG PETRONAS',
        car: 'W10 EQ Power+',
        points: 413,
        wins: 11,
        poles: 5,
        rival: 'Valtteri Bottas',
        decidingRace: 'United States Grand Prix (Austin)',
        quote: 'What a privilege it is to work with this group of people. We keep pushing the boundaries.'
    },
    {
        year: 2018,
        team: 'Mercedes-AMG PETRONAS',
        car: 'W09 EQ Power+',
        points: 408,
        wins: 11,
        poles: 11,
        rival: 'Sebastian Vettel (Ferrari)',
        decidingRace: 'Mexican Grand Prix',
        quote: 'Love conquers all. From P14 in Hockenheim to this moment, belief was everything.'
    },
    {
        year: 2017,
        team: 'Mercedes-AMG PETRONAS',
        car: 'W08 EQ Power+',
        points: 363,
        wins: 9,
        poles: 11,
        rival: 'Sebastian Vettel (Ferrari)',
        decidingRace: 'Mexican Grand Prix',
        quote: 'I gave it everything today. Still I rise, whatever comes against us.'
    },
    {
        year: 2015,
        team: 'Mercedes-AMG PETRONAS',
        car: 'F1 W06 Hybrid',
        points: 381,
        wins: 10,
        poles: 11,
        rival: 'Nico Rosberg',
        decidingRace: 'United States Grand Prix (Austin)',
        quote: 'To match Ayrton Senna with three world titles was always my childhood dream.'
    },
    {
        year: 2014,
        team: 'Mercedes-AMG PETRONAS',
        car: 'F1 W05 Hybrid',
        points: 384,
        wins: 11,
        poles: 7,
        rival: 'Nico Rosberg',
        decidingRace: 'Abu Dhabi Grand Prix (Yas Marina)',
        quote: 'This is the greatest day of my life. It feels like the first time all over again.'
    },
    {
        year: 2008,
        team: 'Vodafone McLaren Mercedes',
        car: 'MP4-23',
        points: 98,
        wins: 5,
        poles: 7,
        rival: 'Felipe Massa (Ferrari)',
        decidingRace: 'Brazilian Grand Prix (Interlagos)',
        quote: 'Is that Glock?! Yes it is! Lewis Hamilton is the 2008 World Champion on the final corner!'
    }
];
export const products = [
    {
        id: 'lh-stealth-jacket',
        name: '+44 Stealth Aero Track Jacket',
        category: 'Outerwear',
        price: 185,
        currency: 'USD',
        tag: 'LIMITED DROP',
        description: 'Engineered from high-density technical nylon with reflective +44 aerodynamics piping, oversized silhouette, and custom fluo-yellow branded zipper pulls.',
        details: [
            'Water-repellent ripstop shell',
            'Reflective 3M #44 graphics',
            'Concealed pit-zip ventilation',
            'Articulated racing sleeves'
        ],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        colors: [
            { name: 'Carbon Void', hex: '#0A0B0E' },
            { name: 'Fluo Accent', hex: '#CCFF00' },
            { name: 'Ferrari Crimson', hex: '#FF1801' }
        ],
        stockCount: 14,
        featured: true,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'lh-heavyweight-hoodie',
        name: 'Still I Rise 500GSM Heavyweight Hoodie',
        category: 'Hoodies',
        price: 140,
        currency: 'USD',
        tag: 'SIGNATURE PIECE',
        description: 'Custom milled 500GSM ultra-dense organic French terry cotton. Features high-definition puff-print typography on reverse and subtle tonal #44 embroidery on hood crest.',
        details: [
            '500 GSM 100% organic cotton',
            'Vintage mineral wash finish',
            'Boxy drop-shoulder cut',
            'Pre-shrunk double-ribbed cuffs'
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
        colors: [
            { name: 'Obsidian', hex: '#0E1015' },
            { name: 'Amethyst', hex: '#9945FF' }
        ],
        stockCount: 28,
        featured: true,
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'lh-silverstone-cap',
        name: 'LH44 Race Spec 5-Panel Hat',
        category: 'Headwear',
        price: 55,
        currency: 'USD',
        tag: 'BESTSELLER',
        description: 'Motorsport spec 5-panel performance cap with laser-perforated airflow panels, structured curved brim, and magnetic quick-release backstrap.',
        details: [
            'Laser-cut aerodynamic venting',
            'Moisture-wicking internal sweatband',
            'Silicone 3D +44 rubber emblem',
            'Magnetic anodized metal fastener'
        ],
        sizes: ['ONE SIZE'],
        colors: [
            { name: 'Stealth Black', hex: '#111218' },
            { name: 'Fluo Yellow', hex: '#CCFF00' }
        ],
        stockCount: 42,
        featured: true,
        image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'lh-racing-tee',
        name: '+44 Telemetry Boxy T-Shirt',
        category: 'Collections',
        price: 70,
        currency: 'USD',
        tag: 'NEW ARRIVAL',
        description: 'Heavyweight 280GSM combed cotton tee featuring decoded telemetry coordinates from Lewis’s fastest lap at Silverstone printed across the spinal seam.',
        details: [
            '280 GSM premium cotton jersey',
            'Screenprinted Silverstone telemetry curves',
            'Relaxed vintage streetwear fit',
            'Reinforced collar rib'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        colors: [
            { name: 'Off-Black', hex: '#16171F' },
            { name: 'Bone White', hex: '#ECEAE4' }
        ],
        stockCount: 19,
        featured: false,
        image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 'lh-crossbody-bag',
        name: 'Paddock Modular Tactical Bag',
        category: 'Accessories',
        price: 95,
        currency: 'USD',
        tag: 'PADDOCK ESSENTIAL',
        description: 'Cordura ballistic nylon cross-chest utility pack with Fidlock V-buckle magnetic strap, waterproof taped zips, and padded pass sleeve.',
        details: [
            '1000D Cordura tear-proof fabric',
            'Fidlock German magnetic buckle',
            'Weather-sealed YKK Aquaguard zips',
            'Detachable key lanyard and radio clip'
        ],
        sizes: ['ONE SIZE'],
        colors: [
            { name: 'Night Matte', hex: '#0A0A0C' }
        ],
        stockCount: 8,
        featured: false,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80'
    }
];
export const missionInitiatives = [
    {
        id: 'stem-fellowship',
        title: 'Royal Academy of Engineering Inclusion Fellowship',
        category: 'STEM & Higher Education',
        grantAmount: '£1.5 Million',
        impactMetrics: '450+ Engineers Supported',
        summary: 'Direct funding providing undergraduate and postgraduate engineering scholarships to underrepresented students entering high-performance engineering & motorsport.',
        partner: 'Royal Academy of Engineering'
    },
    {
        id: 'girls-on-track',
        title: 'Motorsport UK: Girls on Track & Youth STEM',
        category: 'Youth Empowerment',
        grantAmount: '£750,000',
        impactMetrics: '12,000+ Girls Reached',
        summary: 'Nationwide hands-on workshops introducing school-age girls to mechanical engineering, race strategy, data science, and automotive design.',
        partner: 'Motorsport UK & FIA'
    },
    {
        id: 'inner-city-code',
        title: 'Inner City Robotics & Coding Accelerators',
        category: 'Tech & Digital Literacy',
        grantAmount: '£1.2 Million',
        impactMetrics: '35 Tech Labs Equipped',
        summary: 'State-of-the-art coding hubs established in underprivileged London, Birmingham, and Glasgow schools to bridge the technological divide.',
        partner: 'Teach First UK'
    },
    {
        id: 'neurodiversity-in-sport',
        title: 'Ignite Partnership: Inclusive Paddock Program',
        category: 'Diversity & Inclusion',
        grantAmount: '£2.0 Million',
        impactMetrics: '80+ Full-Time Placements',
        summary: 'Creating clear, barrier-free career pipelines for neurodiverse and diverse youth directly into Formula 1, WEC, and Formula E technical departments.',
        partner: 'Mercedes-Benz & Mission 44 Joint Fund'
    }
];
export const fanMessages = [
    {
        id: 'msg-1',
        author: 'Elena Rossi',
        handle: '@elena_f1_monza',
        country: 'Italy',
        flag: '🇮🇹',
        message: 'Benvenuto a Maranello Lewis! The entire Monza stands are already practicing the cheers in Italian. Title number 8 is waiting in red! ❤️🏎️',
        timestamp: '12 mins ago',
        likes: 342
    },
    {
        id: 'msg-2',
        author: 'Marcus Vance',
        handle: '@vance_speed44',
        country: 'United Kingdom',
        flag: '🇬🇧',
        message: 'Silverstone 2008 in the downpour, Silverstone 2024 with the tearful win... nobody does it like Sir Lewis. Still I Rise forever.',
        timestamp: '34 mins ago',
        likes: 819
    },
    {
        id: 'msg-3',
        author: 'Aiko Tanaka',
        handle: '@tanaka_lh',
        country: 'Japan',
        flag: '🇯🇵',
        message: 'Suzuka misses you already Lewis! Can’t wait to see you flying through the esses with the prancing horse next season! ⚡🏁',
        timestamp: '1 hour ago',
        likes: 215
    },
    {
        id: 'msg-4',
        author: 'Mateo Morales',
        handle: '@mateo_racing_br',
        country: 'Brazil',
        flag: '🇧🇷',
        message: 'Honorary Brazilian citizen and forever our idol in Interlagos! 2021 charge from P20 to P1 is motorsport folklore! 🇧🇷💛💚',
        timestamp: '2 hours ago',
        likes: 954
    }
];
export const radioClips = [
    {
        id: 'hammer-time',
        title: "Hammer Time",
        quote: "Lewis, it's Hammer Time.",
        speaker: "Peter 'Bono' Bonnington",
        context: "Signature call to unleash maximum engine mode and charge for the overcut.",
        circuit: "Global",
        year: 2020,
        audioTone: 'tactical'
    },
    {
        id: 'still-i-rise',
        title: "To All The Kids Dreaming The Impossible",
        quote: "That's for all the kids out there who dream the impossible. You can do it too man, don't ever doubt yourself. Still we rise!",
        speaker: "Lewis Hamilton",
        context: "Crossing the finish line at Istanbul Park to seal the historic 7th World Championship.",
        circuit: "Istanbul Park, Turkey",
        year: 2020,
        audioTone: 'legendary'
    },
    {
        id: 'leave-me-to-it',
        title: "Leave Me To It Bono",
        quote: "Leave me to it Bono, I got this under control.",
        speaker: "Lewis Hamilton",
        context: "Managing worn tires under relentless pressure to take an improbable victory.",
        circuit: "Monaco GP",
        year: 2019,
        audioTone: 'aggressive'
    },
    {
        id: 'through-goes-hamilton',
        title: "Through Goes Hamilton!",
        quote: "They go wheel to wheel... through goes Hamilton! Unbelievable scenes at Brooklands!",
        speaker: "David Croft (Sky Sports)",
        context: "Sensational double-overtake on Perez and Leclerc at Silverstone.",
        circuit: "Silverstone, Great Britain",
        year: 2022,
        audioTone: 'celebration'
    }
];
export const circuits = [
    {
        id: 'silverstone',
        name: 'Silverstone Grand Prix Circuit',
        country: 'United Kingdom',
        flag: '🇬🇧',
        lengthKm: 5.891,
        turns: 18,
        lapRecord: '1:24.303',
        recordHolder: 'Lewis Hamilton (Mercedes W11)',
        recordYear: 2020,
        hamiltonWins: 9,
        description: 'Lewis Hamilton’s spiritual home and the theater of his historic record 9 British Grand Prix victories. High-downforce, ultra-high-speed sweeps that stress car and driver to 5G.',
        pathD: 'M 220 50 C 260 50, 310 70, 340 90 C 370 110, 420 120, 450 140 C 470 160, 460 200, 430 220 C 400 240, 370 230, 340 245 C 310 260, 290 300, 260 310 C 230 320, 180 300, 160 280 C 140 260, 120 220, 90 200 C 60 180, 40 140, 60 110 C 80 80, 140 85, 170 80 Z',
        zones: [
            { startPct: 0.00, endPct: 0.08, name: 'Abbey (Turn 1)', sector: 1, targetSpeed: 280, gear: 7, throttle: 90, brake: 10, drs: false, latG: 4.1, longG: -0.8 },
            { startPct: 0.08, endPct: 0.16, name: 'Farm Curve & Village', sector: 1, targetSpeed: 110, gear: 2, throttle: 15, brake: 95, drs: false, latG: -3.2, longG: -4.5 },
            { startPct: 0.16, endPct: 0.24, name: 'The Loop & Aintree', sector: 1, targetSpeed: 95, gear: 2, throttle: 55, brake: 25, drs: false, latG: -2.8, longG: 1.2 },
            { startPct: 0.24, endPct: 0.40, name: 'Wellington Straight', sector: 1, targetSpeed: 325, gear: 8, throttle: 100, brake: 0, drs: true, latG: 0.1, longG: 1.8 },
            { startPct: 0.40, endPct: 0.48, name: 'Brooklands & Luffield', sector: 2, targetSpeed: 135, gear: 3, throttle: 30, brake: 85, drs: false, latG: -3.9, longG: -4.2 },
            { startPct: 0.48, endPct: 0.55, name: 'Woodcote', sector: 2, targetSpeed: 245, gear: 6, throttle: 98, brake: 0, drs: false, latG: 2.7, longG: 1.4 },
            { startPct: 0.55, endPct: 0.64, name: 'Copse Corner (Flat Out)', sector: 2, targetSpeed: 290, gear: 8, throttle: 92, brake: 5, drs: false, latG: 4.9, longG: -0.5 },
            { startPct: 0.64, endPct: 0.76, name: 'Maggotts & Becketts', sector: 2, targetSpeed: 260, gear: 7, throttle: 65, brake: 40, drs: false, latG: -4.8, longG: -2.1 },
            { startPct: 0.76, endPct: 0.88, name: 'Hangar Straight (Top Speed)', sector: 3, targetSpeed: 342, gear: 8, throttle: 100, brake: 0, drs: true, latG: 0.0, longG: 1.9 },
            { startPct: 0.88, endPct: 0.94, name: 'Stowe Corner', sector: 3, targetSpeed: 195, gear: 5, throttle: 20, brake: 80, drs: false, latG: 4.2, longG: -4.0 },
            { startPct: 0.94, endPct: 1.00, name: 'Vale & Club Chicane', sector: 3, targetSpeed: 120, gear: 2, throttle: 40, brake: 70, drs: false, latG: -3.5, longG: -3.2 },
        ]
    },
    {
        id: 'monza',
        name: 'Autodromo Nazionale Monza',
        country: 'Italy',
        flag: '🇮🇹',
        lengthKm: 5.793,
        turns: 11,
        lapRecord: '1:18.887',
        recordHolder: 'Lewis Hamilton (Mercedes W11)',
        recordYear: 2020,
        hamiltonWins: 5,
        description: 'The Temple of Speed and the beating heart of Ferrari Tifosi. Lewis clocked the all-time fastest lap in Formula 1 history here at an unbelievable average speed of 264.362 km/h (164.267 mph).',
        pathD: 'M 160 60 L 360 60 C 400 65, 430 95, 430 140 L 430 260 C 430 300, 390 325, 340 320 C 300 315, 270 280, 260 250 L 250 200 C 240 180, 220 180, 210 200 L 200 250 C 190 290, 160 315, 120 310 C 80 305, 60 265, 60 220 L 60 140 C 60 90, 100 60, 160 60 Z',
        zones: [
            { startPct: 0.00, endPct: 0.15, name: 'Rettifilo Main Straight', sector: 1, targetSpeed: 352, gear: 8, throttle: 100, brake: 0, drs: true, latG: 0.1, longG: 1.9 },
            { startPct: 0.15, endPct: 0.25, name: 'Variante del Rettifilo (T1-T2)', sector: 1, targetSpeed: 75, gear: 1, throttle: 20, brake: 100, drs: false, latG: -3.8, longG: -5.4 },
            { startPct: 0.25, endPct: 0.38, name: 'Curva Grande (Biassono)', sector: 1, targetSpeed: 310, gear: 7, throttle: 100, brake: 0, drs: false, latG: 3.4, longG: 1.1 },
            { startPct: 0.38, endPct: 0.50, name: 'Variante della Roggia (T4-T5)', sector: 2, targetSpeed: 115, gear: 2, throttle: 35, brake: 90, drs: false, latG: -3.6, longG: -4.8 },
            { startPct: 0.50, endPct: 0.62, name: 'Curva di Lesmo 1 & 2', sector: 2, targetSpeed: 180, gear: 4, throttle: 70, brake: 45, drs: false, latG: 4.2, longG: -1.2 },
            { startPct: 0.62, endPct: 0.78, name: 'Curva del Serraglio & Straight', sector: 2, targetSpeed: 340, gear: 8, throttle: 100, brake: 0, drs: true, latG: -0.2, longG: 1.8 },
            { startPct: 0.78, endPct: 0.88, name: 'Variante Ascari (T8-T9-T10)', sector: 3, targetSpeed: 235, gear: 5, throttle: 60, brake: 70, drs: false, latG: 4.6, longG: -3.6 },
            { startPct: 0.88, endPct: 1.00, name: 'Curva Parabolica (Alboreto)', sector: 3, targetSpeed: 260, gear: 6, throttle: 85, brake: 35, drs: false, latG: -4.4, longG: 0.8 }
        ]
    },
    {
        id: 'spa',
        name: 'Circuit de Spa-Francorchamps',
        country: 'Belgium',
        flag: '🇧🇪',
        lengthKm: 7.004,
        turns: 19,
        lapRecord: '1:41.252',
        recordHolder: 'Lewis Hamilton (Mercedes W11)',
        recordYear: 2020,
        hamiltonWins: 5,
        description: 'The legendary Ardennes rollercoaster featuring the compression of Eau Rouge and the blind crest of Raidillon. The longest track on the Formula 1 calendar with breathtaking elevation changes.',
        pathD: 'M 140 100 L 220 90 C 250 85, 270 65, 290 60 C 320 55, 360 80, 390 110 C 430 150, 460 210, 440 250 C 420 290, 370 290, 330 270 C 300 255, 270 250, 240 270 C 210 290, 180 320, 140 320 C 90 320, 60 270, 70 210 C 75 180, 95 140, 140 100 Z',
        zones: [
            { startPct: 0.00, endPct: 0.10, name: 'La Source Hairpin (Turn 1)', sector: 1, targetSpeed: 80, gear: 1, throttle: 20, brake: 95, drs: false, latG: 2.8, longG: -4.6 },
            { startPct: 0.10, endPct: 0.22, name: 'Eau Rouge & Raidillon', sector: 1, targetSpeed: 305, gear: 7, throttle: 100, brake: 0, drs: false, latG: -4.9, longG: 2.1 },
            { startPct: 0.22, endPct: 0.38, name: 'Kemmel Straight (DRS)', sector: 1, targetSpeed: 345, gear: 8, throttle: 100, brake: 0, drs: true, latG: 0.0, longG: 1.7 },
            { startPct: 0.38, endPct: 0.48, name: 'Les Combes & Malmedy', sector: 2, targetSpeed: 140, gear: 3, throttle: 40, brake: 85, drs: false, latG: 3.8, longG: -4.2 },
            { startPct: 0.48, endPct: 0.60, name: 'Bruxelles Hairpin', sector: 2, targetSpeed: 105, gear: 2, throttle: 35, brake: 60, drs: false, latG: 3.5, longG: -2.2 },
            { startPct: 0.60, endPct: 0.72, name: 'Pouhon (Double Apex 5G)', sector: 2, targetSpeed: 290, gear: 7, throttle: 90, brake: 15, drs: false, latG: -5.1, longG: -1.0 },
            { startPct: 0.72, endPct: 0.88, name: 'Campus, Stavelot & Blanchimont', sector: 3, targetSpeed: 320, gear: 8, throttle: 100, brake: 0, drs: true, latG: 4.2, longG: 1.5 },
            { startPct: 0.88, endPct: 1.00, name: 'Bus Stop Chicane', sector: 3, targetSpeed: 75, gear: 1, throttle: 25, brake: 100, drs: false, latG: -3.4, longG: -5.0 }
        ]
    },
    {
        id: 'interlagos',
        name: 'Autódromo José Carlos Pace (Interlagos)',
        country: 'Brazil',
        flag: '🇧🇷',
        lengthKm: 4.309,
        turns: 15,
        lapRecord: '1:07.281',
        recordHolder: 'Lewis Hamilton (Mercedes W09)',
        recordYear: 2018,
        hamiltonWins: 3,
        description: 'An amphitheater of emotion and honorary citizenship for Lewis. The site of his heart-stopping 2008 World Championship triumph and his unforgettable 2021 charge from 20th to 1st carrying the Brazilian flag.',
        pathD: 'M 180 80 C 230 75, 290 70, 330 90 C 370 110, 390 160, 370 200 C 350 240, 310 240, 270 210 C 230 180, 190 200, 170 240 C 150 280, 130 310, 90 290 C 50 270, 40 210, 60 160 C 80 110, 130 85, 180 80 Z',
        zones: [
            { startPct: 0.00, endPct: 0.16, name: 'Senna S (Descida do Sol)', sector: 1, targetSpeed: 125, gear: 2, throttle: 35, brake: 90, drs: false, latG: -4.4, longG: -4.5 },
            { startPct: 0.16, endPct: 0.32, name: 'Curva do Sol & Reta Oposta', sector: 1, targetSpeed: 330, gear: 8, throttle: 100, brake: 0, drs: true, latG: 2.5, longG: 1.8 },
            { startPct: 0.32, endPct: 0.48, name: 'Descida do Lago (T4-T5)', sector: 2, targetSpeed: 155, gear: 3, throttle: 45, brake: 80, drs: false, latG: 3.9, longG: -3.8 },
            { startPct: 0.48, endPct: 0.62, name: 'Ferradura & Pinheirinho', sector: 2, targetSpeed: 185, gear: 4, throttle: 65, brake: 40, drs: false, latG: -4.1, longG: -1.5 },
            { startPct: 0.62, endPct: 0.78, name: 'Bico de Pato & Mergulho', sector: 2, targetSpeed: 90, gear: 2, throttle: 30, brake: 85, drs: false, latG: 3.6, longG: -3.2 },
            { startPct: 0.78, endPct: 0.90, name: 'Junção (Crucial Traction)', sector: 3, targetSpeed: 130, gear: 3, throttle: 80, brake: 40, drs: false, latG: -3.2, longG: 1.2 },
            { startPct: 0.90, endPct: 1.00, name: 'Subida dos Boxes (Full Throttle)', sector: 3, targetSpeed: 320, gear: 8, throttle: 100, brake: 0, drs: true, latG: -2.1, longG: 1.7 }
        ]
    },
    {
        id: 'monaco',
        name: 'Circuit de Monaco',
        country: 'Monaco',
        flag: '🇲🇨',
        lengthKm: 3.337,
        turns: 19,
        lapRecord: '1:10.166',
        recordHolder: 'Lewis Hamilton (Mercedes W10)',
        recordYear: 2019,
        hamiltonWins: 3,
        description: 'The crown jewel of motorsport where precision is measured in millimeters against unforgiving Armco barriers. Lewis defended on ruined tires for 67 laps in 2019 to take his legendary emotional tribute win.',
        pathD: 'M 120 180 L 190 120 C 230 80, 280 90, 320 120 C 350 145, 380 190, 370 230 C 360 260, 320 280, 290 250 C 260 220, 230 220, 210 250 L 180 290 C 150 320, 110 310, 80 280 C 50 250, 70 210, 120 180 Z',
        zones: [
            { startPct: 0.00, endPct: 0.12, name: 'Sainte Dévote (Turn 1)', sector: 1, targetSpeed: 105, gear: 2, throttle: 40, brake: 85, drs: false, latG: 3.2, longG: -4.0 },
            { startPct: 0.12, endPct: 0.28, name: 'Beau Rivage & Massenet', sector: 1, targetSpeed: 275, gear: 6, throttle: 95, brake: 15, drs: false, latG: -3.8, longG: 1.4 },
            { startPct: 0.28, endPct: 0.40, name: 'Casino Square & Mirabeau', sector: 1, targetSpeed: 140, gear: 3, throttle: 45, brake: 75, drs: false, latG: 3.4, longG: -3.5 },
            { startPct: 0.40, endPct: 0.52, name: 'Grand Hotel Hairpin (Tightest T6)', sector: 2, targetSpeed: 48, gear: 1, throttle: 15, brake: 90, drs: false, latG: 2.5, longG: -3.0 },
            { startPct: 0.52, endPct: 0.65, name: 'Portier & The Tunnel', sector: 2, targetSpeed: 295, gear: 7, throttle: 100, brake: 0, drs: false, latG: -2.1, longG: 1.6 },
            { startPct: 0.65, endPct: 0.78, name: 'Nouvelle Chicane (Heavy Braking)', sector: 2, targetSpeed: 70, gear: 1, throttle: 20, brake: 100, drs: false, latG: 3.7, longG: -5.1 },
            { startPct: 0.78, endPct: 0.88, name: 'Tabac & Swimming Pool (Piscine)', sector: 3, targetSpeed: 215, gear: 5, throttle: 80, brake: 35, drs: false, latG: -4.5, longG: 0.5 },
            { startPct: 0.88, endPct: 1.00, name: 'La Rascasse & Antony Noghès', sector: 3, targetSpeed: 65, gear: 1, throttle: 25, brake: 90, drs: false, latG: 3.2, longG: -4.2 }
        ]
    }
];
export const helmets = [
    {
        id: 'helmet-2025-ferrari',
        year: 2025,
        name: 'Scuderia Ferrari Debut Spec',
        category: 'Ferrari Era',
        team: 'Scuderia Ferrari HP',
        baseColor: 'Rosso Corsa & Exposed Carbon',
        visorType: 'Iridescent Gold Mirror with Anti-Glare Strip',
        shellSpec: 'Bell HP77 FIA 8860-2018 ABP (Advanced Ballistic Protection)',
        accentColors: ['#FF1801', '#CCFF00', '#050507', '#FFFFFF'],
        occasion: 'Maranello Unveiling & 2025 Season Campaign',
        backstory: 'A momentous visual evolution. Blending the fabled Ferrari Rosso Corsa with Lewis’s personal neon fluo yellow #44 monogram and raw titanium accents. Features the Cavallino Rampante on the crown with Still I Rise inscribed in gold script across the rear carbon winglet.',
        quote: 'Joining Ferrari is childhood realization. This helmet represents the pride of Maranello infused with everything I have stood for throughout my life.',
        features: [
            'Cavallino Rampante Italian crest in 24K gold foil',
            'Matte exposed ultra-light ballistic carbon fiber weave',
            'Dual-plane aerodynamic gurney flaps on crown',
            'Tifosi red internal Nomex fire-retardant lining'
        ],
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
        featured: true
    },
    {
        id: 'helmet-2020-still-i-rise',
        year: 2020,
        name: 'Still I Rise 7th World Title Stealth Spec',
        category: 'Championship',
        team: 'Mercedes-AMG PETRONAS',
        baseColor: 'Matte Obsidian & Royal Amethyst',
        visorType: 'Dark Amethyst Chrome Tint',
        shellSpec: 'Bell HP77 Ultra Carbon',
        accentColors: ['#9945FF', '#0A0B0E', '#CCFF00'],
        occasion: 'Turkish Grand Prix (7th World Championship Clincher)',
        backstory: 'The most iconic livery of modern motorsport. Unveiled during the 2020 season to amplify the Black Lives Matter movement and equality in sport. Carried Lewis to 11 victories, equaling Michael Schumacher’s all-time record of 7 World Titles.',
        quote: 'That’s for all the kids out there who dream the impossible. You can do it too man. Still we rise!',
        features: [
            'Angel wings and Still I Rise custom calligraphy on crest',
            'Deep violet iridescent pearlescent side streaks',
            'FIA ABP ballistic composite forehead panel',
            'Won the historic wet Turkish GP from P6 to win by 31s'
        ],
        image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
        featured: true
    },
    {
        id: 'helmet-2021-senna-brazil',
        year: 2021,
        name: 'Ayrton Senna Tribute Brazil Spec',
        category: 'Tribute',
        team: 'Mercedes-AMG PETRONAS',
        baseColor: 'Brazilian Flag Yellow & Emerald Green',
        visorType: '24K Gold Iridium',
        shellSpec: 'Bell HP77 Advanced Ballistic',
        accentColors: ['#FFDF00', '#009C3B', '#002776', '#FFFFFF'],
        occasion: 'São Paulo Grand Prix (Interlagos 2021)',
        backstory: 'Paying homage to his lifelong idol Ayrton Senna at Interlagos. Lewis started 20th in the Sprint, had a 5-place engine penalty in the Grand Prix, and charged through the field in one of the greatest drives in F1 history, taking the victory and waving the Brazilian flag on the podium.',
        quote: 'Ayrton was the reason I wanted to drive. Racing in Brazil with this tribute on my helmet and carrying the flag will live with me forever.',
        features: [
            'Senna iconic double-stripe yellow & green livery',
            'Christ the Redeemer silhouette on rear flank',
            'Golden Brazilian laurel wreath crest',
            'Awarded Honorary Citizenship of Brazil following this race'
        ],
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
        featured: true
    },
    {
        id: 'helmet-2023-neon-fluo',
        year: 2023,
        name: 'Electric Fluo Yellow High-Vis Spec',
        category: 'Special Edition',
        team: 'Mercedes-AMG PETRONAS',
        baseColor: 'Highlighter Fluo Yellow',
        visorType: 'Electric Purple Mirror',
        shellSpec: 'Bell HP77 Lightweight Carbon',
        accentColors: ['#CCFF00', '#9945FF', '#111218'],
        occasion: '2023 Full Campaign & Silverstone Pole',
        backstory: 'Designed specifically to stand out under floodlights and in TV cockpits. The high-vis neon yellow is Lewis’s signature personal colorway, perfectly contrasted against custom deep purple chrome winglets.',
        quote: 'I wanted something so bright and striking that people could immediately spot car 44 from anywhere on the grandstands.',
        features: [
            'Dayglo fluo-yellow paint developed with automotive pigments',
            'Purple titanium visor pivot hardware',
            'Integrated communications microphone & hydration quick-coupler',
            'Secured Lewis’s 104th career pole position at the Hungaroring'
        ],
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
        featured: false
    },
    {
        id: 'helmet-2014-gold-championship',
        year: 2014,
        name: 'Turbo-Hybrid Dawn Gold & White Spec',
        category: 'Championship',
        team: 'Mercedes-AMG PETRONAS',
        baseColor: 'Pearlescent White & 24K Gold Leaf',
        visorType: 'Silver Mirror Anti-Fog',
        shellSpec: 'Arai GP-6 RC Carbon',
        accentColors: ['#F5F5F7', '#D4AF37', '#00D2BE'],
        occasion: 'Abu Dhabi GP (2nd World Title Decider)',
        backstory: 'Marking the historic beginning of the Mercedes-AMG Turbo-Hybrid dynasty. Lewis took 11 victories in 2014 with this pearl and gold livery, sealing the championship under the Yas Marina floodlights.',
        quote: 'This is the greatest day of my life. It feels like the first time all over again.',
        features: [
            'Genuine 24-karat gold leaf detailing on the brow',
            'Inaugural championship season with Mercedes-AMG',
            'Signature wings crest first established on crown',
            'Petronas teal pinstripes'
        ],
        image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
        featured: false
    },
    {
        id: 'helmet-2008-classic-karting',
        year: 2008,
        name: 'Anthony Hamilton Classic Karting Yellow',
        category: 'Championship',
        team: 'Vodafone McLaren Mercedes',
        baseColor: 'Sunburst Racing Yellow',
        visorType: 'Dark Smoke Tint',
        shellSpec: 'Arai GP-5 PED Carbon Kevlar',
        accentColors: ['#FFD700', '#FF0000', '#0055A5'],
        occasion: 'Brazilian Grand Prix (1st World Title Triumph)',
        backstory: 'The original colorway hand-painted by Lewis’s father Anthony when young Lewis was racing cadet karts in Stevenage, chosen so Anthony could always spot his son in a pack of 30 karts. Lewis carried this exact livery to his rookie 2007 season and 2008 World Championship.',
        quote: 'My dad painted my first helmet with yellow so he could see me on track. That color represents the sacrifices my family made to get me here.',
        features: [
            'Historic red and blue McLaren ribbons on sunburst yellow',
            'Aerodynamic duckbill chin spoiler and front chin ducts',
            'Youngest World Champion in Formula 1 history at the time',
            'Immortalized in the final lap pass at Interlagos'
        ],
        image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
        featured: false
    },
    {
        id: 'helmet-2019-lauda-tribute',
        year: 2019,
        name: 'Niki Lauda Monaco Tribute Spec',
        category: 'Tribute',
        team: 'Mercedes-AMG PETRONAS',
        baseColor: 'Solid Classic Racing Red',
        visorType: 'Deep Smoke Anti-Glare',
        shellSpec: 'Bell HP77 ABP',
        accentColors: ['#E10600', '#FFFFFF', '#111218'],
        occasion: 'Monaco Grand Prix 2019',
        backstory: 'Painted in solid red with "Niki Lauda" inscribed across the brow following the loss of Non-Executive Chairman and close friend Niki Lauda. Lewis held off relentless attacks on worn medium tires for 67 laps to win and pointed to the heavens on the podium.',
        quote: 'I was fighting for Niki out there. He was an integral part of our team and a dear friend. This win was solely for him.',
        features: [
            'Replica of Niki Lauda’s 1970s Ferrari championship helmet livery',
            'NIKI nameplate across forehead band',
            'Red halo on car matching helmet colorway',
            'Emotional victory holding off Max Verstappen for 67 laps'
        ],
        image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
        featured: false
    },
    {
        id: 'helmet-2021-qatar-rainbow',
        year: 2021,
        name: 'We Stand Together Rainbow Pride Spec',
        category: 'Special Edition',
        team: 'Mercedes-AMG PETRONAS',
        baseColor: 'Metallic Black & Progress Pride Rainbow',
        visorType: 'Iridescent Chrome Rainbow',
        shellSpec: 'Bell HP77 ABP',
        accentColors: ['#FF0018', '#FFA52C', '#FFFF41', '#008018', '#0000F9', '#86007D'],
        occasion: 'Qatar Grand Prix (Losail Circuit)',
        backstory: 'A powerful global statement for equality, LGBTQ+ rights, and human dignity. Lewis wore the Progress Pride flag integrated into his helmet under the floodlights of Qatar and Saudi Arabia, qualifying on pole by 0.45s and dominating the race from lights to flag.',
        quote: 'Sport has a duty to raise awareness and stand up for human rights. We stand together for equality everywhere we race.',
        features: [
            'Full spectrum Progress Pride gradient wrapping across the helmet shell',
            '"We Stand Together" inscription on reverse winglet',
            'Dominant pole position and victory under Qatar lights',
            'Praised worldwide by human rights and sports organizations'
        ],
        image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
        featured: false
    }
];
