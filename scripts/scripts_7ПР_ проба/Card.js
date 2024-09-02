export default class Card {
    constructor(cardName, cardLink, cardSelector) {
        this._name = cardName;
        this._link = cardLink;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
    }

    generateCard() {
        this._element = this._getTemplate()
        this._cardImage = this._element.querySelector('.element__image')
        this._element.querySelector('.element__image').textContent = this._link;
        this._element.querySelector('.element__name').textContent = this._name;
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._setEventListeners()
        return this._element
    }

    _getTemplate() {
        const cardElement = document
            .querySelector('.item__template')
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    _setEventListeners() {
      this._element.querySelector('.element__trash').addEventListener('click', this._removeCard);
      this._element.querySelector('.element__like').addEventListener('click', this._likeCard);
      this._cardImage.addEventListener('click', () => this._handleCardClick(this._name, this._link));
    
    }
   

_likeCard (evt) {
  evt.target.classList.toggle('element__like_aktive');
}

_removeCard (evt) {
  evt.target.closest('.element').remove();
}

_openPopup() {
  popup.classList.add('popup_opened');
}

/*_handleCardClick () {
  document.querySelector('.popup__image-caption').textContent = this._name; 
  document.querySelector('.popup__image-big').alt = this._name;
  document.querySelector('.popup__image-big').src = this._link;
  document.querySelector('.popup_image-form').classList.add('popup_opened')(this._element.querySelector('.popup__close-button_image_preview'));
}*/ 

}