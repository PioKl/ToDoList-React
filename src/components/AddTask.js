import React, { Component } from 'react';
/* import '../AddTask.scss'; */
import '../styles/AddTask.scss';

class AddTask extends Component {
    state = {
        text: '',
        checked: false,
    }

    //metoda sluzaca do pobrania tekstu wpisywanego w input odpowiadajacy za dodanie
    handleText = (e) => {
        this.setState({
            text: e.target.value,
        })
    }

    //metoda obslugujaca przycisk Dodaj
    handleClick = (e) => {
        e.preventDefault(); //bo uzywam form, gdy uzywalem div nie mialem tego i eventu
        const addTask = this.props.addTask(this.state.text, this.state.checked);
        if (addTask) {
            this.setState({
                text: '',
                checked: false,
            })
        }
        else {
            console.log('Error');
        }
    }

    //Dodanie taska za pomoca nacisniecia klawisza enter, czyli jesli klawisz sie zgadza uruchom metode handleClick
    handleKey = (e) => {
        if (e.charCode === 13 && this.state.text.length > 0) {
            this.handleClick(e) //tu dodatkowo musze jeszcze przekazac e(event), wczesniej tego nie mialem, ale jakbym tego e nie mial, to bym mial blad, przy kliknieciu by przeszlo, ale przy uzyciu enter mialbym blad
        }
    }

    render() {
        return (
            //jak mam to w form to w sumie ten handleKey nie jest potrzebny, potrzebny jest jak mam div, ale zostawie te metode i cale dzialanie, dla przypomnienia
            <form className="addTaskPanel">
                <input className="inputAddTask" type="text" placeholder='Insert your task...' value={this.state.text} onChange={this.handleText} onKeyPress={this.handleKey} />
                <button className="buttonAddTask" onClick={this.handleClick}>Add <i class="fas fa-plus"></i></button>
            </form>
        );
    }
}

export default AddTask;