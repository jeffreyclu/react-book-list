'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var genCards = function genCards() {
  return JSON.parse(localStorage.getItem("storedState"));
};

var genGenres = function genGenres() {
  var cardsList = JSON.parse(localStorage.getItem("storedState"));
  var genreSet = new Set();
  cardsList.forEach(function (card) {
    genreSet.add(card.genre);
  });
  return Array.from(genreSet).sort();
};

var genAuthors = function genAuthors() {
  var cardsList = JSON.parse(localStorage.getItem("storedState"));
  var authorSet = new Set();
  cardsList.forEach(function (card) {
    authorSet.add(card.author);
  });
  return Array.from(authorSet).sort();
};

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.toggleGenreFilter = function () {
      _this.setState(function (prevState) {
        var filterGenreToggle = !prevState.filterGenreToggle;
        return { filterGenreToggle: filterGenreToggle };
      });
    };

    _this.toggleAuthorFilter = function () {
      _this.setState(function (prevState) {
        var filterAuthorToggle = !prevState.filterAuthorToggle;
        return { filterAuthorToggle: filterAuthorToggle };
      });
    };

    _this.filterGenre = function (genre) {
      _this.setState(function () {
        var storedCardList = JSON.parse(localStorage.getItem("storedState"));
        var newCardList = storedCardList.filter(function (card) {
          return card.genre === genre;
        });
        return { cards: newCardList };
      });
    };

    _this.filterAuthor = function (author) {
      _this.setState(function () {
        var storedCardList = JSON.parse(localStorage.getItem("storedState"));
        var newCardList = storedCardList.filter(function (card) {
          return card.author === author;
        });
        return { cards: newCardList };
      });
    };

    _this.setNewCard = function (e) {
      var id = e.target.id;
      var value = e.target.value;
      _this.setState(function (prevState) {
        var newCard = Object.assign({}, prevState.newCard);
        newCard[id] = value;
        return { newCard: newCard };
      });
    };

    _this.addNewCard = function () {
      _this.setState(function (prevState) {
        var newCard = Object.assign({}, prevState.newCard);
        var newCardList = [].concat(_toConsumableArray(JSON.parse(localStorage.getItem("storedState"))));
        newCard.hidden = false;
        newCard.edit = false;
        newCard.id = newCardList.length;
        newCardList.push(newCard);
        localStorage.setItem("storedState", JSON.stringify(newCardList));
        return { cards: newCardList, genres: genGenres(), authors: genAuthors(), newCard: {} };
      });
    };

    _this.deleteCard = function (id, tempId) {
      _this.setState(function (prevState) {
        var newCardList = [].concat(_toConsumableArray(JSON.parse(localStorage.getItem("storedState"))));
        var tempCardList = [].concat(_toConsumableArray(prevState.cards));
        newCardList.splice(id, 1);
        tempCardList.splice(tempId, 1);
        for (var i = 0; i < newCardList.length; i++) {
          newCardList[i].id = i;
        }
        localStorage.setItem("storedState", JSON.stringify(newCardList));
        return { cards: tempCardList, genres: genGenres(), authors: genAuthors() };
      });
    };

    _this.markRead = function (id) {
      _this.setState(function (prevState) {
        var newCardList = [].concat(_toConsumableArray(JSON.parse(localStorage.getItem("storedState"))));
        var tempCardList = [].concat(_toConsumableArray(prevState.cards));
        for (var i = 0; i < newCardList.length; i++) {
          if (newCardList[i].id === id) {
            newCardList[i].hidden = !newCardList[i].hidden;
          }
        }
        for (var _i = 0; _i < tempCardList.length; _i++) {
          if (tempCardList[_i].id === id) {
            tempCardList[_i].hidden = !tempCardList[_i].hidden;
          }
        }
        localStorage.setItem("storedState", JSON.stringify(newCardList));
        return { cards: tempCardList };
      });
    };

    _this.showAll = function () {
      _this.setState({ cards: genCards() });
    };

    _this.toggleEdit = function (id) {
      _this.setState(function (prevState) {
        var newCardList = [].concat(_toConsumableArray(JSON.parse(localStorage.getItem("storedState"))));
        var tempCardList = [].concat(_toConsumableArray(prevState.cards));
        var tempCard = {};
        for (var i = 0; i < newCardList.length; i++) {
          if (newCardList[i].id === id) {
            tempCard = newCardList[i];
            newCardList[i].edit = !newCardList[i].edit;
          }
        }
        for (var _i2 = 0; _i2 < tempCardList.length; _i2++) {
          if (tempCardList[_i2].id === id) {
            tempCardList[_i2].edit = !tempCardList[_i2].edit;
          }
        }
        return { cards: tempCardList, tempCard: tempCard };
      });
    };

    _this.editCard = function (e) {
      var id = e.target.id;
      var value = e.target.value;
      _this.setState(function (prevState) {
        var tempCard = Object.assign({}, prevState.tempCard);
        tempCard[id] = value;
        return { tempCard: tempCard };
      });
    };

    _this.commitEdit = function () {
      _this.setState(function (prevState) {
        var tempCardList = [].concat(_toConsumableArray(prevState.cards));
        var newCardList = [].concat(_toConsumableArray(JSON.parse(localStorage.getItem("storedState"))));
        var newCard = Object.assign({}, prevState.tempCard);
        newCard.edit = !newCard.edit;
        for (var i = 0; i < newCardList.length; i++) {
          if (newCardList[i].id === newCard.id) {
            newCardList[i] = newCard;
          }
        }
        for (var _i3 = 0; _i3 < tempCardList.length; _i3++) {
          if (tempCardList[_i3].id === newCard.id) {
            tempCardList[_i3] = newCard;
          }
        }
        localStorage.setItem("storedState", JSON.stringify(newCardList));
        return { cards: tempCardList, genres: genGenres(), authors: genAuthors(), tempCard: {} };
      });
    };

    _this.state = {
      cards: [],
      genres: [],
      authors: [],
      newCard: {},
      tempCard: {},
      filterGenreToggle: false,
      filterAuthorToggle: false
    };
    _this.filterGenre = _this.filterGenre.bind(_this);
    _this.filterAuthor = _this.filterAuthor.bind(_this);
    _this.setNewCard = _this.setNewCard.bind(_this);
    _this.addNewCard = _this.addNewCard.bind(_this);
    _this.deleteCard = _this.deleteCard.bind(_this);
    _this.showAll = _this.showAll.bind(_this);
    _this.markRead = _this.markRead.bind(_this);
    _this.toggleEdit = _this.toggleEdit.bind(_this);
    _this.commitEdit = _this.commitEdit.bind(_this);
    _this.toggleGenreFilter = _this.toggleGenreFilter.bind(_this);
    _this.toggleAuthorFilter = _this.toggleAuthorFilter.bind(_this);
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (!localStorage.getItem("storedState")) {
        fetch('data.json').then(function (response) {
          return response.json();
        }).then(function (data) {
          var cardsList = data.data;
          for (var i = 0; i < cardsList.length; i++) {
            cardsList[i].hidden = false;
            cardsList[i].edit = false;
            cardsList[i].id = i;
          }
          localStorage.setItem("storedState", JSON.stringify(cardsList));
          _this2.setState({ cards: cardsList, genres: genGenres(), authors: genAuthors() });
        });
      } else {
        var cardsList = JSON.parse(localStorage.getItem("storedState"));
        this.setState({ cards: cardsList, genres: genGenres(), authors: genAuthors() });
      }
    }
  }, {
    key: "render",
    value: function render() {

      return React.createElement(CardsContainer, {
        cards: this.state.cards,
        genres: this.state.genres,
        authors: this.state.authors,
        filterGenre: this.filterGenre,
        filterAuthor: this.filterAuthor,
        newCard: this.state.newCard,
        setNewCard: this.setNewCard,
        addNewCard: this.addNewCard,
        deleteCard: this.deleteCard,
        showAll: this.showAll,
        markRead: this.markRead,
        tempCard: this.state.tempCard,
        toggleEdit: this.toggleEdit,
        editCard: this.editCard,
        commitEdit: this.commitEdit,
        toggleGenreFilter: this.toggleGenreFilter,
        filterGenreToggle: this.state.filterGenreToggle,
        toggleAuthorFilter: this.toggleAuthorFilter,
        filterAuthorToggle: this.state.filterAuthorToggle
      });
    }
  }]);

  return App;
}(React.Component);

