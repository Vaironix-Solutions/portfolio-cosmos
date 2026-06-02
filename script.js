// ── THREE.JS PARTICLE BACKGROUND ──
const scene    = new THREE.Scene();
const camera   = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bg'), alpha: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
camera.position.z = 3;

const count   = 6000;
const geo     = new THREE.BufferGeometry();
const pos     = new Float32Array(count * 3);
const colors  = new Float32Array(count * 3);
const palette = [
  [0, 0.96, 1],
  [0.75, 0, 1],
  [1, 0, 0.43]
];

for (let i = 0; i < count; i++) {
  pos[i * 3]     = (Math.random() - 0.5) * 20;
  pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
  pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
  const c = palette[Math.floor(Math.random() * palette.length)];
  colors[i * 3]     = c[0];
  colors[i * 3 + 1] = c[1];
  colors[i * 3 + 2] = c[2];
}

geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

const mat  = new THREE.PointsMaterial({ size: 0.03, vertexColors: true, transparent: true, opacity: 0.85 });
const mesh = new THREE.Points(geo, mat);
scene.add(mesh);

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
  mouseX = (e.clientX / innerWidth  - 0.5) * 0.3;
  mouseY = (e.clientY / innerHeight - 0.5) * 0.3;
});

window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

(function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.y += 0.0008;
  mesh.rotation.x += 0.0003;
  camera.position.x += (mouseX - camera.position.x) * 0.03;
  camera.position.y += (-mouseY - camera.position.y) * 0.03;
  renderer.render(scene, camera);
})();

// ── SCROLL REVEAL ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.glass-card, .section-title').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// hero visible immediately on load
window.addEventListener('load', () => {
  document.querySelector('.hero-inner') && document.querySelector('.hero-inner').classList.add('visible');
});

// ── 3D TILT ON GLASS CARDS ──
document.querySelectorAll('.glass-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(600px) rotateY(0) rotateX(0) translateY(0)';
  });
});

// ── FORM HANDLER ──
function handleForm(e) {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  success.style.display = 'block';
  e.target.reset();
  setTimeout(() => { success.style.display = 'none'; }, 4000);
}
