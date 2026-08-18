export function triggerConfetti() {
  if (typeof window === "undefined") return;

  // Create temporary canvas
  const canvas = document.createElement("canvas");
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "99999";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Setup dimensions
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Particle configuration
  const colors = [
    "#22c55e", // primary emerald
    "#10b981", // primary-soft emerald
    "#3b82f6", // warm blue
    "#f59e0b", // accent amber
    "#f43f5e", // warm rose
    "#a855f7", // purple
  ];

  interface Particle {
    x: number;
    y: number;
    size: number;
    color: string;
    speedX: number;
    speedY: number;
    rotation: number;
    rotationSpeed: number;
  }

  const particles: Particle[] = [];
  const particleCount = 120;

  // Initialize particles bursting from the center-bottom
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: width / 2 + (Math.random() - 0.5) * 50,
      y: height + 10,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 15,
      speedY: -(Math.random() * 12 + 10), // Shoot upwards
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
    });
  }

  const startTime = Date.now();
  const duration = 2500; // 2.5 seconds

  function animate() {
    if (!ctx) return;
    const elapsed = Date.now() - startTime;
    if (elapsed > duration) {
      // Remove canvas when done
      canvas.remove();
      return;
    }

    ctx.clearRect(0, 0, width, height);

    // Apply fade out near the end
    if (elapsed > duration - 500) {
      ctx.globalAlpha = (duration - elapsed) / 500;
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Update positions
      p.x += p.speedX;
      p.y += p.speedY;

      // Apply gravity and drag
      p.speedY += 0.35; // Gravity
      p.speedX *= 0.98; // Friction
      p.rotation += p.rotationSpeed;

      // Render particle
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;

      // Draw diamond or square
      ctx.beginPath();
      if (i % 2 === 0) {
        // Square
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      } else {
        // Diamond
        ctx.moveTo(0, -p.size);
        ctx.lineTo(p.size, 0);
        ctx.lineTo(0, p.size);
        ctx.lineTo(-p.size, 0);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  animate();
}
