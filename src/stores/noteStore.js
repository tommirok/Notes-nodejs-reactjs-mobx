import { observable, action, computed } from "mobx";
const axios = require("axios");
const TestNotes = [
  {
    id: 58,
    date: "16.03.2018",
    note: "lorem ipsum dolor sit amet"
  },
  {
    id: 56,
    date: "17.03.2018",
    note:
      "Mauris sed libero. Suspendisse facilisis nulla in lacinia laoreet,    lorem velit accumsan velit vel mattis libero nisl et sem. Proin interdum maecenas massa turpis sagittis in, interdum non lobortis vitae massa. Quisque purus lectus, posuere eget imperdiet nec sodales id arcu. Vestibulum elit pede dictum eu, viverra non tincidunt eu ligula."
  },
  {
    id: 45,
    date: "16.03.2018",
    note:
      "Mauris sed libero. Suspendisse facilisis nulla in lacinia laoreet,     lorem velit accumsan velit vel mattis libero nisl et sem. Proin interdum maecenas massa turpis sagittis in, interdum non lobortis vitae massa. Quisque purus lectus, posuere eget imperdiet nec sodales id arcu. Vestibulum elit pede dictum eu, viverra non tincidunt eu ligula."
  }
];
const TestComments = [
  {
    name: "tommi",
    comment: "lorem ipsum dolor sit amet"
  },
  {
    name: "tommi",
    comment: "lorem ipsum dolor sit amet"
  },
  {
    name: "tommi",
    comment: "lorem ipsum dolor sit amet"
  }
];
class NoteStore {
  @observable allnotes = [];
  @observable note = {};
  @observable date = "";
  @observable noteId = "";
  @observable noteText = "";
  @observable comments = [];
  @observable comment = "";
  @observable temp;
  @observable reset;
  @observable commentformId = null;
  @observable fetched = false;

  /**
   * checks if theres is any notes in the store
   * @return {[boolean]} [description]
   */
  @computed
  get anyNotes() {
    return this.allnotes.length !== 0;
  }
  @computed
  get allNotes() {
    return this.allnotes;
  }
  @computed
  get commentForm() {
    return this.commentform;
  }
  /**
   * fetches all notes from REST
   * @return {[type]} [description]
   */
  fetchNotes = () => {
    axios
      .get("http://localhost:3001/api/notes")
      .then(res => {
        this.fetched = true;
        this.allnotes = res.data;
      })
      .catch(err => {
        this.fetched = false;
      });
  };
  fetchComments = () => {
    axios
      .get("http://localhost:3001/api/comments")
      .then(res => {
        this.fetchedc = true;
        this.comments = res.data;
        console.log(res.data);
      })
      .catch(err => {
        this.fetchedc = false;
      });
  };
  //noten lisäys alkaa
  @action
  addNote = _this => {
    this.temp = "";

    let note = {};
    note.date = this.date;
    note.note = this.noteText;
    console.log(_this);
    //request
    axios
      .post("http://localhost:3001/api/notes", note)
      .then(res => {
        this.fetched = true;

        console.log("OK hyvä");
        this.temp = this.reset;
        this.fetchNotes();
      })
      .catch(err => {
        this.fetched = false;
        console.log("ei meläpi");
      });
  };
  //lopppuuu
  @action
  setDate = event => {
    this.date = event.target.value;
  };
  @action
  setNoteText = event => {
    this.noteText = event.target.value;
  };
  //commentin lähetys alkaa
  @action
  sendComment = e => {
    this.temp = "";
    let comment = {};
    comment.noteId = e.target.name;
    comment.name = "supervice";
    comment.comment = this.comment;
    //request
    axios
      .post("http://localhost:3001/api/comments", comment)
      .then(res => {
        this.fetchedc = true;
        this.temp = this.reset;
        console.log("OK hyvä");
        this.fetchComments();
      })
      .catch(err => {
        this.fetchedc = false;
        console.log("ei meläpi");
      });
  };

  //loppuuu
  @action
  setComment = event => {
    this.comment = event.target.value;
  };
}
const noteStore = new NoteStore();
//the store
export default noteStore;
//the class
export { NoteStore };
