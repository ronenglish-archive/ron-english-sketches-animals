(function(){'use strict';
function initialize(shell){
 var viewport=shell.querySelector('.set-carousel-viewport'),track=shell.querySelector('.set-carousel-track');
 var prev=shell.querySelector('[data-carousel-prev]'),next=shell.querySelector('[data-carousel-next]');
 var index=0;
 function measure(){
  var cards=[].slice.call(track.querySelectorAll(':scope > .index-card'));
  if(!cards.length)return;
  var cardWidth=cards[0].getBoundingClientRect().width;
  var gap=parseFloat(getComputedStyle(track).gap)||0;
  var available=shell.getBoundingClientRect().width;
  var total=cards.length*cardWidth+(cards.length-1)*gap;
  var fits=total <= available+0.5;
  shell.classList.toggle('no-overflow',fits);
  prev.hidden=fits;next.hidden=fits;
  if(fits){index=0;track.style.transform='translateX(0)';return;}
  // Reserve both arrow positions while measuring, so the page does not jump.
  var space=viewport.clientWidth;
  var visible=Math.max(1,Math.floor((space+gap)/(cardWidth+gap)));
  var maximum=Math.max(0,cards.length-visible);
  index=Math.max(0,Math.min(index,maximum));
  track.style.transform='translateX('+(-index*(cardWidth+gap))+'px)';
  prev.hidden=index===0;next.hidden=index>=maximum;
 }
 prev.addEventListener('click',function(){index--;measure()});
 next.addEventListener('click',function(){index++;measure()});
 shell.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){index++;measure()}else if(e.key==='ArrowLeft'){index--;measure()}});
 window.addEventListener('resize',measure);
 if(document.fonts&&document.fonts.ready){document.fonts.ready.then(measure)}
 requestAnimationFrame(measure);
}
document.querySelectorAll('.set-carousel').forEach(initialize);
})();