var CardsContainer = function CardsContainer(props) {
  var cards = props.cards,
      genres = props.genres,
      authors = props.authors,
      filterGenre = props.filterGenre,
      setNewCard = props.setNewCard,
      newCard = props.newCard,
      addNewCard = props.addNewCard,
      deleteCard = props.deleteCard,
      showAll = props.showAll,
      filterAuthor = props.filterAuthor,
      markRead = props.markRead,
      tempCard = props.tempCard,
      toggleEdit = props.toggleEdit,
      editCard = props.editCard,
      commitEdit = props.commitEdit,
      toggleGenreFilter = props.toggleGenreFilter,
      filterGenreToggle = props.filterGenreToggle,
      toggleAuthorFilter = props.toggleAuthorFilter,
      filterAuthorToggle = props.filterAuthorToggle;

  var cardlist = [];
  for (var i = 0; i < cards.length; i++) {
    cardlist.push(React.createElement(Card, { key: i, hidden: cards[i].hidden, card: cards[i], deleteCard: deleteCard, markRead: markRead, tempCard: tempCard, toggleEdit: toggleEdit, editCard: editCard, commitEdit: commitEdit, tempId: i }));
  }
  return React.createElement(
    "div",
    { className: "app__container" },
    React.createElement(
      "div",
      { className: "buttons__container" },
      React.createElement(FilterGenres, { filterGenre: filterGenre, genres: genres, showAll: showAll, toggleGenreFilter: toggleGenreFilter, filterGenreToggle: filterGenreToggle }),
      React.createElement(FilterAuthors, { filterAuthor: filterAuthor, authors: authors, showAll: showAll, toggleAuthorFilter: toggleAuthorFilter, filterAuthorToggle: filterAuthorToggle })
    ),
    React.createElement(
      "div",
      { className: "cards__container" },
      cardlist,
      React.createElement(CardCreator, { newCard: newCard, setNewCard: setNewCard, addNewCard: addNewCard })
    )
  );
};

