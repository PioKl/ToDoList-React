import React, { Component } from 'react';
/* import '../App.scss'; */
import '../styles/App.scss';
import AddTask from './AddTask';
import SearchTask from './SearchTask';
import TaskList from './TaskList';



class App extends Component {

  idCounter = 0;   //licznik indeksow przy add potrzebne, ze jak dodam to zwieksz licznik o jeden, zeby kolejny mial unikalny indeks
  taskCounter = 0; //licznik sluzacy do wyswietlenia ile mam taskow
  state = {
    tasks: [],
    filtered: [],   //tu beda pofiltrowane taski
    textFromSearch: '', //tekst, ktory zostal wpisany w inpucie
  }

  handleDeleteTask = (id) => {
    console.log('Tekst to');
    console.log(this.state.textFromSearch);
    console.log(`działa ${id}`);
    let tasks = [...this.state.tasks];
    tasks = tasks.filter(task => task.id !== id);
    this.setState({
      tasks: tasks,
    })

    //chce zrobic zeby filtered mial te taski, ktore zawieraja litere z inputa
    //textFromSearch to litera/slowo z inputa dotyczacego wyszukiwania
    //filtered niech zawiera te taski, ktore zawieraja jakas litere z tego co zostalo wpisane w inpucie wyszukiwania
    //dzieki temu jesli mam rok, bork, ada w tasks i w inpucie wyszukiwania wpisze k, to wyskoczy mi rok i bork, nastepnie jak usune rok, a w inpucie wyszukiwania bedzie nadal k, to pojawi mi sie jeszcze bork, a jakbym mial filtered: tasks, to by sie pojawilo wszystko, czyli oprocz bork, jeszcze ada
    this.setState({
      filtered: tasks.filter(task => task.text.toLocaleLowerCase().includes(this.state.textFromSearch))
    })

    //zeby bylo prawidlowe usuwanie z licznika, tutaj jest tak, ze jesli zaznaczony jest task (ze skreslony) i nacisne usun to licznik sie nie zmniejszy dodatkowo, bo najpierw u mnie pojedyncze skreslenie powoduje, ze licznik zmniejsza sie o jeden i jak jeszcze usune to licznik by sie dodatkowo zmniejszyl o jeden a tak nie chce, te rozwiazanie jest powiazane z tym w search (Oznaczenie #2), czyli jak zaznacze tak (skresle go) to pomniejsz licznik o jeden, a jak nacisne przy nim usun, to nie usuwaj juz z licznika jeszcze jeden raz zostaw ten licznik jaki jest, jesli nie jest zaznaczony to normalnie pomniejsz licznik o jeden

    //w skrocie:
    //a tutaj sprawdz, przy klikanym tasku czy jest on niezaznaczony, jak nie jest zaznaczony to przy usuwaniu pomniejsz licznik o jeden, a jak jest to nie zmieniaj licznika
    let taskCounterChangeWhenDeleting = [...this.state.filtered]  //z deleteTaskss na taskCounterChangeWhenDeleting /taskCounterForCheckedTrue
    taskCounterChangeWhenDeleting = taskCounterChangeWhenDeleting.filter(task => task.id === id); //pobranie dokladnie kliknietego taska przy usunieciu
    console.log("taskiiii")
    //i jesli ten usuwany ma checked ustawiony na false to zmniejsz licznik o jeden
    taskCounterChangeWhenDeleting = taskCounterChangeWhenDeleting.map(task => {
      if (task.checked === false) {
        this.taskCounter--
      } else {
        this.taskCounter = this.taskCounter //jak jest true to nie zmieniaj licznika
      }
      return taskCounterChangeWhenDeleting
    })

  }

