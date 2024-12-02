const cardsTemplate = document.querySelector('#card-template').content;
const listCards = document.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const closePopup = document.querySelectorAll('.popup__close');
const namecard = document.querySelector('.popup__input_type_card-name');
const url_location = document.querySelector('.popup__input_type_url');
const imagepopup_src_alt = document.querySelector('.popup__image');
const imagepopup_name = document.querySelector('.popup__caption');

const editProfile = document.querySelector('.profile__edit-button');
const newcardpopup = document.querySelector('.profile__add-button');
const profile = document.querySelector('.profile__title');
const jobprofile = document.querySelector('.profile__description');

const formCardElement = document.forms['new-place'];
const profileFormElement = document.forms['edit-profile'];
const nameInput = profileFormElement.elements.name;
const jobInput = profileFormElement.elements.description;

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
}
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}
function handlelikebutton(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 
    const name = nameInput.value;
    const job = jobInput.value;
    profile.textContent = name;
    jobprofile.textContent = job;
    closeModal(profilePopup);
}
profileFormElement.addEventListener('submit', handleProfileFormSubmit);


editProfile.addEventListener('click', function () {
    openModal(profilePopup);
    nameInput.value = profile.textContent;
    jobInput.value = jobprofile.textContent;
});

closePopup.forEach(function (popup) {
    popup.addEventListener('click', function () {
        const pop = popup.closest('.popup');
        closeModal(pop);
    });
});

function createCard(card_info){
    const cards = cardsTemplate.querySelector('.places__item').cloneNode(true);
    const card_image = cards.querySelector('.card__image');

    const card_name = cards.querySelector('.card__title');
    const likebutton = cards.querySelector('.card__like-button');
    const deletebutton = cards.querySelector('.card__delete-button');
    card_image.src = card_info.link;
    card_image.alt = card_info.name;
    card_name.textContent = card_info.name;

    likebutton.addEventListener('click', handlelikebutton);
    deletebutton.addEventListener('click', () => {
        const parentcarddel = deletebutton.closest('.places__item');
        parentcarddel.remove();
    })
    
    card_image.addEventListener('click', function () {
        openModal(imagePopup);
        imagepopup_src_alt.src = card_info.link;
        imagepopup_name.textContent = card_info.name;
        imagepopup_src_alt.alt = card_info.name;

    });
    return cards;
}

initialCards.forEach(function(item){
    listCards.append(createCard(item));
});

newcardpopup.addEventListener('click', function () {
    openModal(cardPopup);
});

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const locate = namecard.value;
    const url = url_location.value;
    const newcard = createCard({
        name: locate,
        link: url
    });
    listCards.prepend(newcard);
    closeModal(cardPopup);
    formCardElement.reset();
}
formCardElement.addEventListener('submit', handleCardFormSubmit);

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');