var FilterGenres = function FilterGenres(props) {
  var genres = props.genres,
      filterGenre = props.filterGenre,
      showAll = props.showAll,
      filterGenreToggle = props.filterGenreToggle,
      toggleGenreFilter = props.toggleGenreFilter;

  var genreList = [];
  for (var i = 0; i < genres.length; i++) {
    genreList.push(React.createElement(FilterGenre, { key: i, genre: genres[i], filterGenre: filterGenre }));
  }
  return React.createElement(
    "div",
    null,
    filterGenreToggle ? React.createElement(
      "div",
      { className: "filter__container" },
      React.createElement(
        "button",
        { className: "button white", onClick: toggleGenreFilter },
        "Click to Collapse"
      ),
      genreList,
      React.createElement(ShowAll, { showAll: showAll })
    ) : React.createElement(
      "button",
      { className: "button genre large", onClick: toggleGenreFilter },
      "Click to Show Genre Filters"
    )
  );
};

var FilterGenre = function FilterGenre(props) {
  var genre = props.genre,
      filterGenre = props.filterGenre;

  return React.createElement(
    "button",
    { className: "button genre", onClick: function onClick() {
        return filterGenre(genre);
      } },
    genre
  );
};

var FilterAuthors = function FilterAuthors(props) {
  var authors = props.authors,
      filterAuthor = props.filterAuthor,
      showAll = props.showAll,
      filterAuthorToggle = props.filterAuthorToggle,
      toggleAuthorFilter = props.toggleAuthorFilter;

  var genreList = [];
  for (var i = 0; i < authors.length; i++) {
    genreList.push(React.createElement(FilterAuthor, { key: i, authors: authors[i], filterAuthor: filterAuthor }));
  }
  return React.createElement(
    "div",
    null,
    filterAuthorToggle ? React.createElement(
      "div",
      { className: "filter__container" },
      React.createElement(
        "button",
        { className: "button white", onClick: toggleAuthorFilter },
        "Click to Collapse"
      ),
      genreList,
      React.createElement(ShowAll, { showAll: showAll })
    ) : React.createElement(
      "button",
      { className: "button author large", onClick: toggleAuthorFilter },
      "Click to Show Author Filters"
    )
  );
};

var FilterAuthor = function FilterAuthor(props) {
  var authors = props.authors,
      filterAuthor = props.filterAuthor;

  return React.createElement(
    "button",
    { className: "filter author", onClick: function onClick() {
        return filterAuthor(authors);
      } },
    authors
  );
};

var ShowAll = function ShowAll(props) {
  var showAll = props.showAll;

  return React.createElement(
    "button",
    { className: "button white", onClick: showAll },
    "Reset Filter"
  );
};

