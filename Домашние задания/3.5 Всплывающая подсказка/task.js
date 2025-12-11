const tooltips = document.querySelectorAll('.has-tooltip');
const tooltip = document.createElement('div');
tooltip.className = 'tooltip';
document.body.appendChild(tooltip);
let activeTrigger = null;

function setTooltipPosition(trigger) {
  const position = trigger.dataset.position || 'bottom';
  const rect = trigger.getBoundingClientRect();
  tooltip.style.left = '0px';
  tooltip.style.top = '0px';
  tooltip.classList.add('tooltip_active');
  const tooltipRect = tooltip.getBoundingClientRect();
  let top;
  let left;

  if (position === 'top') {
    top = rect.top - tooltipRect.height;
    left = rect.left + (rect.width - tooltipRect.width) / 2;
  } else if (position === 'left') {
    top = rect.top + (rect.height - tooltipRect.height) / 2;
    left = rect.left - tooltipRect.width;
  } else if (position === 'right') {
    top = rect.top + (rect.height - tooltipRect.height) / 2;
    left = rect.right;
  } else {
    top = rect.bottom;
    left = rect.left + (rect.width - tooltipRect.width) / 2;
  }

  tooltip.style.top = top + 'px';
  tooltip.style.left = left + 'px';
}

tooltips.forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault();

    if (activeTrigger === trigger && tooltip.classList.contains('tooltip_active')) {
      tooltip.classList.remove('tooltip_active');
      activeTrigger = null;
      return;
    }

    activeTrigger = trigger;
    tooltip.textContent = trigger.title;
    setTooltipPosition(trigger);
  });
});
