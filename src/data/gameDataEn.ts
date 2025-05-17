// src/data/gameDataEn.ts - English Version
import { Game } from '../types';

export const gameDataEn: Game[] = [
  {
    id: 1,
    title: 'F-ZERO',
    leagues: ['Knight', 'Queen', 'King'],
    machines: [
      {
        name: 'BLUE FALCON',
        pilot: 'Captain Falcon',
        specs: { 
          body: 'B', 
          boost: 'B', 
          grip: 'B',
          // Detailed specs
          topSpeed: 'A',
          boostSpeed: 'B',
          boostDuration: 'B',
          bodyStrength: 'B',
          cornering: 'B',
          balance: 'A',
          acceleration: 'B'
        },
        description: 'The signature machine of Captain Falcon, a famous bounty hunter. Features perfectly balanced performance, making it easy to handle for both beginners and experts. Its powerful G-Diffuser system ensures stable driving on any course. While Falcon fights against evil as an agent of justice, he also aims to win the F-ZERO Grand Prix.'
      },
      {
        name: 'GOLDEN FOX',
        pilot: 'Dr. Stewart',
        specs: { 
          body: 'C', 
          boost: 'A', 
          grip: 'E',
          // Detailed specs
          topSpeed: 'B',
          boostSpeed: 'A',
          boostDuration: 'A',
          bodyStrength: 'C',
          cornering: 'D',
          balance: 'C',
          acceleration: 'A'
        },
        description: 'The golden machine piloted by genius surgeon Dr. Robert Stewart, who entered F-ZERO races to continue his father\'s legacy. A high-risk, high-reward machine with lightweight design, excellent acceleration and powerful boost, but low durability and poor cornering. Stewart dedicates his racing prize money to medical research while continuing his practice as a doctor.'
      },
      {
        name: 'WILD GOOSE',
        pilot: 'Pico',
        specs: { 
          body: 'A', 
          boost: 'D', 
          grip: 'C', 
          // Detailed specs
          topSpeed: 'A',
          boostSpeed: 'D',
          boostDuration: 'D',
          bodyStrength: 'A',
          cornering: 'C',
          balance: 'B',
          acceleration: 'D'
        },
        description: 'Machine of Pico, a former military soldier who now works as a mercenary. Heavy with high top speed but slow acceleration. Its weight allows it to knock other machines away with impact. Pico\'s home planet Death Born is known for its harsh environment, where he developed extraordinary endurance and cunning that he uses in races.'
      },
      {
        name: 'FIRE STINGRAY',
        pilot: 'Samurai Goroh',
        specs: { 
          body: 'B', 
          boost: 'C', 
          grip: 'A',
          // Detailed specs
          topSpeed: 'A',
          boostSpeed: 'C',
          boostDuration: 'B',
          bodyStrength: 'B',
          cornering: 'A',
          balance: 'B',
          acceleration: 'C' 
        },
        description: 'The machine of space pirate Samurai Goroh. Excellent top speed on straightaways and superior cornering performance. Goroh is Captain Falcon\'s rival and former friend. While harboring complex feelings toward Falcon, he aims for victory in the F-ZERO Grand Prix and occasionally acts as a vigilante for justice.'
      }
    ]
  },
  /* ===== F-ZERO X (1998 / N64) ============================================ */
  {
    id: 2,
    title: 'F-ZERO X',
    leagues: ['Jack', 'Queen', 'King', 'Joker', 'X'],
    machines: [
      {
        name: 'RED GAZELLE',
        pilot: 'Mighty Gazelle',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: 'Machine of a former top racer who became a cyborg after an accident. Fragile body but powerful boost. The key is how to survive the early stages.'
      },
      {
        name: 'WHITE CAT',
        pilot: 'Jody Summer',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: 'White machine operated by a female Galactic Space Federation officer. Stable even in high-speed corners thanks to its top-class grip. Control-type machine for solid, long races.'
      },
      {
        name: 'GOLDEN FOX',
        pilot: 'Dr. Stewart',
        specs: { body: 'D', boost: 'A', grip: 'D' },
        description: 'Lightweight machine designed by the genius doctor. Amazing acceleration and boost but low durability. A technical machine suited for short-distance battles.'
      },
      {
        name: 'IRON TIGER',
        pilot: 'Baba',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: 'The iron tiger forged by Baba, a wild child from the jungle. Excellent turning performance and relatively strong against impacts, but modest acceleration.'
      },
      {
        name: 'FIRE STINGRAY',
        pilot: 'Samurai Goroh',
        specs: { body: 'A', boost: 'D', grip: 'B' },
        description: 'The purple lightning of space-wandering vigilante Goroh. Heavy and durable with high top speed. Slow at the start but excels on long straightaways.'
      },
      {
        name: 'WILD GOOSE',
        pilot: 'Pico',
        specs: { body: 'A', boost: 'B', grip: 'C' },
        description: 'Green machine driven by Pico, a former space military mercenary. Good balance of body and boost. Powerful pushing strength typical of heavy machines.'
      },
      {
        name: 'BLUE FALCON',
        pilot: 'Captain Falcon',
        specs: { body: 'B', boost: 'C', grip: 'B' },
        description: 'The versatile machine that symbolizes the series. Straightforward handling makes it accessible from beginners to advanced players. Truly the "Blue Falcon".'
      },
      {
        name: 'DEEP CLAW',
        pilot: 'Octoman',
        specs: { body: 'B', boost: 'B', grip: 'C' },
        description: 'Deep-sea machine operated by Octoman, a pirate from planet Takora. Average performance, with heavier handling being its distinctive feature.'
      },
      {
        name: 'GREAT STAR',
        pilot: 'Mr.EAD',
        specs: { body: 'E', boost: 'A', grip: 'D' },
        description: 'Dedicated vehicle of Mr.EAD, modeled after Nintendo\'s in-house robot. Paper-thin armor but first-class boost. Ramming is forbidden.'
      },
      {
        name: 'LITTLE WYVERN',
        pilot: 'James McCloud',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'The wyvern of the galactic mercenary group leader. Lightweight with smooth cornering. Careful line selection is needed to compensate for low durability.'
      },
      {
        name: 'MAD WOLF',
        pilot: 'Billy',
        specs: { body: 'B', boost: 'B', grip: 'C' },
        description: 'Rough Billy\'s mad dog. Average performance with decent weight, a mid-tier all-rounder that can handle contact racing.'
      },
      {
        name: 'SUPER PIRANHA',
        pilot: 'Kate Alen',
        specs: { body: 'B', boost: 'C', grip: 'B' },
        description: 'Diva Kate\'s vivid piranha. Lightweight with good acceleration, suited for technical courses. Be cautious of wall hits.'
      },
      {
        name: 'DEATH ANCHOR',
        pilot: 'Zoda',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: 'Criminal Zoda\'s black anchor. Boost-specialized with explosive power in the final stages, but paper-thin armor means taking damage is forbidden.'
      },
      {
        name: 'ASTRO ROBIN',
        pilot: 'Jack Levin',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: 'Idol racer Jack\'s star robin. Excellent grip for tight turns, but weaker boost requires precise driving.'
      },
      {
        name: 'BIG FANG',
        pilot: 'Bio Rex',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: 'Genetically modified dinosaur Bio Rex\'s fang machine. Excellent durability and A-class grip provide a good balance of offense and defense.'
      },
      {
        name: 'SONIC PHANTOM',
        pilot: 'The Skull',
        specs: { body: 'C', boost: 'A', grip: 'D' },
        description: 'Death reaper Skull\'s sonic ghost. Lightweight with high boost but low grip causes frequent slides. For advanced players.'
      },
      {
        name: 'GREEN PANTHER',
        pilot: 'Antonio Guster',
        specs: { body: 'A', boost: 'B', grip: 'D' },
        description: 'Ex-mafioso Guster\'s green panther. High durability and strong acceleration for a power-type that dominates from the start.'
      },
      {
        name: 'HYPER SPEEDER',
        pilot: 'Beastman',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: 'Beastman\'s hyper speeder. High grip makes maintaining racing lines easy and user-friendly.'
      },
      {
        name: 'SPACE ANGLER',
        pilot: 'Leon',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: 'Aquatic Leon\'s blue fish. Ultra-lightweight with excellent turning performance, weak to contact but great for time attacks.'
      },
      {
        name: 'KING METEOR',
        pilot: 'Super Arrow',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'Hero Super Arrow\'s king meteor. Paper armor but responsive handling makes it beginner-friendly.'
      },
      {
        name: 'QUEEN METEOR',
        pilot: 'Mrs. Arrow',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'Mrs. Arrow\'s queen meteor. Same specs as King Meteor but with slightly lighter handling for better maneuverability.'
      },
      {
        name: 'TWIN NORITTA',
        pilot: 'Gomar & Shioh',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: 'Ultra-lightweight machine co-piloted by alien twins. Excellent acceleration and boost but paper-thin durability. Avoid heavy machines and rely on slalom techniques.'
      },
      {
        name: 'NIGHT THUNDER',
        pilot: 'Silver Neelsen',
        specs: { body: 'B', boost: 'A', grip: 'E' },
        description: 'Lightning machine piloted by the veteran racer. High offensive capability and acceleration, but extremely low grip. Watch out for slipping.'
      },
      {
        name: 'WILD BOAR',
        pilot: 'Michael Chain',
        specs: { body: 'A', boost: 'C', grip: 'C' },
        description: 'Wild boar of the former police officer who now leads a gang. Heavy and durable with great resilience. Early braking is recommended as it tends to drift wide in corners.'
      },
      {
        name: 'BLOOD HAWK',
        pilot: 'Blood Falcon',
        specs: { body: 'B', boost: 'A', grip: 'E' },
        description: 'The crimson hawk piloted by Captain Falcon\'s clone. Boost-specialized with a powerful late-race rush. The challenge is compensating for its poor grip.'
      },
      {
        name: 'WONDER WASP',
        pilot: 'John Tanaka',
        specs: { body: 'D', boost: 'A', grip: 'D' },
        description: 'The official machine of Galactic Federation representative Tanaka. Good acceleration despite being lightweight. Fragile when attacked, so maintaining a clear racing line is essential.'
      },
      {
        name: 'MIGHTY TYPHOON',
        pilot: 'Draq',
        specs: { body: 'C', boost: 'A', grip: 'D' },
        description: 'The whirlwind machine of the super-strong alien Draq. Top-class acceleration among lightweights, but tends to excel in straightaways. Best suited for high-speed courses.'
      },
      {
        name: 'MIGHTY HURRICANE',
        pilot: 'Roger Buster',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'The storm machine wielded by the powerful wrestler. Average performance but lightweight body makes it vulnerable to wall impacts. Better to avoid contact with heavier machines.'
      },
      {
        name: 'CRAZY BEAR',
        pilot: 'Dr. Clash',
        specs: { body: 'A', boost: 'B', grip: 'E' },
        description: 'The power machine of elderly scientist Dr. Clash. Boasts high durability and pushing power, but has low grip with slider-like handling.'
      },
      {
        name: 'BLACK BULL',
        pilot: 'Black Shadow',
        specs: { body: 'A', boost: 'E', grip: 'A' },
        description: 'The black bull of the dark emperor Black Shadow. Has the best acceleration power in the series, but consumes boost rapidly. The strongest machine if you can control it.'
      }
    ]
  },
  /* ======================================================================= */
  
  /* ===== F-ZERO GX / AX (2003 / GC・AC) ===================================== */
  {
    id: 3,
    title: 'F-ZERO GX',
    leagues: ['Ruby', 'Sapphire', 'Emerald', 'Diamond', 'AX'],
    machines: [
      {
        name: 'RED GAZELLE',
        pilot: 'Mighty Gazelle',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: 'Machine loved by Mighty Gazelle who became a cyborg after an accident. Fragile body but equipped for short distances with instantaneous acceleration and strong boost.'
      },
      {
        name: 'WHITE CAT',
        pilot: 'Jody Summer',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: 'White cat machine of Galactic Space Federation officer Jody. With top-class grip, it remains stable even in high-speed corners. Solid for long races.'
      },
      {
        name: 'GOLDEN FOX',
        pilot: 'Dr. Stewart',
        specs: { body: 'D', boost: 'A', grip: 'D' },
        description: 'Golden fox designed by genius surgeon Stewart. Low durability due to light weight, but top-class acceleration and boost.'
      },
      {
        name: 'IRON TIGER',
        pilot: 'Baba',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: 'Iron tiger piloted by wild child Baba. Excellent grip and durability, but slow acceleration makes it sluggish at the start.'
      },
      {
        name: 'FIRE STINGRAY',
        pilot: 'Samurai Goroh',
        specs: { body: 'A', boost: 'D', grip: 'B' },
        description: 'Vigilante Goroh\'s purple lightning. Heavy and durable with high top speed. Slow at the start but dominates long straightaways.'
      },
      {
        name: 'WILD GOOSE',
        pilot: 'Pico',
        specs: { body: 'A', boost: 'B', grip: 'C' },
        description: 'Green goose ridden by mercenary Pico. Features an A-class body for impact resistance and above-average boost. Stability-oriented machine.'
      },
      {
        name: 'BLUE FALCON',
        pilot: 'Captain Falcon',
        specs: { body: 'B', boost: 'C', grip: 'B' },
        description: 'Captain Falcon\'s blue falcon. Known as the series\' standard machine with its balanced handling and versatile capabilities.'
      },
      {
        name: 'DEEP CLAW',
        pilot: 'Octoman',
        specs: { body: 'B', boost: 'B', grip: 'C' },
        description: 'Pirate Octoman\'s deep sea claw. Mid-weight with stable B/B/C specs. Steering is somewhat heavy but reliable in straightaways.'
      },
      {
        name: 'GREAT STAR',
        pilot: 'Mr. EAD',
        specs: { body: 'E', boost: 'A', grip: 'D' },
        description: 'Android Mr. EAD\'s star machine. Paper-thin armor but equipped with powerful boost. Damage management is essential.'
      },
      {
        name: 'LITTLE WYVERN',
        pilot: 'James McCloud',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'Small wyvern of mercenary leader James. Lightweight with good maneuverability but low durability. Precise line selection is important.'
      },
      {
        name: 'MAD WOLF',
        pilot: 'Billy',
        specs: { body: 'B', boost: 'B', grip: 'C' },
        description: 'Rough Billy\'s mad dog. Average performance with decent weight, a mid-tier all-rounder that can handle contact racing.'
      },
      {
        name: 'SUPER PIRANHA',
        pilot: 'Kate Alen',
        specs: { body: 'B', boost: 'C', grip: 'B' },
        description: 'Diva Kate\'s vivid piranha. Lightweight with good acceleration, suited for technical courses. Be cautious of wall hits.'
      },
      {
        name: 'DEATH ANCHOR',
        pilot: 'Zoda',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: 'Criminal Zoda\'s black anchor. Boost-specialized with explosive power in the final stages, but paper-thin armor means taking damage is forbidden.'
      },
      {
        name: 'ASTRO ROBIN',
        pilot: 'Jack Levin',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: 'Idol racer Jack\'s star robin. Excellent grip for tight turns, but weaker boost requires precise driving.'
      },
      {
        name: 'BIG FANG',
        pilot: 'Bio Rex',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: 'Genetically modified dinosaur Bio Rex\'s fang machine. Excellent durability and A-class grip provide a good balance of offense and defense.'
      },
      {
        name: 'SONIC PHANTOM',
        pilot: 'The Skull',
        specs: { body: 'C', boost: 'A', grip: 'D' },
        description: 'Death reaper Skull\'s sonic ghost. Lightweight with high boost but low grip causes frequent slides. For advanced players.'
      },
      {
        name: 'GREEN PANTHER',
        pilot: 'Antonio Guster',
        specs: { body: 'A', boost: 'B', grip: 'D' },
        description: 'Ex-mafioso Guster\'s green panther. High durability and strong acceleration for a power-type that dominates from the start.'
      },
      {
        name: 'HYPER SPEEDER',
        pilot: 'Beastman',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: 'Beastman\'s hyper speeder. High grip makes maintaining racing lines easy and user-friendly.'
      },
      {
        name: 'SPACE ANGLER',
        pilot: 'Leon',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: 'Aquatic Leon\'s blue fish. Ultra-lightweight with excellent turning performance, weak to contact but great for time attacks.'
      },
      {
        name: 'KING METEOR',
        pilot: 'Super Arrow',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'Hero Super Arrow\'s king meteor. Paper armor but responsive handling makes it beginner-friendly.'
      },
      {
        name: 'QUEEN METEOR',
        pilot: 'Mrs. Arrow',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'Mrs. Arrow\'s queen meteor. Same specs as King Meteor but with slightly lighter handling for better maneuverability.'
      },
      {
        name: 'TWIN NORITTA',
        pilot: 'Gomar & Shioh',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: 'Ultra-lightweight machine co-piloted by alien twins. Fastest acceleration class but paper-thin durability.'
      },
      {
        name: 'NIGHT THUNDER',
        pilot: 'Silver Neelsen',
        specs: { body: 'B', boost: 'A', grip: 'E' },
        description: 'Veteran Neelsen\'s thunder machine. Powerful with A-class boost but E-class grip makes it slippery. For experienced players.'
      },
      {
        name: 'WILD BOAR',
        pilot: 'Michael Chain',
        specs: { body: 'A', boost: 'C', grip: 'C' },
        description: 'Ex-cop Chain\'s wild boar. Heavy and durable with strong pushing power. A power-type machine.'
      },
      {
        name: 'BLOOD HAWK',
        pilot: 'Blood Falcon',
        specs: { body: 'B', boost: 'A', grip: 'E' },
        description: 'Blood Falcon\'s crimson machine. A-class boost for amazing late-race speed but difficult to control.'
      },
      {
        name: 'WONDER WASP',
        pilot: 'John Tanaka',
        specs: { body: 'D', boost: 'A', grip: 'D' },
        description: 'John Tanaka\'s official wasp. Lightweight with A-class boost. D-class durability requires clean racing.'
      },
      {
        name: 'MIGHTY TYHOON',
        pilot: 'Draq',
        specs: { body: 'C', boost: 'A', grip: 'D' },
        description: 'Super-strong alien Draq\'s typhoon machine. A-class acceleration with good cornering but average top speed.'
      },
      {
        name: 'MIGHTY HURRICANE',
        pilot: 'Roger Buster',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'Wrestler Roger\'s hurricane machine. Average performance with some weight but thin armor makes it weak against wall impacts.'
      },
      {
        name: 'CRAZY BEAR',
        pilot: 'Dr. Clash',
        specs: { body: 'A', boost: 'B', grip: 'E' },
        description: 'Dr. Clash\'s bear machine. A-class body makes it tank-like but E-class grip. Best used with wall-riding tactics.'
      },
      {
        name: 'BLACK BULL',
        pilot: 'Black Shadow',
        specs: { body: 'A', boost: 'E', grip: 'A' },
        description: 'Dark emperor Black Shadow\'s black bull. E-class acceleration but high durability and A-class grip make it one of the most formidable machines.'
      },
      /* ------- GX/AX Hidden Machines ------- */
      {
        name: 'DARK SCHNEIDER',
        pilot: 'Deathborn',
        specs: { body: 'A', boost: 'B', grip: 'D' },
        description: 'Grim reaper Deathborn\'s "dark wings." High durability and good acceleration but low grip makes turning sluggish.'
      },
      {
        name: 'FAT SHARK',
        pilot: 'Don Genie',
        specs: { body: 'A', boost: 'B', grip: 'E' },
        description: 'Don Genie\'s extra-wide shark. Heaviest weight class and straight-line specialist. Make sure to slow down before corners.'
      },
      {
        name: 'COSMIC DOLPHIN',
        pilot: 'Digi-Boy',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: 'Digi-Boy\'s cosmic dolphin. Lightweight with A-class boost and responsive handling, but E-class durability means taking damage is forbidden.'
      },
      {
        name: 'PINK SPIDER',
        pilot: 'Dai San Gen',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: 'Informant Dai San Gen\'s pink spider. Versatile C/C/A type that excels on technical courses.'
      },
      {
        name: 'MAGIC SEAGULL',
        pilot: 'Spade',
        specs: { body: 'B', boost: 'A', grip: 'E' },
        description: 'Magician Spade\'s white seagull. Great charging power and boost, but controlling its slipperiness is a challenge.'
      },
      {
        name: 'SILVER RAT',
        pilot: 'Daigoroh',
        specs: { body: 'D', boost: 'A', grip: 'D' },
        description: 'Goroh\'s son Daigoroh\'s silver rat. Light and user-friendly but thin armor. A boost-dependent sprint machine.'
      },
      {
        name: 'SPARK MOON',
        pilot: 'Princia Ramode',
        specs: { body: 'B', boost: 'C', grip: 'B' },
        description: 'Princess Princia\'s moonlight machine. B/C/B specs with no notable weaknesses and straightforward handling.'
      },
      {
        name: 'BUNNY FLASH',
        pilot: 'Lily Flyer',
        specs: { body: 'D', boost: 'B', grip: 'A' },
        description: 'Flower girl Lily\'s bunny machine. Uses exceptional grip to gain advantage in corners.'
      },
      {
        name: 'GROOVY TAXI',
        pilot: 'PJ',
        specs: { body: 'B', boost: 'D', grip: 'B' },
        description: 'Mysterious driver PJ\'s taxi. Long boost duration and medium body make it good for half-pipe sections.'
      },
      {
        name: 'ROLLING TURTLE',
        pilot: 'QQQ',
        specs: { body: 'A', boost: 'D', grip: 'B' },
        description: 'QQQ triplets\' rotating turtle. High durability and straight-line stability, but requires early braking for corners.'
      },
      {
        name: 'RAINBOW PHOENIX',
        pilot: 'Phoenix',
        specs: { body: 'B', boost: 'B', grip: 'C' },
        description: 'Future racer Phoenix\'s rainbow-colored machine. Balanced type where pit strategy and acceleration management are key.'
      }
    ]
  },
  /* ===== F-ZERO: Maximum Velocity (GBA / 2001) ==================== */
  {
    id: 4,
    title: 'F-ZERO: Maximum Velocity',
    leagues: ['Pawn Series', 'Knight Series', 'Bishop Series', 'Queen Series'],
    machines: [
      { 
        name: 'HOT VIOLET',
        pilot: 'Megan',
        specs: { 
          body: 'D', 
          boost: 'C', 
          grip: 'B',
          // Detailed specs
          topSpeed: 'C',
          boostSpeed: 'C',
          boostDuration: 'C',
          bodyStrength: 'D',
          cornering: 'B',
          balance: 'B',
          acceleration: 'B'
        }, 
        description: 'Average performance suitable for beginners. Excellent burst power but somewhat fragile armor. Megan is the daughter of a former F-ZERO pilot who has made a name for herself at a young age. Her delicate machine control inherited from her mother and strong mental fortitude allow her to maintain stable driving even on difficult courses.' 
      },
      { 
        name: 'FIRE BALL',
        pilot: 'Mickey Marcus',
        specs: { 
          body: 'B', 
          boost: 'C', 
          grip: 'C',
          // Detailed specs
          topSpeed: 'A',
          boostSpeed: 'C',
          boostDuration: 'C',
          bodyStrength: 'B',
          cornering: 'C',
          balance: 'B',
          acceleration: 'C'
        }, 
        description: 'High top speed and thick armor. Average acceleration and cornering but easy to handle. Mickey Marcus is a former military test pilot renowned for his piloting skills in extreme conditions. With his cool judgment and passionate racing spirit, he has gained support from a wide range of fans.' 
      },
      { 
        name: 'J.B. CRYSTAL',
        pilot: 'Jane B. Christie',
        specs: { 
          body: 'D', 
          boost: 'E', 
          grip: 'C',
          // Detailed specs
          topSpeed: 'D',
          boostSpeed: 'D',
          boostDuration: 'A+',
          bodyStrength: 'D',
          cornering: 'C',
          balance: 'C',
          acceleration: 'D'
        }, 
        description: 'Features long-duration boost. High stability but one of the worst top speeds. Jane B. Christie comes from a prestigious racing family. Known as a theorist, she uses perfect racing line calculations and excellent fuel efficiency to skillfully control races even under adverse conditions.' 
      },
      { 
        name: 'WIND WALKER',
        pilot: 'Nichi',
        specs: { 
          body: 'E', 
          boost: 'B', 
          grip: 'A',
          // Detailed specs
          topSpeed: 'B',
          boostSpeed: 'B',
          boostDuration: 'B',
          bodyStrength: 'E',
          cornering: 'A+',
          balance: 'B',
          acceleration: 'A'
        }, 
        description: 'Ultra-lightweight with excellent turning performance. Paper-thin armor requires caution with contact damage. Nichi is a young racer from a desert nomadic tribe. With a special ability to read natural winds, he bewilders other pilots with his nimble, wind-like control. Since even slight contact can severely damage his machine, clean racing is essential.' 
      },
      { 
        name: 'SLY JOKER',
        pilot: 'Lord Cyber',
        specs: { 
          body: 'C', 
          boost: 'A', 
          grip: 'C',
          // Detailed specs
          topSpeed: 'B',
          boostSpeed: 'A+',
          boostDuration: 'D',
          bodyStrength: 'C',
          cornering: 'C',
          balance: 'B',
          acceleration: 'A'
        }, 
        description: 'Trump card with a super-powerful 3-second boost. Average acceleration and durability. Lord Cyber is a mysterious cyborg racer who has lost his memories of his human days. His exceptional sense of unity with his machine allows for phenomenal acceleration in a short time. Various rumors circulate about his true identity.' 
      },
      { 
        name: 'SILVER THUNDER',
        pilot: 'Blitz Wagner',
        specs: { 
          body: 'A', 
          boost: 'A', 
          grip: 'D',
          // Detailed specs
          topSpeed: 'A+',
          boostSpeed: 'A',
          boostDuration: 'D',
          bodyStrength: 'A',
          cornering: 'D',
          balance: 'D',
          acceleration: 'C'
        }, 
        description: 'Top-class armor and top speed. Difficult to turn with short boost duration. Blitz Wagner is the son of a former F-ZERO champion. Aiming to surpass his father\'s glory, his driving style is characterized by intimidating other machines with his innate courage and overwhelming power. He tends to struggle on technical courses.' 
      },
      { 
        name: 'THE STINGRAY',
        pilot: 'Alexander O\'Neil',
        specs: { 
          body: 'B', 
          boost: 'E', 
          grip: 'C',
          // Detailed specs
          topSpeed: 'C',
          boostSpeed: 'D',
          boostDuration: 'A+',
          bodyStrength: 'B',
          cornering: 'C',
          balance: 'C',
          acceleration: 'E'
        }, 
        description: 'Features longest 12-second boost. Slow acceleration requires experienced handling. Alexander O\'Neil is a veteran racer known as a strategist. His long-duration boost compensates for his slow start, and his experience-based fuel management allows him to show strength in the latter half of races with his persistent racing style.' 
      },
      { 
        name: 'FALCON MK-2',
        pilot: 'Kent Akechi',
        specs: { 
          body: 'D', 
          boost: 'C', 
          grip: 'C',
          // Detailed specs
          topSpeed: 'B',
          boostSpeed: 'B',
          boostDuration: 'C',
          bodyStrength: 'D',
          cornering: 'C',
          balance: 'A',
          acceleration: 'B'
        }, 
        description: 'Improved machine directly derived from Blue Falcon. Balanced type but thin armor. Kent Akechi is a young racer who admires the legendary pilot Captain Falcon. His machine was designed with reference to the original Blue Falcon, and his racing style is characterized by flexibility that utilizes the machine\'s excellent balance.' 
      },
      { name: 'FIGHTING COMET', pilot: 'Kumiko',             specs: { body: 'E', boost: 'D', grip: 'D' }, description: 'Weakest armor but 9-second boost and high jump performance make it good for shortcuts.' },
      { name: 'JET VERMILION',  pilot: 'Professor Yazoo Jr.',specs: { body: 'A', boost: 'B', grip: 'E' }, description: '100 armor & powerful boost make this hidden machine strongest. A wild beast that barely turns.' }
    ]
  },
   
  /* ===== F-ZERO: GP Legend  (GBA / 2003) ==================== */
  {
    id: 5,
    title: 'F-ZERO: GP Legend',
    leagues: ['Bronze Cup', 'Silver Cup', 'Gold Cup'],
    machines: [
      {
        name: 'RED GAZELLE',
        pilot: 'Mighty Gazelle',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: 'Machine of Mighty Gazelle who became a cyborg after an accident. Fragile body but instantaneous acceleration and strong boost make it suitable for short-distance races.'
      },
      {
        name: 'WHITE CAT',
        pilot: 'Jody Summer',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: 'White cat machine of Galactic Police officer Jody. With top-class grip, it remains stable even in high-speed corners. Reliable in long races.'
      },
      {
        name: 'GOLDEN FOX',
        pilot: 'Dr. Stewart',
        specs: { body: 'D', boost: 'A', grip: 'D' },
        description: 'Golden fox designed by genius doctor Stewart. Low durability due to lightweight, but acceleration and boost are top-class.'
      },
      {
        name: 'IRON TIGER',
        pilot: 'Baba',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: 'Iron tiger driven by wild child Baba. Excels in grip and durability for both offense and defense, but weak boost makes it sluggish at the start.'
      },
      {
        name: 'FIRE STINGRAY',
        pilot: 'Samurai Goroh',
        specs: { body: 'A', boost: 'D', grip: 'B' },
        description: 'Vigilante Goroh\'s purple lightning. Dominates straightaways with weight and top speed. The key is how to compensate for slow early acceleration.'
      },
      {
        name: 'WILD GOOSE',
        pilot: 'Pico',
        specs: { body: 'A', boost: 'B', grip: 'C' },
        description: 'Mercenary Pico\'s green goose. A-body makes it strong against impacts, with above-average boost for a stability-oriented machine.'
      },
      {
        name: 'BLUE FALCON',
        pilot: 'Captain Falcon',
        specs: { body: 'B', boost: 'C', grip: 'B' },
        description: 'Captain Falcon\'s blue falcon. A versatile machine known as the series\' standard with straightforward handling.'
      },
      {
        name: 'DEEP CLAW',
        pilot: 'Octoman',
        specs: { body: 'B', boost: 'B', grip: 'C' },
        description: 'Pirate Octoman\'s deep sea claw. Middleweight with stable B/B/C specs. Heavier steering but straightforward in straightaways.'
      },
      {
        name: 'GREAT STAR',
        pilot: 'Mr. EAD',
        specs: { body: 'E', boost: 'A', grip: 'D' },
        description: 'Android Mr. EAD\'s star machine. Paper armor but equipped with first-class boost. Damage management is essential.'
      },
      {
        name: 'LITTLE WYVERN',
        pilot: 'James McCloud',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'Small wyvern of mercenary leader James. Lightweight with good turning but low durability makes careful line selection important.'
      },
      {
        name: 'MAD WOLF',
        pilot: 'Billy',
        specs: { body: 'B', boost: 'B', grip: 'C' },
        description: 'Rough Billy\'s mad dog. Average performance with good weight, a mid-tier all-rounder that can handle contact racing.'
      },
      {
        name: 'SUPER PIRANHA',
        pilot: 'Kate Alen',
        specs: { body: 'B', boost: 'C', grip: 'B' },
        description: 'Diva Kate\'s vivid piranha. Lightweight with good acceleration, suited for technical courses. Be cautious of wall hits.'
      },
      {
        name: 'DEATH ANCHOR',
        pilot: 'Zoda',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: 'Criminal Zoda\'s black anchor. Boost-specialized with explosive power in late stages, but paper-thin armor means taking damage is forbidden.'
      },
      {
        name: 'ASTRO ROBIN',
        pilot: 'Jack Levin',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: 'Popular young racer Jack\'s star robin. Excellent grip for quick turns, but weaker boost requires precise driving.'
      },
      {
        name: 'BIG FANG',
        pilot: 'Bio Rex',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: 'Genetically modified dinosaur Bio Rex\'s fang machine. High durability and A-grip provide excellent balance between offense and defense.'
      },
      {
        name: 'SONIC PHANTOM',
        pilot: 'The Skull',
        specs: { body: 'C', boost: 'A', grip: 'D' },
        description: 'Death reaper Skull\'s sonic ghost. Lightweight with high boost but low grip causes frequent slides. For advanced players.'
      },
      {
        name: 'GREEN PANTHER',
        pilot: 'Antonio Guster',
        specs: { body: 'A', boost: 'B', grip: 'D' },
        description: 'Ex-mafioso Guster\'s green panther. High durability and strong acceleration make this power-type dominant from the start.'
      },
      {
        name: 'HYPER SPEEDER',
        pilot: 'Beastman',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: 'Beastman\'s hyper speeder. High grip makes maintaining racing lines easy and user-friendly.'
      },
      {
        name: 'SPACE ANGLER',
        pilot: 'Leon',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: 'Aquatic Leon\'s blue fish. Ultra-lightweight with excellent turning performance, weak to contact but great for time attacks.'
      },
      {
        name: 'KING METEOR',
        pilot: 'Super Arrow',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'Hero Super Arrow\'s king meteor. Paper armor but responsive handling makes it beginner-friendly.'
      },
      {
        name: 'QUEEN METEOR',
        pilot: 'Mrs. Arrow',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'Mrs. Arrow\'s queen meteor. Same specs as King Meteor but with slightly lighter handling for better maneuverability.'
      },
      {
        name: 'TWIN NORITTA',
        pilot: 'Gomar & Shioh',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: 'Ultra-lightweight machine co-piloted by alien twins. Fastest acceleration class but paper-thin durability.'
      },
      {
        name: 'NIGHT THUNDER',
        pilot: 'Silver Neelsen',
        specs: { body: 'B', boost: 'A', grip: 'E' },
        description: 'Veteran Neelsen\'s thunder machine. A-class boost makes it powerful but E-class grip makes it slippery. For experienced players.'
      },
      {
        name: 'WILD BOAR',
        pilot: 'Michael Chain',
        specs: { body: 'A', boost: 'C', grip: 'C' },
        description: 'Ex-cop Chain\'s wild boar. Heavy and durable with strong pushing power. A power-type machine.'
      },
      {
        name: 'BLOOD HAWK',
        pilot: 'Blood Falcon',
        specs: { body: 'B', boost: 'A', grip: 'E' },
        description: 'Blood Falcon\'s crimson machine. A-class boost gives amazing late-race speed but is difficult to control.'
      },
      {
        name: 'WONDER WASP',
        pilot: 'John Tanaka',
        specs: { body: 'D', boost: 'A', grip: 'D' },
        description: 'John Tanaka\'s official wasp. Lightweight with A-class boost. D-class durability requires clean racing.'
      },
      {
        name: 'MIGHTY TYPHOON',
        pilot: 'Draq',
        specs: { body: 'C', boost: 'A', grip: 'D' },
        description: 'Super-strong alien Draq\'s typhoon. A-class acceleration and good cornering but average top speed.'
      },
      {
        name: 'MIGHTY HURRICANE',
        pilot: 'Roger Buster',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'Wrestler Roger\'s hurricane machine. Average performance with some weight but thin armor makes it weak against wall impacts.'
      },
      {
        name: 'CRAZY BEAR',
        pilot: 'Dr. Clash',
        specs: { body: 'A', boost: 'B', grip: 'E' },
        description: 'Dr. Clash\'s bear machine. A-class body makes it tank-like but E-class grip. Best used with wall-riding tactics.'
      },
      {
        name: 'BLACK BULL',
        pilot: 'Black Shadow',
        specs: { body: 'A', boost: 'E', grip: 'A' },
        description: 'Dark emperor Black Shadow\'s black bull. E-class acceleration but high durability and A-class grip make it one of the most formidable machines.'
      }
    ]
  },
  /* ===== F-ZERO: Climax  (GBA / 2004) ==================== */
  {
    id: 6,
    title: 'F-ZERO: Climax',
    leagues: ['Bronze Cup', 'Silver Cup', 'Gold Cup', 'Platinum Cup'],
    machines: [
      // GP Legend machines
      {
        name: 'RED GAZELLE',
        pilot: 'Mighty Gazelle',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: 'Machine of Mighty Gazelle who became a cyborg after an accident. Fragile body but instantaneous acceleration and strong boost make it suitable for short-distance races.'
      },
      {
        name: 'WHITE CAT',
        pilot: 'Jody Summer',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: 'White cat machine of Galactic Police officer Jody. With top-class grip, it remains stable even in high-speed corners. Reliable in long races.'
      },
      {
        name: 'GOLDEN FOX',
        pilot: 'Dr. Stewart',
        specs: { body: 'D', boost: 'A', grip: 'D' },
        description: 'Golden fox designed by genius doctor Stewart. Low durability due to lightweight, but acceleration and boost are top-class.'
      },
      {
        name: 'IRON TIGER',
        pilot: 'Baba',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: 'Iron tiger driven by wild child Baba. Excels in grip and durability for both offense and defense, but weak boost makes it sluggish at the start.'
      },
      {
        name: 'FIRE STINGRAY',
        pilot: 'Samurai Goroh',
        specs: { body: 'A', boost: 'D', grip: 'B' },
        description: 'Vigilante Goroh\'s purple lightning. Dominates straightaways with weight and top speed. The key is how to compensate for slow early acceleration.'
      },
      {
        name: 'WILD GOOSE',
        pilot: 'Pico',
        specs: { body: 'A', boost: 'B', grip: 'C' },
        description: 'Mercenary Pico\'s green goose. A-body makes it strong against impacts, with above-average boost for a stability-oriented machine.'
      },
      {
        name: 'BLUE FALCON',
        pilot: 'Captain Falcon',
        specs: { body: 'B', boost: 'C', grip: 'B' },
        description: 'Captain Falcon\'s blue falcon. A versatile machine known as the series\' standard with straightforward handling.'
      },
      {
        name: 'DEEP CLAW',
        pilot: 'Octoman',
        specs: { body: 'B', boost: 'B', grip: 'C' },
        description: 'Pirate Octoman\'s deep sea claw. Middleweight with stable B/B/C specs. Heavier steering but straightforward in straightaways.'
      },
      {
        name: 'GREAT STAR',
        pilot: 'Mr. EAD',
        specs: { body: 'E', boost: 'A', grip: 'D' },
        description: 'Android Mr. EAD\'s star machine. Paper armor but equipped with first-class boost. Damage management is essential.'
      },
      {
        name: 'LITTLE WYVERN',
        pilot: 'James McCloud',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'Small wyvern of mercenary leader James. Lightweight with good turning but low durability makes careful line selection important.'
      },
      {
        name: 'MAD WOLF',
        pilot: 'Billy',
        specs: { body: 'B', boost: 'B', grip: 'C' },
        description: 'Rough Billy\'s mad dog. Average performance with good weight, a mid-tier all-rounder that can handle contact racing.'
      },
      {
        name: 'SUPER PIRANHA',
        pilot: 'Kate Alen',
        specs: { body: 'B', boost: 'C', grip: 'B' },
        description: 'Diva Kate\'s vivid piranha. Lightweight with good acceleration, suited for technical courses. Be cautious of wall hits.'
      },
      {
        name: 'DEATH ANCHOR',
        pilot: 'Zoda',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: 'Criminal Zoda\'s black anchor. Boost-specialized with explosive power in late stages, but paper-thin armor means taking damage is forbidden.'
      },
      {
        name: 'ASTRO ROBIN',
        pilot: 'Jack Levin',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: 'Popular young racer Jack\'s star robin. Excellent grip for quick turns, but weaker boost requires precise driving.'
      },
      {
        name: 'BIG FANG',
        pilot: 'Bio Rex',
        specs: { body: 'B', boost: 'D', grip: 'A' },
        description: 'Genetically modified dinosaur Bio Rex\'s fang machine. High durability and A-grip provide excellent balance between offense and defense.'
      },
      {
        name: 'SONIC PHANTOM',
        pilot: 'The Skull',
        specs: { body: 'C', boost: 'A', grip: 'D' },
        description: 'Death reaper Skull\'s sonic ghost. Lightweight with high boost but low grip causes frequent slides. For advanced players.'
      },
      {
        name: 'GREEN PANTHER',
        pilot: 'Antonio Guster',
        specs: { body: 'A', boost: 'B', grip: 'D' },
        description: 'Ex-mafioso Guster\'s green panther. High durability and strong acceleration make this power-type dominant from the start.'
      },
      {
        name: 'HYPER SPEEDER',
        pilot: 'Beastman',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: 'Beastman\'s hyper speeder. High grip makes maintaining racing lines easy and user-friendly.'
      },
      {
        name: 'SPACE ANGLER',
        pilot: 'Leon',
        specs: { body: 'C', boost: 'C', grip: 'A' },
        description: 'Aquatic Leon\'s blue fish. Ultra-lightweight with excellent turning performance, weak to contact but great for time attacks.'
      },
      {
        name: 'KING METEOR',
        pilot: 'Super Arrow',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'Hero Super Arrow\'s king meteor. Paper armor but responsive handling makes it beginner-friendly.'
      },
      {
        name: 'QUEEN METEOR',
        pilot: 'Mrs. Arrow',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'Mrs. Arrow\'s queen meteor. Same specs as King Meteor but with slightly lighter handling for better maneuverability.'
      },
      {
        name: 'TWIN NORITTA',
        pilot: 'Gomar & Shioh',
        specs: { body: 'E', boost: 'A', grip: 'C' },
        description: 'Ultra-lightweight machine co-piloted by alien twins. Fastest acceleration class but paper-thin durability.'
      },
      {
        name: 'NIGHT THUNDER',
        pilot: 'Silver Neelsen',
        specs: { body: 'B', boost: 'A', grip: 'E' },
        description: 'Veteran Neelsen\'s thunder machine. A-class boost makes it powerful but E-class grip makes it slippery. For experienced players.'
      },
      {
        name: 'WILD BOAR',
        pilot: 'Michael Chain',
        specs: { body: 'A', boost: 'C', grip: 'C' },
        description: 'Ex-cop Chain\'s wild boar. Heavy and durable with strong pushing power. A power-type machine.'
      },
      {
        name: 'BLOOD HAWK',
        pilot: 'Blood Falcon',
        specs: { body: 'B', boost: 'A', grip: 'E' },
        description: 'Blood Falcon\'s crimson machine. A-class boost gives amazing late-race speed but is difficult to control.'
      },
      {
        name: 'WONDER WASP',
        pilot: 'John Tanaka',
        specs: { body: 'D', boost: 'A', grip: 'D' },
        description: 'John Tanaka\'s official wasp. Lightweight with A-class boost. D-class durability requires clean racing.'
      },
      {
        name: 'MIGHTY TYPHOON',
        pilot: 'Draq',
        specs: { body: 'C', boost: 'A', grip: 'D' },
        description: 'Super-strong alien Draq\'s typhoon. A-class acceleration and good cornering but average top speed.'
      },
      {
        name: 'MIGHTY HURRICANE',
        pilot: 'Roger Buster',
        specs: { body: 'E', boost: 'B', grip: 'B' },
        description: 'Wrestler Roger\'s hurricane machine. Average performance with some weight but thin armor makes it weak against wall impacts.'
      },
      {
        name: 'CRAZY BEAR',
        pilot: 'Dr. Clash',
        specs: { body: 'A', boost: 'B', grip: 'E' },
        description: 'Dr. Clash\'s bear machine. A-class body makes it tank-like but E-class grip. Best used with wall-riding tactics.'
      },
      {
        name: 'BLACK BULL',
        pilot: 'Black Shadow',
        specs: { body: 'A', boost: 'E', grip: 'A' },
        description: 'Dark emperor Black Shadow\'s black bull. E-class acceleration but high durability and A-class grip make it one of the most formidable machines.'
      },

      // GP Legend exclusive machines
      { name: 'DRAGON BIRD',      pilot: 'Rick Wheeler',              specs: { body: 'B', boost: 'B', grip: 'B' }, description: 'New model from the Galactic Police. Above-average performance in all areas with easy handling.' },
      { name: 'ELEGANCE LIBERTY', pilot: 'Lucy Liberty',              specs: { body: 'C', boost: 'C', grip: 'A' }, description: 'Female-oriented machine specializing in acceleration and cornering. Lower top speed.' },
      { name: 'MOON SHADOW',      pilot: 'Misaki Haruka / Miss Killer', specs: { body: 'B', boost: 'C', grip: 'B' }, description: 'Mysterious dark racer\'s machine. Balanced type with practical performance for actual races.' },
      { name: 'PANZER EMERALD',   pilot: 'Lisa Brilliant',            specs: { body: 'A', boost: 'C', grip: 'D' }, description: 'Heavy armor & high weight make it good for ramming. However, turning is sluggish.' },

      // Climax exclusive machines
      {
        name: 'DRAGON BIRD GT',
        pilot: 'Clank Hughes',
        specs: { body: 'B', boost: 'A', grip: 'B' },
        description: 'Enhanced version of the Dragon Bird. A significant upgrade with greatly improved boost performance.'
      },
      {
        name: 'RED BULL',
        pilot: 'Berserker',
        specs: { body: 'A', boost: 'B', grip: 'C' },
        description: 'Blood-red giant body. Top-class weight, armor, and top speed.'
      },
      {
        name: 'HYPER DEATH ANCHOR',
        pilot: 'Hyper Zoda',
        specs: { body: 'B', boost: 'A', grip: 'C' },
        description: 'Berserk form of the Death Anchor. Deadly acceleration and boost but tends to slip.'
      },
      {
        name: 'SOLDIER ANCHOR',
        pilot: 'Dark Soldier',
        specs: { body: 'D', boost: 'B', grip: 'B' },
        description: 'Mass-produced version of the Anchor series. Lightweight and easy to handle, ideal for beginners.'
      }
    ]
  },
   
  /* ===== F-ZERO 99  (Nintendo Switch Online / 2023) ==================== */
  {
    id: 7,
    title: 'F-ZERO 99',
    leagues: ['99 Player Mode'],
    machines: [
      { name: 'BLUE FALCON',  pilot: 'Captain Falcon', specs: { body: 'B', boost: 'B', grip: 'B' }, description: 'Captain Falcon\'s signature machine with well-balanced performance.' },
      { name: 'GOLDEN FOX',   pilot: 'Dr. Stewart',    specs: { body: 'C', boost: 'A', grip: 'E' }, description: 'Dr. Stewart\'s high-acceleration machine with extremely low grip.' },
      { name: 'WILD GOOSE',   pilot: 'Pico',           specs: { body: 'A', boost: 'D', grip: 'C' }, description: 'Pico\'s heavy, durable machine with slower acceleration but excellent stability.' },
      { name: 'FIRE STINGRAY',pilot: 'Samurai Goroh',  specs: { body: 'B', boost: 'C', grip: 'A' }, description: 'Samurai Goroh\'s machine featuring excellent grip and decent durability.' }
    ]
  }
]; 