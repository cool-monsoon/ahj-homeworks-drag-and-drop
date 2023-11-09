export default class CardWidget {
  static createCardWidget(className) {
    const targetColumn = document.querySelector(`.${className}`);
    const targetColumnFooter = document.querySelector(`.${className} footer`);
    targetColumnFooter.style.display = 'none';

    const cardWidget = document.createElement('div');
    cardWidget.className = 'card-widget';
    targetColumn.append(cardWidget);

    const cardText = document.createElement('textarea');
    cardText.className = 'card-text';
    cardText.setAttribute('placeholder', 'Please describe the task...');
    cardText.setAttribute('rows', '3');

    const cardWidgetFooter = document.createElement('footer');
    cardWidgetFooter.className = 'card-widget-footer';

    cardWidget.append(cardText);
    cardWidget.append(cardWidgetFooter);

    const addButton = document.createElement('button');
    addButton.className = 'add-button';
    addButton.textContent = 'Add card';
    cardWidgetFooter.append(addButton);

    const widgetFooterBlock = document.createElement('div');
    widgetFooterBlock.classList = 'widget-footer-block';
    cardWidgetFooter.append(widgetFooterBlock);

    const cardWidgetClose = document.createElement('p');
    cardWidgetClose.classList = 'card-widget-close';
    cardWidgetClose.textContent = '✖';

    const cardWidgetContext = document.createElement('p');
    cardWidgetContext.classList = 'card-widget-context';
    cardWidgetContext.textContent = '\u22EF';

    widgetFooterBlock.append(cardWidgetClose);
    widgetFooterBlock.append(cardWidgetContext);
  }
}