var Card = function Card(props) {
  var card = props.card,
      deleteCard = props.deleteCard,
      markRead = props.markRead,
      tempCard = props.tempCard,
      toggleEdit = props.toggleEdit,
      editCard = props.editCard,
      commitEdit = props.commitEdit,
      tempId = props.tempId;
  var edit = card.edit,
      id = card.id;

  return React.createElement(
    "div",
    null,
    edit ? React.createElement(CardEditor, { card: card, id: id, tempCard: tempCard, toggleEdit: toggleEdit, editCard: editCard, commitEdit: commitEdit, tempId: tempId }) : React.createElement(CardDetails, { card: card, id: id, deleteCard: deleteCard, markRead: markRead, tempCard: tempCard, toggleEdit: toggleEdit, tempId: tempId })
  );
};

var CardDetails = function CardDetails(props) {
  var id = props.id,
      card = props.card,
      deleteCard = props.deleteCard,
      markRead = props.markRead,
      toggleEdit = props.toggleEdit,
      tempId = props.tempId;
  var title = card.title,
      genre = card.genre,
      author = card.author,
      description = card.description,
      hidden = card.hidden;

  return React.createElement(
    "div",
    { className: hidden ? "card hidden" : "card" },
    React.createElement(CardDeletor, { id: id, deleteCard: deleteCard, tempId: tempId }),
    React.createElement(
      "h2",
      null,
      title
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "span",
        { className: "tag" },
        genre
      ),
      React.createElement(
        "span",
        { className: "difficulty" },
        author
      )
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "h3",
        null,
        "Description:"
      ),
      React.createElement(
        "p",
        null,
        description
      )
    ),
    React.createElement(
      "button",
      { className: "read", onClick: function onClick() {
          return markRead(id);
        } },
      hidden ? "Mark Unread" : "Mark Read"
    ),
    React.createElement(
      "button",
      { className: "edit", onClick: function onClick() {
          return toggleEdit(id);
        } },
      "Edit"
    )
  );
};

var CardCreator = function CardCreator(props) {
  var newCard = props.newCard,
      setNewCard = props.setNewCard,
      addNewCard = props.addNewCard;
  var title = newCard.title,
      genre = newCard.genre,
      author = newCard.author,
      description = newCard.description;


  return React.createElement(
    "div",
    { className: "card creator" },
    React.createElement(
      "h2",
      null,
      "Add a Book"
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "label",
        null,
        "Title:",
        React.createElement("input", { type: "text", id: "title", value: title, onChange: setNewCard })
      )
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "label",
        null,
        "Genre:",
        React.createElement("input", { type: "text", id: "genre", value: genre, onChange: setNewCard })
      )
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "label",
        null,
        "Author:",
        React.createElement("input", { type: "text", id: "author", value: author, onChange: setNewCard })
      )
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "label",
        null,
        "Description:",
        React.createElement("input", { type: "text", id: "description", value: description, onChange: setNewCard })
      )
    ),
    React.createElement(
      "button",
      { onClick: addNewCard },
      "Submit Book"
    )
  );
};

var CardDeletor = function CardDeletor(props) {
  var deleteCard = props.deleteCard,
      id = props.id,
      tempId = props.tempId;

  return React.createElement(
    "button",
    { className: "delete__button", onClick: function onClick() {
        return deleteCard(id, tempId);
      } },
    "X"
  );
};

var CardEditor = function CardEditor(props) {
  var id = props.id,
      tempCard = props.tempCard,
      toggleEdit = props.toggleEdit,
      editCard = props.editCard,
      commitEdit = props.commitEdit,
      tempId = props.tempId;
  var title = tempCard.title,
      genre = tempCard.genre,
      author = tempCard.author,
      description = tempCard.description;

  return React.createElement(
    "div",
    { className: "card creator" },
    React.createElement(
      "h2",
      null,
      "Edit Book"
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "label",
        null,
        "Title:",
        React.createElement("input", { type: "text", id: "title", value: title, onChange: editCard })
      )
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "label",
        null,
        "Genre:",
        React.createElement("input", { type: "text", id: "genre", value: genre, onChange: editCard })
      )
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "label",
        null,
        "Author:",
        React.createElement("input", { type: "text", id: "author", value: author, onChange: editCard })
      )
    ),
    React.createElement(
      "div",
      { className: "row" },
      React.createElement(
        "label",
        null,
        "Description:",
        React.createElement("input", { type: "text", id: "description", value: description, onChange: editCard })
      )
    ),
    React.createElement(
      "button",
      { className: "save", onClick: function onClick() {
          return commitEdit();
        } },
      "Save"
    ),
    React.createElement(
      "button",
      { className: "cancel", onClick: function onClick() {
          return toggleEdit(id);
        } },
      "Cancel"
    )
  );
};

var domContainer = document.querySelector('#app');
ReactDOM.render(React.createElement(App, null), domContainer);