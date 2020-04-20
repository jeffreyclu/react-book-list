'use strict';

const genCards = () => JSON.parse(localStorage.getItem("storedState"))

const genGenres = () => {
    const cardsList = JSON.parse(localStorage.getItem("storedState"));
    const genreSet = new Set();
    cardsList.forEach(card=>{
      genreSet.add(card.genre);
    })
    return Array.from(genreSet).sort()
}

const genAuthors = () => {
    const cardsList = JSON.parse(localStorage.getItem("storedState"));
    const authorSet = new Set();
    cardsList.forEach(card=>{
      authorSet.add(card.author);
    })
    return Array.from(authorSet).sort()
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      genres: [],
      authors: [], 
      newCard: {},
      tempCard: {}
    };
    this.filterGenre = this.filterGenre.bind(this);
    this.filterAuthor = this.filterAuthor.bind(this);
    this.setNewCard = this.setNewCard.bind(this);
    this.addNewCard = this.addNewCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.showAll = this.showAll.bind(this);
    this.markRead = this.markRead.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.commitEdit = this.commitEdit.bind(this);
  }

  componentDidMount() {
    if (!localStorage.getItem("storedState")) {
      fetch('data.json')
      .then(response => response.json())
      .then(data=>{
        const cardsList = data.data;
        for (let i = 0; i < cardsList.length; i++) {
            cardsList[i].hidden = false;
            cardsList[i].edit = false;
            cardsList[i].id = i;
        }
        localStorage.setItem("storedState", JSON.stringify(cardsList));
        this.setState({ cards: cardsList, genres: genGenres(), authors: genAuthors() });
      });
    } else {
        const cardsList = JSON.parse(localStorage.getItem("storedState"));
        this.setState({ cards: cardsList, genres: genGenres(), authors: genAuthors() });
    }
  }

  filterGenre = (genre) => {
    this.setState(()=>{
      const storedCardList = JSON.parse(localStorage.getItem("storedState"));
      const newCardList = storedCardList.filter(card=>card.genre === genre);
      return { cards: newCardList };
    })
  }

  filterAuthor = (author) => {
    this.setState(()=>{
      const storedCardList = JSON.parse(localStorage.getItem("storedState"));
      const newCardList = storedCardList.filter(card=>card.author === author);
      return { cards: newCardList };
    })
  }

  setNewCard = (e) => {
    const id = e.target.id
    const value = e.target.value
    this.setState(prevState=>{
      const newCard = { ...prevState.newCard };
      newCard[id] = value;
      return { newCard: newCard };
    })
  }

  addNewCard = () => {
    this.setState(prevState=>{
      const newCard = {...prevState.newCard };
      const newCardList = [ ...JSON.parse(localStorage.getItem("storedState")) ];
      newCard.hidden = false;
      newCard.edit = false;
      newCard.id = newCardList.length;
      newCardList.push(newCard);
      localStorage.setItem("storedState", JSON.stringify(newCardList));
      return { cards: newCardList, genres: genGenres(), authors: genAuthors(), newCard: {} };
    })
  }

  deleteCard = (id, tempId) => {
    this.setState(prevState=>{
      const newCardList = [ ...JSON.parse(localStorage.getItem("storedState")) ];
      const tempCardList = [ ...prevState.cards ]
      newCardList.splice(id, 1);
      tempCardList.splice(tempId, 1);
      for (let i = 0; i < newCardList.length; i++) {
          newCardList[i].id = i;
      }
      localStorage.setItem("storedState", JSON.stringify(newCardList));
      return { cards: tempCardList, genres: genGenres(), authors: genAuthors() };
    })
  }

  markRead = (id) => {
      this.setState(prevState=>{
          const newCardList = [ ...JSON.parse(localStorage.getItem("storedState")) ];
          const tempCardList = [...prevState.cards ];
          for (let i = 0; i < newCardList.length; i++) {
            if (newCardList[i].id === id) {
                newCardList[i].hidden = !newCardList[i].hidden;
            }
          }
          for (let i = 0; i < tempCardList.length; i++) {
            if (tempCardList[i].id === id) {
                tempCardList[i].hidden = !tempCardList[i].hidden;
            }
          }
          localStorage.setItem("storedState", JSON.stringify(newCardList));
          return { cards: tempCardList };
      })
  }

  showAll = () => {
    this.setState({ cards: genCards()});
  }

  toggleEdit = (id) => {
    this.setState(prevState=>{
      const newCardList = [ ...JSON.parse(localStorage.getItem("storedState")) ];
      const tempCardList = [...prevState.cards ];
      let tempCard = {};
      for (let i = 0; i < newCardList.length; i++) {
        if (newCardList[i].id === id) {
          tempCard = newCardList[i];
          newCardList[i].edit = !newCardList[i].edit;
        }
      }
      for (let i = 0; i < tempCardList.length; i++) {
        if (tempCardList[i].id === id) {
          tempCardList[i].edit = !tempCardList[i].edit;
        }
      }
      return { cards: tempCardList, tempCard: tempCard };
  })
  }

  editCard = (e) => {
    const id = e.target.id
    const value = e.target.value
    this.setState(prevState=>{
      const tempCard = { ...prevState.tempCard };
      tempCard[id] = value;
      return { tempCard: tempCard };
    })
  }

  commitEdit = () => {
    this.setState(prevState=>{
      const tempCardList = [ ...prevState.cards ]
      const newCardList = [...JSON.parse(localStorage.getItem("storedState")) ];
      const newCard = { ...prevState.tempCard };
      newCard.edit = !newCard.edit;
      for (let i = 0; i < newCardList.length; i++) {
          if (newCardList[i].id === newCard.id) {
              newCardList[i] = newCard;
          }
      }
      for (let i = 0; i < tempCardList.length; i++) {
        if (tempCardList[i].id === newCard.id) {
            tempCardList[i] = newCard;
        }
    }
      localStorage.setItem("storedState", JSON.stringify(newCardList));
      return { cards: tempCardList, genres: genGenres(), authors: genAuthors(), tempCard: {} }
    })
  }
  render() {

    return (
        <CardsContainer 
          cards={this.state.cards}
          genres={this.state.genres}
          authors={this.state.authors} 
          filterGenre={this.filterGenre}
          filterAuthor={this.filterAuthor} 
          newCard={this.state.newCard} 
          setNewCard={this.setNewCard}
          addNewCard={this.addNewCard} 
          deleteCard={this.deleteCard}
          showAll={this.showAll}
          markRead={this.markRead}
          tempCard={this.state.tempCard}
          toggleEdit={this.toggleEdit}
          editCard={this.editCard}
          commitEdit={this.commitEdit}
        />
    );
  }
}

