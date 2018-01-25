import { observable, action, computed } from "mobx";
const TestNotes = [
  {
  "id" : 1,
  "date": "16.03.2018",
  "note": "lorem ipsum dolor sit amet"
},
{
  "id" : 2,
  "Date": "17.03.2018",
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
  @observable note;
  @observable date;
  @observable id;
  @action
  setNote = (note) =>{
    this.allnotes.concat(note);
  }


}
const noteStore = new NoteStore();
//the store
export default noteStore;
//the class
export { NoteStore };