  //metoda, sluzaca do zmiany stanu checked na true i false, zeby mozna bylo je przekreslic pozniej
  handleCheckTask = (id) => {
    console.log(`checked`);
    console.log(`działa ${id}`)
    const tasks = this.state.tasks.map(task => {
      if (id === task.id) {
        task.checked = !task.checked;
      }
      //odpowiadajace za countera z checkiem
      if (id === task.id) {
        if (task.checked === false) {
          this.taskCounter += 1;
        } else {
          this.taskCounter -= 1;
        }
      }
      //koniec
      return task;
    })
    this.setState({
      tasks,
    })
  }

  addTask = (text, checked) => {
    if (text !== '') {
      const task = {
        id: this.idCounter,
        text: text,
        checked: checked,
      }
      this.idCounter++;
      this.taskCounter++;
      this.setState(prevState => ({
        tasks: [...prevState.tasks, task]
      }))

      //w filtered ustaw ten sam stan co w tablicy tasks
      this.setState(prevState => ({
        filtered: prevState.tasks
      }))

    } else {
      alert("You must type something if you want to add a task");
    }
    return true
  }


  searchTask = text => {
    this.setState({
      textFromSearch: text //ustawia textFromSearch na text pobrany z inputa search
    })
    let actualTasksList = [];   //currentTodos na actualTodoList albo actualTasksList
    let newTasksList = [];        //newList na newTasksList
    if (text !== "") {
      actualTasksList = this.state.tasks; //pobierz wszystkie dodane, pobierz wszystkie taski jakie sa
      newTasksList = actualTasksList.filter(task => {
        console.log(task.text.includes(text))
        return task.text.toLocaleLowerCase().includes(text.toLocaleLowerCase()) //newTasksList zawiera true lub false, jesli zanalazl lub nie znalazl, w newTasksList sa teraz taski, ktore sa zgodne z tym czego szukalem
      })
    } else {
      newTasksList = this.state.tasks; //jesli nic nie szukamy to zwroc stara tablice (jak jest pusta)
    }
    this.setState({
      filtered: newTasksList,  //filtered zawiera teraz elementy z newTasksList (jesli cos znalazl lub nie)
    });

    //robione po to, aby licznik pokazywal tyle ile mam taskow, ale rowniez, ze jak zaznacze taska (ze skreslony) to zeby z licznika to odjelo
    //Jesli zaznacze w search taski (ze skreslony) to licznik sie zmniejszy o te skreslone i jesli wyjde z tego searcha na glowne okno to chce zeby wzial pod uwage te skreslenia do licznika, bez tego nie wezmie pod uwage
    //Oznaczenie tego #S
    let checkedTaskList = [];    //toCounter na checkedTaskList
    checkedTaskList = newTasksList;
    let checkedTaskCounter = 0;
    checkedTaskList = checkedTaskList.map(task => {
      if (task.checked === true) {
        checkedTaskCounter += 1;
      }
      return checkedTaskList;
    })
    console.log('ToCounter')
    console.log(checkedTaskCounter)
    console.log(checkedTaskList.length)
    console.log(checkedTaskList)
    this.taskCounter = newTasksList.length - checkedTaskCounter//- toCounter.length - checkTaskCounter //- this.checkTaskCounter //czyli taskCounter rowna sie temu ile elementow mi z wyszukiwania wyskoczy minus tyle ile czeknalem
    console.log(text);

  };


  render() {

    console.log(this.taskCounter)
    console.log(this.state.tasks)
    console.log(this.state.filtered)
    return (
      <div className="container">
        <h1 className='toDoList-h1'>To Do List</h1>
        {/* licznik niech sie wyswietla dopiero kiedy jest w takCounter wiecej niz 0 */}
        {this.taskCounter > 0 ? <p className="taskCounter">Tasks: {this.taskCounter}</p> : null}
        <SearchTask searchTask={this.searchTask} />
        <AddTask addTask={this.addTask} />
        {/* tasks={this.state.filtered} jest to zamiast tasks={this.state.tasks} bo chce, zeby mapowal po przefiltrowanej liscie*/}
        <TaskList tasks={this.state.filtered} handleDeleteTask={this.handleDeleteTask} handleCheckTask={this.handleCheckTask} />
      </div>
    );
  }

}

export default App;
