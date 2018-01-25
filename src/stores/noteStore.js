import { observable, action, computed } from "mobx";
const TestNotes = [
  {
  "id" : 1,
  "date": "16.03.2018",
  "note": "lorem ipsum dolor sit amet"
},
{
  "id" : 2,
  "date": "17.03.2018",
  "note": "Mauris sed libero. Suspendisse facilisis nulla in lacinia laoreet,    lorem velit accumsan velit vel mattis libero nisl et sem. Proin interdum maecenas massa turpis sagittis in, interdum non lobortis vitae massa. Quisque purus lectus, posuere eget imperdiet nec sodales id arcu. Vestibulum elit pede dictum eu, viverra non tincidunt eu ligula."
},
{
  "id" : 3,
  "date": "16.03.2018",
  "note": "Mauris sed libero. Suspendisse facilisis nulla in lacinia laoreet,     lorem velit accumsan velit vel mattis libero nisl et sem. Proin interdum maecenas massa turpis sagittis in, interdum non lobortis vitae massa. Quisque purus lectus, posuere eget imperdiet nec sodales id arcu. Vestibulum elit pede dictum eu, viverra non tincidunt eu ligula."
}
];
class NoteStore {
  @observable allnotes=TestNotes;
  @observable note={};
  @observable date="";
  @observable id=0;
  @observable noteText="";

  @computed get anyNotes() {
    return this.allnotes.length!==0;
  }
  @computed get allNotes(){
    return this.allnotes;
  }
  @action
  addNote = () =>{
    this.id++;
    this.note.id = this.id;
    this.note.date = this.date
    this.note.note = this.noteText;
    this.allnotes.push(this.note);
  }
  @action
  setId = (id) =>{
    this.date = date;
  }
  @action
  setDate = (date) =>{
    this.date = date;
  }
  @action
  setNoteText = (text) =>{
    this.noteText = text;
  }
  @action
  setNote = (date, note) =>{
    this.note.id = this.id++;
    this.note.date = this.date;
    this.note.noteText = this.noteText;
  }

}
const noteStore = new NoteStore();
//the store
export default noteStore;
//the class
export { NoteStore };
