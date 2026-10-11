const FAN_POSITIONS = [
  { rot: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 1 },
  { rot: -14, scale: 0.8498, x: -22, y: 4.0, zIndex: 2 },
  { rot: -7,  scale: 0.9346, x: -11, y: 1.3, zIndex: 3 },
  { rot: 0,   scale: 1.0,    x: 0,   y: 0.0, zIndex: 10 },
  { rot: 7,   scale: 0.9346, x: 11,  y: 1.3, zIndex: 3 },
  { rot: 14,  scale: 0.8498, x: 22,  y: 4.0, zIndex: 2 },
  { rot: 21,  scale: 0.7756, x: 30,  y: 7.3, zIndex: 1 },
];

function getResponsiveMultiplier(width) {
  if (width < 480) return 0.28;
  if (width < 640) return 0.38;
  if (width < 768) return 0.5;
  if (width < 1024) return 0.75;
  return 1.0;
}

function getHeightMultiplier(width) {
  let idealPx;
  if (width < 480) idealPx = 352;
  else if (width < 640) idealPx = 416;
  else if (width < 768) idealPx = 448;
  else if (width < 1024) idealPx = 544;
  else idealPx = 608;

  const available = window.innerHeight * 0.7;
  return available >= idealPx ? 1 : available / idealPx;
}

