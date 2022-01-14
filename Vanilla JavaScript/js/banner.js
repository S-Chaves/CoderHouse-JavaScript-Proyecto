/*************/
/*Banner Info*/
/*************/

let slider = 0;
let len;
let right = 0;
const media550 = matchMedia('(max-width: 550px)');
const media750 = matchMedia('(max-width: 750px)');
const bannerInfoSections = document.querySelectorAll('.banner_info_section');

const tamañoPantalla = () => {
  media550.matches
    ? len = 2
    : len = 1;
};
tamañoPantalla();
const moverIzquierda = () => {
  slider -= 1;
  right -= 100;
  bannerInfoSections.forEach(item => {
    item.style.cssText = `
      transform: translateX(-${right}%);
      transition: transform 250ms ease;
    `;
  });
};
const moverDerecha = () => {
  slider += 1;
  right += 100;
  bannerInfoSections.forEach(item => {
    item.style.cssText = `
    transform: translateX(-${right}%);
    transition: transform 250ms ease;
    `;
  });
};

media550.addEventListener('change', () => {
  tamañoPantalla();

  if (slider != 2) return;
  moverIzquierda();
});
media750.addEventListener('change', () => {
  tamañoPantalla();
});

document.querySelector('.slider_left').addEventListener('click', () => {
  if (!slider) return;
  moverIzquierda();
});
document.querySelector('.slider_right').addEventListener('click', () => {
  if (slider == len) return;
  moverDerecha();
});