import React, { Component } from 'react';
/* import '../SearchTask.scss' */
import '../styles/SearchTask.scss'

class SearchTask extends Component {
    state = {
        text: '',
    }

    handleSearch = (e) => {
        this.setState({
            text: e.target.value //tekst bedzie tym co wpisuje w inpucie search
        })
    }
    //bo inaczej wyskoczy blad z zapetlaniem
    //musze takim sposobem zrobic, bo inaczej jak wpisze np: a to uzna to za puste, jak wpisze kolejna litera to dopiero odniesie sie do a, ktore jest poprzednie, a chce aktualna wartosc 
    componentDidUpdate(prevProps, prevState) {
        if (prevState.text !== this.state.text) { //zeby sie nie bylo bledu z zapetlaniem jesli poprzedni stan rozni sie od aktualnego do doknaj aktualizacji
            this.props.searchTask(this.state.text);
        }
    }

    //wczesniej
    /*     handleSearch = (e) => {
            this.setState({
                text: e.target.value
            })
            this.props.searchTask(this.state.text);
        } */

    render() {
        return (
            //gdy mam to w form zamiast w div to jak klikne w inpucie search i nacisne enter to odswiezy strone
            <div className="searchPanel">
                <input className="inputSearch" type="text" placeholder='Search your task...' value={this.state.text} onChange={this.handleSearch} />
                {/* <input type="text" placeholder='wyszukaj' value={this.state.text} onChange={this.handleText} /> */}
                {/* <button onClick={this.handleSearch}>Szukaj</button> */}
            </div>
        );
    }
}

export default SearchTask;