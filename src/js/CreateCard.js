export default class CreateCard {
  static createCard(className, content) {
    const targetColumn = document.querySelector(`.${className}`);
    const targetColumnFooter = document.querySelector(`.${className} footer`);

    const card = document.createElement('p');
    card.className = 'card-window moveable';
    targetColumn.append(card);

    card.textContent = content;
    card.style.position = 'relative';

    const cardClose = document.createElement('div');
    cardClose.className = 'card-close';
    cardClose.textContent = '✖';
    card.append(cardClose);
    targetColumnFooter.before(card);

    card.addEventListener('mouseenter', () => {
      card.querySelector('.card-close').style.display = 'block';
    });

    card.addEventListener('mouseleave', () => {
      card.querySelector('.card-close').style.display = 'none';
    });
  }
}