export function initFanCarousel() {
  const container = document.getElementById('fan-carousel');
  if (!container) return;

  const cardsData = [
    {
      imgUrl: 'https://cdn.21st.dev/assets/mirror/a6/a61a357faccddd302e85600234a02350a27f21b4cc8b3531578991614c050151.jpg',
      name: 'Professional Web Architect',
      issuer: 'Global Tech Institute',
      issueDate: 'May 2025',
      expireDate: 'May 2030',
      credentialId: 'GTI-99283-X',
      credentialUrl: '#',
      skills: ['Frontend Architecture', 'GSAP', 'System Design'],
      photo: 'https://cdn.21st.dev/assets/mirror/a6/a61a357faccddd302e85600234a02350a27f21b4cc8b3531578991614c050151.jpg'
    },
    {
      imgUrl: 'https://cdn.21st.dev/assets/mirror/9d/9d12401d835b58b284c6380d9f9c745112d6e2ed6cc51942982d42ae1d8e08b0.jpg',
      name: 'Advanced React Specialist',
      issuer: 'React Mastery Academy',
      issueDate: 'Aug 2025',
      expireDate: 'Aug 2027',
      credentialId: 'RMA-44512-B',
      credentialUrl: '#',
      skills: ['Hooks', 'Concurrent Mode', 'Fiber Architecture'],
      photo: 'https://cdn.21st.dev/assets/mirror/9d/9d12401d835b58b284c6380d9f9c745112d6e2ed6cc51942982d42ae1d8e08b0.jpg'
    },
    {
      imgUrl: 'https://cdn.21st.dev/assets/mirror/4c/4c0990c5eee66fc437f8e0ca2175c48ed6bebd9b3b6e45f1ac9b3542ada80eff.jpg',
      name: 'Creative Coding Expert',
      issuer: 'Digital Arts Council',
      issueDate: 'Dec 2025',
      expireDate: 'None',
      credentialId: 'DAC-11023-S',
      credentialUrl: '#',
      skills: ['Three.js', 'WebGL', 'Generative Art'],
      photo: 'https://cdn.21st.dev/assets/mirror/4c/4c0990c5eee66fc437f8e0ca2175c48ed6bebd9b3b6e45f1ac9b3542ada80eff.jpg'
    },
    {
      imgUrl: 'https://cdn.21st.dev/assets/mirror/05/05536dea31a97c7c4243f835d48e_f_etc.jpg',
      name: 'Fullstack Engineering Pro',
      issuer: 'DevCorp University',
      issueDate: 'Feb 2026',
      expireDate: 'Feb 2031',
      credentialId: 'DCU-88721-T',
      credentialUrl: '#',
      skills: ['Node.js', 'TypeScript', 'PostgreSQL'],
      photo: 'https://cdn.21st.dev/assets/mirror/05/05536dea31a97c7c4243f835d48e_f_etc.jpg'
    },
    {
      imgUrl: 'https://cdn.21st.dev/assets/mirror/fe/fe3c057ea3c04ecd58640df9ace90545c86fc0e267b7cb87e4da93c8d0d0ffc.jpg',
      name: 'UX/UI Design Master',
      issuer: 'Design Lab International',
      issueDate: 'Jun 2026',
      expireDate: 'Jun 2029',
      credentialId: 'DLI-22341-M',
      credentialUrl: '#',
      skills: ['Figma', 'Design Systems', 'Prototyping'],
      photo: 'https://cdn.21st.dev/assets/mirror/fe/fe3c057ea3c04ecd58640df9ace90545c86fc0e267b7cb87e4da93c8d0d0ffc.jpg'
    },
    {
      imgUrl: 'https://cdn.21st.dev/assets/mirror/ec/ec33bb1d53aef764ed557037ded0bf376df17ceb6de92411b60d8edcd68e75b2.jpg',
      name: 'Cloud Infrastructure Architect',
      issuer: 'Cloud Sky Systems',
      issueDate: 'Sep 2026',
      expireDate: 'Sep 2028',
      credentialId: 'CSS-55432-C',
      credentialUrl: '#',
      skills: ['AWS', 'Kubernetes', 'Terraform'],
      photo: 'https://cdn.21st.dev/assets/mirror/ec/ec33bb1d53aef764ed557037ded0bf376df17ceb6de92411b60d8edcd68e75b2.jpg'
    },
    {
      imgUrl: 'https://cdn.21st.dev/assets/mirror/10/109a67c3a7eab23436b0fc0e45a2bdfc722c97cff452c14a2e5944e200c56d98.jpg',
      name: 'Algorithm Specialist',
      issuer: 'Logic Gates Academy',
      issueDate: 'Nov 2026',
      expireDate: 'None',
      credentialId: 'LGA-33412-S',
      credentialUrl: '#',
      skills: ['Data Structures', 'Complexity Analysis', 'Rust'],
      photo: 'https://cdn.21st.dev/assets/mirror/10/109a67c3a7eab23436b0fc0e45a2bdfc722c97cff452c14a2e5944e200c56d98.jpg'
    },
  ];

  // Create Modal Structure
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'cert-modal-overlay';
  modalOverlay.innerHTML = `
    <div class="cert-modal-content">
        <button class="cert-modal-close">&times;</button>
        <div class="cert-modal-image-container">
            <img src="" alt="Certificate" class="cert-modal-image">
        </div>
        <div class="cert-modal-info">
            <h3 id="cert-name"></h3>
            <div class="cert-detail-row">
                <span class="cert-detail-label">Issuing Organization</span>
                <span class="cert-detail-value" id="cert-issuer"></span>
            </div>
            <div class="cert-detail-row">
                <span class="cert-detail-label">Issue Date</span>
                <span class="cert-detail-value" id="cert-issue-date"></span>
            </div>
            <div class="cert-detail-row">
                <span class="cert-detail-label">Expire Date</span>
                <span class="cert-detail-value" id="cert-expire-date"></span>
            </div>
            <div class="cert-detail-row">
                <span class="cert-detail-label">Credential ID</span>
                <span class="cert-detail-value" id="cert-id"></span>
            </div>
            <div class="cert-detail-row">
                <span class="cert-detail-label">Skills Learnt</span>
                <div class="cert-skills-container" id="cert-skills"></div>
            </div>
            <a href="#" id="cert-url" target="_blank" class="cert-modal-link">Verify Credential &rarr;</a>
        </div>
    </div>
  `;
  document.body.appendChild(modalOverlay);

  const modalContent = modalOverlay.querySelector('.cert-modal-content');
  const closeBtn = modalOverlay.querySelector('.cert-modal-close');

  function openCertificateModal(index) {
    const data = cardsData[index];
    if (!data) return;

    // Populate data
    modalOverlay.querySelector('#cert-name').textContent = data.name;
    modalOverlay.querySelector('#cert-issuer').textContent = data.issuer;
    modalOverlay.querySelector('#cert-issue-date').textContent = data.issueDate;
    modalOverlay.querySelector('#cert-expire-date').textContent = data.expireDate;
    modalOverlay.querySelector('#cert-id').textContent = data.credentialId;
    modalOverlay.querySelector('#cert-url').href = data.credentialUrl;
    modalOverlay.querySelector('.cert-modal-image').src = data.photo;

    const skillsContainer = modalOverlay.querySelector('#cert-skills');
    skillsContainer.innerHTML = '';
    data.skills.forEach(skill => {
      const span = document.createElement('span');
      span.className = 'cert-skill-tag';
      span.textContent = skill;
      skillsContainer.appendChild(span);
    });

    // Animate in
    modalOverlay.classList.add('active');
    gsap.to(modalContent, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'back.out(1.7)'
    });
  }

  function closeCertificateModal() {
    gsap.to(modalContent, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    });

    setTimeout(() => {
      modalOverlay.classList.remove('active');
    }, 300);
  }

  closeBtn.addEventListener('click', closeCertificateModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeCertificateModal();
  });

  // Create cards
  cardsData.forEach((data, i) => {
    const card = document.createElement('div');
    card.className = 'fan-card';
    card.innerHTML = `<img src="${data.imgUrl}" alt="Cert ${i}" />`;

    // Add click listener for modal
    card.addEventListener('click', () => openCertificateModal(i));

    container.appendChild(card);
  });

  const cardElements = Array.from(container.querySelectorAll('.fan-card'));
  let centerIndex = 3;
  const totalCards = cardsData.length;

  const updateLayout = (hoveredIndex = null) => {
    const mult = getResponsiveMultiplier(window.innerWidth);
    const hMult = getHeightMultiplier(window.innerWidth);

    cardElements.forEach((card, i) => {
      const slot = (i - centerIndex + totalCards) % totalCards;
      if (slot < 0) return;

      const pos = FAN_POSITIONS[Math.min(Math.max(slot, 0), 6)] || FAN_POSITIONS[0];

      let targetX = pos.x * mult;
      let targetY = pos.y * hMult;
      let targetRot = pos.rot;
      let targetScale = pos.scale;

      if (hoveredIndex !== null) {
        const distance = Math.abs(i - hoveredIndex);
        if (i === hoveredIndex) {
          targetY -= 2.5 * hMult;
          targetScale *= 1.08;
        } else {
          const pushStrength = 8 * (1 - Math.abs((i - centerIndex)/totalCards)) * (1 + 0.2 * Math.max(0, 3 - distance));
          if (i < hoveredIndex) {
            targetX -= pushStrength * mult;
            targetRot -= 3 / (distance + 1);
          } else {
            targetX += pushStrength * mult;
            targetRot += 3 / (distance + 1);
          }
        }
      }

      gsap.to(card, {
        x: `${targetX}rem`,
        y: `${targetY}rem`,
        rotation: targetRot,
        scale: targetScale,
        zIndex: pos.zIndex,
        duration: 0.5,
        ease: 'elastic.out(1,.75)',
        overwrite: 'auto'
      });
    });
  };

  cardElements.forEach((card, i) => {
    // Hover effects removed
  });

  document.getElementById('fan-next').addEventListener('click', () => {
    centerIndex = (centerIndex + 1) % totalCards;
    updateLayout();
    updateDots();
  });

  document.getElementById('fan-prev').addEventListener('click', () => {
    centerIndex = (centerIndex - 1 + totalCards) % totalCards;
    updateLayout();
    updateDots();
  });

  function updateDots() {
    const dots = document.querySelectorAll('.fan-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === centerIndex);
    });
  }

  const dotsContainer = document.getElementById('fan-dots');
  cardsData.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = 'fan-dot';
    dotsContainer.appendChild(dot);
  });

  updateLayout();
  updateDots();
}