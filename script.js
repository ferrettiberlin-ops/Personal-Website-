document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

const openDemoButton = document.querySelector('#open-demo');
const experienceTrack = document.querySelector('#experience-track');
const experienceContent = document.querySelector('.experience-content');
const demoPanel = document.querySelector('#demo-panel');
const demoOpenLabel = document.querySelector('.demo-open-label');
const demoOpenArrow = document.querySelector('#open-demo span[aria-hidden="true"]');
const runButton = document.querySelector('#run-demo');
const resetButton = document.querySelector('#reset-demo');
const progressBar = document.querySelector('#pipeline-progress');
const pipelineState = document.querySelector('#pipeline-state');
const outputRows = document.querySelector('#demo-output-rows');
const fullRunButton = document.querySelector('#run-full-demo');

const positionDemoButton = () => {
  const roleHeader = document.querySelector('.experience-detail-layout > div:last-child');
  const content = document.querySelector('.experience-content');
  if (!roleHeader || !content) return;
  const buttonTop = roleHeader.getBoundingClientRect().bottom - content.getBoundingClientRect().top + 20;
  openDemoButton.style.setProperty('--demo-button-top', `${buttonTop}px`);
};

positionDemoButton();
window.addEventListener('resize', positionDemoButton);

document.querySelector('#demo-toggle-password')?.addEventListener('click', () => {
  const password = document.querySelector('#demo-password');
  password.type = password.type === 'password' ? 'text' : 'password';
});

const updateList = (inputSelector, listSelector, remove = false) => {
  const input = document.querySelector(inputSelector);
  const list = document.querySelector(listSelector);
  const value = input.value.trim();
  const values = list.textContent.trim() ? list.textContent.split(',').map((item) => item.trim()).filter(Boolean) : [];
  if (remove) values.pop();
  else if (value && !values.includes(value)) values.push(value);
  list.textContent = values.join(', ');
  if (!remove) input.value = '';
};

document.querySelector('#demo-add-ticker')?.addEventListener('click', () => updateList('#demo-ticker', '#demo-ticker-list'));
document.querySelector('#demo-remove-ticker')?.addEventListener('click', () => updateList('#demo-ticker', '#demo-ticker-list', true));
document.querySelector('#demo-add-exclude')?.addEventListener('click', () => updateList('#demo-exclude-exchange', '#demo-exclude-list'));
document.querySelector('#demo-remove-exclude')?.addEventListener('click', () => updateList('#demo-exclude-exchange', '#demo-exclude-list', true));
document.querySelector('#demo-add-include')?.addEventListener('click', () => updateList('#demo-include-exchange', '#demo-include-list'));
document.querySelector('#demo-remove-include')?.addEventListener('click', () => updateList('#demo-include-exchange', '#demo-include-list', true));
document.querySelector('#demo-add-year')?.addEventListener('click', () => updateList('#demo-year', '#demo-year-list'));
document.querySelector('#demo-remove-year')?.addEventListener('click', () => updateList('#demo-year', '#demo-year-list', true));
document.querySelector('#demo-mode-back')?.addEventListener('click', () => resetButton?.click());

openDemoButton?.addEventListener('click', () => {
  const isDemo = experienceTrack.classList.toggle('is-demo');
  experienceContent.classList.toggle('is-demo', isDemo);
  demoPanel.setAttribute('aria-hidden', String(!isDemo));
  openDemoButton.setAttribute('aria-expanded', String(isDemo));
  demoOpenLabel.style.opacity = '0';
  window.setTimeout(() => {
    demoOpenLabel.textContent = isDemo ? 'Return to experience' : 'UI showcase';
    demoOpenArrow.textContent = isDemo ? '←' : '→';
    demoOpenLabel.style.opacity = '1';
  }, 180);
});

const runDemo = () => {
  runButton.disabled = true;
  fullRunButton.disabled = true;
  pipelineState.textContent = 'Collecting inbox files...';
  progressBar.style.width = '34%';
  window.setTimeout(() => {
    pipelineState.textContent = 'Cleaning and labeling records...';
    progressBar.style.width = '68%';
  }, 650);
  window.setTimeout(() => {
    pipelineState.textContent = 'Sample run complete.';
    progressBar.style.width = '100%';
    outputRows.hidden = false;
    runButton.innerHTML = 'Run 1-Day Sample';
    runButton.disabled = false;
    fullRunButton.disabled = false;
  }, 1300);
};

runButton?.addEventListener('click', runDemo);
fullRunButton?.addEventListener('click', runDemo);

resetButton?.addEventListener('click', () => {
  progressBar.style.width = '0%';
  pipelineState.textContent = 'Ready to run.';
  outputRows.hidden = true;
  runButton.disabled = false;
  fullRunButton.disabled = false;
  runButton.innerHTML = 'Run 1-Day Sample';
});