const CardsContainer = props => {
  const { cards, genres, authors, filterGenre, setNewCard, newCard, addNewCard, deleteCard, showAll, filterAuthor, markRead, tempCard, toggleEdit, editCard, commitEdit } = props;
  const cardlist = [];
  for (let i = 0; i < cards.length; i++) {
    cardlist.push(<Card key={i} hidden={cards[i].hidden} card={cards[i]} deleteCard={deleteCard} markRead={markRead} tempCard={tempCard} toggleEdit={toggleEdit} editCard={editCard} commitEdit={commitEdit} tempId={i} />);
  }
  return(
    <div className="app__container">
      <div className="buttons__container">
        <FilterGenres filterGenre={filterGenre} genres={genres} showAll={showAll} />
        <FilterAuthors filterAuthor={filterAuthor} authors={authors} showAll={showAll} />
      </div>
      <div className = "cards__container">
        {cardlist}
        <CardCreator newCard={newCard} setNewCard={setNewCard} addNewCard={addNewCard} />
      </div>
    </div>
  )
}

const FilterGenres = props => {
  const { genres, filterGenre, showAll } = props;
  const genreList = [];
  for (let i = 0; i < genres.length; i++) {
    genreList.push(<FilterGenre key={i} genre={genres[i]} filterGenre={filterGenre} />);
  }
  return(
    <div className="filter__container">
        <span className="filter__span">Filter by genre:</span>
        {genreList}
        <ShowAll showAll={showAll}/>
    </div>
  )
}

const FilterGenre = props => {
  const { genre, filterGenre} = props;
  return (
    <button className="button genre" onClick={()=>filterGenre(genre)}>{genre}</button>
  )
}

