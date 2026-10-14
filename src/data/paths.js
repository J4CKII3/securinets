// One entry per workshop category. Edit freely: the Home page and Workshops page both read this file.
// "cover" must have 4 items, ordered from Beginner to Expert.
export const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export const paths = [
  {
    slug: 'web',
    name: 'Web Exploitation',
    summary:
      'Find and exploit weaknesses in web applications, from careless input handling to broken authentication, in labs built for exactly that.',
    cover: [
      'HTTP, browsers and how the web works',
      'Injection: SQL, commands and templates',
      'Authentication, sessions and access control',
      'Chaining small bugs into a full compromise',
    ],
    resources: [
      { name: 'PortSwigger Web Security Academy', url: 'https://portswigger.net/web-security', note: 'Free, structured labs for every major vulnerability class' },
      { name: 'OWASP Juice Shop', url: 'https://owasp.org/www-project-juice-shop/', note: 'A deliberately insecure shop to practise on' },
      { name: 'PentesterLab', url: 'https://pentesterlab.com', note: 'Guided exercises from basics to advanced' },
    ],
  },
  {
    slug: 'binary',
    name: 'Binary Exploitation',
    summary:
      'Understand how programs use memory, and how a crash turns into controlled execution, using legal practice environments.',
    cover: [
      'Linux and assembly',
      'Stack overflows',
      'Return-oriented programming',
      'Heap exploitation',
    ],
    resources: [
      { name: 'pwn.college', url: 'https://pwn.college', note: 'Hands-on modules from the foundations up to exploitation' },
      { name: 'ROP Emporium', url: 'https://ropemporium.com', note: 'Focused return-oriented programming challenges' },
      { name: 'Exploit Education', url: 'https://exploit.education', note: 'Classic vulnerable systems and exercises' },
    ],
  },
  {
    slug: 'reverse',
    name: 'Reverse Engineering',
    summary:
      'Take compiled programs apart and work out what they do without ever seeing the source code.',
    cover: [
      'Reading assembly and calling conventions',
      'Static analysis with a decompiler',
      'Debugging and dynamic analysis',
      'Obfuscation, packers and custom virtual machines',
    ],
    resources: [
      { name: 'Ghidra', url: 'https://ghidra-sre.org', note: 'Free disassembler and decompiler' },
      { name: 'crackmes.one', url: 'https://crackmes.one', note: 'Community-made reverse engineering challenges' },
      { name: 'Reverse Engineering for Beginners', url: 'https://beginners.re', note: 'A free book on assembly and compiled code' },
    ],
  },
  {
    slug: 'forensics',
    name: 'Digital Forensics',
    summary:
      'Recover evidence from disks, memory and network traffic, then rebuild what actually happened.',
    cover: [
      'File systems and disk images',
      'Memory analysis',
      'Network capture analysis',
      'Timelines and incident reconstruction',
    ],
    resources: [
      { name: 'Autopsy', url: 'https://www.autopsy.com', note: 'Open-source platform for disk investigation' },
      { name: 'Volatility Foundation', url: 'https://volatilityfoundation.org', note: 'The reference framework for memory forensics' },
      { name: 'CyberDefenders', url: 'https://cyberdefenders.org', note: 'Investigation labs and defensive challenges' },
    ],
  },
  {
    slug: 'osint',
    name: 'OSINT',
    summary:
      'Gather and verify information from public sources: images, maps, social media and open records.',
    cover: [
      'Search techniques and judging sources',
      'Image analysis and geolocation',
      'Tracing usernames and accounts',
      'Verification and clear reporting',
    ],
    resources: [
      { name: 'Bellingcat Online Investigation Toolkit', url: 'https://bellingcat.gitbook.io/toolkit', note: 'Tools and guides used by working investigators' },
      { name: 'OSINT Framework', url: 'https://osintframework.com', note: 'A map of free tools sorted by what you need to find' },
      { name: 'Trace Labs', url: 'https://www.tracelabs.org', note: 'OSINT competitions that help locate missing people' },
    ],
  },
  {
    slug: 'crypto',
    name: 'Cryptography',
    summary:
      'Learn how encryption and hashing work, and how small implementation mistakes break them.',
    cover: [
      'Classical ciphers and encodings',
      'Symmetric encryption and block modes',
      'RSA and number theory',
      'Elliptic curves and lattice attacks',
    ],
    resources: [
      { name: 'CryptoHack', url: 'https://cryptohack.org', note: 'Interactive challenges that teach modern cryptography' },
      { name: 'Cryptopals', url: 'https://cryptopals.com', note: 'Break real constructions, one exercise at a time' },
      { name: 'Crypto 101', url: 'https://www.crypto101.io', note: 'A free introductory course' },
    ],
  },
  {
    slug: 'hardware',
    name: 'Hardware',
    summary:
      'Look at the devices around you: firmware, debug ports and the signals running between chips.',
    cover: [
      'Electronics and embedded basics',
      'UART, SPI and I2C',
      'Firmware extraction and analysis',
      'Fault injection and side channels',
    ],
    resources: [
      { name: 'Microcorruption', url: 'https://microcorruption.com', note: 'Debug and break a simulated embedded lock' },
      { name: 'OpenSecurityTraining2', url: 'https://p.ost2.fyi', note: 'Free courses on architectures and low-level security' },
      { name: 'hardwear.io', url: 'https://hardwear.io', note: 'Talks and training from hardware security researchers' },
    ],
  },
  {
    slug: 'ai',
    name: 'AI',
    summary:
      'Attack and defend machine-learning systems: prompt injection, poisoned data and model abuse.',
    cover: [
      'How models are trained and deployed',
      'Prompt injection and jailbreaks',
      'Adversarial examples and data poisoning',
      'Securing applications built on AI',
    ],
    resources: [
      { name: 'Gandalf', url: 'https://gandalf.lakera.ai', note: 'A prompt-injection game that gets harder each level' },
      { name: 'OWASP Top 10 for LLM Applications', url: 'https://genai.owasp.org/llm-top-10/', note: 'The most common risks in LLM-based apps' },
      { name: 'MITRE ATLAS', url: 'https://atlas.mitre.org', note: 'A knowledge base of attacks on AI systems' },
    ],
  },
];
