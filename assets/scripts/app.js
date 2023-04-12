const addMovieModel = document.getElementById('add-modal');
const addMovieBtn = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = addMovieModel.querySelector('.modal__actions').querySelector('.btn--passive');
const confirmAddMovieBtn = addMovieModel.querySelector('.modal__actions').querySelector('.btn--success');
const addingMovieInputs = addMovieModel.querySelector('.modal__content').getElementsByTagName('input');
const entryTextSection = document.getElementById('entry-text');
const listRoot = document.getElementById('movie-list');
const deleteMovieModel = document.getElementById('delete-modal');


const movies = [];

const UpdatePersonalDataBase = () => {
    if(movies.length === 0){
        entryTextSection.style.display='block';
    }else {
        entryTextSection.style.display='none';
    }
};

const deleteMovie = (movieId) => {
    let moveIndex = 0;
    for( const movie of movies ){
        if(movie.id === movieId){
            break;
        }
        moveIndex++;
    }
    //splice: used to remove element from start index
    movies.splice(moveIndex,1);
    listRoot.children[moveIndex].remove();
    cancelMovieDeletion();
    UpdatePersonalDataBase();
}
const cancelMovieDeletion = () => {
    toggleBackDrop();
    deleteMovieModel.classList.remove('visible');

}
const deleteMovieHandler = (movieId) => {
    deleteMovieModel.classList.add('visible');
    toggleBackDrop();
    const cancelDeletionBtn = deleteMovieModel.querySelector('.btn--passive');
    let confirmDeletionBtn = deleteMovieModel.querySelector('.btn--danger');

    confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
    confirmDeletionBtn = deleteMovieModel.querySelector('.btn--danger');

    cancelDeletionBtn.removeEventListener('click',cancelMovieDeletion);
    confirmDeletionBtn.addEventListener('click',() =>{
       deleteMovie(movieId);
    });
    cancelDeletionBtn.addEventListener('click',cancelMovieDeletion)

};


const renderNewMovieElement = (id,title,imageUrl,rating) => {
    const  newMovieElement = document.createElement('li');
    newMovieElement.className= 'movie-element';
    newMovieElement.innerHTML= `
    <div class="movie-element__image">
        <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
        <h2>${title}</h2>
        <p>${rating}/5 stars</p>
    </div>
    `;
    newMovieElement.addEventListener('click',deleteMovieHandler.bind(null,id));
    listRoot.append(newMovieElement);
}

const toggleBackDrop = () =>{
    backdrop.classList.toggle('visible');
};

const closeMovieModel = () => {
    addMovieModel.classList.remove('visible');
}
const showMovieModel = () =>{
    addMovieModel.classList.add('visible');
    toggleBackDrop();
};
const backdropClickHandler = () => {
    closeMovieModel();
    cancelMovieDeletion();
    clearModelInputs();
};

const clearModelInputs = () =>{
    for(const input of addingMovieInputs){
        input.value='';
    }
}
const cancelAddMovieHandler = () =>{
    closeMovieModel();
    clearModelInputs();
    backdropClickHandler();
};


const addMovieHandler = () =>{
    const titleValue = addingMovieInputs[0].value;
    const ImageUrlValue = addingMovieInputs[1].value;
    const RatingValue = addingMovieInputs[2].value;

    if(
        titleValue.trim()===''||
        ImageUrlValue.trim()==='' ||
        RatingValue.trim()==='' ||
        +RatingValue < 1 ||
        +RatingValue > 5
    ){
        alert('please inter a vaild input rating between 1 and 5')
        return;
    }
    const newMovie = {
        id:Math.random().toString(),
        title:titleValue,
        ImageUrl:ImageUrlValue,
        Rate:RatingValue
    };
    movies.push(newMovie);
    console.log(movies);
    clearModelInputs();
    closeMovieModel();
    toggleBackDrop();
    renderNewMovieElement(newMovie.id,newMovie.title,newMovie.ImageUrl,+newMovie.Rate)
    UpdatePersonalDataBase();
};

addMovieBtn.addEventListener('click',showMovieModel);
backdrop.addEventListener('click',backdropClickHandler);
cancelAddMovieBtn.addEventListener('click',cancelAddMovieHandler);
confirmAddMovieBtn.addEventListener('click',addMovieHandler);