const FilterAuthors = props => {
  const { authors, filterAuthor, showAll } = props;
  const genreList = [];
  for (let i = 0; i < authors.length; i++) {
    genreList.push(<FilterAuthor key={i} authors={authors[i]} filterAuthor={filterAuthor} />);
  }
  return(
    <div className="filter__container">
        <span className="filter__span">Filter by author:</span>
        {genreList}
        <ShowAll showAll={showAll}/>
    </div>
  )
}

const FilterAuthor = props => {
  const { authors, filterAuthor} = props;
  return (
    <button className="filter author" onClick={()=>filterAuthor(authors)}>{authors}</button>
  )
}

const ShowAll = props => {
  const { showAll } = props;
  return (
    <button onClick={showAll}>Reset Filter</button>
  )
}

const Card = props => {
  const { card, deleteCard, markRead, tempCard, toggleEdit, editCard, commitEdit, tempId } = props;
  const { edit, id } = card;
  return(
    <div>
        { edit ? <CardEditor card={card} id={id} tempCard={tempCard} toggleEdit={toggleEdit} editCard={editCard} commitEdit={commitEdit} tempId={tempId} /> : <CardDetails card={card} id={id} deleteCard={deleteCard} markRead={markRead} tempCard={tempCard} toggleEdit={toggleEdit} tempId={tempId} />}
      
    </div>
  )
}

const CardDetails = props => {
  const { id, card, deleteCard, markRead, toggleEdit, tempId } = props
  const { title, genre, author, description, hidden } = card
  return(
    <div className = { hidden ? "card hidden" : "card" }>
      <CardDeletor id={id} deleteCard={deleteCard} tempId={tempId} />
      <h2>{title}</h2>
      <div className = "row">
        <span className = "tag">{genre}</span>
        <span className = "difficulty">{author}</span>
      </div>
      <div className = "row">
        <h3>Description:</h3>
        <p>{description}</p>
      </div>
      <button className="read" onClick={()=>markRead(id)}>{hidden ? "Mark Unread" : "Mark Read" }</button>
      <button className="edit" onClick={()=>toggleEdit(id)}>Edit</button>
    </div>
  )
}

const CardCreator = props => {
  const { newCard, setNewCard, addNewCard } = props;
  const { title, genre, author, description } = newCard;

  return(
    <div className = "card creator">
      <h2>Add a Book</h2>
      <div className = "row">
        <label>
          Title:
        <input type="text" id="title" value={title} onChange={setNewCard} />
        </label>
      </div>
      <div className = "row">
        <label>
          Genre:
        <input type="text" id="genre" value={genre} onChange={setNewCard} />
        </label>
      </div>
      <div className = "row">
        <label>
          Author:
        <input type="text" id="author" value={author} onChange={setNewCard} />
        </label>
      </div>
      <div className = "row">
        <label>
          Description:
        <input type="text" id="description" value={description} onChange={setNewCard} />
        </label>
      </div>
      <button onClick={addNewCard}>Submit Book</button>
    </div>
  )
}

const CardDeletor = props => {
  const { deleteCard, id, tempId } = props;
  return(
    <button className="delete__button" onClick={()=>deleteCard(id, tempId)}>X</button>
  )
}

const CardEditor = props => {
    const { id, tempCard, toggleEdit, editCard, commitEdit, tempId } = props;
    const { title, genre, author, description } = tempCard;
    return(
      <div className = "card creator">
        <h2>Edit Book</h2>
        <div className = "row">
          <label>
            Title:
          <input type="text" id="title" value={title} onChange={editCard} />
          </label>
        </div>
        <div className = "row">
          <label>
            Genre:
          <input type="text" id="genre" value={genre} onChange={editCard} />
          </label>
        </div>
        <div className = "row">
          <label>
            Author:
          <input type="text" id="author" value={author} onChange={editCard} />
          </label>
        </div>
        <div className = "row">
          <label>
            Description:
          <input type="text" id="description" value={description} onChange={editCard} />
          </label>
        </div>
        <button className="save" onClick={()=>commitEdit()}>Save</button>
        <button className="cancel" onClick={()=>toggleEdit(id)}>Cancel</button>
      </div>
    )
  }



let domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);