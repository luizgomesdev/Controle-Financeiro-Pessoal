import React, { useState, useEffect } from 'react';
import "bulma/css/bulma.min.css";
import Container from './components/Container';
import Select from './components/select';
import Button from './components/button';
import SearchInput from './components/input/search';
import Totalizers from './components/totalizers';
import TableEntries from './components/table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons';
import { faAngleUp, faAngleDown, faAngleLeft, faAngleRight, faDollarSign } from '@fortawesome/free-solid-svg-icons';


function App() {

  const API_URL = "http://localhost:8000/api/"

  const [everyMonthRegistred, setEveryMonthRegistred] = useState([]);

  useEffect(() => {
    const fetchEveryMonthRegistred = async () => {
      const response = await fetch(`${API_URL}transactions/everyMonthRegistred`)
      const data = await response.json();      
      setEveryMonthRegistred(data);
    }
    fetchEveryMonthRegistred();
  }, [])


  return (
    <>
      <Container>
        <div className="columns py-6">
          <div className="column">
            <div className="field is-grouped">
              <Button styles="is-primary mr-3">
                <FontAwesomeIcon icon={faAngleLeft} />
              </Button>
              <Select defaultValue="Selecione uma data" options={everyMonthRegistred} />
              <Button styles="is-primary ml-3">
                <FontAwesomeIcon icon={faAngleRight} />
              </Button>
            </div>
          </div>
          <div className="column">
            <SearchInput placeholder="Filtrar por categoria" />
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <Totalizers styles="has-background-info has-text-white" icon={faStickyNote} name="Lançamentos" value="69" />
          </div>
          <div className="column">
            <Totalizers styles="has-background-primary has-text-white" icon={faAngleUp} name="Receitas" value="69" />
          </div>
          <div className="column">
            <Totalizers styles="has-background-danger has-text-white" icon={faAngleDown} name="Despesas" value="69" />
          </div>
          <div className="column">
            <Totalizers styles="has-background-info has-text-white" icon={faDollarSign} name="Saldo total" value="69" />
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <TableEntries />
          </div>
        </div>

      </Container>
    </>
  );
}

export default App;

