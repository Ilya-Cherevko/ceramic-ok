import Card from "./Card.js"
import { initialCards } from "./cards.js"
import { page, profileEditPopup, profileButtonOpenPopup, popupName, cardsList, popupJob, profileName, profileJob, plaseEditPopup, profileButtonAddPopup, poupPlaceName, poupPlaceLink, imagePreviewBigPopup, nameBigImage, captionBigImage, disabled, cardTemplate, popups } from "./constants.js"
import { FormValidator } from "./FormValidator.js"


const addCard = plaseEditPopup.querySelector('.popup__form-container');                         //Поля формы новое место для валидации
const editForm = profileEditPopup.querySelector('.popup__form-container');                      //Поля формы изменить профиль для валидации

const enableValidation = {                                                                      //константы для валидации
  formSelector: '.popup__form-container',
  inputSelector: '.popup__input',
  fieldsetList: '.popup__form-fieldset',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input-error_active',
  inputErrorAdd: 'popup__input-error_border-red',
};

//Запуск валидации
const editProfileValidator = new FormValidator(enableValidation, editForm)
const addCardValidator = new FormValidator(enableValidation, addCard)

editProfileValidator.enableValidation()
addCardValidator.enableValidation()

// открытие попапа
function openPopup(popup) {
  page.addEventListener('keydown', closePopupEsc);
  popup.classList.add('popup_opened');
}

// Закрытие попапа при клике на оверлей и при клике на крестик
function closePopupOverley() {
// Переберем все попапы и навесим каждому обработчик
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup__overlay')) {   // закроем попап при клике на оверлей (layout - так назывался стиль в прошлой работе, хз почему я его так назвал, при клике на макет!)
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close-button')) {  // закроем попап при клике на крестике
            closePopup(popup)
        }
    })
})
}

closePopupOverley();

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  page.removeEventListener('keydown', closePopupEsc);
}

// закрытие попапа Esc, слушатель этого события навешиваю при открытии и снимаю при закрытии попапа.
const closePopupEsc = (event) => {
  if (event.key === 'Escape') {
      const popupOpened = page.querySelector('.popup_opened');
     closePopup(popupOpened);
   }
} 

// Попап редактирования профиля. Сначала заносим данные в поля инпутов и потом открывыем попап профиля.
profileButtonOpenPopup.addEventListener('click', function () {
  popupName.value = profileName.textContent;
  popupJob.value = profileJob.textContent;
  openPopup(profileEditPopup);
}); 

// Сохранение и отправка изменений профиля
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  // Перезапись значения полей профиля
  profileName.textContent = popupName.value;
  profileJob.textContent = popupJob.value;
  closePopup(profileEditPopup);  
}

// Попап добавления нового места
profileButtonAddPopup.addEventListener('click', function () {
  openPopup(plaseEditPopup);
}); 

///Карточки
// удаление карточки
function removeCard (event) {
  event.target.closest('.element').remove();
}

// лайк на карточке
function likeCard (event) {
  event.target.classList.toggle('element__like_aktive');
}



// Добавление карточек. После добавления, перед закрытием, поля формы очищаем.
function handleCardSubmit (evt) {
  evt.preventDefault();
  // передаeм функции значения инпутов попапа
  const newCard = creatNewCard(poupPlaceName.value, poupPlaceLink.value); 
  // добавление новой карточки
  addObject(cardsList, newCard);
  // очистка полей формы
  poupPlaceName.value = '';
  poupPlaceLink.value = '';

  // Делаем поля добавления новой карточки, когда они пусты при открытии формы - нерабочими 
  //disabled.setAttribute('disabled', true);
  //disabled.classList.add('popup__submit-button_disabled');
  
  closePopup(plaseEditPopup);
}

// добавление html из темплейта в начало списка
function addObject(placeInHtml, object) {
  placeInHtml.prepend(object);
}

// клонировани шаблона карточки, добавление слушателей для карточки и открытие превью картинки карточки
function creatNewCard(cardName, cardLink) {
    
  // клонирование шаблона карточки в переменную
  const newCard = cardTemplate.querySelector('.element').cloneNode(true); 
  
  // найдем картинку один раз, а используем три )
  const newImage = newCard.querySelector('.element__image');
  
  // заполним название, alt и src
  newCard.querySelector('.element__name').textContent = cardName; 
  newImage.alt = cardName;
  newImage.src = cardLink;
  
  //слушатели
  newCard.querySelector('.element__trash').addEventListener('click', removeCard);
  newCard.querySelector('.element__like').addEventListener('click', likeCard);
  newImage.addEventListener('click', () => handleCardClick(cardName, cardLink));
  
  // Попап превью картинки теперь здесь
  function handleCardClick () {
    captionBigImage.textContent = cardName; 
    nameBigImage.alt = cardName;
    nameBigImage.src = cardLink;
    openPopup(imagePreviewBigPopup);
  }

  return newCard;
}

//Загрузка карточек созданных в Card
initialCards.forEach((initialCards) => {
  const card = new Card(initialCards.name, initialCards.link);
  const cardElement = card.generateCard();
  
  // Добавляем в DOM
  document.querySelector('.elements').append(cardElement);
});

// Обработчики событий
profileEditPopup.addEventListener('submit', handleProfileFormSubmit);
plaseEditPopup.addEventListener('submit', handleCardSubmit);