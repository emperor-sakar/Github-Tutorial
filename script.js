function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
  }

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    event.currentTarget.classList.add('active');
    if (window.innerWidth < 900) document.getElementById('sidebar').classList.remove('open');
  }

  
  function copyCode(btn) {
    const code = btn.closest('.code-block').querySelector('code');
    const text = code.innerText;
    navigator.clipboard.writeText(text).then(() => {
      btn.textContent = 'Copied!';
      btn.style.color = '#3fb950';
      btn.style.borderColor = '#3fb950';
      setTimeout(() => {
        btn.textContent = 'Copy';
        btn.style.color = '';
        btn.style.borderColor = '';
      }, 2000);
    });
  }

  
  const sections = ['intro','setup','concepts','repo','commits','branches','remote','pullreq','issues','merge','actions','cheatsheet'];
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.body.scrollHeight - window.innerHeight;
    const pct = Math.min(100, (scrolled / total) * 100);
    document.getElementById('scrollProgress').style.width = pct + '%';
    document.getElementById('progressFill').style.width = pct + '%';

    let current = 'intro';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.offsetTop - 120 <= scrolled) current = id;
    });

    links.forEach(l => {
      l.classList.remove('active');
      if (l.getAttribute('onclick') && l.getAttribute('onclick').includes(current)) {
        l.classList.add('active');
      }
    });
  });

  
  function filterNav(val) {
    val = val.toLowerCase();
    document.querySelectorAll('.nav-link').forEach(l => {
      const text = l.textContent.toLowerCase();
      l.style.display = text.includes(val) ? 'flex' : 'none';
    });
    document.querySelectorAll('.nav-section-label').forEach(l => {
      l.style.display = val ? 'none' : '';
    });
  }

  
  document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('mobileToggle');
    if (window.innerWidth < 900 && sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) && !toggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });